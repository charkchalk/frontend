import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { AbstractControl, FormControl, Validators } from "@angular/forms";
import { AutoCompleteCompleteEvent } from "primeng/autocomplete";
import { BehaviorSubject, Observable, Subscription } from "rxjs";

import { Displayable } from "../../../_types/displayable";
import { QueryDataProvider } from "../../_query/query-data-provider";

@Component({
  selector: "app-select-input",
  styleUrls: ["./select-input.component.scss"],
  templateUrl: "./select-input.component.html",
})
export class SelectInputComponent implements OnInit {
  /** An event emitter that emit events when input has been focused */
  @Output() active: EventEmitter<void> = new EventEmitter();

  /** An event emitter that emit events when value has been updated */
  @Output() updated: EventEmitter<Displayable<string>[]> = new EventEmitter();

  /** Data provider of current filtering condition */
  @Input() provider?: QueryDataProvider;

  /** Value of current filtering condition */
  @Input() value?: Displayable<unknown>[] = [];

  /** An event emitter that receive event from parent when provider changed */
  @Input() providerChange?: Observable<void>;

  /** Emit control to parent after control initialized */
  @Output() controlSet = new EventEmitter<AbstractControl>();

  /** Control of current filtering condition */
  control = new FormControl<Displayable<string>[]>([], Validators.required);

  ngOnInit() {
    this.providerChange?.subscribe(() => {
      this.optionsPage = 0;
      this.options = [];
    });

    const values = (this.value as Displayable<string>[]) ?? [];
    this.control.setValue(values);
    this.controlSet.emit(this.control);
    if (!this.provider) this.control.disable();
    this.providerChange?.subscribe(() => this.control.enable());
    this.control.valueChanges.subscribe(() => this.onValueChange());
  }

  /**
   * On selected options changed
   */
  onValueChange() {
    this.updated.emit(this.control.value as Displayable<string>[]);
  }

  /** Selectable options */
  options: Displayable<string>[] = [];

  optionsSubject = new BehaviorSubject<Displayable<string>[]>([]);

  /**
   * Get options without selected options
   * @returns Array of selectable options
   */
  filteredOptions(): Displayable<string>[] {
    return this.options.filter(
      option =>
        !this.control.value?.find(selected => selected.value === option.value),
    );
  }

  /** Current page of options, needs to be reset when searching context changed */
  optionsPage = 0;

  /** Last query request, used to cancel last request when new request is triggered */
  lastQueryRequest?: Subscription;

  /** Is waiting for server respond options or not */
  isLoadingOptions = false;

  /** Visibility detector, used to additional loading options */
  intersectionObserver = new IntersectionObserver(
    entries => {
      /*
       * Observer will be triggered when target is going to visible or invisible
       * so we have to ignore invisible event
       */
      if (!entries[0].isIntersecting) return;
      if (this.optionsPage < 0) return;

      this.isLoadingOptions = true;
      // Stop observing while loading options
      this.intersectionObserver.disconnect();
      this.getOptions(this.query);
    },
    { threshold: 1 },
  );

  /**
   * Bind intersection observer to last option element to trigger load more options
   */
  async bindLoadingTrigger(): Promise<void> {
    await this.waitForElement(
      "ul.p-autocomplete-items",
      "ul.p-autocomplete-items li:last-child",
      element =>
        element.textContent === this.options[this.options.length - 1].label,
    );
    const target = document.querySelector(
      "ul.p-autocomplete-items li:last-child",
    );
    if (!target) return;
    this.intersectionObserver.disconnect();
    this.intersectionObserver.unobserve(target);
    this.intersectionObserver.observe(target);
  }

  /**
   * Wait for element to be rendered
   * @param parent parent element selector, if null, will use documentElement
   * @param target target element selector
   * @param validator validator to check if target element is valid, default to true
   * @returns
   */
  waitForElement(
    parent: string | null,
    target: string,
    validator: (element: Element) => boolean = () => true,
  ): Promise<Element> {
    return new Promise(resolve => {
      const element = document.querySelector(target);
      if (element && validator(element)) {
        resolve(element);
        return;
      }

      const observer = new MutationObserver(() => {
        const listening = document.querySelector(target);
        if (!listening || !validator(listening)) return;

        observer.disconnect();
        resolve(listening);
      });

      const parentElement = document.querySelector(parent ?? "");

      observer.observe(parentElement ?? document.documentElement, {
        childList: true,
        subtree: true,
      });
    });
  }

  /** Last query string */
  query = "";

  /**
   * Get options from server
   * @param value value to search options
   */
  getOptions(value: string): void {
    this.lastQueryRequest?.unsubscribe();
    this.lastQueryRequest = this.provider
      ?.getOptions({
        keyword: value.trim(),
        page: this.optionsPage + 1,
      })
      .subscribe(options => {
        this.options = this.options.concat(...options.content);
        this.optionsSubject.next(this.filteredOptions());
        this.optionsPage = options.pagination.current;
        this.isLoadingOptions = false;
        if (options.pagination.current >= options.pagination.total) {
          this.optionsPage = -1;
          return;
        }
        this.bindLoadingTrigger();
      });
  }

  /**
   * Handle user input event
   * @param event event from autocomplete event
   */
  onCompleteInput(event: AutoCompleteCompleteEvent): void {
    if (this.query !== event.query) {
      this.optionsPage = 0;
      this.options = [];
      this.query = event.query;
    }
    if (this.options.length) this.optionsSubject.next(this.filteredOptions());

    if (this.optionsPage < 0) return;
    this.getOptions(this.query);
  }
}

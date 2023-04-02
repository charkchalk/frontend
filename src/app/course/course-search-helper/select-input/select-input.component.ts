import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";
import { MatChipGrid } from "@angular/material/chips";
import { interval, Observable, Subscription, take } from "rxjs";

import { Displayable } from "../../../_types/displayable";
import { QueryDataProvider } from "../../_query/query-data-provider";

@Component({
  selector: "app-select-input",
  templateUrl: "./select-input.component.html",
  styleUrls: ["./select-input.component.css"],
})
export class SelectInputComponent implements OnInit {
  /** An event emitter that emit events when input has been focused */
  @Output() active: EventEmitter<void> = new EventEmitter();
  /** An event emitter that emit events when value has been updated */
  @Output() updated: EventEmitter<Displayable[]> = new EventEmitter();
  /** Data provider of current filtering condition */
  @Input() provider?: QueryDataProvider;
  /** Value of current filtering condition */
  @Input() value?: Displayable[] = [];
  /** Writable value */
  private localValue: Displayable[] = [];
  /** An event emitter that receive event from parent when provider changed */
  @Input() providerChange?: Observable<void>;
  /** Selectable options */
  options: Displayable[] = [];

  ngOnInit() {
    this.providerChange?.subscribe(() => {
      this.optionsPage = 0;
      this.options = [];
    });

    // listen to value change to filter selectable options
    this.inputControl.valueChanges.subscribe(() =>
      this.inputValueChangeHandler(),
    );
  }

  /** Subscription of user idle detector */
  whenIdleSubscription?: Subscription;

  /**
   * Handler when input value changed, will trigger option fetch when user stop typing for 500ms
   */
  inputValueChangeHandler(): void {
    this.setInputError(null);

    this.whenIdleSubscription?.unsubscribe();
    this.whenIdleSubscription = interval(500)
      .pipe(take(1))
      .subscribe(() => {
        this.whenIdleSubscription?.unsubscribe();
        this.whenIdleSubscription = undefined;
        this.optionsPage = 0;
        this.options = [];
        this.getOptions(this.inputControl.value ?? "");
      });
  }

  notifyQueryUpdate() {
    this.updated.emit(this.localValue);
  }

  /** Input of value */
  inputControl = new FormControl("");

  @ViewChild("chipGrid") chipGrid!: MatChipGrid;
  error: string | null = null;

  /**
   * Set input error to display or clear error
   * @param error error message to set, if null, will clear error
   */
  setInputError(error: string | null) {
    this.chipGrid.errorState = !!error;
    this.error = error;
  }

  /** Is waiting for server respond options or not */
  isLoadingOptions = false;
  /** Visibility detector, used to additional loading options */
  intersectionObserver = new IntersectionObserver(
    entries => {
      // observer will be triggered when target is going to visible or invisible
      // so we have to ignore invisible event
      if (!entries[0].isIntersecting) return;
      if (this.optionsPage < 0) return;

      this.isLoadingOptions = true;
      // Stop observing while loading options
      this.intersectionObserver.disconnect();
      this.getOptions(this.inputControl.value ?? "");
    },
    { threshold: 1 },
  );

  /**
   * Bind intersection observer to element that is preserved in options menu
   */
  bindLoadingTrigger(): void {
    const target = document.querySelector(
      ".mat-mdc-autocomplete-panel .loading-trigger",
    );
    if (!target) return;
    this.intersectionObserver.disconnect();
    this.intersectionObserver.unobserve(target);
    this.intersectionObserver.observe(target);
  }

  /** Current page of options, needs to be reset when searching context changed */
  optionsPage = 0;
  /** Last query request, used to cancel last request when new request is triggered */
  lastQueryRequest?: Subscription;

  /**
   * Get options from server
   * @param value value to search options
   */
  getOptions(value: string): void {
    this.lastQueryRequest?.unsubscribe();
    this.lastQueryRequest = this.provider
      ?.getOptions({
        page: this.optionsPage + 1,
        keyword: value.trim(),
      })
      .subscribe(options => {
        this.options.push(
          ...options.content.filter(option => {
            return !this.value?.find(selected => selected.key === option.key);
          }),
        );
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
   * Select an option into query value and remove it from options list
   * @param event event of option selected
   */
  selectOption(event: MatAutocompleteSelectedEvent): void {
    this.localValue?.push(event.option.value);
    this.options.splice(this.options.indexOf(event.option.value), 1);
    this.inputControl.setValue("");
    this.notifyQueryUpdate();
  }

  /**
   * Remove selected option from query value
   * @param index index of selected option to remove
   */
  removeSelectedOption(index: number): void {
    this.localValue?.splice(index, 1);
    this.notifyQueryUpdate();
  }
}

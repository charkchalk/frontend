import {
  Component,
  EventEmitter,
  Input,
  type OnInit,
  Output,
} from "@angular/core";
import {
  type AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Subject } from "rxjs";

import { type Displayable } from "../../_types/displayable";
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { CourseQueryService } from "../_query/course-query.service";
import { type QueryDataProvider } from "../_query/query-data-provider";
import { type QueryItem } from "../_query/query-item";

@Component({
  selector: "app-course-search-helper",
  styleUrls: ["./course-search-helper.component.scss"],
  templateUrl: "./course-search-helper.component.html",
})
export class CourseSearchHelperComponent implements OnInit {
  /** Index of current query in queries list */
  @Input() index!: number;

  /** Is this query deletable or not, currently only last query can be delete */
  @Input() deletable = true;

  /** All selectable DataProviders in Displayable format for users to select */
  providers: Displayable<string>[] = [];

  /** QueryItem that saves user inputted data */
  query: QueryItem<unknown> = {};

  /** Current filtering provider */
  provider?: QueryDataProvider;

  /** All selectable compare methods, will be undefined or null when no provider */
  methods: Displayable<string>[] = [];

  @Output() controlSet: EventEmitter<AbstractControl> =
    new EventEmitter<AbstractControl>();

  formGroup: FormGroup = new FormGroup({});

  @Output() removed: EventEmitter<number> = new EventEmitter<number>();

  constructor(private courseQueryService: CourseQueryService) {}

  ngOnInit() {
    this.providers = this.courseQueryService
      .getProviders()
      .map(provider => ({ label: provider.label, value: provider.value }));

    this.query = this.courseQueryService.getQuery(this.index);
    this.formGroup = new FormGroup({
      key: new FormControl<string | undefined>(
        this.query.key,
        Validators.required,
      ),
      method: new FormControl<string | undefined>(
        { disabled: !this.provider, value: this.query.method },
        Validators.required,
      ),
    });

    if (this.query.key) this.setProvider(this.query.key, false);
  }

  /**
   * To set current provider and get provider from service
   * @param providerKey key of the provider to set
   * @param reset reset query data or not, if reset, will reset query method and value
   */
  setProvider(providerKey: string, reset = true) {
    if (reset) {
      this.query.key = providerKey;
      // eslint-disable-next-line no-undefined
      this.query.method = undefined;
      // eslint-disable-next-line no-undefined
      this.query.value = undefined;
      this.notifyQueryUpdate();
    }
    this.controlSet.emit(this.formGroup);
    this.formGroup.controls.method.enable();
    this.provider = this.courseQueryService.getProvider(providerKey);
    this.methods = this.provider?.getMethods() || [];
    this.providerChange.next();
  }

  onControlSet(control: AbstractControl) {
    this.formGroup.controls.content = control;
  }

  /**
   * To trigger queries change notification that query has been updated
   */
  notifyQueryUpdate() {
    this.formGroup.updateValueAndValidity();
    this.courseQueryService.setQuery(this.index, this.query);
  }

  /** Notify child components that provider has changed */
  providerChange: Subject<void> = new Subject<void>();

  /**
   * Update value after child component emit value updated event
   * @param value emitted value from input sub component
   */
  valueUpdated(value: Displayable<unknown>[]) {
    this.query.value = value;
    this.notifyQueryUpdate();
  }

  /**
   * Remove this whole query from queries list
   */
  removeQuery() {
    this.removed.emit(this.index);
    this.courseQueryService.removeQuery(this.index);
  }
}

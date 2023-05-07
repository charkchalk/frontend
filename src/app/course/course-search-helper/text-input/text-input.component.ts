import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

import { Displayable } from "../../../_types/displayable";
import { QueryDataProvider } from "../../_query/query-data-provider";

@Component({
  selector: "app-text-input",
  templateUrl: "./text-input.component.html",
  styleUrls: ["./text-input.component.scss"],
})
export class TextInputComponent implements OnInit {
  /** An event emitter that emit events when input has been focused */
  @Output() active: EventEmitter<void> = new EventEmitter();
  /** An event emitter that emit events when value has been updated */
  @Output() updated: EventEmitter<Displayable<string>[]> = new EventEmitter();
  /** Data provider of current filtering condition */
  @Input() provider?: QueryDataProvider;
  /** Value of current filtering condition */
  @Input() value?: Displayable<unknown>[] = [];
  /** Writable value */
  protected localValue: Displayable<string>[] = [];
  protected values: string[] = [];

  /** Key codes that is be used to separate words in text input chips mode */
  separatorExp = /[,，、\s\t]/;
  error: string | null = null;

  ngOnInit(): void {
    this.localValue = (this.value as Displayable<string>[]) ?? [];
    this.values = this.localValue.map(value => value.value as string);
  }

  notifyQueryUpdate() {
    this.updated.emit(this.localValue);
  }

  onValueChanged() {
    this.localValue = this.values
      .map(value => {
        value = value.trim();

        const error = this.provider?.getValidationResult(value);
        if (error) {
          this.error = error;
          return null;
        }

        return { value, label: value };
      })
      .filter(value => value !== null) as Displayable<string>[];
    this.notifyQueryUpdate();
  }
}

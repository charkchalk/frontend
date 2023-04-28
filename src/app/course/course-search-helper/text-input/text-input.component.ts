import { ENTER, SPACE } from "@angular/cdk/keycodes";
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatChipGrid, MatChipInputEvent } from "@angular/material/chips";

import { Displayable } from "../../../_types/displayable";
import { QueryDataProvider } from "../../_query/query-data-provider";

@Component({
  selector: "app-text-input",
  templateUrl: "./text-input.component.html",
  styleUrls: ["./text-input.component.css"],
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

  ngOnInit(): void {
    this.inputControl.valueChanges.subscribe(() => this.setInputError(null));
  }

  notifyQueryUpdate() {
    this.updated.emit(this.localValue);
  }

  /** Key codes that is be used to separate words in text input chips mode */
  separatorKeyCodes = [SPACE, ENTER];
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

  /**
   * Add text in input to query value and clear input
   * @param event event of input sent by MatChipInput
   */
  addText(event: MatChipInputEvent): void {
    if (this.provider?.type !== "text") return;

    const value = event.value.trim();
    if (value === "") return;

    const error = this.provider.getValidationResult(value);
    this.setInputError(error);
    if (error) return;

    if (!this.localValue) this.localValue = [];
    this.localValue.push({
      value: event.value.trim(),
      label: event.value.trim(),
    });
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

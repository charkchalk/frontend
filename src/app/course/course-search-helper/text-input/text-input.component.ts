import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { AbstractControl, FormControl, Validators } from "@angular/forms";
import { Observable } from "rxjs";

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
  /** An event emitter that receive event from parent when provider changed */
  @Input() providerChange?: Observable<void>;
  /** Value of current filtering condition */
  @Input() value?: Displayable<unknown>[] = [];

  /** Key codes that is be used to separate words in text input chips mode */
  separatorExp = /[,，、\s\t]/;
  error: string | null = null;

  /** Emit control to parent after control initialized */
  @Output() controlSet = new EventEmitter<AbstractControl>();
  /** Control of current filtering condition */
  control = new FormControl<string[]>([], Validators.required);

  ngOnInit(): void {
    const values = (this.value as Displayable<string>[]) || [];
    this.control.setValue(values.map(value => value.value as string));
    this.controlSet.emit(this.control);
    if (!this.provider) this.control.disable();

    this.providerChange?.subscribe(() => this.control.enable());
    this.control.valueChanges.subscribe(() => this.onValueChanged());
  }

  onValueChanged() {
    const values = this.control.value
      ?.map(value => {
        value = value.trim();

        const error = this.provider?.getValidationResult(value);
        if (error) {
          this.error = error;
          return null;
        }

        return { value, label: value };
      })
      .filter(value => value !== null) as Displayable<string>[];
    this.updated.emit(values);
  }
}

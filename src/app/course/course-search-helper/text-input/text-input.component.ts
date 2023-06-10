import {
  Component,
  EventEmitter,
  Input,
  type OnInit,
  Output,
} from "@angular/core";
import { type AbstractControl, FormControl, Validators } from "@angular/forms";
import type { Observable } from "rxjs";

import type { Displayable } from "../../../_types/displayable";
import type { QueryDataProvider } from "../../_query/query-data-provider";

@Component({
  selector: "app-text-input",
  styleUrls: ["./text-input.component.scss"],
  templateUrl: "./text-input.component.html",
})
export class TextInputComponent implements OnInit {
  /** An event emitter that emit events when input has been focused */
  @Output() active = new EventEmitter<void>();

  /** An event emitter that emit events when value has been updated */
  @Output() updated = new EventEmitter<Displayable<string>[]>();

  /** Data provider of current filtering condition */
  @Input() provider?: QueryDataProvider;

  /** An event emitter that receive event from parent when provider changed */
  @Input() providerChange?: Observable<void>;

  /** Value of current filtering condition */
  @Input() value?: Displayable<unknown>[] = [];

  /** Key codes that is be used to separate words in text input chips mode */
  separatorExp = /[,，、\s\t]/u;

  error: string | null = null;

  /** Emit control to parent after control initialized */
  @Output() controlSet = new EventEmitter<AbstractControl>();

  /** Control of current filtering condition */
  control = new FormControl<string[]>([], Validators.required);

  ngOnInit(): void {
    this.control.setValue(
      (this.value as Displayable<string>[]).map(value => value.value),
    );

    this.controlSet.emit(this.control);
    if (!this.provider) this.control.disable();

    this.providerChange?.subscribe(() => {
      this.control.enable();
    });

    this.control.valueChanges.subscribe(() => {
      this.onValueChanged();
    });
  }

  onValueChanged(): void {
    const values = this.control.value
      ?.map(value => {
        const trimed = value.trim();

        const error = this.provider?.getValidationResult(trimed) ?? null;

        if (!error) {
          this.error = error;

          return null;
        }

        return { label: trimed, value: trimed };
      })
      .filter(value => value !== null) as Displayable<string>[];

    this.updated.emit(values);
  }
}

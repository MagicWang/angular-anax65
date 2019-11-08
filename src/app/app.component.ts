import { Component, ViewEncapsulation, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "nz-demo-auto-complete-basic",
  encapsulation: ViewEncapsulation.None,
  template: `
    <div class="example-input">
      <input
        placeholder="input here"
        nz-input
        [(ngModel)]="inputValue"
        (input)="onInput($event.target?.value)"
        [nzAutocomplete]="auto"
      />
      <nz-autocomplete nzBackfill #auto>
        <nz-auto-option *ngFor="let option of options" [nzValue]="option">
          {{ option }}
        </nz-auto-option>
      </nz-autocomplete>
    </div>
  `
})
export class NzDemoAutoCompleteBasicComponent implements OnInit {
  constructor(private http: HttpClient) {}
  inputValue: string;
  options: string[] = [];

  onInput(value: string): void {
    this.http
      .get(`http://192.168.0.117:7210/search?keyword=${value}`)
      .subscribe((data: any) => (this.options = data || []));
  }
  ngOnInit() {}
}

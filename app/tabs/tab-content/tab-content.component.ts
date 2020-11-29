import { Component } from "@angular/core";

@Component({
  selector: "tab-content",
  template: `
    <ng-content></ng-content>
  `
})
export class TabContentComponent {}

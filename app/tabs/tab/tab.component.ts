import { Component, ContentChild } from "@angular/core";
import { ContentRenderDirective } from "../directives/content-render.directive";
import { TabsService } from "../tabs.service";

@Component({
  selector: "tab",
  template: `
    <div
      (click)="activate()"
      class="tabs__title"
      [ngClass]="{ 'tabs__title--active': active }"
    >
      <ng-content select="tab-title"></ng-content>
    </div>

    <div class="tabs__content">
      <ng-content select="tab-content"></ng-content>
    </div>
  `
})
export class TabComponent {
  active = false;
  @ContentChild(ContentRenderDirective) renderContent: ContentRenderDirective;

  constructor(private tabsService: TabsService) {}

  activate() {
    this.tabsService.deactivateAll.next(true);
    this.renderContent.create();
    this.active = true;
  }

  deactivate() {
    this.active = false;
    this.renderContent.dispose();
  }
}

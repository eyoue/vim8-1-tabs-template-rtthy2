import {
  AfterContentChecked,
  Component,
  ContentChildren,
  OnDestroy,
  OnInit,
  QueryList
} from "@angular/core";
import { takeUntil } from "rxjs/internal/operators/takeUntil";
import { tap } from "rxjs/internal/operators/tap";
import { Subject } from "rxjs/internal/Subject";
import { TabComponent } from "./tab/tab.component";
import { TabsService } from "./tabs.service";

@Component({
  selector: "tabs",
  template: `
    <div class="tabs__titles">
      <ng-content></ng-content>
    </div>
  `,
  providers: [TabsService]
})
export class TabsComponent implements OnInit, OnDestroy, AfterContentChecked {
  @ContentChildren(TabComponent) private tabs: QueryList<TabComponent>;
  private ngUnsubscribe$ = new Subject();
  private asynActivate = 0;
  private onChangeActivate = this.tabsService.deactivateAll.pipe(
    takeUntil(this.ngUnsubscribe$)
  );
  private deactivateAll = () => {
    if (this.tabs.length) {
      this.tabs.forEach(tab => tab && tab.deactivate());
    }
  };

  constructor(private tabsService: TabsService) {}

  ngOnInit() {
    this.onChangeActivate.subscribe(() => this.deactivateAll());
  }
  ngOnDestroy() {
    this.ngUnsubscribe$.next();
  }

  ngAfterContentChecked() {
    this.setDefaultTab();
  }

  private setDefaultTab() {
    const refresh = () => {
      if (this.asynActivate) {
        clearTimeout(this.asynActivate);
      }
    };
    const setTab = () => {
      this.asynActivate = setTimeout(() => {
        this.tabs.first.activate();
        refresh();
      }, 0);
    };
    const isAllDeactivated =
      this.tabs.length && this.tabs.toArray().every(tab => !tab.active);

    if (isAllDeactivated) {
      refresh();
      setTab();
    }
  }
}

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TabsComponent } from "./tabs.component";
import { TabComponent } from "./tab/tab.component";
import { ContentRenderDirective } from "./directives/content-render.directive";
import { TabTitleComponent } from "./tab-title/tab-title.component";
import { TabContentComponent } from "./tab-content/tab-content.component";

@NgModule({
  imports: [CommonModule],
  declarations: [
    TabsComponent,
    TabComponent,
    TabTitleComponent,
    TabContentComponent,
    ContentRenderDirective
  ],
  exports: [
    TabsComponent,
    TabComponent,
    TabTitleComponent,
    TabContentComponent,
    ContentRenderDirective
  ]
})
export class TabsModule {}

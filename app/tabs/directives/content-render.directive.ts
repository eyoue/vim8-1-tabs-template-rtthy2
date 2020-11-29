import { Directive, TemplateRef, ViewContainerRef } from "@angular/core";

@Directive({
  selector: "[contentRender]"
})
export class ContentRenderDirective {
  constructor(
    private templateRef: TemplateRef<null>,
    private viewContainerRef: ViewContainerRef
  ) {}

  create() {
    this.viewContainerRef.createEmbeddedView(this.templateRef);
  }

  dispose() {
    this.viewContainerRef.clear();
  }
}

import { Injectable } from "@angular/core";
import { Subject } from "rxjs/internal/Subject";

@Injectable()
export class TabsService {
  deactivateAll = new Subject<boolean>();
}

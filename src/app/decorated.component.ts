import { Component } from "@angular/core";
import { Subject } from "rxjs";
import { scan, startWith } from "rxjs/operators";
import { ReactiveStateComponent, ReactiveState } from "ng-reactive-component";

@ReactiveStateComponent()
@Component({
  selector: "app-root",
  template: `
    <div class="count">{{ state.count }}</div>
    <div class="countLabel">Count</div>
    <button class="decrement" (click)="values$.next(-1)">
      <i class="material-icons">
        remove
      </i>
    </button>
    <button class="increment" (click)="values$.next(+1)">
      <i class="material-icons">
        add
      </i>
    </button>
  `
})
export class AppComponent implements ReactiveState {
  values$ = new Subject<number>();
  state = this.connect({
    count: this.values$.pipe(
      startWith(0),
      scan((count, next) => count + next, 0)
    )
  });

  pushValue(value: number) {
    this.values$.next(value);
  }
}

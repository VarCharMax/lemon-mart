import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
    <div *ngIf="displayLogin">
      <app-login></app-login>
    </div>
    <div *ngIf="!displayLogin">
      <span class="mat-display-3"
        >You get a lemon, you get a lemon, you get a lemon...</span
      >
    </div>
  `,
  styles: [],
})
export class HomeComponent {
  displayLogin = true;
}

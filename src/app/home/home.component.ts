import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
    <div fxLayout="column" fxLayoutAlign="center center">
      <span class="mat-display-2">Hello, Lemonite!</span>
      <button mat-raised-button color="primary" routerLink="/manager">
        Login as Manager
      </button>
    </div>
  `,
  styles: [],
})
export class HomeComponent {}

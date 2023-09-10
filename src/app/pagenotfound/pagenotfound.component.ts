import { Component } from '@angular/core';

@Component({
  selector: 'app-pagenotfound',
  template: `
    <p>
      This page doesn't exist. Go back to
      <a routerLink="/home"></a>.
    </p>
  `,
  styleUrls: ['./pagenotfound.component.scss'],
})
export class PageNotFoundComponent {}

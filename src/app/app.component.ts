import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  template: `
    <mat-toolbar color="primary">
      <button *ngIf="displayAccountIcons" mat-icon-button>
        <mat-icon>menu</mat-icon>
      </button>
      <mat-icon svgIcon="lemon"></mat-icon>
      <a mat-button routerLink="/home"><h1>LemonMart</h1></a>
      <span class="flex-spacer"></span>
      <button
        *ngIf="displayAccountIcons"
        mat-mini-fab
        matTooltip="Profile"
        routerLink="/user/profile">
        <mat-icon>account_circle</mat-icon>
      </button>
      <button
        *ngIf="displayAccountIcons"
        mat-icon-button
        routerLink="/user/logout"
        matTooltip="Logout">
        <mat-icon>lock_open</mat-icon>
      </button>
    </mat-toolbar>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  displayAccountIcons: boolean = false;
  constructor(
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    private authService: AuthService
  ) {
    iconRegistry.addSvgIcon(
      'lemon',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/icons/lemon.svg')
    );
  }
  title = 'lemon-mart';

  ngOnInit(): void {
    this.authService.authStatus.subscribe(
      (authStatus) => (this.displayAccountIcons = authStatus.isAuthenticated)
    );
  }
}

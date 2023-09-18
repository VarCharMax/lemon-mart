import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { MediaObserver } from '@ngbracket/ngx-layout';

import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  template: `
    <div class="app-container">
      <mat-toolbar
        color="primary"
        fxLayoutGap="8px"
        class="app-toolbar"
        [class.app-is-mobile]="media.isActive('xs')">
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
      <mat-sidenav-container class="app-sidenav-container">
        <mat-sidenav
          #sidenav
          [mode]="media.isActive('xs') ? 'over' : 'side'"
          [fixedInViewport]="media.isActive('xs')"
          _
          fixedTopGap="56"
          [(opened)]="opened">
          <app-navigation-menu></app-navigation-menu>
        </mat-sidenav>
        <mat-sidenav-content>
          <router-outlet class="app-container"></router-outlet>
        </mat-sidenav-content>
      </mat-sidenav-container>
    </div>
  `,
  styles: [
    `
      .app-container {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
      }
      .app-is-mobile .app-toolbar {
        position: fixed;
        z-index: 2;
      }
      .app-sidenav-container {
        flex: 1;
      }
      .app-is-mobile .app-sidenav-container {
        flex: 1 0 auto;
      }
      mat-sidenav {
        width: 200px;
      }
    `,
  ],
})
export class AppComponent implements OnInit {
  _displayAccountIcons: boolean = false;
  opened: boolean = true;
  constructor(
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    private authService: AuthService,
    public media: MediaObserver
  ) {
    iconRegistry.addSvgIcon(
      'lemon',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/icons/lemon.svg')
    );
  }
  title = 'lemon-mart';

  ngOnInit(): void {
    this.authService.authStatus.subscribe((authStatus) => {
      setTimeout(() => {
        this._displayAccountIcons = authStatus.isAuthenticated;
      }, 0);
    });
  }

  displayAccountIcons(): boolean {
    return this._displayAccountIcons;
  }
}

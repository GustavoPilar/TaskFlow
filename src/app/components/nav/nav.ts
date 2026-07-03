import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from "primeng/button";
import { Bars } from '@primeicons/angular/bars';
import { Home } from '@primeicons/angular/home';
import { InfoCircle } from '@primeicons/angular/info-circle';
import { DrawerModule } from 'primeng/drawer';

@Component({
  selector: 'app-nav',
  imports: [
    RouterModule,
    ButtonModule,
    Bars,
    Home,
    InfoCircle,
    DrawerModule
  ],
  templateUrl: './nav.html',
  styleUrl: './nav.scss',
})
export class Nav {

  protected readonly visible = signal<boolean>(false);

  openDrawer(): void {
    this.visible.set(true);
  }

  closeDrawer(): void {
    this.visible.set(false);
  }
}
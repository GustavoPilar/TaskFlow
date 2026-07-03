import { Component } from '@angular/core';
import { RouterLink, RouterModule } from "@angular/router";
import { Nav } from "./components/nav/nav";

@Component({
  selector: 'app-root',
  imports: [
    RouterModule,
    RouterLink,
    Nav
],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App { }

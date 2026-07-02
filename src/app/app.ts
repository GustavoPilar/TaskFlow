import { Component } from '@angular/core';
import { RouterLink, RouterModule } from "@angular/router";

@Component({
  selector: 'app-root',
  imports: [
    RouterModule,
    RouterLink
],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App { }

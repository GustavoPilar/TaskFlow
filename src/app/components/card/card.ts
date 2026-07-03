import { Component, input } from '@angular/core';
import { Clock } from "@primeicons/angular/clock";
import { Check } from "@primeicons/angular/check";

@Component({
  selector: 'app-card',
  imports: [
    Clock,
    Check
  ],
  templateUrl: './card.html',
  styleUrl: './card.scss',
})
export class Card {

  readonly value = input.required<number>();
  readonly isPending = input.required<boolean>();

}

import { Component, input, output } from '@angular/core';
import { Task } from '../../models/task';
import { RouterLink } from "@angular/router";
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { ButtonDirective } from "primeng/button";
import { Trash } from "@primeicons/angular/trash";
import { Eye } from "@primeicons/angular/eye";

@Component({
  selector: 'app-task-item',
  imports: [
    RouterLink,
    Trash,
    Eye,
    CheckboxModule,
    FormsModule,
    ButtonDirective
],
  templateUrl: './task-item.html',
  styleUrl: './task-item.scss',
})
export class TaskItem {

  readonly task = input.required<Task>();

  readonly toggleCompleted = output<Task>();

  readonly deleteTask = output<string>();

  protected onToggle(): void {
    this.toggleCompleted.emit(this.task());
  }

  protected onDelete(): void {
    this.deleteTask.emit(this.task().id);
  }

}

import { Component, computed, inject, input } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { RouterLink } from "@angular/router";
import { ButtonModule } from "primeng/button";
import { AngleLeft } from "@primeicons/angular/angle-left";
import { Check } from "@primeicons/angular/check";
import { Clock } from "@primeicons/angular/clock";
import { FileEdit } from "@primeicons/angular/file-edit";
import { DividerModule } from "primeng/divider";

@Component({
  selector: 'app-task-detail',
  imports: [
    RouterLink,
    ButtonModule,
    AngleLeft,
    Check,
    Clock,
    FileEdit,
    DividerModule
  ],
  templateUrl: './task-detail.html',
  styleUrl: './task-detail.scss',
})
export class TaskDetail {
  private readonly taskService = inject(TaskService);

  readonly id = input.required<string>();

  protected readonly task = computed(() =>
    this.taskService.tasks().find((task) => task.id === this.id())
  );

}

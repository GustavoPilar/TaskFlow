import { Component, computed, inject, input } from '@angular/core';
import { TaskService } from '../services/task.service';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-task-detail',
  imports: [RouterLink],
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

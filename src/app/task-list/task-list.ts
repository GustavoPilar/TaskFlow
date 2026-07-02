import { Component, computed, effect, inject, signal } from '@angular/core';
import { TaskItem } from '../task-item/task-item';
import { toSignal } from '@angular/core/rxjs-interop';
import { Subject, map, debounceTime, distinctUntilChanged } from 'rxjs';
import { Task } from '../models/task';
import { TaskService } from '../services/task.service';
import { TaskForm } from "../task-form/task-form";

@Component({
  selector: 'app-task-list',
  imports: [
    TaskItem,
    TaskForm
],
  templateUrl: './task-list.html',
  styleUrl: './task-list.scss',
})
export class TaskList {

  // Properties

  protected readonly taskService = inject(TaskService);

  private readonly searchTermSubject$ = new Subject<string>(); // Avança com o valor

  private readonly searchTerm$ = this.searchTermSubject$.pipe(
    map((term) => term.trim().toLowerCase()),
    debounceTime(300),
    distinctUntilChanged()
  );

  protected readonly searchTerm = toSignal(this.searchTerm$, { initialValue: "" });

  protected readonly filteredTasks = computed(() =>
    this.taskService.tasks().filter(x =>
      x.name
        .toLowerCase()
        .includes(
          this.searchTerm()
        )
    )
  );

  protected readonly filterdTasksEffect = effect(() => {
    if (this.filteredTasks().length === 0 && this.searchTerm().trim().length > 0)
      console.log(`Nenhum resultado para: ${this.searchTerm()}`)
  })

  // Methods

  searchTermInput(event: Event): void {
    this.searchTermSubject$.next((event.target as HTMLInputElement).value);
  }

  toggleComplete(task: Task): void {
    this.taskService.toggleComplete(task);
  }

  deleteTask(taskId: string): void {
    this.taskService.deleteTask(taskId);
  }

}

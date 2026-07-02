import { computed, effect, inject, Service, signal } from '@angular/core';
import { Task } from '../models/task';
import { HttpClient, httpResource } from '@angular/common/http';

@Service()
export class TaskService {

  private readonly url = "http://localhost:3000/tasks";
  private readonly http = inject(HttpClient);
  private readonly tasksSignal = httpResource<Task[]>(() => this.url);
  protected readonly completedCount = computed(() => this.tasksSignal.value()?.filter(x => x.completed).length ?? 0);
  protected readonly pendingCount = computed(() => this.tasksSignal.value()?.filter(x => !x.completed).length ?? 0);

  readonly error = this.tasksSignal.error;
  readonly isLoading = this.tasksSignal.isLoading;
  readonly tasks = computed(() => this.tasksSignal.value() ?? []);
  readonly pendingLabel = computed(() => `${this.pendingCount()} pendente(s), ${this.completedCount()} completa(s)`);

  addTask(name: string): void {
    this.http.post(this.url, { name, completed: false })
    .subscribe(() => this.tasksSignal.reload());
  }

  deleteTask(taskId: string): void {
    this.http.delete(`${this.url}/${taskId}`)
    .subscribe(() => this.tasksSignal.reload());
  }

  toggleComplete(task: Task): void {
    this.http.put(`${this.url}/${task.id}`, { ...task, completed: !task.completed })
    .subscribe(() => this.tasksSignal.reload());
  }

}

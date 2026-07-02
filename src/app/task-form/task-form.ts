import { Component, inject, signal } from '@angular/core';
import { form, FormField, minLength, required, submit, validate } from '@angular/forms/signals';
import { TaskService } from '../services/task.service';

export interface TaskNewModel {
  name: string;
}

@Component({
  selector: 'app-task-form',
  imports: [
    FormField
  ],
  templateUrl: './task-form.html',
  styleUrl: './task-form.scss',
})
export class TaskForm {

  private readonly taskService = inject(TaskService);

  protected readonly taskModel = signal<TaskNewModel>({ name: "" });

  protected readonly taskForm = form(this.taskModel, (schemaPath) => {
    required(schemaPath.name, { message: "Nome obrigatório." });
    minLength(schemaPath.name, 3, { message: "Mínimo de 3 caracteres." });
    validate(schemaPath.name, ({value}) => {
      const name = value()

      if (this.taskService.tasks().some(x => x.name.toLowerCase() === name.toLowerCase().trim()))
        return { kind: "duplicateName", message: `O nome "${name}" já existente.` }

      return null;
    });
  });

  async onSubmit(): Promise<void> {
    await submit(this.taskForm, async () => {
      this.taskService.addTask(this.taskModel().name);
      this.taskModel.set({ name: "" });
    });
  }

}

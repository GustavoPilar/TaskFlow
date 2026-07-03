import { Component, inject, signal } from '@angular/core';
import { form, FormField, minLength, required, submit, validate } from '@angular/forms/signals';
import { TaskService } from '../../services/task.service';
import { Save } from "@primeicons/angular/save";
import { Plus } from "@primeicons/angular/plus";
import { InputTextModule } from "primeng/inputtext";
import { MessageModule } from "primeng/message";
import { ButtonDirective } from "primeng/button";
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';

export interface TaskNewModel {
  name: string;
  description: string;
}

@Component({
  selector: 'app-task-form',
  imports: [
    FormField,
    Save,
    Plus,
    InputTextModule,
    MessageModule,
    ButtonDirective,
    IconFieldModule,
    InputIconModule
],
  templateUrl: './task-form.html',
  styleUrl: './task-form.scss',
})
export class TaskForm {

  private readonly taskService = inject(TaskService);

  protected readonly taskModel = signal<TaskNewModel>({ name: "", description: "" });

  protected readonly taskForm = form(this.taskModel, (schemaPath) => {
    required(schemaPath.name, { message: "Nome obrigatório." });
    minLength(schemaPath.name, 3, { message: "Mínimo de 3 caracteres." });
    validate(schemaPath.name, ({value}) => {
      const name = value()

      if (this.taskService.tasks().some(x => x.name.toLowerCase() === name.toLowerCase().trim()))
        return { kind: "duplicateName", message: `O nome "${name}" já existente.` }

      return null;
    });

    required(schemaPath.description, { message: "Descrição obrigatória" }),
    minLength(schemaPath.description, 10, { message: "Mínimo de 10 caracteres." })
  });

  async onSubmit(): Promise<void> {
    await submit(this.taskForm, async () => {
      this.taskService.addTask(this.taskModel());
      this.taskModel.set({ name: "", description: "" });
    });
  }

}

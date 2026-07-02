import { Routes } from '@angular/router';
import { taskExistsGuard } from './task-exists-guard';

export const routes: Routes = [
  { path: "", loadComponent: () => import("./task-list/task-list").then(tl => tl.TaskList) },

  { path: "tasks/:id", loadComponent: () => import("./task-detail/task-detail").then(td => td.TaskDetail), canActivate: [taskExistsGuard]},
  { path: "about", loadComponent: () => import("./about/about").then(ab => ab.About) },
  { path: "**", redirectTo: "" }
];

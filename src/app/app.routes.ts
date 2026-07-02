import { Routes } from '@angular/router';
import { taskExistsGuard } from './task-exists-guard';

export const routes: Routes = [
  { path: "", loadComponent: () => import("./pages/task-list/task-list").then(tl => tl.TaskList) },

  { path: "tasks/:id", loadComponent: () => import("./pages/task-detail/task-detail").then(td => td.TaskDetail), canActivate: [taskExistsGuard]},
  { path: "about", loadComponent: () => import("./pages/about/about").then(ab => ab.About) },
  { path: "**", redirectTo: "" }
];

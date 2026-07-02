import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TaskService } from './services/task.service';

export const taskExistsGuard: CanActivateFn = (route, state) => {
  const taskService = inject(TaskService);
  const router = inject(Router);

  const id = route.paramMap.get("id");
  const exits = taskService.tasks().some(x => x.id === id);

  return exits ? true : router.createUrlTree(["/"]);
};

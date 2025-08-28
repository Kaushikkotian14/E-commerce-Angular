import { CanActivateFn,Router } from '@angular/router';
import { Inject } from '@angular/core';


export const authGuard: CanActivateFn = () => {
 const router = Inject(Router);


  if (localStorage.getItem('access')) {
    return true;
  }

  router.navigate(['/login']);
  return false;
};

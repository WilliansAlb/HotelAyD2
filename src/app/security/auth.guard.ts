import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = new Router();
  var token = localStorage.getItem("jwt");
  if (token) {
	if (state.url.includes("/auth/")){
		router.navigate(['reception/rooms']);
		return false;
	}
	return true
  } else {
	if (state.url.includes("/auth/")){
		return true;
	} else {
		router.navigate(['auth/login']);
		return false;
	}
  }
};
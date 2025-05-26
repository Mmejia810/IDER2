import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

// Aquí debes importar tu servicio de autenticación para validar si el usuario está logueado
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate():
    boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    if (this.authService.isLoggedIn()) {
      // Si está logueado, permite acceso
      return true;
    } else {
      // Si no está logueado, redirige al login
      return this.router.createUrlTree(['/login']);
    }
  }
}

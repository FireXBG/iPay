import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {catchError, Observable, of} from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(private http: HttpClient, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    let token = localStorage.getItem('token');
    if(token === null) {
      this.router.navigate(['/login']);
    }

    const isValid = this.http.post('http://localhost:3001/auth/validate', { token }).pipe(
      map((res: any) => {
        return !!res.success;
      }),
        catchError((error: any) => {
          console.error(error);
          this.router.navigate(['/login']);
          return of(false);
        })
    )
    return isValid;
  }
}

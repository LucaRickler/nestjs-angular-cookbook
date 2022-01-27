import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, Observer, tap } from 'rxjs';
import { Router } from '@angular/router';
import { ErrorService } from '../../shared/services/error/error.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private _observer: Observer<HttpEvent<unknown>> = {
    next: () => { },
    complete: () => { },
    error: err => {
      if (err instanceof HttpErrorResponse) {
        if (err.status !== 401) {
          return;
        }
        this.router.navigate(['login']);
      }
    }
  }

  constructor(
    private router: Router,
    private errorService: ErrorService,
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const jwtToken = localStorage.getItem("access_token");

    if (jwtToken) {
      const cloned = request.clone({
        headers: request.headers.set("Authorization", "Bearer " + jwtToken),
      });

      return next.handle(cloned).pipe(tap(this._observer));
    }
    else {
      return next.handle(request).pipe(tap(this._observer));
    }
  }
}

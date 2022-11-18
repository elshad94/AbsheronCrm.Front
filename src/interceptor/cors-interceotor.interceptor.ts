import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { catchError, Observable, of, tap,pipe } from 'rxjs';


@Injectable()
export class CorsInterceptorInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    request = request.clone({
      headers: request.headers
        // .set('Authorization', `Bearer ${localStorage.getItem('token')}`)
        .set('Access-Control-Allow-Origin', '*')
        .set('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT')
    });
    return next.handle(request).pipe(
      catchError(err => {
        if(err.status === 401) {
             console.log(" test ")
          return of(err);
        }
        else
          // console.log(" err "+err);
        throw err;
      }))
    }}

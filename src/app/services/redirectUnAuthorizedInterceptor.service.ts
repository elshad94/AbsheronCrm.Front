import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpResponse, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, of, tap } from 'rxjs';
import logger from 'src/utils/logger';
import { errorAlert } from 'src/utils/alerts';
import { Router } from '@angular/router';

@Injectable()
export class RedirectUnauthorizedInterceptor implements HttpInterceptor {
    constructor(private router: Router) {}

    intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        httpRequest = httpRequest.clone({
            headers: httpRequest.headers
                .set('Authorization', `Bearer ${localStorage.getItem('token')}`)
                .set('Access-Control-Allow-Origin', '*')
                .set('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT')
        });
        return next.handle(httpRequest).pipe(
            catchError(err => {
                if(err.status === 401) {
                    errorAlert('Login sehifesinden daxil olun!', 'Unauthorized').then(res => {
                        this.router.navigate(['']);
                    });
                    return of(err);
                }
                throw err;
            })
        );
    }
}

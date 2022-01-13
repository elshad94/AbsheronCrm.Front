import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { SpinnerService } from 'src/app/services/spinner.service';
import { finalize } from 'rxjs/dist/types/operators';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {

  constructor(public spinner: SpinnerService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.spinner.show()
    return next.handle(request).pipe(
      finalize(() => this.spinner.hide())
    );
  }
}

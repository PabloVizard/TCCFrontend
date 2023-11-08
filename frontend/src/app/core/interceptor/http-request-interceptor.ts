
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {catchError, finalize, map, tap} from 'rxjs/operators'
import { LoadingService } from 'src/app/shared/services/loading.service';

@Injectable()
export class HttpLoadingInterceptor implements HttpInterceptor {
  constructor(private loading: LoadingService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.loading.setLoading(true, request.url);

    return next
      .handle(request)
      .pipe(finalize(() => this.loading.setLoading(false, request.url)));
  }
}
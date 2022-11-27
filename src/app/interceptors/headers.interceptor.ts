import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpHeaders
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';


@Injectable()
export class HeadersInterceptor implements HttpInterceptor {
  headers: HttpHeaders;
  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
  const token = localStorage.getItem('data');
  console.log(token)
  const headers = { headers: new HttpHeaders({ 'Content-Type': 'my-required-content-type' }) }

    console.log(request.body)

    return next.handle(request.clone({
      headers: this.headers
    }))
    .pipe(
      tap(event => {
        if(event instanceof HttpResponse){
          event.headers.append("Access-Control-Allow-Origin", "http://localhost:4200");
          event.headers.append("Access-Control-Allow-Credentials", "true");
          event.headers.append("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
          event.headers.append("Access-Control-Allow-Origin", "http://localhost:4200");
        }
      })
    );
  }
}

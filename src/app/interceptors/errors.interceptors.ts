import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from "rxjs/operators";
import {ToastrService} from "ngx-toastr";
import { Routes, RouterModule, Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private toastrs: ToastrService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
     return next.handle(request)
           .pipe(
                 catchError((error: HttpErrorResponse) => {
                    let errorMsg = '';
                    if (error.error instanceof ErrorEvent) {
                       console.log('This is client side error');
                       errorMsg = `An error occurred: ${error.error.message}`;
                    } else {
                        switch (error.error.code) {
                            case 400:
                                errorMsg = "Bad Request.";
                              break;
                            case 401:
                                errorMsg = "Wrong password or email!";
                              break;
                            case 403:
                                errorMsg = "You don't have permission to access the requested resource.";
                              break;
                            case 404:
                                errorMsg = "The requested resource does not exist.";
                              break;
                            case 412:
                                errorMsg = "Precondition Failed.";
                              break;
                            case 500:
                                errorMsg = "Internal Server Error.";
                              break;
                            case 503:
                                errorMsg = "The requested service is not available.";
                              break;
                            case 422:
                                errorMsg = "Validation Error!";
                              break;
                            case 409:
                                errorMsg = "Email already exists!"
                                break;
                            default:
                                errorMsg = "Something went wrong!";
                          }
                    }
                    if(errorMsg){
                    console.log(errorMsg);
                    this.toastrs.error(errorMsg)
                    return throwError(errorMsg)
                    }
                 })
           )
  }
}
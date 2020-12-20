import {
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
  } from '@angular/common/http';
  import { Injectable } from '@angular/core';
  import { exhaustMap, take } from 'rxjs/operators';
  import { AuthService } from '../services/auth.service';
  
  @Injectable()
  
  export class AuthInterceptor implements HttpInterceptor {
    constructor(private authservice: AuthService) {}
    intercept(req: HttpRequest<any>, next: HttpHandler) {
      return this.authservice.user.pipe(
        take(1),
        exhaustMap((user) => {
          if (!user) {
            return next.handle(req);
          }
          const authorizationRequest = req.clone({
            headers: req.headers.append('authorization', `Bearer ${user.token}`),
          });
  
          return next.handle(authorizationRequest);
        })
      );
    }
  }
  
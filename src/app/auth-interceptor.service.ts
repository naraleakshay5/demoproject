import {
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  cookieValue: any;
  userData: any;
  constructor(private _cookieService: CookieService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = this._cookieService.get('token');
    // this.userData =JSON.parse( this.cookieValue.data)

    if (!req.url.includes('/v1/user/login') && token) {
      const newReq = req.clone({
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      });

      return next.handle(newReq);
    } else {
      return next.handle(req);
    }
  }
}

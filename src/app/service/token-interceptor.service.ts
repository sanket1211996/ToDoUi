import { Injectable, Injector  } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from "src/app/service/auth.service";
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private injector: Injector, private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    let authService = this.injector.get(AuthService);

    if(!authService.isLoggedIn()) {
      this.router.navigate(['/']);
      return next.handle(req);
    }

    let tokenizedReq = req.clone({
      setHeaders: {
        Authorization:  authService.getToken()
      }
    });

    return next.handle(tokenizedReq);

  }
}

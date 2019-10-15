import { Injectable } from '@angular/core';
import {
    HttpInterceptor, HttpHandler, HttpRequest
} 
from '@angular/common/http';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const authToken = localStorage.getItem("token");

        const authReq = req.clone({
            setHeaders: { Authorization: `JWT ${authToken}` } 
        });
        return next.handle( authReq );
    }
}
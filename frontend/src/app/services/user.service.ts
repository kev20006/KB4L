import { Injectable, isDevMode, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import * as moment from 'moment';
import { BehaviorSubject, throwError } from 'rxjs';
import { ApiService } from './api-service.service';
import { retry, catchError } from 'rxjs/operators';

import { subscription } from '../interfaces/interfaces'



@Injectable()
export class UserService implements OnInit {
  
  private urlPrefix: string = ''

  private _username: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private _token: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private _tokenExpires: BehaviorSubject<Date> = new BehaviorSubject<Date>(null);
  private _errors: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private _subscription: BehaviorSubject<subscription> = new BehaviorSubject<subscription>(null);

  readonly username$ = this._username.asObservable();
  readonly token$ = this._token.asObservable();
  readonly tokenExpires$ = this._tokenExpires.asObservable();
  readonly errors$ = this._errors.asObservable();
  readonly subscription$ = this._subscription.asObservable();

  get username(): string {
    return this._username.getValue();
  }

  set username(value: string) {
    this._username.next(value);
  }

  get token(): string {
    return this._token.getValue();
  }

  set token(value: string) {
    this._token.next(value);
  }

  get tokenExpires(): Date {
    return this._tokenExpires.getValue();
  }

  set tokenExpires(value: Date) {
    this._tokenExpires.next(value);
  }

  get errors(): string {
    return this._errors.getValue();
  }

  set errors(value: string) {
    this._errors.next(value);
  }

  get subscription(): subscription {
    return this._subscription.getValue();
  }

  set subscription(value: subscription) {
    this._subscription.next(value);
  }

  //http options for API calls
  private httpOptions: any;
  //the JWT token
  public tokenDecoded: any;

  constructor(private http: HttpClient, private api: ApiService, private router: Router) {
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    this.token = localStorage.token ? localStorage.token : null;
    this.tokenDecoded = localStorage.token ? this.decodeToken(this.token) : null;
    this.username = localStorage.token ? this.tokenDecoded.username : null;
    this.tokenExpires = localStorage.tokenExpires ? new Date(Date.parse(localStorage.tokenExpires)) : null;
  }

  ngOnInit(): void {
    if (isDevMode()) {
      this.urlPrefix = 'http://localhost:8000/'
    }
  }

  public login(user) {
    this.http
      .post(`${this.urlPrefix}api/api-token-auth/`, JSON.stringify(user), this.httpOptions)
      .pipe(retry(1), catchError(this.handleError))
      .subscribe(
        (response: any) => {
          this.updateData(response['token']);
          this.router.navigate(['my-boards']);
          this.errors = 'logged-in';
        },
        err => {
          this.errors = 'invalid-request';
        }
      );
  }

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      this.errors = 'invalid-request';
    }
    return throwError(errorMessage);
  }

  public refreshToken() {
    this.http
      .post(`${this.urlPrefix}api/api-token-refresh/`, JSON.stringify({ token: this.token }), this.httpOptions)
      .subscribe(
        data => {
          this.updateData(data['token']);
        },
        err => {
          this.errors = err['error'];
        }
      );
  }

  public logout() {
    this.token = null;
    this.tokenExpires = null;
    this.username = null;
    localStorage.removeItem('tokenExpires');
    localStorage.removeItem('token');
    this.router.navigate(['']);
  }

  public tokenLogin() {
    this.updateData(localStorage.token);
  }

  private updateData(token) {
    this.token = token;
    this.errors = '';

    // decode the token to read the username and expiration timestamp
    this.tokenDecoded = this.decodeToken(token);
    this.username = this.tokenDecoded.username;
    this.tokenExpires = new Date(this.tokenDecoded.exp * 1000);
    localStorage.setItem('token', this.token);
    localStorage.setItem('tokenExpires', `${this.tokenExpires}`);
    this.getSubscription( this.username );
  }

  public isLoggedIn() {
    try {
      return moment().isBefore(this.tokenExpires);
    } catch {
      return false;
    }
  }

  public isLoggedOut() {
    return !this.isLoggedIn();
  }

  private decodeToken(token) {
    const tokenParts = token.split(/\./);
    const tokenDecoded = JSON.parse(window.atob(tokenParts[1]));
    return tokenDecoded;
  }

  public verify() {
    this.http
      .post(`${this.urlPrefix}api/api-token-verify/`, JSON.stringify({ token: this.token }), this.httpOptions)
      .subscribe(
        data => {
          // do nothing
        },
        err => {
          this.errors = err['error'];
        }
      );
  }

  public createUser(user: any, boardCode: string) {
    let tmpPassword = user.password;
    this.api.postUser(user).subscribe(data => {
      if (!data.error) {
        this.login({
          username: data.username,
          password: tmpPassword,
        });
        if (boardCode) {
          this.api
            .postMemberByBoard({
              user_id: data.id,
              board_code: boardCode,
            })
            .subscribe(res => {
              if (!res.error) {
                this.router.navigate(['my-boards']);
                this.errors = 'user-added-successfully';
              } else {
                this.errors = 'could-not-add-user';
              }
            });
        } else {
          this.router.navigate(['my-boards']);
          this.errors = 'user-added-successfully';
        }
      } else {
        this.errors = 'could-not-add-user';
      }
    });
  }

  public getSubscription(username:string){
    this.api.getSubByUser(username).subscribe(data => {
        this.subscription = data
    })
  }

  public updateSubscription(username: string, data: subscription){
    this.api.updateSubByUser(username, data).subscribe(data => {
        this.subscription = data;
    });
  }
}
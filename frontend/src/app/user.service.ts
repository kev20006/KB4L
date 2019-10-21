import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as moment from 'moment';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from './api-service.service';


@Injectable()
export class UserService {

    private _username: BehaviorSubject<string> = new BehaviorSubject<string>("");
    private _token: BehaviorSubject<string> = new BehaviorSubject<string>("");
    private _tokenExpires: BehaviorSubject<Date> = new BehaviorSubject<Date>(null);

    readonly username$ = this._username.asObservable();
    readonly token$ = this._token.asObservable();
    readonly tokenExpires$ = this._tokenExpires.asObservable();

    get username(): string {
        return this._username.getValue();
    }

    set username(value:string){
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
    //http options for API calls
    private httpOptions: any;
    //the JWT token
    public tokenDecoded: any;
   

    public errors: any = [];

    constructor(private http: HttpClient, private api: ApiService){
        this.httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        };
        this.token = localStorage.token ? localStorage.token : null;
        this.tokenDecoded = localStorage.token ? this.decodeToken(this.token) : null;
        this.username = localStorage.token ? this.tokenDecoded.username: null;
        this.tokenExpires = localStorage.tokenExpires ? new Date(Date.parse(localStorage.tokenExpires)) : null;
    }

    public login(user){
        this.http.post('http://localhost:8000/api-token-auth/', JSON.stringify(user), this.httpOptions).subscribe(
           data => {
               this.updateData(data['token']);
           },
           err => {
               this.errors = err['error']
           }
        );
    }

    public refreshToken(){
        this.http.post('http://localhost:8000/api-token-refresh/', JSON.stringify({ token: this.token }), this.httpOptions).subscribe(
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
    }

    public tokenLogin(){
        this.updateData(localStorage.token)
    }

    private updateData(token) {
        this.token = token;
        this.errors = [];

        // decode the token to read the username and expiration timestamp
        this.tokenDecoded = this.decodeToken(token)
        this.username = this.tokenDecoded.username
        this.tokenExpires = new Date(this.tokenDecoded.exp * 1000);
        console.log(this.tokenDecoded)
        localStorage.setItem('token', this.token);
        localStorage.setItem('tokenExpires', `${this.tokenExpires}`)
    }

    public isLoggedIn(){
        try{
            return moment().isBefore(this.tokenExpires)
        }
        catch{
            return false;
        }
       
    }

    public isLoggedOut(){
        return !this.isLoggedIn()
    }

    private decodeToken(token) {
        const tokenParts = token.split(/\./);
        const tokenDecoded = JSON.parse(window.atob(tokenParts[1]));
        return tokenDecoded;
    }

    public verify() {
        this.http.post('http://localhost:8000/api-token-verify/', JSON.stringify({ token: this.token }), this.httpOptions).subscribe(
            data => {
                console.log(data)
            },
            err => {
                this.errors = err['error'];
            }
        );
    }

    public createUser(user: any){
        let tmpPassword = user.password
        this.api.postUser(user).subscribe(
            data => {
                this.login({
                    username: data.username,
                    password: tmpPassword
                })
            }
        )
    }
}
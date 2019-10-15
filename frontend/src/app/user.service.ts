import { Injectable, ModuleWithComponentFactories, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as moment from 'moment';


@Injectable()
export class UserService {

    //http options for API calls
    private httpOptions: any;

    //the JWT token
    public token: string;
    public tokenDecoded: any;
    //token expiration date
    public tokenExpires: Date;

    // the username of the logged in user
    public username: string;

    public errors: any = [];

    constructor(private http: HttpClient){
        this.httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        };
        this.token = localStorage.token ? localStorage.token : null;
        this.tokenDecoded = localStorage.token ? this.decodeToken(this.token) : null;
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
        localStorage.removeItem('token_expires');
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
 
        this.tokenExpires = new Date(this.tokenDecoded.exp * 1000);

        localStorage.setItem('token', this.token);
        localStorage.setItem('tokenExpires', `${this.tokenExpires}`)
    }

    public isLoggedIn(){
        return moment().isBefore(this.tokenExpires)
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
}
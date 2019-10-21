import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from './user.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(public userService: UserService) { }
  
  canActivate(): boolean {
    console.log("guardinng!!")
    if(this.userService.isLoggedIn()){
      return true;
    }
    else return false;
  }
}

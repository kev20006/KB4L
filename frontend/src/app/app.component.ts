import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';

interface User{
  username: String,
  password: String
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  public user: User;
  constructor(private userService: UserService){}

  ngOnInit(){
    if (localStorage.token && this.userService.isLoggedIn()){
      console.log("i made it here 1")
      this.userService.tokenLogin()
    }
    else{
      this.user = {
        username: '',
        password: ''
      };
    }
    
    
  }

  login(){
    this.userService.login({
      'username': this.user.username,
      'password': this.user.password
    })
  }
  
  refreshToken(){
    this.userService.refreshToken()
  }

  logout(){
    this.userService.logout();
  }
}

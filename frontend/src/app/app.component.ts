import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  public user: any;
  public US: UserService;
  constructor(private userService: UserService){}

  ngOnInit(){
    this.US = this.userService
    this.user = {
      username: '',
      password: ''
    };
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

import { Component, OnInit } from '@angular/core';

import { UserService } from '../user.service'

@Component({
  selector: 'app-login-test',
  templateUrl: './login-test.component.html',
  styleUrls: ['./login-test.component.scss']
})
export class LoginTestComponent implements OnInit {

  private username: string
  private password: string
  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  login(){
    this.userService.login({username: this.username, password: this.password})
  }
}

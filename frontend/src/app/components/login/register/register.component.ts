import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  
  public username: string;
  public password: string;
  public password2: string;
  public email: string;
  private board_code: string = null

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route
      .queryParams
      .subscribe(params => {
        this.email = params['email']
        this.board_code = params['board_code']
        console.log(this.board_code)
      })
  }

  passwordMatch(){
    return this.password === this.password2
  }

  passwordBlank(){
    return this.username === "" && this.password === ""
  }

  passwordValid(){
    return (/^[a-zA-Z]\w{3,14}$/).test(this.password)
  }
  //The password's first character must be a letter, 
  //it must contain at least 4 characters and no more than 15 characters and no characters other than letters, 
  //numbers and the underscore may be used


  usernameIsOriginal(){
    return true;
  }

  formValid(){
    return this.usernameIsOriginal() && this.passwordMatch() && !this.passwordBlank() && this.passwordValid();
  }

  register(){
    this.userService.createUser({
      username: this.username,
      password: this.password,
      email: this.email
    }, this.board_code)
  }
}

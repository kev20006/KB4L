import { Component, OnInit } from '@angular/core';
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

  constructor(private userService: UserService) { }

  ngOnInit() {
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
    })
  }
}

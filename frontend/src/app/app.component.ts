import { Component, OnInit } from '@angular/core';


import { UserService } from './user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public username: string;
  constructor( private userService: UserService ) { }

  ngOnInit(){
    console.log(this.userService.isLoggedIn())
    this.userService.username$.subscribe(
      data => this.username = data
    );
  }
  
  logout(){
    this.userService.logout();
  }
}

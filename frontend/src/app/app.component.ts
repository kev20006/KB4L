import { Component, OnInit } from '@angular/core';


import { UserService } from './services/user.service';
import { BoardService } from './services/board-service.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private menuOpen: boolean = false;
  public username: string;
  constructor( 
    private userService: UserService, 
    private boardService: BoardService) { }

  ngOnInit(){
    this.userService.username$.subscribe(
      data => this.username = data
    );
  }
  
  logout(){
    this.userService.logout();
  }

  showMenu(){
    this.menuOpen = true;
  }

  close(event){
    if (event.target.id === "menu-button" || event.target.parentNode.parentNode.id === "menu-button"){
      this.showMenu()
    }
    else{
      this.menuOpen = false;
    }
  }
}

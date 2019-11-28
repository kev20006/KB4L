import { Component, OnInit } from '@angular/core';


import { UserService } from './services/user.service';
import { BoardService } from './services/board-service.service';
import { board } from './interfaces/interfaces';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public menuOpen: boolean = false;
  public username: string;
  constructor( 
    public userService: UserService, 
    public boardService: BoardService) { }

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

  switchBoard(board: board){
    this.boardService.currentBoard.next(board);
    this.menuOpen = false;
  }
}

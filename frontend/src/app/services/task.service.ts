import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { BoardService } from './board-service.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(
    private userService: UserService,
    private boardService: BoardService) { }

  isAdmin() {
    return this.boardService.memberList.some(element => {
      return element.username === this.userService.username && element.is_admin
    })
  }
}

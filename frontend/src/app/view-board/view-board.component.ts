import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

import { BoardService } from '../board-service.service';
import { task, board, taskList } from '../interfaces/interfaces'
import { Observable, BehaviorSubject } from 'rxjs';


@Component({
  selector: 'app-view-board',
  templateUrl: './view-board.component.html',
  styleUrls: ['./view-board.component.scss']
})
export class ViewBoardComponent implements OnInit {
  


  private route: string;
  private board: board;
 

  constructor(private boardService: BoardService, private router: Router) {}
 
  ngOnInit() {
    console.log(this.boardService)
    this.route = this.router.url.split('/')[2]
    this.boardService.setBoardByUrl(this.route)
    this.boardService.currentBoard$.subscribe(data => this.board = data ) 
  }

  testAdd(){
    console.log("add")
    this.boardService.addTask();
  }

  drop(event: CdkDragDrop<any>){
    let status = ""
    switch (event.container.id){
      case "todo":
        status = "1";
        break;
      case "inProgress":
        status = "2";
        break;
      case "completed":
        status = "3";
        break;
    }
    event.previousContainer.data[event.previousIndex].status = status
    console.log(event.previousContainer.data[event.previousIndex])
    this.boardService.updateTasksStatus(event.previousContainer.data[event.previousIndex])
  }
}

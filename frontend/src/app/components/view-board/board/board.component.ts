import { Component, OnInit } from '@angular/core';
import { BoardService } from 'src/app/services/board-service.service';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  constructor(
    private boardService: BoardService
  ) { }

  ngOnInit() {
  }

  drop(event: CdkDragDrop<any>) {
    let status = ""
    switch (event.container.id) {
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
    this.boardService.updateTasksStatus(event.previousContainer.data[event.previousIndex])
  }

}

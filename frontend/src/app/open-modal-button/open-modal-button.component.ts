import { Component, Inject, Input, TemplateRef } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { task, board } from '../interfaces/interfaces'
import { BoardService } from '../board-service.service'

@Component({
  selector: 'app-open-modal-button',
  templateUrl: './open-modal-button.component.html',
  styleUrls: ['./open-modal-button.component.scss']
})
export class OpenModalButtonComponent {

  @Input() buttonMessage:string
  @Input() modalTarget: string
  constructor(private dialog: MatDialog, private boardService: BoardService) { }

  private modalStore = {
    "AddNewTaskDialog": {
      "component":AddNewTaskDialog,
      "exitFunction": (result)=>{
        const newTask: task = {
          id: `${Math.ceil(Math.random() * 1000 + 1)}`,
          title: result.title,
          description: result.description,
          points: result.points,
          priority: result.priority,
          status: "1",
          repeat_task: false,
          assigned_to: 0,
          board: this.boardService.getCurrentBoard().id
        };
        this.boardService.addTask(newTask)
      }
    },
    "AddNewBoardDialog": {
      "component": AddNewBoardDialog,
      "exitFunction": (result) => {
        const newBoard: board = {
          id: Math.ceil(Math.random() * 1000 + 1),
          name: result.name,
          board_picture: result.imageUrl,
          description: result.description,
          board_url: result.url,
          joining_code: "placeholder"
        };
        this.boardService.postBoard(newBoard).subscribe(
          result=>this.boardService.addBoard(result)
        );
      }
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(this.modalStore[this.modalTarget].component, {
      width: '60%',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.modalStore[this.modalTarget].exitFunction(result)
      }
      console.log('The dialog was closed');
    });
  }
}

/********************* Add New Task **********************/
@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './templates/add-new-task-template.html',
})

export class AddNewTaskDialog {

  constructor(
    public dialogRef: MatDialogRef<AddNewTaskDialog>,
    @Inject(MAT_DIALOG_DATA) public data: task) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

/********************* Add New Board **********************/
@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './templates/add-new-board-template.html',
})

export class AddNewBoardDialog {

  constructor(
    public dialogRef: MatDialogRef<AddNewBoardDialog>,
    @Inject(MAT_DIALOG_DATA) public data: board) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}


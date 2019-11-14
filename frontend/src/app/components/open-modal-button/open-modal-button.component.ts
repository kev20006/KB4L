import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';


import { task, board } from '../../interfaces/interfaces'
import { BoardService } from '../../services/board-service.service'

@Component({
  selector: 'app-open-modal-button',
  templateUrl: './open-modal-button.component.html',
  styleUrls: ['./open-modal-button.component.scss']
})
export class OpenModalButtonComponent {

  @Input() buttonMessage:string
  @Input() modalTarget: string
  @Input() color: string = "primary"
  constructor(private dialog: MatDialog, private boardService: BoardService) { }

  private modalStore = {
    "AddNewTaskDialog": {
      "component":AddNewTaskDialog,
      "exitFunction": (result)=>{
        const newTask: task = {
          id: `${-Math.ceil(Math.random() * 1000 + 1)}`,
          title: result.title,
          description: result.description,
          points: result.points,
          priority: result.priority,
          status: result.status,
          repeat_task: result.repeat_task ? true : false,
          assigned_to: null,
          board: this.boardService.getCurrentBoard().id
        };
        this.boardService.addTask(newTask)
      }
    },
    "AddNewBoardDialog": {
      "component": AddNewBoardDialog,
      "exitFunction": (result) => {
        const newBoard: board = {
          id: -Math.ceil(Math.random() * 1000 + 1),
          name: result.name,
          board_picture: result.imageUrl,
          description: result.description,
          board_url: result.url,
          joining_code: "placeholder"
        };
        this.boardService.addBoard(newBoard);
      }
    },
    "AddNewMembers": {
      "component": AddNewMembersDialog,
      "exitFunction": (result) => {
        this.boardService.addMembers(result);
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
  templateUrl: './templates/add-new-task-template.html',
  styleUrls: ['./open-modal-button.component.scss']
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
  templateUrl: './templates/add-new-board-template.html',
  styleUrls: ['./open-modal-button.component.scss']
})

export class AddNewBoardDialog {

  constructor(
    public dialogRef: MatDialogRef<AddNewBoardDialog>,
    @Inject(MAT_DIALOG_DATA) public data: board) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

/********************* Add New Members **********************/

@Component({
  templateUrl: './templates/add-new-members-template.html',
  styleUrls: ['./open-modal-button.component.scss']
})

export class AddNewMembersDialog implements OnInit {

  // config for chips
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  
  constructor(
    public boardService: BoardService,
    public dialogRef: MatDialogRef<AddNewMembersDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(){
    this.data.emails = [];
    this.data.boardCode = this.boardService.getCurrentBoard().joining_code
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim()) {
      if (this.validateEmail(event.value)) {
        this.data.emails.push({ value: value, invalid: false });
      } 
      else {
        this.data.emails.push({ value: value, invalid: true });
      }
    }

    if (input) {
      input.value = '';
    }
  }

  remove(email: string): void {
    const index = this.data.emails.indexOf(email);

    if (index >= 0) {
      this.data.emails.splice(index, 1);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  private validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

}
import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';

// import the login and register components
import { LoginTestComponent } from '../login/login-test/login-test.component'
import { RegisterModalComponent } from '../login/register/register.modal.component'

import { task, board } from '../../interfaces/interfaces'
import { BoardService } from '../../services/board-service.service'
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-open-modal-button',
  templateUrl: './open-modal-button.component.html',
  styleUrls: ['./open-modal-button.component.scss']
})
export class OpenModalButtonComponent {

  @Input() buttonMessage: string
  @Input() modalTarget: string
  @Input() color: string = "primary"
  @Input() icon: string = null;

  constructor(
    private dialog: MatDialog,
    private boardService: BoardService,
    private userService: UserService
  ) { }

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
          assigned_to: result.assigned_to,
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
        this.boardService.addBoard(newBoard, this.userService.username);
      }
    },
    "AddNewMembers": {
      "component": AddNewMembersDialog,
      "exitFunction": (result) => {
        this.boardService.addMembers(result);
      }
    },
    "Login": {
      "component": LoginTestComponent
    },
    "Register": {
      "component": RegisterModalComponent
    },
    "paymentOptions":{
      "component": PaymentOptionsDialog
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(this.modalStore[this.modalTarget].component, {
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

export class AddNewTaskDialog implements OnInit {

  private members: string[]
  constructor(
    public dialogRef: MatDialogRef<AddNewTaskDialog>,
    private boardService: BoardService,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: task) { }
    
  ngOnInit(){
    this.members = this.boardService.memberList.map(element =>{
      if (element.username !== this.userService.username){
        return element.username;
      }
    })
  } 

  getPriorityText(priority: string){
    switch (priority){
      case "5": 
        return "High Priority"
      case "4":
        return "Medium High Priority"
      case "3":
        return "Medium Priority"
      case "2":
        return "Low Medium Priority"
      case "1":
        return "Low Priority"

    }
  }

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

@Component({
  templateUrl: './templates/payment-options-template.html',
  styleUrls: ['./open-modal-button.component.scss', './template-styles/payment-options-style.scss'],
})
export class PaymentOptionsDialog {
  constructor(public dialogRef: MatDialogRef<AddNewBoardDialog>, 
    private dialog: MatDialog) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  payment(): void {
    this.dialogRef.close();
    this.dialog.open(CardPaymentDialog, {
      width: '60%',
      data: {},
      panelClass: 'custom-dialog-container'
    });
  }
}

@Component({
  templateUrl: './templates/card-payment-template.html',
  styleUrls: ['./open-modal-button.component.scss'],
})
export class CardPaymentDialog {
  constructor(public dialogRef: MatDialogRef<CardPaymentDialog>) {}
  private paymentSuccessful: boolean = false;
  onNoClick(): void {
    this.dialogRef.close();
  }

  processPayment(cc){
    console.log(cc)
    this.paymentSuccessful = true;
  }
}
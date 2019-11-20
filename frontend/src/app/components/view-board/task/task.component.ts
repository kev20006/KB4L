import { Component, OnInit, Input } from '@angular/core';

import { task } from 'src/app/interfaces/interfaces';
import { BoardService } from 'src/app/services/board-service.service';
import { UserService } from 'src/app/services/user.service';
import { ApiService } from 'src/app/services/api-service.service';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  @Input() task: task;
  private memberList: any[];
  private assignedMember: {username:string, id: number} = {
    username: "",
    id: null
  };
  panelOpenState = false;
  
  constructor(
    private boardService: BoardService,
    private apiService: ApiService,
    private userService: UserService,
    private taskService: TaskService) { }

  ngOnInit() {
    console.log(this.task)
    this.boardService.memberList$.subscribe(data => {
      this.memberList = data
      console.log(this.memberList)
    });
    if (this.task.assigned_to){
      this.apiService.getUserNameById(this.task.assigned_to).subscribe(
        data => this.assignedMember = data
      )
    }
  }

  getPriority(priority: string){
    switch(priority){
      case "1":
        return "Low"
      case "2":
        return "Medium/Low"
      case "3":
        return "Medium"
      case "4":
        return "Medium/High"
      case "5":
        return "High"
    }
  }

  unasign(id: number){
    this.task.assigned_to= null; 
  }

  assignedToCurrentUser(){
    return this.assignedMember.username === this.userService.username
  }

  userAssigned(){
    this.apiService.getIdByUsername(this.assignedMember.username).subscribe(
      data => {
        if(!data.error){
          this.task.assigned_to = data.id
          this.boardService.updateTasksStatus(this.task)
        }
      }
    )
  }

  moveNext(){
    if ( this.task.status === "1" || this.task.status == "2" ){
      this.task.status = `${+this.task.status + 1}`
      this.boardService.updateTasksStatus(this.task)
    }
  }

  movePrev(){
    if (this.task.status === "2" || this.task.status == "3") {
      this.task.status = `${+this.task.status - 1}`
      this.boardService.updateTasksStatus(this.task)
    }
  }

  moveToNextText(){
    switch (this.task.status){
      case "1":
        return "in progress"
      case "2":
        return "done"
      default:
        return null
    }
  }

  moveToPrevText(){
    switch (this.task.status) {
      case "2":
        return "todo" 
      case "3":
        return "in progress"
      default:
        return null
    }
  }
}

import { Component, OnInit, Input } from '@angular/core';

import { task } from 'src/app/interfaces/interfaces';
import { BoardService } from 'src/app/services/board-service.service';
import { UserService } from 'src/app/services/user.service';
import { ApiService } from 'src/app/services/api-service.service';

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
    private apiService: ApiService) { }

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
}

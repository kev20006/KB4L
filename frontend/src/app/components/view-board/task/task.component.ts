import { Component, OnInit, Input } from '@angular/core';

import { task } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  @Input() task: task;
  panelOpenState = false;
  
  constructor() { }

  ngOnInit() {
    console.log(this.task)
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

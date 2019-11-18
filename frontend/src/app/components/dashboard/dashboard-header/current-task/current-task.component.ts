import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-current-task',
  templateUrl: './current-task.component.html',
  styleUrls: ['./current-task.component.scss']
})
export class CurrentTaskComponent implements OnInit {

  @Input() taskData:any
  
  constructor() { }

  ngOnInit() {
    console.log(this.taskData)
  }

}

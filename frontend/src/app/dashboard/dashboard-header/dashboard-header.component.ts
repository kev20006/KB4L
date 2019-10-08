import { Component, OnInit } from '@angular/core';

export interface personalTask {
  taskName: string;
  boardName: string;
  priority: number;
  score: number;
}

const DEMO_DATA: personalTask[] = [
  {
    taskName: "wash the dishes",
    boardName: "testBoard",
    priority: 1,
    score: 5
   },
  {
    taskName: "do some stuff",
    boardName: "board #2",
    priority: 3,
    score: 3
  },
  
];

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: [ './dashboard-header.component.scss' ]
})
export class DashboardHeaderComponent implements OnInit {

  private dataSource: personalTask[] = DEMO_DATA;
  private displayedColumns: string[] = [ "taskName", "boardName", "priority", "score" ]
  constructor() { }

  ngOnInit() {
  }

}

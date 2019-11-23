import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-priority',
  templateUrl: './priority.component.html',
  styleUrls: ['./priority.component.scss']
})
export class PriorityComponent implements OnInit {

  @Input() priority: string
  priorityMap: Object = {
    "5": {
      icon: "arrow_upward",
      color: "red"
    },
    "4": {
      icon: "trending_up",
      color: "orange"
    },
    "3": {
      icon: "trending_flat",
      color: "purple"
    },
    "2": {
      icon: "trending_down",
      color: "blue"
    },
    "1": {
      icon: "arrow_downward",
      color: "green"
    }
  } 

  constructor() { }

  ngOnInit() {

  }

}

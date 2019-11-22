import { Component, OnInit, Input } from '@angular/core';

import { recentActivity } from 'src/app/interfaces/interfaces';
import { DateService } from 'src/app/services/date.service';

@Component({
  selector: 'app-activity-item',
  templateUrl: './activity-item.component.html',
  styleUrls: ['./activity-item.component.scss']
})
export class ActivityItemComponent implements OnInit {

  @Input() recent: recentActivity
  username: string;
  boardname: string;
  message: string;

  constructor(private ds: DateService) { }

  ngOnInit() {
    this.username = this.recent.message.split(":")[1].split(" ")[1];
    this.boardname = this.recent.message.split(":")[0];
    this.message = this.recent.message.split(":")[1].split(" ").map( element => { 
      if(element !== this.username){
        return element
      }
    }).join(" ");
  }

}

import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { ApiService } from 'src/app/services/api-service.service';
import { recentActivity } from '../../../interfaces/interfaces'

@Component({
  selector: 'app-recent-activity',
  templateUrl: './recent-activity.component.html',
  styleUrls: ['./recent-activity.component.scss']
})
export class RecentActivityComponent implements OnInit {

  currentSlice: number = 5;;
  allRecent: recentActivity[] = [];
  mostRecent: recentActivity[] = [];
  constructor(
    public userService: UserService,
    public apiService: ApiService
  ) { }

  ngOnInit() {
    this.apiService.getRecentActivityByUser(this.userService.username).subscribe(
      data => {
        if (data.results){
          this.allRecent = data.results;
          this.mostRecent = this.allRecent.slice(0, 5);
        } 
      } 
    )
  }
}

import { Component, OnInit, Inject } from '@angular/core';

import { UserService } from '../../../services/user.service'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-login-test',
  templateUrl: './login-test.component.html',
  styleUrls: ['./login-test.component.scss']
})
export class LoginTestComponent implements OnInit {
  
  public error: string
  private username: string
  private password: string
  constructor(
    private userService: UserService,
    public dialogRef: MatDialogRef<LoginTestComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.userService.errors$.subscribe(
      data => {
        if (data === "logged-in"){
          this.dialogRef.close();
        }
        this.error = data
      }
    )
  }

  login(){
    this.userService.login({username: this.username, password: this.password})
  }
}

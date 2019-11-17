import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms'
import { UserService } from '../../../services/user.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  
  public regiserUserForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.pattern(/^[a-zA-Z]\w{3,14}$/),
      Validators.required
    ]),
    password2: new FormControl('', [
      Validators.pattern(/^[a-zA-Z]\w{3,14}$/),
      Validators.required,
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ])
  })

  get registerForm(){ return this.regiserUserForm.controls}
  
  private board_code: string = null
  private error: string = ""
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.route
      .queryParams
      .subscribe(params => {
        this.regiserUserForm.controls.email.setValue(params['email'])
        this.board_code = params['board_code']
      })
    this.userService.errors$.subscribe(
      data => {
        this.error = data
      }
    )  
    this.regiserUserForm.setValidators([this.passwordConfirming])
  }

  passwordConfirming(control: AbstractControl): { [key: string]: any } | null {
    const passMatch = control.get("password2").value === control.get("password").value;
    return passMatch ? null : { invalid: true };
  }

  register(){
    this.userService.createUser({
      username: this.registerForm.username.value,
      password: this.registerForm.password.value,
      email: this.registerForm.email.value
    }, this.board_code)
    
  }

  onSubmit() {
    if(this.regiserUserForm.valid){
      this.register
    }
  }
}

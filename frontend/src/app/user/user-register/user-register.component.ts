import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/model/user';
import { UserServiceService } from 'src/app/service/user-service.service';
import * as alertyfy from 'alertifyjs';
import { AlertifyService } from 'src/app/service/alertify.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent implements OnInit {
registrationForm: FormGroup;
user: User;
userSubmitted: boolean;
  constructor(private userService: UserServiceService,
              private alertify: AlertifyService) { }

  // tslint:disable-next-line: typedef
  ngOnInit() {
    this.registrationForm  = new FormGroup({
      userName: new FormControl(null, Validators.required),
      email: new FormControl (null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
      confirmPassword: new FormControl(null, [ Validators.required])
    }, this.passwordMatchingValidator);


  }
  passwordMatchingValidator(fg: FormGroup): Validators{
    return fg.get('password').value === fg.get('confirmPassword').value ? null :
    {notmatched: true };

    }
    // tslint:disable-next-line: typedef
    get userName(){
      return this.registrationForm.get('userName') as FormControl;
    }
    // tslint:disable-next-line: typedef
    get email(){
      return this.registrationForm.get('email') as FormControl;
    }
        // tslint:disable-next-line: typedef
        get   password(){
      return this.registrationForm.get('password') as FormControl;
    }
        // tslint:disable-next-line: typedef
        get confirmPassword(){
      return this.registrationForm.get('confirmPassword') as FormControl;
    }

  // tslint:disable-next-line: typedef
  onSubmit() {
    console.log(this.registrationForm.value);
    this.userSubmitted = true;
    if ( this.registrationForm.valid){
   // this.user = Object.assign(this.user, this.registrationForm.value);
    this.userService.addUser(this.userData());
    this.registrationForm.reset();
    this.userSubmitted = false;
    this.alertify.success('Congrates you have succesfully registered');
    } else{
      this.alertify.error('Kindley provide the required field');
    }
  }
  userData(): User{
    return this.user = {
      userName: this.userName.value,
      // tslint:disable-next-line: whitespace
      email: this.email.value,
      password: this.password.value

    };
  }
  // tslint:disable-next-line: typedef


}

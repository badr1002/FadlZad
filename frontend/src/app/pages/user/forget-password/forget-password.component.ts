import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {

  constructor(private _user: UserService, private route: Router) { }

  ngOnInit(): void { }
  setPass = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    code: new FormControl(),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });
  get email() {
    return this.setPass.get('email');
  }

  get password() {
    return this.setPass.get('password');
  }

  getEmail: any = true;
  sentCode: any = false;
  setNewPass: any = false;
  msg: any;

  handleSubmit() {
    //alert(this.email?.value)
    if (this.email?.valid) {
      this._user.forgetPassword(this.setPass?.value).subscribe(
        (res) => {
          this.sentCode = true;
          this.getEmail = false;
          this.setNewPass = false;
          this.msg = '';
        },
        (e) => (this.msg = e.error.data)
      );
    } else {
      this.msg = 'Invalid email!'
    }
  }

  handleCheckCode() {
    this._user.checkCode(this.setPass.value).subscribe(
      (res) => {
        this.setNewPass = true;
        this.getEmail = false;
        this.sentCode = false;
        this.msg = '';
        localStorage.setItem('token',res.data.token)
      },
      (e) => (this.msg = e.error.msg)
    );
  }

  handleSetPassword() {
    if (this.password?.valid) {
      this._user.setNewPassword(this.setPass.value).subscribe(
        (res) => {
          this.setNewPass = false;
          this.getEmail = true;
          this.sentCode = false;
          this.msg = '';
          let user = res.data._user
          if (res.data._user.role === "adf0c9ad82601330d46ec62a") {
            user = Object.assign({ isAdmin: true }, user);
          }
          delete user.role
          localStorage.setItem("user", JSON.stringify(user))

        },
        (e) => (this.msg = e.error.msg),
        () => this.route.navigateByUrl('/home')
      )
    } else {
      this.msg = "Invalid password!"
    }
  }
}

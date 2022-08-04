import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private _roter: Router, private _userService: UserService) { }

  ngOnInit(): void { }

  login = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(20),
      Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$")
    ])
  });
  get email() {
    return this.login.get('email');
  }
  get password() {
    return this.login.get('password');
  }


  msg: any;
  handleSubmit() {
    if (this.login.valid) {
      this._userService.login(this.login.value).subscribe(res => {
        if (res.apiStatus) {
          localStorage.setItem("token", res.data.token)
          let user = res.data._user
          if (res.data._user.role === "adf0c9ad82601330d46ec62a") {
            user = Object.assign({ isAdmin: true }, user);           
          }  
          delete user.role
          localStorage.setItem("user", JSON.stringify( user))
          this._roter.navigateByUrl('home')
        }
      },
        (err) => {
          this.msg = err.error.data
        }
      )

    }
  }
}

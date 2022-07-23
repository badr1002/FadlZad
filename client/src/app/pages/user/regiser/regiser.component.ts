import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { UserService } from '../user.service';
@Component({
  selector: 'app-register',
  templateUrl: './regiser.component.html',
  styleUrls: ['./regiser.component.scss'],
})
export class RegisterComponent implements OnInit {
  constructor(private _roter: Router,private _userService:UserService) {}

  ngOnInit(): void {}

  register = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(20),
    ]),
    mobile: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
   });

  get name() {
    return this.register.get('name');
  }
  get email() {
    return this.register.get('email');
  }
  get password() {
    return this.register.get('password');
  }
  get mobile() {
    return this.register.get('mobile');
  }
  get gender() {
    return this.register.get('gender');
  }
  
  
  msg: any;
  handleSubmit() {
    if (this.register.valid) {
      this._userService.register(this.register.value).subscribe(res => {
        if (res.apiStatus) {
          this._roter.navigateByUrl('user/login')
        }         
      },
        (err) =>{
          this.msg = err.error.data
        }
      )
    }
    
  }
}

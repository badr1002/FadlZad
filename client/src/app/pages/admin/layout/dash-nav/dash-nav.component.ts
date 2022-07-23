import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/pages/user/user.service';

@Component({
  selector: 'app-dash-nav',
  templateUrl: './dash-nav.component.html',
  styleUrls: ['./dash-nav.component.scss'],
})
export class DashNavComponent implements OnInit {
  counter: number = 0;
  image: any;
  isLogin: boolean = false;
  user: any
  constructor(private _route: Router, private _userService: UserService) {
    this.user = JSON.parse(localStorage.getItem('user'))
  }

  subscription: Subscription;
  shoppingCardCount: number;
  ngAfterViewChecked() {
    this.isLogin = localStorage.getItem('user') ? true : false
    this.image = this._userService.profileImage ? `../../../assets/uploads/profile/${this._userService.profileImage}` : `../../../assets/uploads/profile/avatar.png`
  }

  searchForm = new FormGroup({
    search: new FormControl(''),
  });

  get search_term() {
    return this.searchForm.get('search')?.value;
  }

  handleSearch() {
    if (this.search_term != '') {
      window.location.assign(`/search/${this.search_term}`);
    }
  }
  ngAfterContentChecked() { }
  logout(event: any) {
    event.preventDefault();
    if (confirm('Are you sure to logout!')) {
      this._userService.logout().subscribe((res) => {
        if (res.apiStatus) {
          localStorage.removeItem('user')
          localStorage.removeItem('token')
          this._route.navigateByUrl('user/login')
        }
      })
    }
  }

  ngOnInit(): void { }
}

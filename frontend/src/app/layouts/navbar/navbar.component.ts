import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnChanges, AfterViewChecked, OnInit, AfterContentChecked } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/pages/user/user.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, AfterContentChecked {
  counter: number = 0;
  user: any
  constructor(private _route: Router, private _userService: UserService, private translate: TranslateService) {
    this.user = JSON.parse(localStorage.getItem('user'))
  }

  subscription: Subscription;
  shoppingCardCount: number;


  get isAdmin() {
    return JSON.parse(localStorage.getItem('user'))?.isAdmin ? true : false
  }
  get isLogin() {
    return localStorage.getItem('user') ? true : false
  }
  get lang() {
    return localStorage.getItem('lang') || "en"
  }

  get getProfileIamge() {
    return JSON.parse(localStorage.getItem('user')).image || '../../../../assets/img/avatars/profile.png'
  }
  changeLang(lang: any) {
    localStorage.setItem('lang', lang)
    this.translate.use(lang)
    // this.lang = lang
  }
  searchForm = new FormGroup({
    search: new FormControl(''),
  });

  get search_term() {
    return this.searchForm.get('search')?.value;
  }

  handleSearch() {
    if (this.search_term != '') {
      window.location.assign(`search/${this.search_term}`);
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

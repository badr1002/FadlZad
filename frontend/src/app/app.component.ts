import { Router } from '@angular/router';
import { UserService } from './pages/user/user.service';
import { Component, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @Output() screenLoading: any = true;
  title = 'FadlZad';
  arrowStatus: any = true;

  constructor(private _user: UserService, private _route: Router, translate: TranslateService) {
    translate.setDefaultLang((localStorage.getItem('lang')) || "en");
    this._user.getUser().subscribe(res => {
      if (res.apiStatus) {
        let user = res.data._user
        if (res.data.role === "adf0c9ad82601330d46ec62a") {
          user = Object.assign({ isAdmin: true }, user);
        }
        delete user.role
        localStorage.setItem("user", JSON.stringify(user))
        this._user.profileImage = res.data.image
      }
    }, (err) => {
      this._route.navigateByUrl('/user/login')
    })
    window.onscroll = () => {
      if (window.pageYOffset > 200) this.arrowStatus = true;
      else this.arrowStatus = false;
    };
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.screenLoading = false;
    }, 1000);
  }
  goUpHandler = (e: any) => {
    e.preventDefault();
    let p = window.pageYOffset;
    window.scrollTo(0, (p = 0));
  };
}

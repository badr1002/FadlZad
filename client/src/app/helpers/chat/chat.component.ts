import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/pages/user/user.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  chatFormStatus: any = false;
  msg: any;
  alert: any;
  contactForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    sub: new FormControl('', Validators.required),
    message: new FormControl('', Validators.required),
  });
  constructor(private _user:UserService) {}

  get _contactData() {
    return this.contactForm.value;
  }
  ngOnInit(): void {}
  handleSendMessgae() {
    if (this.contactForm.valid) {
      this._user.contactMessage(this._contactData).subscribe(
        (res) => {
          if (res.apiStatus) {
            this.alert = 'success';
            this.msg = res.msg;
            setTimeout(() => {
              this.msg = '';
            }, 2000);
          }
        },
        (e) => {
          this.alert = 'danger';
          this.msg = e.error.msg;
          setTimeout(() => {
            this.msg = '';
          }, 2000);
        }
      );
    }
  }

  openChatForm() {
    this.chatFormStatus = true;
  }
  closeChatForm() {
    this.chatFormStatus = false;
  }
}

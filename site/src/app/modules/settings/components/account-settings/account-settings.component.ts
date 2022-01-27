import { Component, OnInit } from '@angular/core';
import { User } from '../../../../shared/models/user.entity';
import { UserService } from '../../../../shared/services/user/user.service';

@Component({
  selector: 'cookbook-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.less']
})
export class AccountSettingsComponent implements OnInit {

  user: User = new User();

  newPassword: string = '';
  newPasswordConfirm: string = '';
  passwordMismatch: boolean = false;

  // username: string = '';
  email: string = '';

  saveSuccess: boolean = false;

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.userService.currentUser.subscribe(u => this.user = u);
  }

  saveDisabled(): boolean {
    return this.email === '' && this.newPassword === '';
  }

  updateUser(): void {
    if (this.user.username) {
      const updatedUser: User = new User();
      let changes: boolean = false;

      // if (this.username !== '') {
      //   updatedUser.username = this.username;
      //   changes = true;
      // }
      if (this.email !== '') {
        updatedUser.email = this.email;
        changes = true;
      }
      if (this.newPassword !== '') {
        if (this.newPassword === this.newPasswordConfirm) {
          updatedUser.password = this.newPassword;
          changes = true;
        }
        else {
          this.passwordMismatch = true;
          this.saveSuccess = false;
          return;
        }
      }

      if (changes) {
        updatedUser.username = this.user.username;
        updatedUser.admin = this.user.admin;
        this.userService.updateUser(this.user.username, updatedUser).subscribe(u => {
          this.user = u;
          this.userService.getCurrentUser();
          this.passwordMismatch = false;

          this.email = '';
          this.newPassword = '';
          this.newPasswordConfirm = '';

          this.saveSuccess = true;
        });
      }
    }
  }
}

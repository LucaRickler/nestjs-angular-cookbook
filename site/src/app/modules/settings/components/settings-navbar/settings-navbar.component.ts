import { Component, OnInit } from '@angular/core';
import { User } from '../../../../shared/models/user.entity';
import { UserService } from '../../../../shared/services/user/user.service';

@Component({
  selector: 'cookbook-settings-navbar',
  templateUrl: './settings-navbar.component.html',
  styleUrls: ['./settings-navbar.component.less']
})
export class SettingsNavbarComponent implements OnInit {

  user: User = new User();

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.userService.currentUser.subscribe(u => this.user = u);
  }

}

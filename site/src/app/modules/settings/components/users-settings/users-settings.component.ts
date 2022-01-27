import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalHostComponent } from '../../../../shared/components/modal-host/modal-host.component';
import { User } from '../../../../shared/models/user.entity';
import { UserService } from '../../../../shared/services/user/user.service';

@Component({
  selector: 'cookbook-users-settings',
  templateUrl: './users-settings.component.html',
  styleUrls: ['./users-settings.component.less']
})
export class UsersSettingsComponent implements OnInit {

  currentUser: User = new User();
  users: User[] = [];

  newUser: User = new User();
  addingUser: boolean = false;
  newUserError: boolean = false;

  @ViewChild('deleteHost') deleteHost!: ModalHostComponent;

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.userService.currentUser.subscribe(u => this.currentUser = u);
    this.getUsers();
  }

  private getUsers(): void {
    this.userService.getUsers().subscribe(users =>
      this.users = users.filter(u => u.username !== this.currentUser.username)
    );
  }

  deleteUser(index: number): void {
    const user = this.users[index];
    if (!user) {
      // TODO
      return;
    }

    const modalRef = this.deleteHost.open();
    modalRef.closed.subscribe((confirm: boolean) => {
      if (confirm) {
        this.userService.deleteUser(user.username ?? '').subscribe(() => {
          this.getUsers();
        });
      }
    });
  }

  updateUser(index: number): void {
    const user = this.users[index];
    if (!user) {
      // TODO
      return;
    }

    this.userService.updateUser(user.username ?? '', {
      username: user.username,
      admin: user.admin,
    }).subscribe(() => {
      this.getUsers();
    });
  }

  addUser(): void {
    this.addingUser = true;
    this.newUser = new User();
  }

  saveUser(): void {
    if (this.newUser.email === '' || this.newUser.password === '' || this.newUser.username === '') {
      this.newUserError = true;
      return;
    }
    this.newUser.admin = this.newUser.admin !== undefined ? this.newUser.admin : false;

    this.userService.newUser(this.newUser).subscribe(() => {
      this.getUsers();
      this.newUser = new User();
      this.newUserError = false;
    });

  }

}

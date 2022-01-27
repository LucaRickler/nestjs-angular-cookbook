import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Nav } from '../../../shared/models/nav.entity';
import { User } from '../../../shared/models/user.entity';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { NavService } from '../../../shared/services/nav/nav.service';
import { UserService } from '../../../shared/services/user/user.service';

@Component({
  selector: 'cookbook-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {

  user: User = {};
  isCollapsed: boolean = true;
  navs: Nav[] = [];

  constructor(
    private router: Router,
    private userService: UserService,
    private authService: AuthService,
    private navService: NavService,
  ) { }

  ngOnInit(): void {
    this.userService.currentUser.subscribe(user => this.user = user);
    this.navService.getNavs().subscribe(navs => this.navs = navs);
  }

  login(): void {
    this.router.navigate(['login']);
  }

  logout(): void {
    this.authService.logout();
    this.login();
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  newRecipe(): void {
    this.router.navigate(['recipe/new']);
  }

}

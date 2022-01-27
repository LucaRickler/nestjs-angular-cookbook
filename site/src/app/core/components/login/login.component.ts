import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { ErrorService } from '../../../shared/services/error/error.service';

@Component({
  selector: 'cookbook-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  username: string = '';
  password: string = '';

  loginError: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  public login() {
    this.authService.login(this.username, this.password)
      .subscribe({
        complete: () => {
          this.loginError = false;
          this.router.navigate(['home']);
        },
        error: err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this.loginError = true;
            }
          }
        }
      });
  }

}

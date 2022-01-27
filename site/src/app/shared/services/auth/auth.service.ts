import { Injectable } from '@angular/core';
import * as moment from 'moment';

import { HttpService } from '../http/http.service';
import { User } from '../../models/user.entity';
import { jwtDTO } from '../../models/jwt.dto';
import { Subject, Observable } from 'rxjs';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private httpService: HttpService,
    private userService: UserService,
  ) { }

  public login(username: string, password: string): Observable<void> {
    let status: Subject<void> = new Subject<void>();

    this.httpService.post<jwtDTO, User>('auth/login', { username, password }).subscribe(
      {
        next: (jwt: jwtDTO) => {
          if (jwt) {
            const expiresAt = moment(Date.now()).add(jwt.expiresIn ? jwt.expiresIn : 180, 'days');

            localStorage.setItem('access_token', jwt.access_token);
            localStorage.setItem('access_token_expiresIn', JSON.stringify(expiresAt.valueOf()));
            localStorage.setItem('username', username);

            this.userService.setCurrentUser(username);
          }
          status.complete();
        },
        error: err => status.error(err)
      }
    );

    return status.asObservable();
  }

  public logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('access_token_expiresIn');
    localStorage.removeItem('username');

    this.userService.clearCurrentUser();
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  public isLoggedOut() {
    return !this.isLoggedIn();
  }

  public getExpiration() {
    const expiration = localStorage.getItem('access_token_expiresIn');
    const expiresAt = JSON.parse(expiration ?? '0');
    return moment(expiresAt);
  }

}

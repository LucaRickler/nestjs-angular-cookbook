import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { DeleteResult } from '../../models/delete-result.entity';
import { User } from '../../models/user.entity';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _currentUser = new BehaviorSubject<User>({});
  private _username: string = '';

  get currentUser(): Observable<User> {
    this.getCurrentUser();
    return this._currentUser.asObservable();
  }

  constructor(
    private httpService: HttpService,
  ) {
    const username = localStorage.getItem('username')
    this._username = username !== null ? username : '';
  }

  public getCurrentUser(): void {
    if(this._username !== '')
    this.getUser(this._username).subscribe(user => this._currentUser.next(user));
  }

  public clearCurrentUser(): void {
    this._currentUser.next({});
    this._username = '';
  }

  public setCurrentUser(username: string): void {
    this.clearCurrentUser();
    this._username = username;
    this.getCurrentUser();
  }

  public isCurrentUserAdmin(): boolean {
    return this._currentUser.value.admin ?? false;
  }

  public getUsers(): Observable<User[]> {
    return this.httpService.get<User[]>('user');
  }

  public getUser(username: string): Observable<User> {
    return this.httpService.get<User>(`user/${username}`);
  }

  public newUser(user: User): Observable<User> {
    return this.httpService.post<User, User>('user', user);
  }

  public updateUser(username: string, user: User): Observable<User> {
    return this.httpService.put<User, User>(`user/${username}`, user);
  }

  public deleteUser(username: string): Observable<DeleteResult> {
    return this.httpService.delete<DeleteResult>(`user/${username}`);
  }

}

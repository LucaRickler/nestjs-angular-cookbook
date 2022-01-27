import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  private _errorSubject: Subject<any> = new Subject();
  public currentError = this._errorSubject.asObservable();

  constructor() { }

  public pushError(err: any): void {
    this._errorSubject.next(err);
  }
}

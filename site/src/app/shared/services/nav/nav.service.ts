import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Nav, NAVS } from '../../models/nav.entity';

@Injectable({
  providedIn: 'root'
})
export class NavService {

  constructor() { }

  getNavs(): Observable<Nav[]> {
    return of(NAVS);
  }
}

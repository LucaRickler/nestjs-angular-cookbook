import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DeleteResult } from '../../models/delete-result.entity';
import { Unit } from '../../models/unit.entity';
import { BaseService } from '../base-service.interface';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class UnitService implements BaseService<Unit> {

  private _unitsSubject: BehaviorSubject<Unit[]> = new BehaviorSubject<Unit[]>([]);
  items: Observable<Unit[]> = this._unitsSubject.asObservable();

  constructor(
    private httpService: HttpService,
  ) { }

  public getAll(): Observable<Unit[]> {
    this.httpService.get<Unit[]>('unit').subscribe({
      next: res => this._unitsSubject.next(res)
    });
    return this.items;
  }

  public refreshItems(): Observable<Unit[]> {
      return this.getAll();
  }

  public getUnit(id: string): Observable<Unit> {
    return this.httpService.get<Unit>(`unit/${id}`);
  }

  public newUnit(unit: Unit): Observable<Unit> {
    return this.httpService.post<Unit, Unit>('unit', unit);
  }

  public deleteUnit(id: string): Observable<DeleteResult> {
    return this.httpService.delete<DeleteResult>(`unit/${id}`);
  }

}

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DeleteResult } from '../../models/delete-result.entity';
import { Ingredient } from '../../models/ingredient.entity';
import { BaseService } from '../base-service.interface';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class IngredientService implements BaseService<Ingredient> {

  private _ingredientsSubject: BehaviorSubject<Ingredient[]> = new BehaviorSubject<Ingredient[]>([]);

  items: Observable<Ingredient[]> = this._ingredientsSubject.asObservable();

  constructor(
    private httpService: HttpService,
  ) { }

  public getAll() {
    this.httpService.get<Ingredient[]>('ingredient').subscribe({
      next: res => this._ingredientsSubject.next(res)
    });
    return this.items;
  }

  public refreshItems(): Observable<Ingredient[]> {
      return this.getAll();
  }

  public getIngredient(id: string): Observable<Ingredient> {
    return this.httpService.get<Ingredient>(`ingredient/${id}`);
  }

  public newIngredient(ingredient: Ingredient): Observable<Ingredient> {
    return this.httpService.post<Ingredient, Ingredient>('ingredient', ingredient);
  }

  public updateIngredient (ingredient: Ingredient): Observable<Ingredient> {
    return this.httpService.put<Ingredient, Ingredient>('ingredient', ingredient);
  }

  public deleteIngredient(id: string): Observable<DeleteResult> {
    return this.httpService.delete<DeleteResult>(`ingredient/${id}`);
  }
}

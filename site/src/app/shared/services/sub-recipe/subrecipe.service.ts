import { Injectable } from '@angular/core';
import { plainToInstance } from 'class-transformer';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { DeleteResult } from '../../models/delete-result.entity';
import { SubRecipe } from '../../models/sub-recipe.entity';
import { BaseService } from '../base-service.interface';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class SubrecipeService implements BaseService<SubRecipe> {

  private _subRecipesSubject: BehaviorSubject<SubRecipe[]> = new BehaviorSubject<SubRecipe[]>([]);

  items: Observable<SubRecipe[]> = this._subRecipesSubject.asObservable();

  private lastUsedParendRecipeId: string = '';

  constructor(
    private httpService: HttpService,
  ) { }

  refreshItems(): Observable<SubRecipe[]> {
      this.getSubRecipes(this.lastUsedParendRecipeId);
      return this.items;
  }

  public getSubRecipes(recipeId: string): Observable<SubRecipe[]> {
    return this.httpService.get<SubRecipe[]>(`recipe/${recipeId}/sub-recipe`)
      .pipe(map(res => plainToInstance(SubRecipe, res)))
      .pipe(tap({
        next: res => this._subRecipesSubject.next(res)
      }));
  }

  public getSubRecipe(recipeId: string, subRecipeId: number): Observable<SubRecipe> {
    return this.httpService.get<SubRecipe>(`recipe/${recipeId}/sub-recipe/${subRecipeId}`)
     .pipe(map(res => plainToInstance(SubRecipe, res)));
  }

  public newSubRecipe(recipeId: string, dto: SubRecipe): Observable<SubRecipe> {
    return this.httpService.post<SubRecipe, SubRecipe>(`recipe/${recipeId}/sub-recipe/`, dto)
    .pipe(map(res => plainToInstance(SubRecipe, res)));
  }

  public updateSubRecipe(recipeId: string, subRecipeId: number, dto: SubRecipe): Observable<SubRecipe> {
    return this.httpService.put<SubRecipe, SubRecipe>(`recipe/${recipeId}/sub-recipe/${subRecipeId}`, dto)
    .pipe(map(res => plainToInstance(SubRecipe, res)));
  }

  // public updateSubRecipes(recipeId: string, dto: SubRecipe[]): Observable<SubRecipe[]> {
  //   return this.httpService.put<SubRecipe[], SubRecipe[]>(`recipe/${recipeId}/sub-recipe`, dto)
  //   .pipe(map(res => plainToInstance(SubRecipe, res)));
  // }

  public deleteSubRecipe(recipeId: string, subRecipeId: number): Observable<DeleteResult> {
    return this.httpService.delete<DeleteResult>(`recipe/${recipeId}/sub-recipe/${subRecipeId}`);
  }
}

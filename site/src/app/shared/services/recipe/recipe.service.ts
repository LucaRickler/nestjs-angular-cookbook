import { Injectable } from '@angular/core';
import { plainToInstance } from 'class-transformer';
import { map, Observable } from 'rxjs';
import { DeleteResult } from '../../models/delete-result.entity';
import { Recipe } from '../../models/recipe.entity';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(
    private httpService: HttpService,
  ) { }

  public getRecipes(): Observable<Recipe[]> {
    return this.httpService.get<Recipe[]>('recipe')
      .pipe(map(res => plainToInstance(Recipe, res)));
  }

  public getRecipe(id: string): Observable<Recipe> {
    return this.httpService.get<Recipe>(`recipe/${id}`)
      .pipe(map(res => plainToInstance(Recipe, res)));
  }

  // TODO
  public getAvailableSubRecipe(id: string): Observable<Recipe[]> {
    return this.httpService.get<Recipe[]>(`recipe/sub-recipe/available-for/${id}`)
      .pipe(map(res => plainToInstance(Recipe, res)));
  }

  public newRecipe(recipe: Recipe): Observable<Recipe> {
    return this.httpService.post<Recipe, Recipe>('recipe', recipe).
      pipe(map(res => plainToInstance(Recipe, res)));
  }

  public updateRecipe(id: string, recipe: Recipe): Observable<Recipe> {
    return this.httpService.put<Recipe, Recipe>(`recipe/${id}`, recipe)
      .pipe(map(res => plainToInstance(Recipe, res)));
  }

  public deleteRecipe(id: string): Observable<DeleteResult> {
    return this.httpService.delete<DeleteResult>(`recipe/${id}`);
  }
}

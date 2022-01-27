import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DeleteResult } from '../../models/delete-result.entity';
import { RecipeToIngredient } from '../../models/recipe-to-ingredient.entity';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeToIngredientService {

  constructor(
    private httpService: HttpService,
  ) { }

  public getRecipeToIngredients(recipeId: string, subRecipeId: string): Observable<RecipeToIngredient[]> {
    return this.httpService.get<RecipeToIngredient[]>(`recipe/${recipeId}/sub-recipe/${subRecipeId}/ingredients`);
  }

  public newRecipeToIngredients(recipeId: string, subRecipeId: string, dto: RecipeToIngredient[]): Observable<RecipeToIngredient[]> {
    return this.httpService.post<RecipeToIngredient[], RecipeToIngredient[]>(`recipe/${recipeId}/sub-recipe/${subRecipeId}/ingredients`, dto);
  }

  public updateRecipeToIngredients(recipeId: string, subRecipeId: string, dto: RecipeToIngredient[]): Observable<RecipeToIngredient[]> {
    return this.httpService.put<RecipeToIngredient[], RecipeToIngredient[]>(`recipe/${recipeId}/sub-recipe/${subRecipeId}/ingredients`, dto);
  }

  public deleteRecipeToIngredients(recipeId: string, subRecipeId: string): Observable<DeleteResult> {
    return this.httpService.delete<DeleteResult>(`recipe/${recipeId}/sub-recipe/${subRecipeId}/ingredients`);
  }

  public getRecipeToIngredient(recipeId: string, subRecipeId: string, ingredientId: number): Observable<RecipeToIngredient> {
    return this.httpService.get<RecipeToIngredient>(`recipe/${recipeId}/sub-recipe/${subRecipeId}/ingredients/${ingredientId}`);
  }

  public newRecipeToIngredient(recipeId: string, subRecipeId: string, ingredientId: number, dto: RecipeToIngredient): Observable<RecipeToIngredient> {
    return this.httpService.post<RecipeToIngredient, RecipeToIngredient>(
      `recipe/${recipeId}/sub-recipe/${subRecipeId}/ingredients/${ingredientId}`,
      dto
    );
  }

  public updateRecipeToIngredient(recipeId: string, subRecipeId: string, ingredientId: number, dto: RecipeToIngredient): Observable<RecipeToIngredient> {
    return this.httpService.put<RecipeToIngredient, RecipeToIngredient>(
      `recipe/${recipeId}/sub-recipe/${subRecipeId}/ingredients/${ingredientId}`,
      dto
    );
  }

  public deleteRecipeToIngredient(recipeId: string, subRecipeId: string, ingredientId: number): Observable<DeleteResult> {
    return this.httpService.delete<DeleteResult>(`recipe/${recipeId}/sub-recipe/${subRecipeId}/ingredients/${ingredientId}`);
  }

}

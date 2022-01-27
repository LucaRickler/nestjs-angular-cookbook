import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AsyncSubject, Observable } from 'rxjs';
import { RecipeToIngredient } from '../../../../shared/models/recipe-to-ingredient.entity';
import { Recipe } from '../../../../shared/models/recipe.entity';
import { SubRecipe } from '../../../../shared/models/sub-recipe.entity';
import { Time } from '../../../../shared/models/time.entity';
import { RecipeToIngredientService } from '../../../../shared/services/recipe-to-ingredient/recipe-to-ingredient.service';
import { SubrecipeService } from '../../../../shared/services/sub-recipe/subrecipe.service';
import { RecipeIngredientsComponent } from '../recipe-ingredients/recipe-ingredients.component';

@Component({
  selector: 'cookbook-sub-recipe',
  templateUrl: './sub-recipe.component.html',
  styleUrls: ['./sub-recipe.component.less']
})
export class SubRecipeComponent implements OnInit {
  
  @Input() recipeId: string = '';

  private _subRecipe: SubRecipe = new SubRecipe();
  get subRecipe(): SubRecipe {
    return this._subRecipe;
  }
  @Input() set subRecipe(value: SubRecipe) {
    this._subRecipe = value;
    this.reloadRecipeToIngredient();
  }
  @Output() subRecipeChange = new EventEmitter<SubRecipe>();
  
  @Output() onTimeChange = new EventEmitter<{}>();

  recipeToIngredient: RecipeToIngredient = new RecipeToIngredient();

  get recipe(): Recipe {
    return this._subRecipe.recipe;
  }
  set recipe(value: Recipe) {
    this._subRecipe.recipe = value;
    // this._subRecipe.ingredient = new Ingredient();
    this.reloadIngredients();
    this.subRecipeChange.emit(this.subRecipe);
  }

  // get ingredient(): Ingredient {
  //   return this._subRecipe.ingredient;
  // }
  // set ingredient(value: Ingredient) {
  //   this._subRecipe.ingredient = value;
  //   this.subRecipe.ingredient = value;
  //   this.subRecipe.scaledQuantity = 1;
  //   this.reloadRecipeToIngredient();
  //   this.subRecipeChange.emit(this.subRecipe);
  // }

  // get quantity(): number {
  //   if (this.subRecipe.scaledQuantity === 0) {
  //     return 0;
  //   }
  //   return this.recipeToIngredient.quantity * this.subRecipe.scaledQuantity;
  // }

  // set quantity(value: number) {
  //   if (value > 0) {
  //     this.subRecipe.scaledQuantity = value / this.recipeToIngredient.quantity;
  //   } else {
  //     this.subRecipe.scaledQuantity = 0;
  //   }
  //   this.subRecipeChange.emit(this.subRecipe);
  // }

  errorStatus: number = 0;
  errorMessage: string = '';

  // recipeToIngredients: RecipeToIngredient[] = [];

  // private _ingredientsSubject = new BehaviorSubject<Ingredient[]>([])
  // ingredientsObservable = this._ingredientsSubject.asObservable();

  // private _recipesSubject = new BehaviorSubject<Recipe[]>([])
  // recipesObservable = this._recipesSubject.asObservable();

  @Input() editMode: boolean = false;
  @Output() onDelete = new EventEmitter<boolean>();

  @ViewChild(RecipeIngredientsComponent) recipeIngredientComponent!: RecipeIngredientsComponent;

  constructor(
    // private recipeService: RecipeService,
    private subRecipeService: SubrecipeService,
    private recipeToIngredientService: RecipeToIngredientService,
  ) { }

  ngOnInit(): void {
    this.reloadRecipeToIngredient();

    this.reloadIngredients();

    // this.recipeService.getAvailableSubRecipe(this.recipeId).subscribe({
    //   next: res => this._recipesSubject.next(res),
    //   // TODO: error
    // });
  }

  reloadIngredients() {
    // if (this.recipe.id !== undefined) {
    //   this.recipeToIngredientService.getRecipeToIngredients(this.recipe.id?.toString()).subscribe({
    //     next: res => {
    //       let list: Ingredient[] = [];
    //       // for needed for concurrency problems
    //       for (let item of res) {
    //         list.push(item.ingredient);
    //       }
    //       this._ingredientsSubject.next(list);
    //       this.recipeToIngredients = res;
    //     },
    //     // TODO: error
    //   });

    // }
  }

  reloadRecipeToIngredient() {
    // if (this.subRecipe.recipeId && this.subRecipe.ingredientId) {
    //   this.recipeToIngredientService
    //     .getRecipeToIngredient(this.subRecipe.recipeId?.toString(), this.subRecipe.ingredientId)
    //     .subscribe(res => this.recipeToIngredient = res);
    // }
  }

  delete(): void {
    this.onDelete.emit(true);
  }

  cancelModify(): void {
    this.recipeIngredientComponent.cancelModify();
  }

  save(recipeId: string): Observable<boolean> {
    let subject: AsyncSubject<boolean> = new AsyncSubject<boolean>();
    let obs = this.subRecipe.id
      ? this.subRecipeService.updateSubRecipe(recipeId, this.subRecipe.id, this.subRecipe)
      : this.subRecipeService.newSubRecipe(recipeId, this.subRecipe);
    obs.subscribe({
      next: res => {
        this.subRecipe = res;
        this.recipeIngredientComponent.save(recipeId, this.subRecipe.id?.toString() ?? '');
        subject.complete();
      },
      error: err => {
        subject.error(err);
      }
    });
    return subject.asObservable();
  }

  changeTime(time: Time) {
    this.subRecipe.time = time;
    this.onTimeChange.emit({});
  }
}

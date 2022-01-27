import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AsyncSubject, Observable } from 'rxjs';
import { ModalHostComponent } from '../../../../shared/components/modal-host/modal-host.component';
import { RecipeToIngredient } from '../../../../shared/models/recipe-to-ingredient.entity';
import { IngredientService } from '../../../../shared/services/ingredient/ingredient.service';
import { RecipeToIngredientService } from '../../../../shared/services/recipe-to-ingredient/recipe-to-ingredient.service';

@Component({
  selector: 'cookbook-recipe-ingredients',
  templateUrl: './recipe-ingredients.component.html',
  styleUrls: ['./recipe-ingredients.component.less']
})
export class RecipeIngredientsComponent implements OnInit {

  private _recipeId: string = '';
  get recipeId(): string {
    return this._recipeId;
  }
  @Input() set recipeId(value: string) {
    this._recipeId = value;
    this.getIngredients();
  }

  private _subRecipeId: string = '';
  get subRecipeId(): string {
    return this._subRecipeId;
  }
  @Input() set subRecipeId(value: string) {
    this._subRecipeId = value;
    this.getIngredients();
  }
  
  recipeIngredients: RecipeToIngredient[] = [];

  private _editMode: boolean = false;
  get editMode(): boolean {
    return this._editMode;
  }
  @Input() set editMode(value: boolean) {
    this._editMode = value;
  }

  @ViewChild('modal') modalHost!: ModalHostComponent;

  @Input() scaleFactor: number = 1;

  constructor(
    private recipeToIngredientService: RecipeToIngredientService,
    public ingredientService: IngredientService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.ingredientService.refreshItems();
  }

  private getIngredients(): void {
    if (this.recipeId && this.subRecipeId) {
      this.recipeToIngredientService.getRecipeToIngredients(this.recipeId, this.subRecipeId)
        .subscribe({
          next: res => {
            if (res && res.length > 0)
              this.recipeIngredients = res
          },
          error: err => { } //TODO
        });
    }
  }

  addIngredient(): void {
    this.recipeIngredients.push(new RecipeToIngredient());
  }

  removeIngredient(index: number): void {
    this.recipeIngredients.splice(index, 1);
  }

  newIngredient(index: number): void {
    const modalRef = this.modalHost.open();
    modalRef.closed.subscribe(res => {
      if (res) {
        this.recipeIngredients[index].ingredient = res;
        this.ingredientService.refreshItems();
      }
    });
  }

  cancelModify(): void {
    this.getIngredients();
  }

  save(recipeId: string, subRecipeId: string): Observable<boolean> {
    let subject: AsyncSubject<boolean> = new AsyncSubject<boolean>();

    this.recipeToIngredientService.updateRecipeToIngredients(recipeId, subRecipeId, this.recipeIngredients).subscribe({
      next: res => {
        this.recipeIngredients = res;
        subject.complete();
      },
      error: err => {
        subject.error(err);
      }
    });
    return subject.asObservable();
  }

}

import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalHostComponent } from '../../../../shared/components/modal-host/modal-host.component';
import { Recipe } from '../../../../shared/models/recipe.entity';
import { Time } from '../../../../shared/models/time.entity';
import { RecipeService } from '../../../../shared/services/recipe/recipe.service';
import { SubRecipeContainerComponent } from '../sub-recipe-container/sub-recipe-container.component';

@Component({
  selector: 'cookbook-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.less']
})
export class RecipeComponent implements OnInit {

  recipeId: string = '';
  recipe: Recipe = new Recipe();

  editMode: boolean = false;

  @ViewChild('deleteHost') deleteHost!: ModalHostComponent;
  @ViewChild('subRecipes') subRecipeContainerComponent!: SubRecipeContainerComponent;

  errorStatus: number = 0;
  errorMessage: string = '';

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      if (data['newRecipe']) {
        this.recipe = new Recipe();
        this.editMode = true;
      } else {
        this.recipeId = this.route.snapshot.paramMap.get('recipeId') ?? '';
        this.getRecipe();
      }
    });
  }

  private getRecipe(): void {
    this.recipeService.getRecipe(this.recipeId).subscribe({
      next: recipe => {
        if (recipe)
          this.recipe = recipe;
      },
      error: err => {
        if (err instanceof HttpErrorResponse) {
          if (err instanceof HttpErrorResponse) {
            this.errorStatus = err.status;
            this.errorMessage = err.message;
          }
        }
      }
    });
  }

  isNewRecipe(): boolean {
    return this.recipeId === '';
  }

  modify(): void {
    this.editMode = true;
  }

  cancelModify(): void {
    if (!this.isNewRecipe()) {
      this.editMode = false;

      this.getRecipe();
      this.subRecipeContainerComponent.cancelModify();
    } else {
      this.router.navigate(['recipe']);
    }
  }

  save(): void {
    this.editMode = false;
    let obs = (this.recipeId != '')
      ? this.recipeService.updateRecipe(this.recipeId, this.recipe)
      : this.recipeService.newRecipe(this.recipe);

    obs.subscribe({
      next: res => {
        if (res) {
          this.recipe = res;
          this.recipeId = res.id?.toString() ?? '';
          this.errorStatus = 0;
          this.errorMessage = '';
          this.subRecipeContainerComponent.save(this.recipeId);
        }
      },
      error: err => {
        if (err instanceof HttpErrorResponse) {
          if (err instanceof HttpErrorResponse) {
            this.errorStatus = err.status;
            this.errorMessage = err.message;
          }
        }
      },
    });
  }

  delete(): void {
    const modalRef = this.deleteHost.open();
    modalRef.closed.subscribe((confirm: boolean) => {
      if (confirm) {
        this.recipeService.deleteRecipe(this.recipeId).subscribe(() => {
          this.router.navigate(['recipe'])
        });
      }
    });
  }

  changeTime(times: Time[]): void {
    this.recipe.time = new Time().add(...times);
  }
}

import { Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { AsyncSubject, forkJoin, Observable } from 'rxjs';
import { SubRecipe } from '../../../../shared/models/sub-recipe.entity';
import { Time } from '../../../../shared/models/time.entity';
import { SubrecipeService } from '../../../../shared/services/sub-recipe/subrecipe.service';
import { SubRecipeComponent } from '../sub-recipe/sub-recipe.component';

@Component({
  selector: 'cookbook-sub-recipe-container',
  templateUrl: './sub-recipe-container.component.html',
  styleUrls: ['./sub-recipe-container.component.less']
})
export class SubRecipeContainerComponent implements OnInit {

  subRecipes: SubRecipe[] = [];

  @Input() editMode: boolean = false;

  private _recipeId: string = '';
  get recipeId(): string {
    return this._recipeId;
  }
  @Input() set recipeId(value: string) {
    this._recipeId = value;
    this.getSubRecipes();
  }

  @Output() onTimeChange = new EventEmitter<Time[]>();

  @ViewChildren(SubRecipeComponent) subRecipeComponents!: QueryList<SubRecipeComponent>;

  constructor(
    private subRecipeService: SubrecipeService,
  ) { }

  ngOnInit(): void { }

  private getSubRecipes(): void {
    if (this.recipeId) {
      this.subRecipeService.getSubRecipes(this.recipeId)
        .subscribe({
          next: res => {
            if (res && res.length > 0)
              this.subRecipes = res
              this.changeTime();
          },
          error: err => { } //TODO
        });
    }
  }

  addSubRecipe(): void {
    this.subRecipes.push(new SubRecipe());
  }

  addExistingSubRecipe(): void {
    
  }

  removeSubRecipe(index: number): void {
    this.subRecipes.splice(index, 1);
  }

  cancelModify(): void {
    this.getSubRecipes();
    this.subRecipeComponents.forEach(c => c.cancelModify());
  }

  save(recipeId: string): Observable<boolean> {
    let subject: AsyncSubject<boolean> = new AsyncSubject<boolean>();

    let obs: Observable<Boolean>[] = [];
    this.subRecipeComponents.forEach(c => {
      obs.push(c.save(recipeId));
    });
    forkJoin(obs).subscribe({
      next: () => { },
      complete: () => subject.complete(),
      error: err => subject.error(err),
    })
    return subject.asObservable();
  }

  changeTime(): void {
    let times: Time[] = [];
    this.subRecipes.forEach(sr => times.push(sr.time));
    this.onTimeChange.emit(times);
  }
}

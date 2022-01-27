import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../../../shared/models/recipe.entity';
import { RecipeService } from '../../../../shared/services/recipe/recipe.service';

@Component({
  selector: 'cookbook-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.less']
})
export class IndexComponent implements OnInit {

  recipes: Recipe[] = [];

  constructor(
    private recipeService: RecipeService,
  ) { }

  ngOnInit(): void {
    this.recipeService.getRecipes().subscribe(res => this.recipes = res);
  }

}

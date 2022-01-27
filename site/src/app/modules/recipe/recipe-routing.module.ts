import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../shared/guards/auth/auth.guard';
import { IndexComponent } from './components/index/index.component';
import { RecipeComponent } from './components/recipe/recipe.component';

const routes: Routes = [
  { path: '', component: IndexComponent, canActivate: [AuthGuard] },
  { path: 'new', component: RecipeComponent, canActivate: [AuthGuard], data: { newRecipe: true } },
  { path: ':recipeId', component: RecipeComponent, canActivate: [AuthGuard], data: { newRecipe: false } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipeRoutingModule { }

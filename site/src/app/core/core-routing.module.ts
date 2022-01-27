import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingsComponent } from '../modules/settings/components/settings-root/settings-root.component';
import { AuthGuard } from '../shared/guards/auth/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  {
    path: 'recipe',
    loadChildren: () => import('../modules/recipe/recipe-routing.module').then(m => m.RecipeRoutingModule)
  },
  {
    path: 'settings',
    component: SettingsComponent,
    loadChildren: () => import('../modules/settings/settings.module').then(m => m.SettingsModule)
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }

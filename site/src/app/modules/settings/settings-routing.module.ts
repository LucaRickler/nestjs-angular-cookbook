import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../../shared/guards/admin/admin.guard';
import { AuthGuard } from '../../shared/guards/auth/auth.guard';
import { AccountSettingsComponent } from './components/account-settings/account-settings.component';
import { UsersSettingsComponent } from './components/users-settings/users-settings.component';

const routes: Routes = [
  { path: '', redirectTo: 'account', pathMatch: 'full' },
  { path: 'account', component: AccountSettingsComponent, canActivate: [AuthGuard], outlet: 'settings' },
  { path: 'users', component: UsersSettingsComponent, canActivate: [AuthGuard, AdminGuard], outlet: 'settings' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './components/settings-root/settings-root.component';
import { SharedModule } from '../../shared/shared.module';
import { SettingsNavbarComponent } from './components/settings-navbar/settings-navbar.component';
import { AccountSettingsComponent } from './components/account-settings/account-settings.component';
import { FormsModule } from '@angular/forms';
import { NgxJdenticonModule } from 'ngx-jdenticon';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UsersSettingsComponent } from './components/users-settings/users-settings.component';


@NgModule({
  declarations: [
    SettingsComponent,
    SettingsNavbarComponent,
    AccountSettingsComponent,
    UsersSettingsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    NgxJdenticonModule,
    SharedModule,
    SettingsRoutingModule,
  ],
  exports: [SettingsComponent]
})
export class SettingsModule { }

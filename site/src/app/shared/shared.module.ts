import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { HttpService } from './services/http/http.service';
import { AuthService } from './services/auth/auth.service';
import { AuthGuard } from './guards/auth/auth.guard';
import { IngredientPipe } from './pipes/ingredient.pipe';
import { ErrorService } from './services/error/error.service';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalHostComponent } from './components/modal-host/modal-host.component';
import { ModalFeedbackDirective } from './directives/modal-feedback/modal-feedback.directive';
import { TimeComponent } from './components/time/time.component';
import { AdminGuard } from './guards/admin/admin.guard';
import { NgxJdenticonModule } from 'ngx-jdenticon';

@NgModule({
  declarations: [
    IngredientPipe,
    DropdownComponent,
    ModalHostComponent,
    ModalFeedbackDirective,
    TimeComponent,
  ],
  imports: [
    HttpClientModule,
    NgbModule,
    CommonModule,
    FormsModule,
    NgxJdenticonModule,
  ],
  providers: [
    HttpService,
    AuthService,
    AuthGuard,
    AdminGuard,
    ErrorService,
  ],
  exports: [
    IngredientPipe,
    DropdownComponent,
    ModalHostComponent,
    ModalFeedbackDirective,
    TimeComponent,
  ]
})
export class SharedModule { }

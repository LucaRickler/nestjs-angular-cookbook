import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CoreRoutingModule } from './core-routing.module';
import { CoreComponent } from './components/core/core.component';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RecipeModule } from '../modules/recipe/recipe.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { NgxJdenticonModule } from 'ngx-jdenticon';

@NgModule({
  declarations: [
    CoreComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule,
    NgxJdenticonModule,
    CoreRoutingModule,
    RecipeModule,
    SharedModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    }
  ],
  bootstrap: [CoreComponent]
})
export class CoreModule { }

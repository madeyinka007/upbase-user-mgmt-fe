import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HttpService } from '../services/http.service';
import { TokenInterceptorService } from '../services/token-interceptor.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { HeaderComponent } from './dashboard/partials/header/header.component';
import { FooterComponent } from './dashboard/partials/footer/footer.component';
import { SideNavComponent } from './dashboard/partials/side-nav/side-nav.component'
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { UsersModule } from './users/users.module';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { DelUserComponent } from './del-user/del-user.component';


@NgModule({
  declarations: [		
    AppComponent,
      LoginComponent,
      RegisterComponent,
      DashboardComponent,
      UsersComponent,
      HeaderComponent,
      FooterComponent,
      SideNavComponent,
      EditProfileComponent,
      UserProfileComponent,
      DelUserComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    UsersModule
  ],
  providers: [HttpService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

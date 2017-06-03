import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FileSelectDirective } from 'ng2-file-upload';

import { AppComponent }  from './app.component';
import { DashboardComponent } from './dashboard/components/dashboard';
import { GoogleLoginComponent } from './auth/components/google-login';
import { NavBarComponent } from './shared/components/nav-bar';

import { UserCardComponent } from './shared/components/user-card';
import { NewWineFormComponent } from './wine/components/new-wine-form';
import { WineCountCardComponent } from './wine/components/wine-count-card';
import { WineListComponent } from './wine/components/wine-list';
import { WineDetailComponent } from './wine/components/wine-detail';
import { AddImageFormComponent } from './image/components/add-image-form';

import { AuthService } from './auth/services/auth-service';
import { CookieService } from './shared/services/cookie-service';
import { UrlService } from './shared/services/url-service';
import { WineService } from './wine/services/wine-service';
import { ImageService } from './image/services/image-service';

const appRoutes : Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'wine',
    component: WineListComponent
  },
  {
    path: 'wine/new',
    component: NewWineFormComponent
  },
  {
    path: 'wine/:id',
    component: WineDetailComponent
  },
  {
    path: '**',
    component: DashboardComponent
  }
  //{
  //  path: '**',
  //  component: PageNotFoundComponent
  //}
];

@NgModule({
  imports:      [ 
    BrowserModule, 
    HttpModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  declarations: [ 
    AppComponent,
    DashboardComponent,
    FileSelectDirective,
    NavBarComponent,
    UserCardComponent,
    WineCountCardComponent,
    WineListComponent,
    WineDetailComponent,
    NewWineFormComponent,
    GoogleLoginComponent,
    AddImageFormComponent
  ],
  providers: [
    AuthService,
    CookieService,
    UrlService,
    WineService,
    ImageService,
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }

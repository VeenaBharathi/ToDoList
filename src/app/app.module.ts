import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';


import { AppComponent } from './app.component';
import { ServerComponent } from './server/server.component';
import { ServerService } from './server.service';
import { AuthService } from './auth/auth.service';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { MainComponent } from './main/main.component';

const appRoutes: Routes = [
 // {path: '', redirectTo:'/signup', pathMatch: 'full'},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'signup', component: SignupComponent},
  {path: 'create', component: ServerComponent},
  {path: 'signin', component: SigninComponent},
  {path: 'home', component: MainComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    ServerComponent,
    SignupComponent,
    SigninComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ServerService, AuthService],
  bootstrap: [AppComponent],
  exports: [RouterModule]
})
export class AppModule { }

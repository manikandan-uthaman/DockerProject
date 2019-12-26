import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ContactComponent } from './components/contact/contact.component';
import { CreateComponent } from './components/create/create.component';
import { AuthGuardService } from './service/auth-guard.service';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';


const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuardService]},
  {path: 'create', component: CreateComponent, canActivate: [AuthGuardService]},
  {path: 'contact', component: ContactComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: '**', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

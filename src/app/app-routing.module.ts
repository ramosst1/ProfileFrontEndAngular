import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent} from './home/home.component';
import { UserProfilesComponent } from './user-profiles/user-profiles.component';
import { LoginComponent} from './login/login.component'
import { MaterialModule } from './material/material.module';
import { AboutUsComponent} from './about-us/about-us.component'

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'ProfileList', component: UserProfilesComponent},
  {path: 'AboutUs', component: AboutUsComponent},
  {path: 'Login', component: LoginComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    MaterialModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserProfilesComponent } from './user-profiles/user-profiles.component';
import { ProfilesService } from './services/profiles.service';
import { ProfileFormComponent } from './profile-form/profile-form.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule} from './material/material.module'
import { AboutUsComponent } from './about-us/about-us.component'
import { HttpClientModule } from '@angular/common/http';
import { AddressService } from './services/address.service';

@NgModule({
  declarations: [
    AppComponent,
    UserProfilesComponent,
    ProfileFormComponent,
    HomeComponent,
    LoginComponent,
    AboutUsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule
  ],
  entryComponents: [ProfileFormComponent, 
    LoginComponent
  ],

  providers: [AddressService, ProfilesService],
  bootstrap: [AppComponent]
})
export class AppModule {}

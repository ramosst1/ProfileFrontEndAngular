import { Component, OnInit } from '@angular/core';
import { ProfilesService} from '../services/profiles.service';
import {MatDialog } from '@angular/material/dialog';
import { ProfileFormComponent } from '../profile-form/profile-form.component';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {ProfilesResponse, ProfileModel} from '../models/ProfileModels'
import { ErrorMessage } from '../models/ErrorMessageModels';
import { ApiStateResponse, ServiceApiResponse } from './../util/httpRequest/ServiceApiResponse';
@Component({
  selector: "app-user-profiles",
  templateUrl: "./user_profiles.component.html",
  styleUrls: ["./user_profiles.component.scss"]
})
export class UserProfilesComponent implements OnInit {

  title = "User Profiles";
  profiles: ProfileModel[];
  dataSource: ProfileModel[];
  uxFormProfiles: FormGroup;
  errorMessages: Array<object> = [];

  constructor(
    private profileService: ProfilesService,
    public dialogProfileDetail: MatDialog,
    private aForm: FormBuilder
  ) {
    this.uxFormProfiles = aForm.group({
      uxProfileActiveFilter: new FormControl("true")
    });
  }

  async ngOnInit() {
    let ProfilterFilteredValue = this.GetProfileFiterValue();



    this.profileService.getProfiles().subscribe( (v) => console.info(v))

    this.profileService.getProfiles().subscribe(
      (data: ProfilesResponse) => {
        this.profiles = data.profiles;
        this.dataSource = this.profiles.filter(aItem => {
          return aItem.active === ProfilterFilteredValue;
        });
     },
     (error: ErrorMessage[]) => {
       this.errorMessages = error
    } 
    );
  }

  openDialog(aProfile?: ProfileModel): void {
    const dialogProfileRef = this.dialogProfileDetail.open(
      ProfileFormComponent,
      {
        panelClass: 'Test',
        width: "500px",
        data: aProfile == undefined ? null : aProfile
      }
    );

    dialogProfileRef.afterClosed().subscribe(result => {
      let ProfileActiveFilter = true;

      //      if (result === "success") {
      this.RefreshProfileList();
      //      }
    });
  }

  FilterProfilesClick(active?: boolean) {
    this.dataSource = this.profiles.filter(aItem => {
      return active === undefined || aItem.active === active;
    });
  }

  GetProfileFiterValue(): boolean {
    let Filter: any = this.uxFormProfiles.controls.uxProfileActiveFilter.value;

    switch (Filter) {
      case "false":
        return false;
      case null:
      case "":
      case undefined:
        return undefined;
    }
    return true;
  }

  RefreshProfileList() {
    let ProfileActiveFilter = this.GetProfileFiterValue();



  this.profileService.getProfiles().subscribe((data: ProfilesResponse) => {
        this.profiles = data.profiles;

        this.dataSource = this.profiles.filter(aItem => {
          return (
            ProfileActiveFilter === undefined ||
            aItem.active === ProfileActiveFilter
          );
        });
    });
  }

  editProfileClick(aProfile: ProfileModel) {
    this.openDialog(aProfile);
  }

  deleteProfileClick(profile: ProfileModel) {
    let ConfirmResponse = window.confirm(
      "Are you sure you want to delete the record?"
    );

    if (ConfirmResponse) {
      this.profileService
        .deleteProfile(profile)
        .subscribe((data: boolean) => {

          if (data == true) {
            this.RefreshProfileList();
          }

        }, 
        (error: ErrorMessage[]) => this.errorMessages = error);
    }
  }
}

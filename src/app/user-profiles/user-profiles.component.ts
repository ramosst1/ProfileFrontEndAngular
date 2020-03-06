import { Component, OnInit } from '@angular/core';
import { ProfilesService, ProfileResponse} from '../services/profiles.service';
import {MatDialog } from '@angular/material/dialog';
import { ProfileFormComponent } from '../profile-form/profile-form.component';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {Profile} from '../dtos/ProfileDTO'

@Component({
  selector: "app-user-profiles",
  templateUrl: "./user-profiles.component.html",
  styleUrls: ["./user-profiles.component.scss"]
})
export class UserProfilesComponent implements OnInit {
  title = "User Profiles";
  profiles: Profile[];
  dataSource: Profile[];
  uxFormProfiles: FormGroup;

  constructor(
    private profileService: ProfilesService,
    public dialogProfileDetail: MatDialog,
    private aForm: FormBuilder
  ) {
    this.uxFormProfiles = aForm.group({
      uxProfileActiveFilter: new FormControl("true")
    });
  }

  ngOnInit() {
    let ProfilterFilteredValue = this.GetProfileFiterValue();

    this.profileService.getProfiles().subscribe((data: Profile[]) => {
//      if (data.success) {
        this.profiles = data;
        this.dataSource = this.profiles.filter(aItem => {
          return aItem.active === ProfilterFilteredValue;
        });
//      }
    });
  }

  openDialog(aProfile?: Profile): void {
    const dialogProfileRef = this.dialogProfileDetail.open(
      ProfileFormComponent,
      {
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

    this.profileService.getProfiles().subscribe((data: Profile[]) => {
//      if (data.success) {
        this.profiles = data;

        this.dataSource = this.profiles.filter(aItem => {
          return (
            ProfileActiveFilter === undefined ||
            aItem.active === ProfileActiveFilter
          );
        });
//      }
    });
  }

  editProfileClick(aProfile: Profile) {
    this.openDialog(aProfile);
  }

  deleteProfileClick(profile: Profile) {
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

        });
    }
  }
}

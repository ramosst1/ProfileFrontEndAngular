import { ProfileAddressUpdateModel, ProfileResponse } from '../models/ProfileModels';
import { StatesResponse } from './../services/address.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ErrorMessage } from '../models/ErrorMessageModels';
import { ProfileModel, ProfileAddressModel, ProfileAddressCreateModel, ProfileCreateModel, ProfileUpdateModel } from '../models/ProfileModels';
import { AddressService, StateModel } from '../services/address.service';
import { ProfilesService } from '../services/profiles.service';
import { UserProfilesComponent } from '../user-profiles/user-profiles.component';

export interface DialogData {
  ProfileId: number;
}

@Component({
  selector: 'profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss']
})


export class ProfileFormComponent implements OnInit  {

  uxFormProfileDetail: FormGroup;
  uxFormControls;

  SelectedProfile: ProfileModel;

  StatesLists: StateModel[];
  errorMessages: Array<object> = [];

  IsUnexpectedError: boolean = false;

  constructor(
    private aProfileService: ProfilesService,
    private aAddressService: AddressService,
    private formBuilder: FormBuilder,
    public dialogProfileRef: MatDialogRef<UserProfilesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProfileModel 
  ) { 

    this.uxFormProfileDetail = formBuilder.group({
      uxFirstName: new FormControl("", [Validators.required]),
      uxLastName: new FormControl("", [Validators.required]),
      uxActive: new FormControl("false"),
      uxAddress1: new FormControl("", [Validators.required]),
      uxAddress2: new FormControl(""),
      uxCity: new FormControl("", [Validators.required]),
      uxStateAbrev: new FormControl("",[Validators.required]),
      uxZipCode: new FormControl("", [Validators.required, Validators.minLength(5), Validators.maxLength(5)]),
      uxPhoneNumber: new FormControl("555-123-5678", [Validators.required])
    });

    this.uxFormControls = this.uxFormProfileDetail.controls

    if (data !== null) {
      this.SelectedProfile = data;
      this.uxFormControls.uxFirstName.value = data.firstName;
      this.uxFormControls.uxLastName.value = data.lastName;
      this.uxFormControls.uxActive.value = data.active ? "true" : "false";

      let AddressPrimary = data.addresses.find(
        profileFilter => profileFilter.isPrimary === true
      );

      if (AddressPrimary) {
        this.uxFormControls.uxAddress1.value = AddressPrimary.address1;
        this.uxFormControls.uxAddress2.value = AddressPrimary.address2;
        this.uxFormControls.uxCity.value = AddressPrimary.city;
        this.uxFormControls.uxStateAbrev.value = AddressPrimary.stateAbrev;

        this.uxFormControls.uxZipCode.value = AddressPrimary.zipCode;
      }
    } else {
      this.uxFormControls.uxActive.value = "true";
    }

  }


  ngOnInit(){
    this.populateForm();

  }

  
  populateForm(): void {

    if (this.StatesLists === undefined) {
      this.aAddressService.getStates().subscribe((data: StatesResponse) => {
          this.StatesLists = data.states;
        }, 
        (error: ErrorMessage[]) => {
          
          this.IsUnexpectedError = true;

          this.errorMessages = error 
          
        }
      );
    }

  }
 
  closeProfileDetail(): void {
     this.dialogProfileRef.close();    
  }

  submitProfile(): void {


    if(this.SelectedProfile === undefined) {

      this.createProfileAction();


    } else if(this.SelectedProfile !== undefined) {

      this.updateProfileAction();
    }

  }

  createProfileAction(): void {

    let newProfile = new ProfileCreateModel();

    newProfile.firstName = this.uxFormControls.uxFirstName.value;
    newProfile.lastName = this.uxFormControls.uxLastName.value;
    newProfile.active =this.uxFormControls.uxActive.value === 'true'? true : false;

    {

      let primaryAddress = new ProfileAddressCreateModel();
      primaryAddress.isPrimary = true;
      primaryAddress.address1 = this.uxFormControls.uxAddress1.value;
      primaryAddress.address2 = this.uxFormControls.uxAddress2.value;
      primaryAddress.city = this.uxFormControls.uxCity.value;
      primaryAddress.stateAbrev = this.uxFormControls.uxStateAbrev.value;
      primaryAddress.zipCode = this.uxFormControls.uxZipCode.value;

      newProfile.addresses = [primaryAddress];
    }


    this.aProfileService.addProfile(newProfile).subscribe(
      (data: ProfileResponse) => {

        if(data != null){

          this.closeProfileDetail();

        }
      }, 
      (error: ErrorMessage[]) => {
        
        this.errorMessages = error;
      
      }


    );


  }

  updateProfileAction(): void {

    this.aProfileService.getProfile(this.SelectedProfile.profileId).subscribe(
      (targetedProfile: ProfileResponse) => {

        let primaryAddressToUpdate = targetedProfile.profile.addresses.find(profileFilter => profileFilter.isPrimary === true);

        let profileToUpdate = new ProfileUpdateModel();

        profileToUpdate.profileId = this.SelectedProfile.profileId;
        profileToUpdate.firstName = this.uxFormControls.uxFirstName.value;
        profileToUpdate.lastName = this.uxFormControls.uxLastName.value;
        profileToUpdate.active =this.uxFormControls.uxActive.value === 'true'? true : false;

        let primaryAddress = new ProfileAddressUpdateModel();

        if(primaryAddress) {
          primaryAddress.profileId = this.SelectedProfile.profileId;
          primaryAddress.addressId = primaryAddressToUpdate.profileId
          primaryAddress.address1 = this.uxFormControls.uxAddress1.value;
          primaryAddress.address2 = this.uxFormControls.uxAddress2.value;
          primaryAddress.city = this.uxFormControls.uxCity.value;
          primaryAddress.stateAbrev = this.uxFormControls.uxStateAbrev.value;
          primaryAddress.zipCode = this.uxFormControls.uxZipCode.value;
          primaryAddress.isPrimary = primaryAddressToUpdate.isPrimary;
          primaryAddress.isSecondary = primaryAddressToUpdate.isSecondary;
        }

        profileToUpdate.addresses.push(primaryAddress);

        this.aProfileService.updateProfile(profileToUpdate).subscribe(
          (data: ProfileResponse) => {
    
            this.closeProfileDetail();
    
          },
          (error: ErrorMessage[]) => this.errorMessages = error
            
          ) 
      }

    );

    }

}

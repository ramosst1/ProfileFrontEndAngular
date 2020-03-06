import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { UserProfilesComponent } from '../user-profiles/user-profiles.component';
import {Profile, ProfileAddress} from '../dtos/ProfileDTO'
//import { AddressTypes } from '../dtos/AddressDTO';
import { AddressService, State, StatesResponse } from '../services/address.service'
import { ProfilesService, ProfileResponse } from '../services/profiles.service';

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

  SelectedProfile: Profile;

  StatesLists: State[];

  constructor(
    private aProfileService: ProfilesService,
    private aAddressService: AddressService,
    private formBuilder: FormBuilder,
    public dialogProfileRef: MatDialogRef<UserProfilesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Profile 
  ) { 



    this.uxFormProfileDetail = formBuilder.group({
      uxFirstName: new FormControl("", [Validators.required]),
      uxLastName: new FormControl("", [Validators.required]),
      uxActive: new FormControl("false"),
      uxAddress1: new FormControl("", [Validators.required]),
      uxAddress2: new FormControl(""),
      uxCity: new FormControl("", [Validators.required]),
      uxStateAbrev: new FormControl("",[Validators.required]),
      uxZipCode: new FormControl("", [Validators.required]),
      uxPhoneNumber: new FormControl("914-584-5670", [Validators.required])
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
      });
    }

  }
 
  closeProfileDetail(): void {
     this.dialogProfileRef.close();    
  }

  submitProfile(): void {

    let AProfileResponse: ProfileResponse;


    if(this.SelectedProfile === undefined) {

       
      let NewProfile = new Profile();

      NewProfile.firstName = this.uxFormControls.uxFirstName.value;
      NewProfile.lastName = this.uxFormControls.uxLastName.value;
      NewProfile.active =this.uxFormControls.uxActive.value === 'true'? true : false;

      {

        let PrimaryAddress = new ProfileAddress();
        PrimaryAddress.isPrimary = true;
        PrimaryAddress.address1 = this.uxFormControls.uxAddress1.value;
        PrimaryAddress.address2 = this.uxFormControls.uxAddress2.value;
        PrimaryAddress.city = this.uxFormControls.uxCity.value;
        PrimaryAddress.stateAbrev = this.uxFormControls.uxStateAbrev.value;
        PrimaryAddress.zipCode = this.uxFormControls.uxZipCode.value;

        NewProfile.addresses = [PrimaryAddress];
      }


      this.aProfileService.addProfile(NewProfile).subscribe(
        (data: Profile) => {

          if(data != null){

            this.closeProfileDetail();

          }
        }


      );



    } else if(this.SelectedProfile !== undefined) {

      let ProfileToUpdate = {... this.SelectedProfile}
      ProfileToUpdate.firstName = this.uxFormControls.uxFirstName.value;
      ProfileToUpdate.lastName = this.uxFormControls.uxLastName.value;
      ProfileToUpdate.active =this.uxFormControls.uxActive.value === 'true'? true : false;

      let PrimaryAddress = ProfileToUpdate.addresses.find(profileFilter => profileFilter.isPrimary === true);

      if(PrimaryAddress){

        
        PrimaryAddress.address1 = this.uxFormControls.uxAddress1.value;
        PrimaryAddress.address2 = this.uxFormControls.uxAddress2.value;
        PrimaryAddress.city = this.uxFormControls.uxCity.value;
        PrimaryAddress.stateAbrev = this.uxFormControls.uxStateAbrev.value;
        PrimaryAddress.zipCode = this.uxFormControls.uxZipCode.value;
        
      }

      this.aProfileService.updateProfile(ProfileToUpdate)

      this.closeProfileDetail();

    }


  }
}

import { Injectable } from '@angular/core';
import { AddressModel } from './AddressModels';
import { ApiResponseBase } from './ApiResponseModels';

@Injectable({
    providedIn: 'root'
  })

  export class ProfileAddressModel extends AddressModel {
    profileId: number;
    addressId: number;
  }

  export class ProfileAddressCreateModel extends AddressModel {
    addressId: number;
  }

  export class ProfileAddressUpdateModel extends AddressModel {
    profileId: number;
    addressId: number;
  }

  export class ProfileResponse extends ApiResponseBase {
    profile: ProfileModel;
  }

  export class ProfilesResponse extends ApiResponseBase {
    profiles: ProfileModel[];
  }

  export class ProfileModel {
    profileId:number;
    firstName: string;
    lastName: string;
    active:boolean;
    addresses: ProfileAddressModel[] = new Array();
  }

  export class ProfileCreateModel {
    firstName: string;
    lastName: string;
    active:boolean;
    addresses: ProfileAddressCreateModel[] = new Array();
  }

  export class ProfileUpdateModel {
    profileId:number;
    firstName: string;
    lastName: string;
    active:boolean;
    addresses: ProfileAddressCreateModel[] = new Array();
  }

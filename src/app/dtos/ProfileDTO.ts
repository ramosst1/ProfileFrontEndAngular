import { Injectable } from '@angular/core';
import { Address } from '../dtos/AddressDTO';

@Injectable({
    providedIn: 'root'
  })

  export class ProfileAddress extends Address {
    profileId: number;
    addressId: number

  }
  export class Profile {
    profileId:number;
    firstName: string;
    lastName: string;
    active:boolean;
    addresses: ProfileAddress[] = new Array();
  
  }
  
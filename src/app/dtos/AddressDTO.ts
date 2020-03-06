import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})


export class Address {
  addressId: Number;
  isPrimary: boolean;
  isSecondary: boolean;
  address1: String;
  address2: String;
  city: String;
  stateAbrev: String;
  zipCode: String;
}

// export enum AddressTypes {
//   Primary = 1,
//   Business = 2
// }


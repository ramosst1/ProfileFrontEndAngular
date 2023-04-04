import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})

export class AddressModel {
  addressId: Number;
  isPrimary: boolean;
  isSecondary: boolean;
  address1: String;
  address2: String;
  city: String;
  stateAbrev: String;
  zipCode: String;
}
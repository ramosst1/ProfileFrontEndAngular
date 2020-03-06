import { Injectable } from '@angular/core';
//import {Address, AddressTypes} from '../dtos/AddressDTO'
import {Profile, ProfileAddress} from '../dtos/ProfileDTO'
import {environment} from '../../environments/environment'
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError  } from 'rxjs';
import { catchError, retry } from 'rxjs/operators'
interface PageResponse {
    errorMessage: string [];
    success: boolean;
}

export class ProfileResponse implements PageResponse {


    errorMessage = new Array();
    success= false;
    profiles: Profile[] = new Array();
    addresses: ProfileAddress[] = new Array();
}


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: "root"
})
export class ProfilesService {


  constructor(private http: HttpClient) {}

  private CurrentProfiles: Profile[] = new Array();
  private CurrentProfileResponse: ProfileResponse;


  public getProfiles(active?: boolean) {

    this.http
      .get(environment.URLServicesProfile)
      .subscribe((data: Profile[]) => {
        this.CurrentProfiles = data;
      });

    return this.http.get(environment.URLServicesProfile)
    .pipe(
      catchError(this.handleError)
    );
  }

  public addProfile(profile: Profile) {
    return this.http.put(
      environment.URLServicesProfile,
      profile, httpOptions
    )
  }

  public deleteProfile(aProfile: Profile) {
    let URLGetProfile = environment.URLServicesProfile;

    let ProfileParams = new HttpParams().set(
      "profileId",
      aProfile.profileId.toString()
    );

    let options = { params: ProfileParams };
    return this.http.delete(`${URLGetProfile}/${aProfile.profileId}`);
  }

  public updateProfile(profile: Profile) {
    let ProfileToUpdate: Profile;

    let URLGetProfile = environment.URLServicesProfile;


    this.http
      .post(URLGetProfile, profile, httpOptions)
      .subscribe((data: Profile) => {
//        if (data.success) {
          ProfileToUpdate = data;

          ProfileToUpdate.active = profile.active;
          ProfileToUpdate.firstName = profile.firstName;
          ProfileToUpdate.lastName = profile.lastName;

          let PrimaryAddress = ProfileToUpdate.addresses.find(
            aItem => aItem.isPrimary === true
          );

          let PrimaryAddressNew = profile.addresses.find(
            aItem => aItem.isPrimary === true
          );

          if (PrimaryAddress) {
            PrimaryAddress.address1 = PrimaryAddressNew.address1;
            PrimaryAddress.address2 = PrimaryAddressNew.address2;
            PrimaryAddress.city = PrimaryAddressNew.city;
            PrimaryAddress.stateAbrev = PrimaryAddressNew.stateAbrev;
            PrimaryAddress.zipCode = PrimaryAddressNew.zipCode;

            ProfileToUpdate.addresses = new Array(PrimaryAddress);
          } else {
            PrimaryAddressNew.profileId = profile.profileId;
            ProfileToUpdate.addresses = new Array(PrimaryAddressNew);
          }

          this.SendUpdateProfile(ProfileToUpdate).subscribe(
            (data: ProfileResponse) => {
              // Rignt now do nothing
            }
          );
//        }
      });
  }


  private SendUpdateProfile(aProfile: Profile) {
    let URLUpdateProfile = environment.URLServicesProfile;

    return this.http.post(`${URLUpdateProfile}/`, aProfile);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
}


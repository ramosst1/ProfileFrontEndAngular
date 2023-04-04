import { Injectable } from '@angular/core';
import {ProfilesResponse, ProfileModel, ProfileCreateModel, ProfileUpdateModel, ProfileResponse} from '../dtos/ProfileDTO';
import {ErrorMessage} from '../dtos/ErrorMessageDTO'
import {environment} from '../../environments/environment'
import { HttpClient, HttpHeaders, HttpErrorResponse  } from '@angular/common/http';
import { Observable, throwError  } from 'rxjs';
import { catchError  } from 'rxjs/operators';



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

  public getProfiles(active?: boolean): Observable<ProfilesResponse>  {

    return this.http
      .get<ProfilesResponse>(environment.URLServicesProfile)
      .pipe(
        catchError(this.handleError)
      )

  }

  public getProfile(profileId: Number): Observable<ProfileResponse> {

      return this.http.get<ProfileResponse>(`${environment.URLServicesProfile}/${profileId}`)
      .pipe(
        catchError(this.handleError)
      )

  }

  public addProfile(profile: ProfileCreateModel): Observable<ProfileResponse> {
    return this.http.post<ProfileResponse>(
      environment.URLServicesProfile,
      profile, httpOptions
    ).pipe(
      catchError(this.handleError)
    )
  }

  public deleteProfile(aProfile: ProfileModel): Observable<boolean>{
    let URLGetProfile = `${environment.URLServicesProfile}/${aProfile.profileId}`;

    return this.http.delete<boolean>(URLGetProfile)
    .pipe(
      catchError(this.handleError)
    )

  }

  public updateProfile(profile: ProfileUpdateModel): Observable<ProfileResponse> {

    let URLUpdateProfile = environment.URLServicesProfile;

    return this.http.put<ProfileResponse>(`${URLUpdateProfile}/`, profile)
    .pipe(
      catchError(this.handleError)

    )

  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,

      let ErrorList: ErrorMessage[]

      ErrorList = error.error

      return throwError(ErrorList)
    }
    return throwError(
      'An unexpected error occured. Please try again later.');
  };
}


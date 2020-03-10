import { Injectable } from '@angular/core';
import {Profile} from '../dtos/ProfileDTO'
import {environment} from '../../environments/environment'
import { HttpClient, HttpHeaders, HttpErrorResponse  } from '@angular/common/http';
import { Observable, throwError  } from 'rxjs';
import { catchError  } from 'rxjs/operators';

export class ErrorMessage {
    statusCode: string;
    fieldName: string;
    message: string;
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

  public getProfiles(active?: boolean): Observable<Profile[]>  {

    return this.http
      .get<Profile[]>(environment.URLServicesProfile)
      .pipe(
        catchError(this.handleError)
      )

  }

  public getProfile(profileId: Number): Observable<Profile> {

      return this.http.get<Profile>(`${environment.URLServicesProfile}/${profileId}`)
      .pipe(
        catchError(this.handleError)
      )

  }

  public addProfile(profile: Profile): Observable<Profile> {
    return this.http.put<Profile>(
      environment.URLServicesProfile,
      profile, httpOptions
    ).pipe(
      catchError(this.handleError)
    )
  }

  public deleteProfile(aProfile: Profile): Observable<boolean>{
    let URLGetProfile = `${environment.URLServicesProfile}/${aProfile.profileId}`;

    return this.http.delete<boolean>(URLGetProfile)
    .pipe(
      catchError(this.handleError)
    )

  }

  public updateProfile(profile: Profile): Observable<any> {

    let URLUpdateProfile = environment.URLServicesProfile;

    return this.http.post<Profile>(`${URLUpdateProfile}/`, profile)
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
      return throwError(error.error)
    }
    // return an observable with a user-facing error message
    return throwError(
      'An unexpected error occured. Please try again later.');
  };
}


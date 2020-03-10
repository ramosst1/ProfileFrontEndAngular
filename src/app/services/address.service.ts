import { Injectable } from "@angular/core";
import { HttpClient, HttpClientModule, HttpResponse, HttpErrorResponse  } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';
import { ErrorMessage } from '../dtos/ErrorMessageDTO';

export interface State {
  StateAbrev: String;
  StateName: String;
}

@Injectable({
  providedIn: "root"
})
export class AddressService {
  
  constructor(private http: HttpClient) {
  };

  //#region Get States

  getStates() {

    return this.http.get(environment.URLServicesStates).pipe(
      catchError(this.handleError)
    );

  }

  //#endregion

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
    // return an observable with a user-facing error message
    return throwError(
      'An unexpected error occured. Please try again later.');
    };
  }

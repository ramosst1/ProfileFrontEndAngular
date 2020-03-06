import { Injectable } from "@angular/core";
import { HttpClient, HttpClientModule, HttpResponse  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface State {
  StateAbrev: String;
  StateName: String;
}

@Injectable({
  providedIn: "root"
})
export class AddressService {
  
  AStateResponse: StatesResponse;

  constructor(private http: HttpClient) {


  };

  //#region Get States

  getStates() {

    return this.http.get(environment.URLServicesStates);

  }

  //#endregion
}


export class ErrorMessage {
  internalMessage:string;
  externalMessage: string;
}

export class StatesResponse  {
  success:boolean;
  errorMessages: ErrorMessage[]   
  states: State[];




}


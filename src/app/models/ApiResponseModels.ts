import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})

  export class ErrorMessageModel {
    internalMessage: string;
    externalMessage: string;
  }

  export class ApiResponseBase {
    success: boolean;
    messages: ErrorMessageModel[];
  }

  export class ApiResponse extends ApiResponseBase {

  }

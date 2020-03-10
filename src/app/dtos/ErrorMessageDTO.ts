import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })

  export class ErrorMessage {
    statusCode: string;
    message: string;
    fieldName: string;
  
  }
  
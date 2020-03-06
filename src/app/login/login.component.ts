import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, ErrorStateMatcher } from '@angular/material';
import { DialogData } from '../profile-form/profile-form.component';
import { FormGroup, FormBuilder, FormControlName, FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  uxForm: FormGroup;
  matcher = new MyErrorStateMatcher();

  constructor( 
    public dialogRef: MatDialogRef<LoginComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: DialogData, 
    fb: FormBuilder
  ) { 

      this.uxForm = fb.group({
        emailFormControl: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(40),
          Validators.email,
        ]),
        uxUserPassword: new FormControl('',[
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(40),
        ])
      });
      
    }

    submitLogin(): void{
      this.dialogRef.close();

    }

    cancelLogin(): void{
      this.dialogRef.close();

    }

  ngOnInit() {
  }

}

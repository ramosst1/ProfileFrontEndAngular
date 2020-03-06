import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {MatDatepickerModule, MatInputModule} from '@angular/material/';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  uxFormInfo: FormGroup;
  FormInfoControls;

  clickCounter: number = 0;

  constructor(private formBuilder: FormBuilder) { 

    this.uxFormInfo = formBuilder.group({
      uxFirstName: '',
      uxLastName: '',
      uxYourInfo: '',
      uxDatePicked: ''
    
    });

    this.FormInfoControls = this.uxFormInfo.controls

  }



  inCrementCounterClick(increment:number){
    this.clickCounter += increment; 
  }

  resetCounter(){
    this.clickCounter = 0;
  }

  resetPersonInfoFormClick(){
    this.uxFormInfo.reset();
    this.FormInfoControls.uxFirstName.value = "";
    this.FormInfoControls.uxLastName.value = "";
    this.FormInfoControls.uxDatePicked.value = "";
    this.FormInfoControls.uxYourInfo.value = "";

  }

  onSubmit(customerData) {
    // Process checkout data here
    console.warn('Your order has been submitted', customerData);

  }  
  ngOnInit() {
  }

}

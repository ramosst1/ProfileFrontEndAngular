import { Component, OnInit } from '@angular/core';
import { ApiStateResponse, ServiceApiResponse } from '../util/httpRequest/ServiceApiResponse';
import { ProfilesResponse } from '../models/ProfileModels';
import { ProfilesService} from '../services/profiles.service';

@Component({
  selector: 'about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {

  loadingData = false;
  apiStateResponse = new ApiStateResponse();


  constructor(private profileService: ProfilesService){


  }

  ngOnInit() {

    if(this.apiStateResponse.loading !== this.loadingData){
      alert("loading")

    }



  }
  ngDoCheck() {

    alert('teset');
    this.loadingData = this.apiStateResponse.loading;

  }

  loadData(){

    alert("test")

    const profileServiceResponse = new ServiceApiResponse(this.apiStateResponse);

    console.log(this.apiStateResponse.loading);
  
    profileServiceResponse.getRequestAsync(this.profileService.getProfiles())
    .then((data) => {

      console.log("data: " + data)
      console.log("fetch" + (this.apiStateResponse.response as ProfilesResponse));
      console.log("fetch" + this.apiStateResponse.loading);
  
      this.loadingData = this.apiStateResponse.loading;
  
    })

    
  }

  

}

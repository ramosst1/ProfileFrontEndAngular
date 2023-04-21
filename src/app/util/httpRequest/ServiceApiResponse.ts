import { Observable } from 'rxjs';

export default interface IErrorMessageModel {
    message:String;
    statusCode:String;
} 

export class ApiStateResponse {
    messages: IErrorMessageModel[] = [];
    response: any = undefined;
    loading: boolean = false;
}

export class ServiceApiResponse {

    private apiResponse = new ApiStateResponse();

    constructor(apiStateResponse: ApiStateResponse) {
        this.apiResponse = apiStateResponse;

    }

    async getRequestAsync<TApiResponse>(service:Observable<any>){

        let finalResponse: TApiResponse = null;

        try {
            this.apiResponse.loading = true;

            return service.subscribe((data) => {

                finalResponse = (data) as TApiResponse;

                this.apiResponse.loading = false;

                this.apiResponse.response = finalResponse;
                
            })
            
        } finally {
            this.apiResponse.loading = false
        }

    }
}

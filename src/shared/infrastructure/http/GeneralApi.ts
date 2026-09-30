import axios from 'axios';
import { GeneralApiResult,GeneralApiResultFactory } from '../DataTransferObjects/GeneralApiResult';




    export class GeneralApi{

        private CachedPostRequests: PostRequest[] = [];
      
        constructor(){
           
        }

    async GeneralApiCaller<T>(method: 'GET' | 'POST' | 'PUT' | 'DELETE', url: string, data?: any, headers?: any): Promise<GeneralApiResult<T>> {
        try 
        {           
            return await this.ApiReferee<T>(method, url, data, headers);
        } 
        catch (error: any)         
        {
            return GeneralApiResultFactory.CreateFromErrorResponse<T>(error); 
        }
    }


  async ApiReferee <T>(method: 'GET' | 'POST' | 'PUT' | 'DELETE', url: string, data?: any, headers?: any): Promise<GeneralApiResult<T>> {
    if(method === 'POST')
        return await this.IdemponentApiCaller<T>(url, data, headers);
    else
        return await this.ApiCaller<T>(method, url, data, headers);
  }

async ApiCaller<T>(method: 'GET' | 'POST' | 'PUT' | 'DELETE', url: string, data?: any, headers?: any): Promise<GeneralApiResult<T>> {
       
            const response = await axios({
                method: method,
                url: url,
                data: data,
                headers: headers,
                withCredentials: true
            });
          

            return new GeneralApiResult<T>(
                true,
                null,
                null,
                response.data
            );

      
    }

    

    async IdemponentApiCaller<T>(url: string, data?: any, headers?: any): Promise<GeneralApiResult<T>> {
       
        let idempotencyKey;
        idempotencyKey = this.GetIdomponentKeyFromCache(url,data);
        if(!idempotencyKey)
        {   
            this.RemoveCachedRequest(url,data);
            idempotencyKey = crypto.randomUUID();
            this.CachedPostRequests.push(new PostRequest(url,data,idempotencyKey));
        }

        try
        {
            return await this.ApiCaller<T>('POST', url, data, {'Idempotency-Key': idempotencyKey,...headers});
        }
        finally
        {
            this.RemoveCachedRequest(url,data);
        }
        

    }

    GetIdomponentKeyFromCache(url:string,data:any):string|null{
        for(let cachedRequest of this.CachedPostRequests)
        {
            if(cachedRequest.url === url && cachedRequest.data === JSON.stringify(data))
                return cachedRequest.idempotencyKey;
        }
        return null;
    }

    RemoveCachedRequest(url:string,data:any):void{
        this.CachedPostRequests = this.CachedPostRequests.filter(cachedRequest => !(cachedRequest.url === url && cachedRequest.data === JSON.stringify(data)));
    }


}

export class PostRequest{
    url:string;
    data:string;
    idempotencyKey:string;
    constructor(url:string, data:any, idempotencyKey:string)
    {
            this.url = url;
            this.data = JSON.stringify(data);
            this.idempotencyKey = idempotencyKey;
    }
}
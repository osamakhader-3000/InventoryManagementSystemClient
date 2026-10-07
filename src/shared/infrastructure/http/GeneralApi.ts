import axios from 'axios';
import { ErrorTypes, GeneralApiResult,GeneralApiResultFactory } from '../DataTransferObjects/GeneralApiResult';
import { IHttpSessionHandler } from './IHttpSessionHandler';
import { IHttpErrorReporter } from './IHttpErrorReporter';




    export class GeneralApi{

        private static sessionHandler: IHttpSessionHandler | null = null;
        private static errorReporter: IHttpErrorReporter | null = null;
        private static pendingRefresh: Promise<boolean> | null = null;

        private CachedPostRequests: PostRequest[] = [];

        constructor(){

        }

    static Configure(sessionHandler: IHttpSessionHandler, errorReporter: IHttpErrorReporter): void {
        GeneralApi.sessionHandler = sessionHandler;
        GeneralApi.errorReporter = errorReporter;
    }

    // Authenticated call: on 401 the session is refreshed once and the request retried.
    async SecureApiCaller<T>(method: 'GET' | 'POST' | 'PUT' | 'DELETE', url: string, data?: any, headers?: any): Promise<GeneralApiResult<T>> {
        let result = await this.ApiCaller<T>(method, url, data, headers);

        if (result.ErrorType == ErrorTypes.Unauthorized && await GeneralApi.RefreshSession())
            result = await this.ApiCaller<T>(method, url, data, headers);

        GeneralApi.ReportFailure(result);
        return result;
    }

    // For endpoints that must not trigger a session refresh (login, refresh, email verification...).
    async ApiCaller<T>(method: 'GET' | 'POST' | 'PUT' | 'DELETE', url: string, data?: any, headers?: any): Promise<GeneralApiResult<T>> {
        try
        {
            return await this.ApiReferee<T>(method, url, data, headers);
        }
        catch (error: any)
        {
            return GeneralApiResultFactory.CreateFromErrorResponse<T>(error);
        }
    }

    // Concurrent 401s share a single refresh request.
    private static RefreshSession(): Promise<boolean> {
        if (!GeneralApi.sessionHandler)
            return Promise.resolve(false);

        if (!GeneralApi.pendingRefresh)
            GeneralApi.pendingRefresh = GeneralApi.sessionHandler.RefreshSession()
                .catch(() => false)
                .finally(() => { GeneralApi.pendingRefresh = null; });

        return GeneralApi.pendingRefresh;
    }

    private static ReportFailure<T>(result: GeneralApiResult<T>): void {
        if (result.success)
            return;

        if (result.ErrorType == ErrorTypes.Unauthorized)
            GeneralApi.sessionHandler?.SessionExpired();
        else if (result.ErrorType == ErrorTypes.EmailVerificationRequired)
            GeneralApi.sessionHandler?.EmailVerificationRequired();
        else
            GeneralApi.errorReporter?.ErrorOccured(result.resultMessage ?? "Unknown error");
    }


  async ApiReferee <T>(method: 'GET' | 'POST' | 'PUT' | 'DELETE', url: string, data?: any, headers?: any): Promise<GeneralApiResult<T>> {
    if(method === 'POST')
        return await this.IdemponentApiCaller<T>(url, data, headers);
    else
        return await this.SendHttpRequest<T>(method, url, data, headers);
  }

async SendHttpRequest<T>(method: 'GET' | 'POST' | 'PUT' | 'DELETE', url: string, data?: any, headers?: any): Promise<GeneralApiResult<T>> {
       
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
            return await this.SendHttpRequest<T>('POST', url, data, {'Idempotency-Key': idempotencyKey,...headers});
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
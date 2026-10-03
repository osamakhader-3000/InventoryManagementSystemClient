import urls from '../../shared/infrastructure/http/urls.json';
import { IRelocationRepository } from '../../Application/Repositories/IRelocationRepository';


export class RelocationRepository implements IRelocationRepository{ 

    private baseUrl:string;


    constructor(){
       this.baseUrl =  urls["security-app-domain"];
    }
    
    GetMicrosoftLoginUrl():string{
       return `${this.baseUrl}/${urls['microsoft-login']}`;
    }

    
}
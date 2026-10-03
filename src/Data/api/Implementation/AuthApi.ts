import { GeneralApi } from "../../../shared/infrastructure/http/GeneralApi";
import { IAuthApi } from "../Interfaces/IAuthApi";
import urls from '../../../shared/infrastructure/http/urls.json';
import { GeneralApiResult } from "../../../shared/infrastructure/DataTransferObjects/GeneralApiResult";

export class AuthApi extends GeneralApi implements IAuthApi {

    private baseUrl: string;

    constructor() {
        super();
        this.baseUrl = urls['security-app-domain'];
    }


    Refresh(): Promise<GeneralApiResult<Date>> {
        const url = `${this.baseUrl}/${urls["refresh-token"]}`;
        return this.GeneralApiCaller<Date>('POST', url);
    }
}
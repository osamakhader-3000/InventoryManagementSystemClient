import TrialLog from '../domain/TrialLog';
import urls from '../../../shared/infrastructure/http/urls.json'
import { GeneralApi } from "../../../shared/infrastructure/http/GeneralApi";
import { GeneralApiResult } from "../../../shared/infrastructure/DataTransferObjects/GeneralApiResult";

export default class TrialLogApi extends GeneralApi {
    private baseUrl:string;

    constructor(){
        super();
        this.baseUrl = `${urls['inventory-management-system-app']}${urls['inventory-domain']}${urls['trial-log']}`;
    }

    async ListTrialLogs(): Promise<GeneralApiResult<TrialLog[]>> {
        let url = `${this.baseUrl}${urls['trial-log-list']}`;
        let result = await this.SecureApiCaller<TrialLog[]>('GET',url);
        return result;
    }
}

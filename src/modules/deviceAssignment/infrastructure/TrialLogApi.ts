import TrialLog from '../domain/TrialLog';
import TrialLogFilter from '../domain/TrialLogFilter';
import urls from '../../../shared/infrastructure/http/urls.json'
import { GeneralApi } from "../../../shared/infrastructure/http/GeneralApi";
import { GeneralApiResult } from "../../../shared/infrastructure/DataTransferObjects/GeneralApiResult";

export default class TrialLogApi extends GeneralApi {
    private baseUrl:string;

    constructor(){
        super();
        this.baseUrl = `${urls['inventory-management-system-app']}${urls['inventory-domain']}${urls['trial-log']}`;
    }

    async ListTrialLogs(filter?: TrialLogFilter): Promise<GeneralApiResult<TrialLog[]>> {
        const params = new URLSearchParams();
        if (filter?.userId) params.append('userid', filter.userId);
        if (filter?.departmentId) params.append('depid', filter.departmentId);
        if (filter?.eventDate) params.append('eventDate', filter.eventDate);
        if (filter?.transactionType !== undefined) params.append('ta', filter.transactionType.toString());
        if (filter?.serialNumber) params.append('sn', filter.serialNumber);
        if (filter?.model) params.append('model', filter.model);
        if (filter?.status !== undefined) params.append('status', filter.status.toString());

        const query = params.toString();
        let url = `${this.baseUrl}${urls['trial-log-list']}${query ? `?${query}` : ''}`;
        let result = await this.SecureApiCaller<TrialLog[]>('GET',url);
        return result;
    }
}

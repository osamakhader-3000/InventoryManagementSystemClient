import { ITrialLogRepository } from "../domain/ITrialLogRepository";
import TrialLog from "../domain/TrialLog";
import TrialLogApi from "./TrialLogApi";

export class HttpTrialLogRepository implements ITrialLogRepository {
    private trialLogApi: TrialLogApi;

    constructor() {
        this.trialLogApi = new TrialLogApi();
    }

    async ListTrialLogs(): Promise<TrialLog[]> {
        let result = await this.trialLogApi.ListTrialLogs();
        if (!Array.isArray(result.data))
            return [];
        return result.data ?? [];
    }
}

import { ITrialLogRepository } from "../domain/ITrialLogRepository";
import TrialLog from "../domain/TrialLog";
import TrialLogAgent from "../domain/TrialLogAgent";
import TrialLogFilter from "../domain/TrialLogFilter";
import TrialLogApi from "./TrialLogApi";

export class HttpTrialLogRepository implements ITrialLogRepository {
    private trialLogApi: TrialLogApi;

    constructor() {
        this.trialLogApi = new TrialLogApi();
    }

    async ListTrialLogs(filter?: TrialLogFilter): Promise<TrialLog[]> {
        let result = await this.trialLogApi.ListTrialLogs(filter);
        if (!Array.isArray(result.data))
            return [];
        return result.data ?? [];
    }

    async ListAgents(): Promise<TrialLogAgent[]> {
        const result = await this.trialLogApi.ListAgents();
        if (!Array.isArray(result.data))
            return [];
        return result.data ?? [];
    }
}

import TrialLog from './TrialLog';
import TrialLogAgent from './TrialLogAgent';
import TrialLogFilter from './TrialLogFilter';

export interface ITrialLogRepository {
    ListTrialLogs(filter?: TrialLogFilter): Promise<TrialLog[]>;
    ListAgents(): Promise<TrialLogAgent[]>;
}

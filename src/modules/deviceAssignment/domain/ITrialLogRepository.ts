import TrialLog from './TrialLog';
import TrialLogFilter from './TrialLogFilter';

export interface ITrialLogRepository {
    ListTrialLogs(filter?: TrialLogFilter): Promise<TrialLog[]>;
}

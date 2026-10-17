import TrialLog from './TrialLog';

export interface ITrialLogRepository {
    ListTrialLogs(): Promise<TrialLog[]>;
}

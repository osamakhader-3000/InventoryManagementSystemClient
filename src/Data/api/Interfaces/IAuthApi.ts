import { GeneralApiResult } from '../../../shared/infrastructure/DataTransferObjects/GeneralApiResult';

export interface IAuthApi {

    Refresh(): Promise<GeneralApiResult<Date>>;

}
import { AuthenticationResult } from "../domain/AuthenticationResult";
import { GeneralApiResult } from "../../../shared/infrastructure/DataTransferObjects/GeneralApiResult";

export interface IAuthSessionService {
    Refresh(): Promise<AuthenticationResult>;
    AfterLogin(fn: () => Promise<GeneralApiResult<Date>>): Promise<AuthenticationResult>;
}

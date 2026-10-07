import { AuthenticationResult } from "../domain/AuthenticationResult.ts";
import { IAuthApi } from "./IAuthApi.ts";
import { GeneralApiResult } from "../../../shared/infrastructure/DataTransferObjects/GeneralApiResult.ts";
import { IAuthStorage } from "../../../Data/LocalData/Interfaces/IAuthStorage";
import { AuthEventBus } from './AuthEventBus.ts';
import { ErrorHandlingBus } from '../../../shared/infrastructure/messaging/ErrorHandlingBus.ts';
import { IHttpSessionHandler } from "../../../shared/infrastructure/http/IHttpSessionHandler.ts";
import { IAuthSessionService } from "./IAuthSessionService.ts";

export class AuthSessionService implements IAuthSessionService, IHttpSessionHandler {
  protected authApi: IAuthApi;
  protected authStorage: IAuthStorage;
  private authEventBus: AuthEventBus;
  private errorHandlingBus: ErrorHandlingBus;


  constructor(authApi: IAuthApi, authStorage: IAuthStorage, authEventBus: AuthEventBus, errorHandlingBus: ErrorHandlingBus) {
    this.authApi = authApi;
    this.authStorage = authStorage;
    this.authEventBus = authEventBus;
    this.errorHandlingBus = errorHandlingBus;
  }

  async RefreshSession(): Promise<boolean> {
    let authResult = await this.Refresh();
    return authResult.success;
  }

  SessionExpired(): void {
    this.authEventBus.UnauthorizedAccessAttempted();
  }

  EmailVerificationRequired(): void {
    this.authEventBus.EmailVerificationRequired();
  }


  async Refresh(): Promise<AuthenticationResult> {

    let loginResult = await this.authApi.Refresh();
    if (loginResult.data && loginResult.success) {
      this.SaveLoginResult(loginResult.success, loginResult.data);

    }

    return this.CreateAuthResultFromApiResult(loginResult);

  }

  CreateAuthResultFromApiResult(apiResult: any): AuthenticationResult {
    return apiResult.data ? new AuthenticationResult(new Date(apiResult.data), true) : new AuthenticationResult(null, false);
  }

  SaveLoginResult(success: boolean | null, expireTime: Date | null): void {
    if (success && expireTime)
      this.authStorage.SetLoginExpireTime(new Date(expireTime));
    else
      this.authStorage.RemoveLoginExpireTime();
  }


  async AfterLogin(fn: () => Promise<GeneralApiResult<Date>>): Promise<AuthenticationResult> {


    let loginResult = await fn();

    if (loginResult.data && loginResult.success) {
      this.SaveLoginResult(loginResult.success, loginResult.data);
      return new AuthenticationResult(loginResult.data, true);
    }


    this.errorHandlingBus.ErrorOccured(loginResult?.resultMessage ?? "Unknown error");
    return new AuthenticationResult(null, false);

  }

}

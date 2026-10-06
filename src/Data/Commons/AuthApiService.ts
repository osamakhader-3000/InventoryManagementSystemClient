// Repository.ts

import { AuthenticationResult } from "../../modules/Security/domain/AuthenticationResult.ts";
import { IAuthApi } from "../api/Interfaces/IAuthApi.ts";
import { GeneralApiResult } from "../../shared/infrastructure/DataTransferObjects/GeneralApiResult.ts";
import { IAuthStorage } from "../LocalData/Interfaces/IAuthStorage";
import { AuthEventBus } from '../../modules/Security/infrastructure/AuthEventBus.ts';
import { ErrorHandlingBus } from '../../shared/infrastructure/messaging/ErrorHandlingBus.ts';
import { IAuthService } from "./IAuthService.ts";

export class AuthApiService implements IAuthService {
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

  async ProtectedAccess<T>(fn: () => T): Promise<T> {

    let authResult: AuthenticationResult | null = null;

    try {
      let result = await fn();

      if (result && result instanceof GeneralApiResult && !result.success && result.ErrorType == 'Unauthorized')
        authResult = await this.Refresh();

      if (authResult && authResult.success)
        result = await fn();

      if (result && result instanceof GeneralApiResult && !result.success) {
        if (result.ErrorType == 'Unauthorized')
          this.authEventBus.UnauthorizedAccessAttempted();
        else if (result.ErrorType == 'EmailVerificationRequired')
          this.authEventBus.EmailVerificationRequired();
        else
          throw new Error(result.resultMessage ?? "Unknown error");
      }

      if (result == null)
        throw new Error("Unknown error");

      return result;
    }
    catch (error: any) {
      this.errorHandlingBus.ErrorOccured(error?.message ?? "Unknown error");
      return null as any;
    }
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
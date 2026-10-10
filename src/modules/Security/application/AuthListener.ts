import { AuthEventBus } from "../infrastructure/AuthEventBus.ts";
import { ErrorHandlingBus } from "../../../shared/infrastructure/messaging/ErrorHandlingBus.ts";
import { IAuthService } from "../domain/IAuthService.ts";

export class  AuthListener{
    private authEventBus:AuthEventBus;
    private errorHandlingBus:ErrorHandlingBus;
    private authService:IAuthService;

    constructor(authEventBus:AuthEventBus,errorHandlingBus:ErrorHandlingBus,authService:IAuthService){
        this.authEventBus = authEventBus;
        this.errorHandlingBus = errorHandlingBus;
        this.authService = authService;

    }

     StartListening() {
        this.authEventBus.SubscribeToDenyAccess(() => {
            this.authService.Logout();
            this.errorHandlingBus.ErrorOccured("Your session has expired. Please log in again.");
        });
    }
}

import { AuthEventBus } from "../infrastructure/AuthEventBus.ts";
import { ErrorHandlingBus } from "../../../shared/infrastructure/messaging/ErrorHandlingBus.ts";
import { IUserService } from "../../../Application/Interfaces/IUserService.ts";

export class  AuthListener{
    private authEventBus:AuthEventBus;
    private errorHandlingBus:ErrorHandlingBus;
    private userService:IUserService;

    constructor(authEventBus:AuthEventBus,errorHandlingBus:ErrorHandlingBus,authService:IUserService){
        this.authEventBus = authEventBus;
        this.errorHandlingBus = errorHandlingBus;
        this.userService = authService;

    }

     StartListening() {
        this.authEventBus.SubscribeToDenyAccess(() => {
            this.userService.Logout();
            this.errorHandlingBus.ErrorOccured("Your session has expired. Please log in again.");
        });
    }
}

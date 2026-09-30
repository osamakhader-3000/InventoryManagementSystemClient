import { AuthEventBus } from "../../Channels/AuthEventBus.js";
import { IUserService } from "../../Application/Interfaces/IUserService.ts";

export class  AuthListener{
    private authEventBus:AuthEventBus;
    private userService:IUserService;

    constructor(authEventBus:AuthEventBus,authService:IUserService){ 
        this.authEventBus = authEventBus;
        this.userService = authService;

    }

     StartListening() {
        this.authEventBus.SubscribeToDenyAccess(() => {
            this.userService.Logout();
        });
    }
}


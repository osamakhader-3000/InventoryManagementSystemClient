import { SharedDependencies } from '../../shared/composition';
import { GeneralApi } from '../../shared/infrastructure/http/GeneralApi';
import { IAuthService } from './domain/IAuthService';
import { IUserService } from './domain/IUserService';
import { IRelocationService } from './domain/IRelocationService';
import { AuthService } from './application/AuthService';
import { UserService } from './application/UserService';
import { AuthListener } from './application/AuthListener';
import { AuthApi } from './infrastructure/AuthApi';
import { AuthEventBus } from './infrastructure/AuthEventBus';
import { AuthRepository } from './infrastructure/AuthRepository';
import { AuthSessionService } from './infrastructure/AuthSessionService';
import { AuthStorage } from './infrastructure/AuthStorage';
import { RelocationService } from './infrastructure/RelocationService';
import { UserApi } from './infrastructure/UserApi';
import { UserRepository } from './infrastructure/UserRepository';

export interface SecurityDependencies {
    authService: IAuthService;
    userService: IUserService;
    relocationService: IRelocationService;
    authEventBus: AuthEventBus;
}

export function createSecurityDependencies({ errorHandlingBus }: SharedDependencies): SecurityDependencies {
    const authEventBus = new AuthEventBus();
    const authStorage = new AuthStorage();
    const authApi = new AuthApi();

    const authSessionService = new AuthSessionService(authApi, authStorage, authEventBus, errorHandlingBus);
    GeneralApi.Configure(authSessionService, errorHandlingBus);

    const authService = new AuthService(new AuthRepository(authApi, authStorage, authSessionService));
    const userService = new UserService(new UserRepository(new UserApi()), authService);

    new AuthListener(authEventBus, errorHandlingBus, authService).StartListening();

    return {
        authService,
        userService,
        relocationService: new RelocationService(),
        authEventBus,
    };
}

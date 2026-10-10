import { ErrorHandlingBus } from './infrastructure/messaging/ErrorHandlingBus';
import { NotificationHandlingBus } from './infrastructure/messaging/NotificationHandlingBus';

export interface SharedDependencies {
    errorHandlingBus: ErrorHandlingBus;
    notificationHandlingBus: NotificationHandlingBus;
}

export function createSharedDependencies(): SharedDependencies {
    return {
        errorHandlingBus: new ErrorHandlingBus(),
        notificationHandlingBus: new NotificationHandlingBus(),
    };
}

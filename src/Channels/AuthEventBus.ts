export class AuthEventBus {
    private accessDeniedListeners: Array<() => void> = [];
    private expiredLoginListeners: Array<() => void> = [];
    private emailVerificationRequiredListeners: Array<() => void> = [];

    constructor() {}
    SubscribeToDenyAccess( listener: () => void): void {
        this.accessDeniedListeners.push(listener);
    }
    UnsubscribeToDenyAccess(listener: () => void): void {
        this.accessDeniedListeners = this.accessDeniedListeners.filter(l => l !== listener);
    } 
    UnauthorizedAccessAttempted(): void {
        this.accessDeniedListeners.forEach(l => l());
    }


    SubscribeToExpiredLogin(listener: () => void): void {
        this.expiredLoginListeners.push(listener);
    }
    UnsubscribeToExpiredLogin(listener: () => void): void {
        this.expiredLoginListeners = this.expiredLoginListeners.filter(l => l !== listener);
    }   
    FailedLoginAttempted(): void {
        this.expiredLoginListeners.forEach(listener => listener());
    }

    SubscribeToEmailVerificationRequired(listener: () => void): void {
        this.emailVerificationRequiredListeners.push(listener);
    }
    UnsubscribeToEmailVerificationRequired(listener: () => void): void {
        this.emailVerificationRequiredListeners = this.emailVerificationRequiredListeners.filter(l => l !== listener);
    }
    EmailVerificationRequired(): void {
        this.emailVerificationRequiredListeners.forEach(listener => listener());
    }

}
                
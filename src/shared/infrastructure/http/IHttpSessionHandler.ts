// Port implemented by the Security module so the shared HTTP layer can renew
// an expired session without depending on Security directly.
export interface IHttpSessionHandler {
    RefreshSession(): Promise<boolean>;
    SessionExpired(): void;
    EmailVerificationRequired(): void;
}

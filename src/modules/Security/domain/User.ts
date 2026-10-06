export class User {
   
    id: string|null;
    username: string | null;
    email: string;
    password: string | null;
    accountStatus: UserAccountStatus;
    emailVerificationStatus: UserEmailVerificationStatus;
    userRole: UserRole;
    localAccount: boolean;



    constructor(id: string|null , username: string | null = null, email: string, password: string | null = null, accountStatus: UserAccountStatus = UserAccountStatus.Temporary, emailVerificationStatus: UserEmailVerificationStatus = UserEmailVerificationStatus.Unverified, userRole: UserRole=UserRole.Employee, localAccount: boolean=true) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.accountStatus = accountStatus;
        this.emailVerificationStatus = emailVerificationStatus;
        this.userRole = userRole;
        this.localAccount = localAccount;
    }
}


export enum UserAccountStatus
{   
    Temporary,
    Active,
    Suspended,
    Deleted
}

export enum UserEmailVerificationStatus
{
    Unverified,
    Verified
}

export enum UserRole
{
    Employee = 1,
    TechnicalSupport = 2,
    Administrator = 3
}

// Standalone function rather than a method: users loaded from storage/API are plain objects, not User instances.
export function isAdministrator(user: User): boolean {
    return user.userRole === UserRole.Administrator;
}

export function hasTechnicalSupportAccess(user: User): boolean {
    return user.userRole === UserRole.TechnicalSupport || isAdministrator(user);
}

export function canEdit(user: User): boolean {
    return hasTechnicalSupportAccess(user);
}

export function canDelete(user: User): boolean {
    return isAdministrator(user);
}

import { User } from './User';

// Narrow port other modules depend on when they only need to know who is logged in.
export interface ICurrentUserProvider {
    GetCurrentUser(): Promise<User | null>;
}

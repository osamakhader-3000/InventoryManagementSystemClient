import { ICurrentUserProvider } from '../Security/domain/ICurrentUserProvider';
import { IRealmService } from './domain/IRealmService';
import { IProfileImageMenuService } from './domain/IProfileImageMenuService';
import { RealmService } from './application/RealmService';
import { ProfileImageMenuService } from './application/ProfileImageMenuService';
import { StaticRealmRepository } from './infrastructure/StaticRealmRepository';
import { StaticProfileImageMenuRepository } from './infrastructure/StaticProfileImageMenuRepository';

export interface NavigationDependencies {
    realmService: IRealmService;
    profileImgMenuService: IProfileImageMenuService;
}

export function createNavigationDependencies(currentUserProvider: ICurrentUserProvider): NavigationDependencies {
    return {
        realmService: new RealmService(new StaticRealmRepository(), currentUserProvider),
        profileImgMenuService: new ProfileImageMenuService(new StaticProfileImageMenuRepository(), currentUserProvider),
    };
}

import { useContext } from 'react';
import { DependencyContext } from '../../../app/DependencyContext';
import Realm from '../domain/Realm'

export function useListRealmsByName() {
    const { realmService } = useContext(DependencyContext);
    async function List(name: string): Promise<Realm[]> {
        let realms = await realmService.ListRealms(name);
        return realms;
    }
    return List;
}
import { useContext } from 'react';
import { DependencyContext } from '../../context/DependencyContext';
import Realm from '../../Domain/Entities/Realm'

export function useListRealmsByName() {
    const { realmService } = useContext(DependencyContext);
    async function List(name: string): Promise<Realm[]> {
        let realms = await realmService.ListRealms(name);
        return realms;
    }
    return List;
}
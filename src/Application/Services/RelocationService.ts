import { IRelocationService } from "../Interfaces/IRelocationService";
import { IRelocationRepository } from "../Repositories/IRelocationRepository";


export class RelocationService implements IRelocationService{

    relocationRepository:IRelocationRepository;

    constructor(relocationRepository:IRelocationRepository){
        this.relocationRepository = relocationRepository;
    }

    RelocateTo(url: string): void {
        window.location.href = url;
    }

    RelocateToMicrosoftLogin(): void {
        this.RelocateTo(this.relocationRepository.GetMicrosoftLoginUrl());
    }

}
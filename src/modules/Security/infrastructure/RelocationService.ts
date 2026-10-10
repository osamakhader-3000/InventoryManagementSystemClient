import { IRelocationService } from "../domain/IRelocationService";
import urls from '../../../shared/infrastructure/http/urls.json';


export class RelocationService implements IRelocationService{

    private microsoftLoginUrl: string;

    constructor(){
        this.microsoftLoginUrl = `${urls['inventory-management-system-app']}${urls['auth']}${urls['microsoft-login']}`;
    }

    RelocateTo(url: string): void {
        window.location.href = url;
    }

    RelocateToMicrosoftLogin(): void {
        this.RelocateTo(this.microsoftLoginUrl);
    }

}

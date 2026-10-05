export class AuthenticationResult {     
    expireTime: Date|null;
    success: boolean = false;
    constructor(public ExpireTime: Date | null = null,success: boolean = false) {
        this.expireTime = ExpireTime;      
        this.success = success;
    }   
}    
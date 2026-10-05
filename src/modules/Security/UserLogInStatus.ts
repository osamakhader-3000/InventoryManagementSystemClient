export default class UserLogginStatus {
    public IsLoggedIn: boolean
    public Expired: boolean;
    constructor(isLoggedIn: boolean, expired: boolean = false) {
        this.IsLoggedIn = isLoggedIn;
        this.Expired = expired;
    }
}
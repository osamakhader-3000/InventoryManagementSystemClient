export default class Account {
    username: string | null;
    email: string | null;
    password: string | null;
    constructor(username: string | null, email: string | null, password: string | null) {
        this.username = username;
        this.email = email;
        this.password = password;
    }
}
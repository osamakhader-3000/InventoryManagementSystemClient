export default class UserValidationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'UserValidationError';
    }
}

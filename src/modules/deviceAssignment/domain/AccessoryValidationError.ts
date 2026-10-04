export default class AccessoryValidationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'AccessoryValidationError';
    }
}

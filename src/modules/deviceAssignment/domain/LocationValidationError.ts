export default class LocationValidationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'LocationValidationError';
    }
}

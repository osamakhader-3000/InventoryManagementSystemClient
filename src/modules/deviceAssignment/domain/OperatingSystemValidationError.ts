export default class OperatingSystemValidationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'OperatingSystemValidationError';
    }
}

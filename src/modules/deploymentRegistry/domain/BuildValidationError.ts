export default class BuildValidationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'BuildValidationError';
    }
}

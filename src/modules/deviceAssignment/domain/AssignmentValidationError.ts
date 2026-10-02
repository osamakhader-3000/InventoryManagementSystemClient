export default class AssignmentValidationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'AssignmentValidationError';
    }
}

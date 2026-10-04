export default class DepartmentValidationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'DepartmentValidationError';
    }
}

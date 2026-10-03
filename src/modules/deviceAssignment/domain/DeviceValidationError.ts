export default class DeviceValidationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'DeviceValidationError';
    }
}

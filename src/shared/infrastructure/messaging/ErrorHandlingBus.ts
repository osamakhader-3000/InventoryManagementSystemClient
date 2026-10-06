export class ErrorHandlingBus {
    private listeners: Array<(message: string) => void> = [];
    constructor() {}
    Subscribe(listener: (message: string) => void): void {
        this.listeners.push(listener);
    }
    Unsubscribe(listener: (message: string) => void): void {
        this.listeners = this.listeners.filter(l => l !== listener);
    }
    ErrorOccured(message: string): void {
        this.listeners.forEach(listener => listener(message));
    }
}
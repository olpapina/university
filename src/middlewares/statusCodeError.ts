class StatusCodeError extends Error {
    public statusCode: number;
    public message: string;

    constructor(statusCode: number, message: string) {
        super(message);
        this.statusCode = statusCode || 500;
        this.message = message;
    }
}

export default StatusCodeError;
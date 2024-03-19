
export class ErrorResponse {

    constructor(message, statusCode = 400) {
        this.message = message;
        this.statusCode = statusCode;
    }
}

export class NotFoundErrorResponse extends ErrorResponse {

    constructor(message) {
        super(message, 404)
    }
}

export class InvalidDataErrorResponse extends ErrorResponse {

    constructor(message, fieldErrors) {
        super(message, 422);
        this.fieldErrors = fieldErrors;
    }
}


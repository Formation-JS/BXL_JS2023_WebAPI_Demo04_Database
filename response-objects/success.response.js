
export class SuccessObjectResponse {

    constructor(result, statusCode = 200) {
        this.result = result;
        this.statusCode = statusCode;
    }
}

export class SuccessArrayResponse {

    constructor(results, count, statusCode = 200) {
        this.results = results;
        this.count = count;
        this.statusCode = statusCode;
    }
}
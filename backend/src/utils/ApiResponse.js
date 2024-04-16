class ApiResponse {
    constructor(statuscode, message="success", data, success=true) {
        
        this.success = success;
        this.statuscode = statuscode;
        
        this.message = message;
        this.data = data;
        this.success = statuscode < 400;
        
    }
}

export {
    ApiResponse
}
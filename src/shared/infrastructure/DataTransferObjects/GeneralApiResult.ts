
enum ErrorTypes {
        Unauthorized = 'Unauthorized',
        NetworkError = 'NetworkError',
        ServerError = 'ServerError',
        EmailVerificationRequired = 'EmailVerificationRequired',
        Forbidden = 'Forbidden',
        UnknownError = 'UnknownError'
}

export class GeneralApiResult<T> {
    public readonly data: T | null;
    public readonly success: boolean = false;
    public readonly ErrorType: ErrorTypes | null = null;
    public readonly resultMessage: string | null = null;

    constructor(success: boolean,errorType: ErrorTypes | null, resultMessage: string | null, data: T | null) {
        this.success = success;
        this.ErrorType = errorType;
        this.resultMessage = resultMessage;
        this.data = data;

    }
}


export class GeneralApiResultFactory {
    public static CreateFromErrorResponse<T>(error: any): GeneralApiResult<T> {

        let errorType: ErrorTypes;
        if(error.status == 401)
            errorType = ErrorTypes.Unauthorized;
        else if(error.status == 403){

            if(error?.response?.data?.error == "email_verification_required")
                errorType = ErrorTypes.EmailVerificationRequired;
            else
                errorType = ErrorTypes.Forbidden;

        }
        else if(error.status >= 500)
            errorType = ErrorTypes.ServerError;
        else if(error.status >= 400)
            errorType = ErrorTypes.NetworkError;
        else
            errorType = ErrorTypes.UnknownError;

        const errorMessage = error?.response?.data && error.response.data !== ""? error.response.data : (error?.message ?? "Unknown error");

        return new GeneralApiResult<T>(false,errorType,errorMessage,null);

    }}
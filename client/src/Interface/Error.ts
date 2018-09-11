export interface IError {
    field: string;
    message: string;
}

export class Error implements IError {
    field: string;
    message: string;
}

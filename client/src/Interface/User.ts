export interface IUser {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    age: number;
}

export class User implements IUser {
    // tslint:disable-next-line:variable-name
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    age: number;
}

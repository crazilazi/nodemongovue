export interface IUser {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    age: number;
    doj: Date;
    __v: number;
}

export class User implements IUser {
    // tslint:disable-next-line:variable-name
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    age: number;
    doj: Date;
    // tslint:disable-next-line:variable-name
    __v: number;
}
export interface IPaginate {
    docs: IUser[];
    limit: number;
    page: number;
    pages: number;
    total: number;
}

export class Paginate implements IPaginate {
    docs: IUser[];
    limit: number;
    page: number;
    pages: number;
    total: number;
}

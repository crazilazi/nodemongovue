import * as mongoose from "mongoose";

export class Mongoose {
    static async init() {
        (<any>mongoose).Promise = global.Promise;
        await mongoose.connect("mongodb://localhost:27017/careApp");
    }
    static async dropDB() {
       await mongoose.connection.dropDatabase();
    }
}

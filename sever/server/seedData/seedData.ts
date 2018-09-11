import chalk from "chalk";
import { IUser } from "../interface/user";
import { careUser } from "../models/careUser";

export class SeedData {
    static async seedData(dbname: string) {
        const data: IUser[] = [];
        for (let i = 0; i < 10; i++) {
            const user: IUser = {
                firstName:  Math.random().toString(36).substring(2, 15),
                lastName:  Math.random().toString(36).substring(2, 15),
                age: 10 + 1,
                email: "",
            };
            user.email = `${user.firstName}.${user.lastName}@oneadvanced.com`;
            data.push(user);
        }
        await careUser.insertMany(data, (err, doc) => {
            if (err) {
                console.log(chalk.red("Unable to insert"), err);
            } else {
                console.log(chalk.green("Data seeding for careApp db is completed..."));
            }
        });
    }

}

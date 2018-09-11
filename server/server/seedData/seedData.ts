import chalk from "chalk";
import { Chance } from "chance";
import { IUser } from "../interface/user";
import { careUser } from "../models/careUser";

export class SeedData {
    static async seedData(dbname: string) {
        const data: IUser[] = [];
        for (let i = 0; i < 100; i++) {
            const chance = new Chance();
            const user: IUser = {
                firstName: chance.first(),
                lastName: chance.last(),
                age: chance.age({ type: "teen" }),
                email: "",
            };
            user.email = `${user.firstName}.${user.lastName.split(" ")[0]}@philip.uk`;
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

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = require("chalk");
const careUser_1 = require("../models/careUser");
class SeedData {
    static seedData(dbname) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = [];
            for (let i = 0; i < 10; i++) {
                const user = {
                    firstName: Math.random().toString(36).substring(2, 15),
                    lastName: Math.random().toString(36).substring(2, 15),
                    age: 10 + 1,
                    email: "",
                };
                user.email = `${user.firstName}.${user.lastName}@oneadvanced.com`;
                data.push(user);
            }
            yield careUser_1.careUser.insertMany(data, (err, doc) => {
                if (err) {
                    console.log(chalk_1.default.red("Unable to insert"), err);
                }
                else {
                    console.log(chalk_1.default.green("Data seeding for careApp db is completed..."));
                }
            });
        });
    }
}
exports.SeedData = SeedData;

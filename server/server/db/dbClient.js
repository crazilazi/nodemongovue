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
const mongodb_1 = require("mongodb");
class DbClient {
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            // async / await approach:
            return yield mongodb_1.MongoClient.connect("mongodb://localhost:27017");
            // -------------------------------------------------
            // Promises approach:
            // -------------------------------------------------
            // return MongoClient.connect("mongodb://localhost:27017/test")
            //     .then(db => {
            //         this.db = db;
            //     })
            //     .catch(err => {
            //         console.log(err);
            //     });
            // -------------------------------------------------
            // Callback approach:
            // -------------------------------------------------
            //     MongoClient.connect("mongodb://localhost:27017/test", (err, db) => {
            //         if(err) {
            //             console.log(err);
            //         } else {
            //             this.db = db;
            //         }
            //     });
            // }
        });
    }
}
exports.default = new DbClient();

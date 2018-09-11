import { Db, MongoClient } from "mongodb";

class DbClient {
    async connect() {
        // async / await approach:

        return await MongoClient.connect("mongodb://localhost:27017");
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
    }
}

export default new DbClient();

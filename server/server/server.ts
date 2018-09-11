import * as bodyParser from "body-parser";
import chalk from "chalk";
import * as cors from "cors";
import * as express from "express";
import { ObjectID } from "mongodb";
import { Mongoose } from "./db/mongoose";
import { careUser, IUserModel } from "./models/careUser";
import { SeedData } from "./seedData/seedData";
Mongoose.init();

const app = express();
// use of bodyparser to parse text to object
app.use(bodyParser.json());

app.use(cors());
// hello api
app.get("/hello", (req, res) => {
    res.send("<h1>hellow Word </h1>");
});

// insert user
app.post("/careuser", (req, res) => {
    const newCareUser: IUserModel = new careUser({
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age,
    });
    newCareUser.save().then((doc) => {
        res.send(doc);
    }, (err) => {
        res.status(400).send(err);
    });
});

// insert multiple user
app.post("/careusers", (req, res) => {
    careUser.insertMany(req.body, (err, doc) => {
        if (err) {
            res.status(400).send(err);
        } else {
            res.send(doc);
        }
    });
});

// get all user
app.get("/careuser", (req, res) => {
    careUser.find().then((careusers) => {
        res.send({ careusers });
    }, (err) => {
        res.status(400).send(err);
    });
});

// get one user
app.get("/careuser/:id", (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(404).send();
    }
    careUser.find({ _id: req.params.id }).then((careusers) => {
        res.send({ careusers });
    }, (err) => {
        res.status(400).send(err);
    });
});

// delete one user
app.delete("/careuser/:id", (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(404).send();
    }
    careUser.deleteOne({ _id: req.params.id }).then((careusers) => {
        res.send({ careusers });
    }, (err) => {
        res.status(400).send(err);
    });
});

// delete multiple user
app.delete("/careuser/name/:firstname/:lastname", (req, res) => {
    careUser.deleteMany({ firstName: req.params.firstname, lastName: req.params.lastname }).then((careusers) => {
        res.send({ careusers });
    }, (err) => {
        res.status(400).send(err);
    });
});

// update user
app.put("/careuser/:id", (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(404).send("item cannot be found");
    }
    careUser.update({ _id: req.params.id }, {
        $set: {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            age: req.body.age,
        },
    }).then((careusers) => {
        res.status(201).send("item has been updated");
    }, (err) => {
        res.status(400).send(err);
    });
});

// start server
app.listen(3000, async () => {
    // tslint:disable-next-line:no-console
    console.log(chalk.bgRed("server is started on localhost:3000"));
    console.log(chalk.green("Seeding data......"));
    await SeedData.seedData("careApp");
    console.log(chalk.green("Data seeding finished......"));

});
// handle ctr+c
process.on("SIGINT", async function () {
    console.log(chalk.bgRed("Closing connection......"));
    console.log(chalk.bgRed("Droping database......"));
    await Mongoose.dropDB();
    console.log(chalk.bgRed("Database has been delete......"));
    console.log(chalk.bgRed("Shuting down application......"));
    process.exit(0);
});

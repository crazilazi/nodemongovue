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
const bodyParser = require("body-parser");
const chalk_1 = require("chalk");
const cors = require("cors");
const express = require("express");
const mongodb_1 = require("mongodb");
const mongoose_1 = require("./db/mongoose");
const careUser_1 = require("./models/careUser");
const seedData_1 = require("./seedData/seedData");
mongoose_1.Mongoose.init();
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
    const newCareUser = new careUser_1.careUser({
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
    careUser_1.careUser.insertMany(req.body, (err, doc) => {
        if (err) {
            res.status(400).send(err);
        }
        else {
            res.send(doc);
        }
    });
});
// get all user
app.get("/careuser", (req, res) => {
    careUser_1.careUser.find().then((careusers) => {
        res.send({ careusers });
    }, (err) => {
        res.status(400).send(err);
    });
});
// get one user
app.get("/careuser/:id", (req, res) => {
    if (!mongodb_1.ObjectID.isValid(req.params.id)) {
        return res.status(404).send();
    }
    careUser_1.careUser.find({ _id: req.params.id }).then((careusers) => {
        res.send({ careusers });
    }, (err) => {
        res.status(400).send(err);
    });
});
// delete one user
app.delete("/careuser/:id", (req, res) => {
    if (!mongodb_1.ObjectID.isValid(req.params.id)) {
        return res.status(404).send();
    }
    careUser_1.careUser.deleteOne({ _id: req.params.id }).then((careusers) => {
        res.send({ careusers });
    }, (err) => {
        res.status(400).send(err);
    });
});
// delete multiple user
app.delete("/careuser/name/:firstname/:lastname", (req, res) => {
    careUser_1.careUser.deleteMany({ firstName: req.params.firstname, lastName: req.params.lastname }).then((careusers) => {
        res.send({ careusers });
    }, (err) => {
        res.status(400).send(err);
    });
});
// update user
app.put("/careuser/:id", (req, res) => {
    if (!mongodb_1.ObjectID.isValid(req.params.id)) {
        return res.status(404).send("item cannot be found");
    }
    careUser_1.careUser.update({ _id: req.params.id }, {
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
app.listen(3000, () => __awaiter(this, void 0, void 0, function* () {
    // tslint:disable-next-line:no-console
    console.log(chalk_1.default.bgRed("server is started on localhost:3000"));
    console.log(chalk_1.default.green("Seeding data......"));
    yield seedData_1.SeedData.seedData("careApp");
    console.log(chalk_1.default.green("Data seeding finished......"));
}));
// handle ctr+c
process.on("SIGINT", function () {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(chalk_1.default.bgRed("Closing connection......"));
        console.log(chalk_1.default.bgRed("Droping database......"));
        yield mongoose_1.Mongoose.dropDB();
        console.log(chalk_1.default.bgRed("Database has been delete......"));
        console.log(chalk_1.default.bgRed("Shuting down application......"));
        process.exit(0);
    });
});

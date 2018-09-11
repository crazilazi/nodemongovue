import * as bodyParser from "body-parser";
import chalk from "chalk";
import * as cors from "cors";
import * as express from "express";
import * as session from "express-session";
import * as Keycloak from "keycloak-connect";
import { ObjectID } from "mongodb";
import { Mongoose } from "./db/mongoose";
import { careUser, IUserModel } from "./models/careUser";
import { SeedData } from "./seedData/seedData";
Mongoose.init();

const app = express();
// use of bodyparser to parse text to object
app.use(bodyParser.json());
const kcConfig = {
    clientId: "training-console",
    bearerOnly: true,
    serverUrl: "https://identity.ahc.oneadvanced.io/auth",
    realm: "CareplanningDev",
};
const memoryStore = new session.MemoryStore();
app.use(session(
    {
        secret: "mySecrest",
        resave: false,
        saveUninitialized: true,
        store: memoryStore,
    },
));
const keycloak = new Keycloak({ store: memoryStore }, kcConfig);
app.use(keycloak.middleware());

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
app.post("/careusers", keycloak.protect(), (req, res) => {
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
    careUser.find().select({ firstName: 1, lastName: 1, _id: 1 }).then((careusers) => {
        res.send({ careusers });
    }, (err) => {
        res.status(400).send(err);
    });
});
// get all user by pagination
app.get("/careuser/:limit/:page/:sortby/:searchby", keycloak.protect(), (req, res) => {
    //  console.log(req.params);
    const query: any = {};
    if (req.params.searchby !== "all") {
        query.firstName = { $regex: req.params.searchby, $options: "i" };
    }
    const options = {
        select: "firstName lastName id",
        sort: req.params.sortby,
        // tslint:disable-next-line:radix
        page: Number.parseInt(req.params.page),
        // tslint:disable-next-line:radix
        limit: Number.parseInt(req.params.limit),
    };
    careUser.paginate(query, options, (err, result) => {
        if (err) {
            return res.status(400).send(err);
        }
        return res.send(result);
    });
});
// get one user
app.get("/careuser/:id", keycloak.protect(), (req, res) => {
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
app.delete("/careuser/:id", keycloak.protect(), (req, res) => {
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
app.delete("/careuser/name/:firstname/:lastname", keycloak.protect(), (req, res) => {
    careUser.deleteMany({ firstName: req.params.firstname, lastName: req.params.lastname }).then((careusers) => {
        res.send({ careusers });
    }, (err) => {
        res.status(400).send(err);
    });
});

// update user
app.put("/careuser/:id", keycloak.protect(protectBySection), (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(404).send("item cannot be found");
    }
    careUser.update({ _id: req.params.id }, {
        $set: {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            age: req.body.age,
            doj: req.body.doj,
            __v: req.body.__v,
        },
    }, { runValidators: true }).then((careusers) => {
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
    // await Mongoose.dropDB();
    // await SeedData.seedData("careApp");
    console.log(chalk.green("Data seeding finished......"));

});
// handle ctr+c
process.on("SIGINT", async function () {
    console.log(chalk.bgRed("Closing connection......"));
    console.log(chalk.bgRed("Droping database......"));
    // await Mongoose.dropDB();
    console.log(chalk.bgRed("Database has been delete......"));
    console.log(chalk.bgRed("Shuting down application......"));
    process.exit(0);
});

// test
function protectBySection(token: any, request: any) {
    const c = token.hasRole("realm:employee");
    return c;
}

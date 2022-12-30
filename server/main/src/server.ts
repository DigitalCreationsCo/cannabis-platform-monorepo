import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cors from "cors";
import { user, shop, driver, organization } from "./api/routes";

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api/v1/healthcheck", (req, res) => {
    res.status(200).send("OK");
});
app.use("/api/v1/user", user);
app.use("/api/v1/driver", driver);
app.use("/api/v1/shop", shop);
app.use("/api/v1/organization", organization);


app.use("*", (req, res) => res.status(404).json({ error: "API not found" }));

const server = http.createServer(app);

export default server;

import express from "express";
import path from "path";
import { URLController } from "./controller/URLController";
import { MongoConnection } from "./database/MongoConnection";

const api = express();
api.use(express.json());

const database = new MongoConnection();
database.connect();

const port = process.env.PORT || 3333;

const urlController = new URLController();

api.set("views", path.join(__dirname, "views"));

api.use(express.static("public"));

api.set("view engine", "ejs");

api.use(express.urlencoded({ extended: false }));

api.get("/", async (req, res) => {
  const originURL = "";
  const hash = "";
  const shortURL = "";
  res.render("index", { originURL, hash, shortURL });
});

api.post("/:shorten", urlController.shorten);
api.get("/:hash", urlController.redirect);

api.listen(port, () => console.log(`Server is Running ${port}`));

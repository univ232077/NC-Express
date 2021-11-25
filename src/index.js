
const express = require("express");
const path = require("path");
const cors = require("cors");
const controllers = require("./controllers");
const logger = require('./middlewares/request-logger.middleware');

const server = express();
const hostname = "localhost";
const port = 3000;

server.set("view engine", "ejs");
server.set("views", path.resolve(__dirname, "views"));

server.use(express.static(path.resolve(__dirname, "public")));
server.use(cors({
    origin: "*"
}));
server.use(express.json());
server.use(express.urlencoded({extended:true}));
server.use(controllers);
server.use(logger);

server.listen(port, hostname, () => {
    console.log(`Server is running on address ${hostname}:${port}!`);
})



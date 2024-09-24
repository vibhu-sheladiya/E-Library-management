
const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const { connectDB } = require("./src/db/dbconnection");
const config = require("./src/config/config");
const cors = require("cors");
const routes = require("./src/routes/v1");
const path = require("path");
// require("./src/helpers/cron");
// require("./src/middlewares/upload");
// const { Server } = require("socket.io");
// const socketIO = require('socket.io');
const app = express();

const server = http.createServer(app);
// const io = socketIO(server);

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use(cors());
app.options("*", cors());



app.use(express.static(path.resolve(__dirname, `./src/public`)));

app.use(express.static(path.resolve(__dirname, `./src/views`)));

app.use("/v1", routes);
app.use(
  "/public/book_image",
  express.static(path.join(__dirname, "./src/public/book_image"))
);

app.use(
  "/public/patientImag",
  express.static(path.join(__dirname, "./src/public/patientImag"))
);

app.use(
  "/public/specialistImg",
  express.static(path.join(__dirname, "./src/public/specialistImg"))
);

app.use(
  "/public/countryflag",
  express.static(path.join(__dirname, "./src/public/countryflag"))
);

app.use(express.static(path.resolve("./src/views/index.html")));

connectDB();

server.listen(config.port, () => {
  console.log("server listing the port " + config.port);
});

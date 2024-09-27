const express = require("express");
const app = express();
const usersRouter = require("./routes/users");
const showsRouter = require("./routes/shows");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/users", usersRouter);
app.use("/shows", showsRouter);

module.exports = app;

const express = require("express");

const connect = require("./confix/db");

const app = new express();
app.use(express.json());

const productController = require("./controllers/user.controller");

app.use("/user", productController);

app.listen(2345, async () => {
    await connect();
    console.log("listening on port 2345");
})
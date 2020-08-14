const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(routes);

mongoose
    .connect("mongodb://localhost:27017/Portfolio", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        require("./seeds/admin");
        console.log("database SuccessFully connected!");
    });

app.listen(PORT, () => {
    console.log("Server has started on port", PORT);
});

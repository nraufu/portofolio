import express from "express";
import mongoose from "mongoose";
import routes from "./routes";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(routes);

app.use((req, res, next) => {
    res.status(400).json({ Error: 'Invalid Request' });
    next();
});

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

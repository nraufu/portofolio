import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import routes from "./routes";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(routes);

app.use((req, res, next) => {
    res.status(400).json({ Error: 'Invalid Request' });
    next();
});

let databaseUrl = process.env.NODE_ENV === "test" ? process.env.TEST_DATABASE_URL : process.env.DATABASE_URL;

mongoose
    .connect(databaseUrl, {
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

export default app;

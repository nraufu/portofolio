import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import dotenv from "dotenv";
import routes from "./routes";
import swaggerDocument from "../swagger.json";
import createAdmin from "./seeds/admin";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(routes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(
    cors({
        origin: "*",
        methods: "GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS",
        preflightContinue: false,
        optionsSuccessStatus: 204
    })
);

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept',
    );
    next();
});

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
        createAdmin();
        console.log("database SuccessFully connected!");
    });

app.listen(PORT, () => {
    console.log("Server has started on port", PORT);
});

export default app;

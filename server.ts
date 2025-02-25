import express from "express";
import ViteExpress from "vite-express";
import apiRouter from "./api";

const app = express();

app.use("/api", apiRouter);

ViteExpress.listen(app, 3000, () => console.log("Server is listening..."));

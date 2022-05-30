import app from "./app";
const path = require("path");
import mongoose from "mongoose";
import { createServer } from "http";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import routes from "./routes";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";


const express = require("express");
const fs = require('fs');

dotenv.config();

const httpServer = createServer(app);



app.use(
	cors({
		origin: ["http://localhost:3000"],
		credentials: true,
	})
);

let db;
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));

if (process.env.NODE_ENV === "test") {
	db = process.env.testdb;
} else {
	db = process.env.mongodb;
}

app.use(morgan("dev"));
let PORT = process.env.PORT || 4000;

mongoose
	.connect(db, {
		useNewUrlParser: true,
	})
	.then(() => console.log("MongoDB Connected..."))
	.catch((err) => {
		return app.use((request, response) =>
			errorResponse(
				response,
				500,
				`Something went wrong! Please try again... ${err}`
			)
		);
	});

app.use("/", routes);

if (process.env.NODE_ENV === "test") {
	httpServer.listen(PORT, "127.0.0.1", () => {
		httpServer.close();
	});
}
else {
	httpServer.listen(PORT, () =>
		console.log(`App is running at http://localhost:${PORT}\n`)
	);
}

module.exports = { app };


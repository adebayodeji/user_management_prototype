const express = require("express");
//import path from "path";
const mongoose = require("mongoose");
const { createServer } = require("http");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const route = require("./routes/index");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const app = express();
const httpServer = createServer(app);
//const fs = require('fs');

dotenv.config();

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
app.use("/", route);
app.use(morgan("dev"));

if (process.env.NODE_ENV === "test") {
	db = process.env.testdb;
} else {
	db = process.env.mongodb;
}

let PORT = process.env.PORT || 4000;

mongoose.connect(db, {
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


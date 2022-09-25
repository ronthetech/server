require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes/workouts");

const port = process.env.PORT || 3000;

// express app
const app = express();

// middleware
// parses incoming requests with JSON payloads
app.use(express.json());

app.use((req, res, next) => {
	console.log(req.path, req.method); //ip,path,method,params,params.keys
	next(); // must be called or the middleware will never move to the next function
});

// routes
app.use("/api/workouts", routes);

// basic test route
// app.get("/json", (req, res) => {
// 	res.json({ json_message: "Hello there! Welcome to Phrancois Fit App!" });
// });

// connect to database
mongoose
	.connect(process.env.MONGO_URI)
	.then(() => {
		console.log("Now connected to database");
		// app listening for requests
		app.listen(port, () => console.log(`Now listening on port: ${port}`));
	})
	.catch((err) => {
		console.log(err);
	});

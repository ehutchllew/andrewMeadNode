import express, { Application } from "express";

const app: Application = express();

app.get("", (req, res) => {
	res.send("Hello Express");
});

app.get("/help", (req, res) => {
	res.send("Help Page");
});

app.get("/about", (req, res) => {
	res.send("About Page");
});

app.get("/weather", (req, res) => {
	res.send("Weather Page");
});

app.listen(3000, () => {
	console.log("Starting on port 3000...");
});

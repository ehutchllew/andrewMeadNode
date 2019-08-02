import express, { Application } from "express";
import path from "path";

const app: Application = express();
const publicPath: string = path.join(__dirname, "../public");

app.use(express.static(publicPath));

app.get("/", (req, res) => {
    res.send(`<h1>Hello World!</h1>`);
});

app.get("/weather", (req, res) => {
    res.send("Weather Page");
});

const port: number = 3001;
app.listen(port, () => {
    console.log(`Starting on port ${port}...`);
});

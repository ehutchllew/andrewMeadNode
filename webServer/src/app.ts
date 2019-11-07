import express, { Application } from "express";
import hbs from "hbs";
import path from "path";

const app: Application = express();
const publicPath: string = path.join(__dirname, "../public");
const viewsPath: string = path.join(__dirname, "../views");
const partialsPath: string = path.join(__dirname, "../views/partials");

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicPath));

app.get("", (req, res) => {
    res.render("", {
        name: "Evan H",
        title: "Weather App",
    });
});

app.get("/about", (req, res) => {
    res.render("about", {
        name: "Evander Llew",
        title: "About Moi",
    });
});

app.get("/help", (req, res) => {
    res.render("help", {
        name: "Jason Winters",
        title: "HELP HELP HELP",
    });
});

app.get("/help/*", (req, res) => {
    res.render("404", {
        error: "Help Page Not Found!",
        title: "404 Help Page Missing :O",
    });
});

app.get("*", (req, res) => {
    res.render("404", {
        error: "ERROR",
        title: "404 Page Not Found!",
    });
});

const port: number = 3001;
app.listen(port, () => {
    console.log(`Starting on port ${port}...`);
});

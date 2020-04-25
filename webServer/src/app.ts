import express, { Application } from "express";
import hbs from "hbs";
import path from "path";
import { forecast, geocode, hasQueryParams } from "./util";

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

app.get("/weather", async (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "Must provide valid address parameter",
        });
    }
    try {
        const { location, weather } = await forecast(req.query.address);
        res.send({
            forecast: {
                current: weather.data.currently,
                daily: weather.data.daily,
            },
            location: location.data.features[0],
        });
    } catch (e) {
        res.send({
            error: e,
        });
    }
});

app.get("/products", (req, res) => {
    if (hasQueryParams(req.query) && !req.query.search) {
        return res.send({
            error: "You must provide a search parameter",
        });
    }
    res.send({
        products: [],
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

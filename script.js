
const express = require("express");
const { PrismaClient } = require("@prisma/client");
const bodyParser = require("body-parser");
const hbs = require("hbs");

const app = express();
const prisma = new PrismaClient();
const PORT = 3008;
const path = require("path");

// Configuration de Handlebars pour Express
app.set("view engine", "hbs"); // On définit le moteur de template que Express va utiliser
app.set("views", path.join(__dirname, "views")); // On définit le dossier des vues (dans lequel se trouvent les fichiers .hbs)
hbs.registerPartials(path.join(__dirname, "views", "partials")); // On définit le dossier des partials (composants e.g. header, footer, menu...)


// Servir les fichiers statiques (CSS, images, etc.)
app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.urlencoded())

app.use(bodyParser.urlencoded({ extended: true }));


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Note: slider initialization must run in the browser. Client-side code
// is moved to `public/js/main.js` and loaded from the page layout.


app.get("/", async (req, res) => {
    res.render("front/frontpage");
});

app.get("/project1", async (req, res) => {
    res.render("projets/projet1");
});

app.get("/wyp", async (req, res) => {
    res.render("projets/wyp");
});

app.get("/projet3", async (req, res) => {
    res.render("projets/projet3");
});

app.get("/projet2", async (req, res) => {
    res.render("projets/projet2");
});
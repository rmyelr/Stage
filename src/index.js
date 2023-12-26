const express = require('express');
const pa = require('path');
const bcrypt = require('bcrypt');
const collection = require('./config');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.set('views', pa.join(__dirname, 'views')); 
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("register");
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.post("/register", async (req, res) => {
    const data = {
        email: req.body.email,
        password: req.body.password
    }

    const exUser = await collection.findOne({email: data.email});
    if(exUser) {
        res.send("Email déjà utilisé");
    }else {
        const salt = 10;
        const hashmdp = await bcrypt.hash(data.password, salt);
        data.password = hashmdp;
        const userdata = await collection.insertMany(data);
        console.log(userdata);
    }
});

app.post("/login", async (req, res) => {
    try {
        const check = await collection.findOne({ email: req.body.email });
        if (!check) {
            res.send("Email ou mot de passe incorrect");
        }
        const match = await bcrypt.compare(req.body.password, check.password);
        if (match) {
            res.render("accueil");
        } else {
            res.send("Email ou mot de passe incorrect");
        }
    } catch {
        res.send("Erreur");
    }
});


const port = 3000;
app.listen(port, () => {
    console.log(`Sur le port : ${port}`);
});
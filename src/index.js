const express = require('express');
const pa = require('path');
const bcrypt = require('bcrypt');
const collection = require('./config');

const app = express();

app.set("view engine", "ejs");
app.set('views', pa.join(__dirname, 'views')); 


app.get("/", (req, res) => {
    res.render("register");
});

app.get("/login", (req, res) => {
    res.render("login");
});

const port = 3000;
app.listen(port, () => {
    console.log(`Sur le port : ${port}`);
});
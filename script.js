"use strict";

const express = require("express");
const app = express();
const jokes = require("./joke.js");

const cors = require("cors");
app.use(cors());

app.get("/jokebook/categories", (req, res) => 
{
    res.json(jokes.categories);
});

app.get("/jokebook/joke/:category", (req, res) => 
{
    const category = req.params.category;

    const jokeList = jokes[category];

    if (!jokeList) return res.json({ error: `no jokes for category ${category}` });

    const random = jokeList[Math.floor(Math.random() * jokeList.length)];
    res.json(random);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => 
{
    console.log(`Server listening on port ${PORT}`);
});
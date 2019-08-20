// required modules
const express = require('express');
const app = express();

// middleware and config
app.set('view engine', 'ejs')

// home route
app.get('/', (req, res) => {
    res.render('home');
})

const db = require('./models');
//GET ALL neighborhoods
app.get('/neighborhoods', (req, res) => {
    db.neighborhood.findAll()
    .then(hoods => {
        res.render("neighborhoods/index", {
            hoods: hoods
        });
    })
    .catch(err => {
        console.log(err);
        res.send("Something terrible has happened");
    })
})

app.get('/neighborhoods/:id', (req, res) => {
    db.neighborhood.findOne({
        where : { id: req.params.id }
    })
    .then(neighborhood => {
        res.render('neighborhoods/show', {
            neighborhood
        })
    })
    .catch(err => {
        console.log(err);
        res.send("ruh roh")
    })
})

app.get('/api/neighborhoods', (req, res) => {
    db.neighborhood.findAll()
    .then(neighborhoods => {
        res.json(neighborhoods)
    })
    .catch(err => {
        console.log(err);
        res.send("ruh roh")
    })
})
app.get('/api/neighborhoods/:id', (req, res) => {
    db.neighborhood.findOne({
        where : { id: req.params.id }
    })
    .then(neighborhood => {
        res.json(neighborhood)
    })
    .catch(err => {
        console.log(err);
        res.send("ruh roh")
    })
})


app.listen(3003, () => {
    console.log("Now listening on port 3003")
});


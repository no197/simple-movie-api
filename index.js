var express = require('express');
var app = express();

let MovieStore = require('./moviestore');
let moviestore = new MovieStore();



app.get('/movies', (req, res) => {
    res.json(moviestore.all());
});

app.get('/', (req, res)=> {
    res.redirect('/movies');
})

app.get('/movies/:title', (req, res) => {
    var foundMovie = moviestore.find(req.params.title);
    if(!foundMovie) {
        res.statusCode = 404;
        return res.json({"massage" : "movie not found"});
    }
    res.json({
        "message" : "movie is found",
        "payload" : foundMovie
    })
})

app.listen(3333, () => {
    console.log('Server is listening on port 3333');
})

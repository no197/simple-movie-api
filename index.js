let express = require('express');
let bodyParser = require('body-parser');
let app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

let MovieStore = require('./moviestore');
let movieStore = new MovieStore();


//Define GET to query string
app.get('/movies', (req, res) => {
    let movies = movieStore.search(req.query.title);
    return res.json({"payload" : movies })
})

//Define GET method to response the movie JSON
app.get('/movies', (req, res) => {
    res.json(movieStore.all());
});

app.get('/', (req, res)=> {
    res.redirect('/movies');
})

app.get('/movies/:title', (req, res) => {
    var foundMovie = movieStore.find(req.params.title);
    if(!foundMovie) {
        res.statusCode = 404;
        return res.json({"massage" : "movie not found"});
    }
    res.json({
        "message" : "movie is found",
        "payload" : foundMovie
    })
})

//Define POST method to create the new movie
app.post('/movies', (req, res) => {

    //validate input the title is required
    if(!req.body.Title  ||req.body.Title.trim().length < 1 ) {
        res.statusCode = 400;
        return res.json({ "message": "missing or invalid title"});
    }

    //Check movie already existed
    if(movieStore.has(req.body.Title)) {
        res.statusCode = 400;
        return res.json({ "message": "movie already existed"});
    }

    //Add new movie
    movieStore.add(req.body);
    res.json({"message" : "The movie was added successfully"});
});

// Define PUT method to update the movie
app.put('/movies/:title', (req, res) => {

    //Check the movie doesn't exist
    if(!movieStore.update(req.params.title, req.body)) {
        res.statusCode = 500;
        return res.json({"message" : "failed to update movie info"});
    }
    
    return res.json({"message": "update movie successfully"});
})

//DELETE method to delete movie
app.delete('/movies/:title', (req, res) => {

    // Check movie doesn't exist
    if(!movieStore.has(req.params.title)) {
        res.statusCode = 404;
        return res.json({"message" : " movie not found"});
    }

    //Delete movie
    movieStore.remove(req.params.title);
    return res.json({"message": "delete movie successfully"});
})

app.listen(3333, () => {
    console.log('Server is listening on port 3333');
})

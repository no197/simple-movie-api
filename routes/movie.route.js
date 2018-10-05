let express = require('express');
let router = express.Router();

let MovieStore = require('../moviestore');
let movieStore = new MovieStore();

let paginate = require('../utils/paginate');


//Define GET to show list JSON
router.get('/', (req, res) => {
    let movies = movieStore.all();
    let page = parseInt(req.query.page) || 1;
    let size = parseInt(req.query.size) || 3;

    let result = paginate(movies, size, page);

    return res.json({
        "title": req.query.Title,
        "payload": result,
        "totalPage": Math.ceil(movies.length / size),
        "page": page,
        "size": size
    })
})

//Define GET to query string
router.get('/search', (req, res) => {
    if(!req.body.title) {
        return res.redirect('/')
    }
    let movies = movieStore.search(req.query.title);

    let page = parseInt(req.query.page) || 1;
    let size = parseInt(req.query.size) || 3;

    let result = paginate(movies, size, page);

    return res.json({
        "title": req.query.Title,
        "payload": result,
        "totalPage": Math.ceil(movies.length / size),
        "page": page,
        "size": size
    })
})

router.get('/:title', (req, res) => {
    var foundMovie = movieStore.find(req.params.title);
    if (!foundMovie) {
        res.statusCode = 404;
        return res.json({ "massage": "movie not found" });
    }
    res.json({
        "message": "movie is found",
        "payload": foundMovie
    })
})

//Define POST method to create the new movie
router.post('/', (req, res) => {

    //validate input the title is required
    if (!req.body.Title || req.body.Title.trim().length < 1) {
        res.statusCode = 400;
        return res.json({ "message": "missing or invalid title" });
    }

    //Check movie already existed
    if (movieStore.has(req.body.Title)) {
        res.statusCode = 400;
        return res.json({ "message": "movie already existed" });
    }

    //Add new movie
    movieStore.add(req.body);
    res.json({ "message": "The movie was added successfully" });
});

// Define PUT method to update the movie
router.put('/:title', (req, res) => {

    //Check the movie doesn't exist
    if (!movieStore.update(req.params.title, req.body)) {
        res.statusCode = 500;
        return res.json({ "message": "failed to update movie info" });
    }

    return res.json({ "message": "update movie successfully" });
})

//DELETE method to delete movie
router.delete('/:title', (req, res) => {

    // Check movie doesn't exist
    if (!movieStore.has(req.params.title)) {
        res.statusCode = 404;
        return res.json({ "message": " movie not found" });
    }

    //Delete movie
    movieStore.remove(req.params.title);
    return res.json({ "message": "delete movie successfully" });
})

module.exports = router;
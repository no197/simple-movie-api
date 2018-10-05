
class MovieStore {
    constructor () {
        this.movieData = require('./datastore.json');
    }
    all() {
        return this.movieData;
    }
    find(title){
        return this.movieData.find((movie) => {
            return movie.Title === title;
        })
    }
}

module.exports = MovieStore;
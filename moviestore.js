
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

    add(movie) {
        this.movieData.push(movie);
    }

    has(title) {
        let foundMovie = this.find(title);
        return foundMovie !== undefined;
    }

    update(title, newInfo) {
        let movie = this.find(title);
        if (!movie) {
            return false;
        }
        let newdMovie = Object.assign(movie,newInfo);
        let otherMovie = this.movieData.filter(movie => movie.Title !== title);
        this.movieData = [newdMovie, ...otherMovie];
        return true;
    }

    remove(title) { 
    this.movieData = this.movieData.filter(movie => movie.Title !== title);
    }

    search (title) {
        return  this.movieData.filter(movie => movie.Title.toLowerCase().includes(title.toLowerCase()));
    }
}

module.exports = MovieStore;
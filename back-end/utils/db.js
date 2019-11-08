const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/admin', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const Users = mongoose.model('users', {
    email: String,
    username: String,
    password: String
})

const Movies = mongoose.model('movies', {
    poster: String,
    movieName: String,
    score: String,
    actor: String,
    showInfo: String
})

module.exports = {
    Users,
    Movies
}
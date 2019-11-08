var express = require('express')
var router = express.Router()

let movie = require('../controllers/movies')
let uploadMiddleware = require('../middlewares/upload')

// router.get('/findAll', movie.findAll)
// router.post('/save', movie.save)

router.route('/')
    .get(movie.findAll)
    .post(uploadMiddleware, movie.save)
    .patch(uploadMiddleware, movie.update)
    .delete(movie.remove)

router.get('/findOne', movie.findOne)
router.get('/search', movie.search)

module.exports = router
var express = require('express')
var router = express.Router()

const {
    register,
    hasUsername,
    login,
    mails,
    reset
} = require('../controllers/users')

router.post('/register', hasUsername, register)
router.post('/login', login)
router.post('/mails', mails)
router.post('/reset', reset)

module.exports = router
const path = require('path')
const multer = require('multer')
const randomstring = require('randomstring')
const fs = require('fs')

let filename = ''

const mimetypeMap = {
    'image/png': '.png',
    'image/jpg': '.jpg',
    'image/jpeg': '.jpeg',
    'image/gif': '.gif'
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve(__dirname, '../public/uploads'))
    },
    filename: (req, file, cb) => {
        let {
            fieldname,
            mimetype
        } = file
        filename = fieldname + '-' + randomstring.generate(6) + mimetypeMap[mimetype]
        cb(null, filename)
    }
})

const upload = multer({
    storage
}).single('poster')

module.exports = (req, res, next) => {
    upload(req, res, (err) => {
        if (filename) {
            fs.unlink(path.resolve(__dirname, '../public/uploads/' + req.body.tempPoster), (err) => {
                if (err) {
                    console.log(err.message)
                }
            })
        }
        req.filename = filename
        filename = ''
        next()
    })
}
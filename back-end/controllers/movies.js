const movieModel = require('../models/movies')
const fs = require('fs')
const path = require('path')

const findAll = async (req, res, next) => {
    res.set('Content-Type', 'application/json; charset=utf-8')

    let pageInfo = req.query

    let result = await movieModel.findAll(pageInfo)

    if (result) {
        res.render('success', {
            data: JSON.stringify(result)
        })
    } else {
        res.render('fail', {
            data: JSON.stringify({})
        })
    }
}

const save = async (req, res, next) => {
    res.set('Content-Type', 'application/json; charset=utf-8')

    let data = req.body
    data.poster = req.filename

    let result = await movieModel.save(data)

    if (result) {
        res.render('success', {
            data: JSON.stringify({
                message: '数据添加成功.'
            })
        })
    } else {
        res.render('success', {
            data: JSON.stringify({
                message: '数据添加失败.'
            })
        })
    }
}

const update = async (req, res, next) => {
    res.set('Content-Type', 'application/json; charset=utf-8')

    let data = req.body

    if (req.filename === '') {
        delete data.poster
    } else {
        data.poster = req.filename
    }

    let result = await movieModel.update(data)

    if (result) {
        res.render('success', {
            data: JSON.stringify({
                message: '数据修改成功'
            })
        })
    } else {
        res.render('fail', {
            data: JSON.stringify({
                message: '数据修改失败'
            })
        })
    }
}

const findOne = async (req, res, next) => {
    res.set('Content-Type', 'application/json;charset=utf-8')

    let id = req.query.id
    let result = await movieModel.findOne(id)

    if (result) {
        res.render('success', {
            data: JSON.stringify(result)
        })
    } else {
        res.render('fail', {
            data: JSON.stringify(result)
        })
    }
}

const remove = async (req, res, next) => {
    let {
        id,
        tempPoster
    } = req.body

    let result = await movieModel.remove(id)

    if (result) {
        fs.unlink(path.resolve(__dirname, '../public/uploads/' + tempPoster), (err) => {
            if (err) {
                console.log(err.message)
            }
        })
        res.render('success', {
            data: JSON.stringify({
                message: '数据删除成功.'
            })
        })
    } else {
        res.render('fail', {
            data: JSON.stringify({
                message: '数据删除失败.'
            })
        })
    }
}

const search = async (req, res, next) => {
    let {
        keyword
    } = req.query

    let result = await movieModel.search(keyword)

    if (result) {
        res.render('success', {
            data: JSON.stringify({
                list: result
            })
        })
    } else {
        res.render('fail', {
            data: JSON.stringify({
                list: []
            })
        })
    }
}

module.exports = {
    findAll,
    save,
    update,
    remove,
    findOne,
    search
}
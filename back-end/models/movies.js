const {
    Movies
} = require('../utils/db')

const save = (data) => {
    let movies = new Movies(data)
    return movies.save()
}

const findAll = async ({
    start,
    count
}) => {
    let list = await Movies.find().sort({
        _id: -1
    }).limit(~~count).skip(~~start)
    let total = await Movies.find().count()
    return {
        list,
        total
    }
}

const update = (data) => {
    return Movies.findByIdAndUpdate(data.id, data)
}

const findOne = (id) => {
    return Movies.findById(id)
}

const remove = (id) => {
    return Movies.findByIdAndDelete(id)
}

const search = (keyword) => {
    let reg = new RegExp(keyword, 'gi')
    return Movies.find({}).or([{
        movieName: reg
    }, {
        actor: reg
    }, {
        showInfo: reg
    }])
}

module.exports = {
    save,
    findAll,
    update,
    findOne,
    remove,
    search
}
const {
    Users
} = require('../utils/db')

const save = function (data) {
    const users = new Users(data)
    return users.save()
}

const findOne = function (conditions) {
    return Users.findOne(conditions)
}

const update = (conditions) => {
    return Users.findOneAndUpdate(conditions)
}

module.exports = {
    save,
    findOne,
    update
}
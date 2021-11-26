const {Schema, model, ObjectId} = require("mongoose")

const SearchUser = new Schema({
    name: {type: String, required: false}
})

module.exports = model('SearchUser', SearchUser)

const {Schema, model, ObjectId} = require("mongoose")

const SearchInfoFull = new Schema({
    name: {type: String, required: false},
	tabnum: {type: Number, required: false},
	prof: {type: String, required: false},
    department: {type: String, required: false},
    division: {type: String, required: false},
    email: {type: String, required: false}
})

module.exports = model('SearchInfoFull', SearchInfoFull)

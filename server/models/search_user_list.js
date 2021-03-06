const {Schema, model, ObjectId} = require("mongoose")

const SearchInfo = new Schema({
    name: {type: String, required: false},
	tabnum: {type: Number, required: false},
    department: {type: String, required: false},
    division: {type: String, required: false}
})

module.exports = model('SearchInfo', SearchInfo)

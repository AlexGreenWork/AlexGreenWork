const {Schema, model, ObjectId} = require("mongoose")


const Search = new Schema({
    value:{type:String, required:true},
    category:{type:String, required:false},
    count:{type:Number, required:true, unique:true},
    users: [{type:ObjectId, ref: 'SearchInfo'}]
})
module.exports = model('Search', Search)

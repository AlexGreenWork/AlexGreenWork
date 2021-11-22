const {Schema, model, ObjectId} = require("mongoose")

const User = new Schema({
    name:{type:String, required:true},
    surname:{type:String, required:true},
    middlename:{type:String, required:true},
    tabelNum:{type:Number, required:true, unique:true},
    email:{type:String, required:true, unique:true},
    phoneNumber:{type:Number, required:true, unique:true},
    password:{type:String, required:true},
    fired:{type:Boolean},
    adminOptions:{type:String},
    avatar: {type:String},
    files: [{type:ObjectId, ref: 'File'}]

})

module.exports = model('User',User)
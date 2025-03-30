import mongoose  from "mongoose";

 const myCrudSchema = new mongoose.Schema({
    name: {type: String, require: true},
    email: {type: String, require: true},
    age: {type: Number, require: true},
    creator: {type: mongoose.Schema.Types.ObjectId, ref: 'myUserModel'}
})

const myCrudModel = mongoose.model('myCrud', myCrudSchema)

export default myCrudModel;

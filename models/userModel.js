import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    credentials: {type: Number, default: 0}
})

let myUserModel = mongoose.model('credUser', userSchema)

export default myUserModel;
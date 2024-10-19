import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    roll: {type: String},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    grade: {type: String}
}, { collection: "users" })

const userModel = mongoose.model('Users', userSchema)
export {userModel as User}
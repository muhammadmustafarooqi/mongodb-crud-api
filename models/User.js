import mongoose from "mongoose";

let userSchema = new mongoose.Schema({
    username: String,
    age: Number,
    email: String,
},
{timestamps: true}
)

let User = mongoose.model('User', userSchema);


export default User;
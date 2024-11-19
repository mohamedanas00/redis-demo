import {Schema ,model} from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    age:{
        type: Number,
        required: true
    },
    collage:{
        type: String,
        required: true
    }

})

const userModel = model("User" , userSchema);
export default userModel
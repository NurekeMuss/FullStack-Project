import mongoose from "mongoose";

/* Create user model */
/* If we want to indicate that there is a type and it is required to be filled
in, then we pass the object 

If the property is optional, then immediately type
*/
const UserScheme = new mongoose.Schema({
    fullName:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    passwordHash:{
        type: String,
        required: true,
    },

    avatarUrl:String 
},{
    timestamps:true,
},)

export default mongoose.model('User',UserScheme)



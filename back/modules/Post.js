import mongoose from "mongoose";

/* Create user model */
/* If we want to indicate that there is a type and it is required to be filled
in, then we pass the object 

If the property is optional, then immediately type
*/
const PostScheme = new mongoose.Schema({
    tittle:{
        type: String,
        required: true,
    },
    text:{
        type: String,
        required: true,
        unique: true,
    },
    tags:{
        type: Array,
        default: [],
    },
    viewsCount:{
        type: Number,
        default: 0,
    },
    user:{
        type: mongoose.Schema.Types.Object, /* по айди */
        ref:'user', /* ссылается */
        required: true,
    },

    imageUrl:String 
},{
    timestamps:true,
},)

export default mongoose.model('Post',PostScheme)
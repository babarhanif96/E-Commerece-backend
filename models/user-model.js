const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    fullname: {
        type: String,
        minLenght: 3,
        trim: true,
        required: [true, 'Username is required'],
    },
    email: String,
    
    password: String,
    phone: String,
    cartDetail: {
        type : Array,
        default: []
    },
    orders : {
        type : Array,
        default: []
    },
    picture: String,
    isAdmin: Boolean
})

module.exports = mongoose.model("user", userSchema);
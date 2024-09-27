const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        minLenght: 3,
        trim: true,
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
    picture: db,
    isAdmin: Boolean
})




module.exports = mongoose.model("user", userSchema);
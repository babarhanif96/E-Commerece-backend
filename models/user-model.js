const mongoose = require('mongoose');

 mongoose.connect(`mongodb://127.0.0.1:27017/MiniPostApp`);

const userSchema = mongoose.Schema({
    name: String,
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
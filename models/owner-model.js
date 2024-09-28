const mongoose = require('mongoose');

const ownerSchema = mongoose.Schema({
    username: {
        type: String,
        minLenght: 3,
        trim: true,
    },
    email: String,
    password: String,
    products : {
        type : Array,
        default: []
    },
    picture: String,

  
})




module.exports = mongoose.model("owner", ownerSchema);

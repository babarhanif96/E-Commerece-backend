const mongoose = require('mongoose');

const ownerSchema = mongoose.Schema({
    name: {
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
    picture: db,
  
})




module.exports = mongoose.model("owner", ownerSchema);

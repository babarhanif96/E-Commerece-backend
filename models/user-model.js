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
    cartDetail: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'product' },
            quantity: { type: Number, default: 1 }
        }
    ],
    orders : {
        type : Array,
        default: []
    },
    picture: Buffer,
    isAdmin: Boolean
})

module.exports = mongoose.model("user", userSchema);
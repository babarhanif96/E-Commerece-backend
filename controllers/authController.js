
const userModel = require('../models/user-model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { tokenGenerator } = require("../utils/tokenGenerator");



module.exports.registerUser =  async (req,res )=> {
    try {

        let { fullname, email, password } = req.body;
        let user = await userModel.findOne({ email: email })
        if (user) return res.send("user already exists");

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
                let created = await userModel.create({
                    fullname,
                    email,
                    password: hash
                });
                let token = tokenGenerator(user);
                res.cookie("token", token);
                console.log("token ", token)
                res.send(created);
            })
        })
    }
    catch (err) {
        res.send(err.message);
    }
}

module.exports.loginUser = async ( req,res) => {
    try{
        let { email, password } = req.body;
        let user = await userModel.findOne({ email: email })
        if (!user) return res.send("User doesn't exist")
        console.log("userpassword", user.password);
        bcrypt.compare(password, user.password, function (err, result) {
            console.log("result", result)
            if (result) {
                let token = tokenGenerator(user);
                res.cookie("token", token);
                res.send('User Logged In');
            }
            else res.send('something went wrong');
        })
    }
    catch(err){
        res.send(err.message);
    }
}
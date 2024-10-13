
const userModel = require('../models/user-model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { tokenGenerator } = require("../utils/tokenGenerator");

//check changings

module.exports.registerUser =  async (req,res )=> {
    try {

        let { fullname, email, password } = req.body;
        let user = await userModel.findOne({ email: email })
        if (user)    {

            req.flash("error", "You already have an account, please login.");
            console.log('Redirecting to /home in signup');

           return res.redirect("/");
        }

        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password, salt, async function (err, hash) {
              if (err) return res.send(err.message);
              else {
                let user = await userModel.create({
                  email,
                  password: hash,
                  fullname,
                });
      
                let token = tokenGenerator(user);
                res.cookie("token", token);
                console.log('Redirecting to shop signup');

                res.redirect("/shop");
              }
            });
          });
    }catch (err) {
        res.send(err.message);
    }
}

module.exports.loginUser = async ( req,res) => {
    try{
        let { email, password } = req.body;
        let user = await userModel.findOne({ email: email })
        if (!user) {
            req.flash("error", "Email or Password incorrect");
            console.log('Redirecting to login');

            return res.redirect("/");
          }
        
        console.log("userpassword", user.password);
        bcrypt.compare(password, user.password, function (err, result) {
            console.log("result", result)
            if (result) {
                let token = tokenGenerator(user);
                res.cookie("token", token);
                console.log('Redirecting to login');
                res.redirect("/shop");
            }
            else {
                req.flash("error", "Email or Password incorrect");
                return res.redirect("/");
            } 
        })
    }
    catch(err){
        res.send(err.message);
    }
}

module.exports.logout = function (req, res) {
    res.cookie("token", "");
    console.log('Redirecting to logout');
    res.redirect("/");
  };

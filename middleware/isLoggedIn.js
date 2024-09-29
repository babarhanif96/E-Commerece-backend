const jwt = require('jsonwebtoken');
const userModel = require('../models/user-model');


module.exports = async(req,res,next) =>{
    try{
        if (req.cookies.token === " ") {
           
            req.flash("errror", "You need to login first")
            return  res.redirect("/");
        }  else {

        let data = jwt.verify(req.cookies.token, process.env.JWT_KEY);
        let user = userModel
        .findOne({email: user.email })
        .select("-password");

        req.user = data;
        next();
    }
    }
    catch(err){
        req.flash("error", "somth went wrong");
        res.redirect('/');
    }
}
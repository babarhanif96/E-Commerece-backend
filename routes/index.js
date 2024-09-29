const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middleware/isLoggedIn');
const productModel = require('../models/product-model');
const userModel = require('../models/user-model');

router.get('/', function(req,res) {
    let error = req.flash("error")
    res.render('index', {error, loggedin: false});
})

router.get('/shop',isLoggedIn,  async(req,res) =>{
   let product = await productModel.find();
   let success = req.flash("success");
    res.render('shop', {product, success});
} )

router.get('/cart',isLoggedIn,  async(req,res) =>{
    let user = await userModel.findOne({email: req.user.email}).populate('cartDetail');

    const bill = (Number(user.cartDetail[0].price)+20)-Number(user.cartDetail[0].discount);
     res.render('cart', {user, bill});
 } )
 
 

router.get('/addtocart/:productid',isLoggedIn,  async(req,res) =>{
   let user = await userModel.findOne({email: req.user.email});
   user.cartDetail.push(req.params.productid);
   await user.save();

   
  req.flash("success", "added to the cart");
   res.redirect('/shop');
 } )

router.get('/logout', isLoggedIn,  function(req,res){
    res.render("shop");
})

module.exports = router;






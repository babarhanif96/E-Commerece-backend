const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middleware/isLoggedIn');
const productModel = require('../models/product-model');
const userModel = require('../models/user-model');
const mongoose = require('mongoose');

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

   //console.log(user, 'user')
     res.render('cart', {user});
 } )
 
 

router.get('/addtocart/:productid',isLoggedIn,  async(req,res) =>{
   let user = await userModel.findOne({email: req.user.email});
   //console.log("user", user)
   user.cartDetail.push(req.params.productid);
 
   await user.save();
  req.flash("success", "added to the cart");
   res.redirect('/shop');
 } )


router.get('/delete/:productid', isLoggedIn, async (req, res) => {
    try {
        let user = await userModel.findOne({ email: req.user.email });
        const productIdToRemove = new mongoose.Types.ObjectId(req.params.productid);
        user.cartDetail = user.cartDetail.filter(item => item.toString() !== productIdToRemove.toString());
        await user.save();
        res.redirect('/cart');
    } catch (error) {
        console.error('Error deleting product from cart:', error);
        res.status(500).send('Server error');
    }
});



   

router.get('/logout', isLoggedIn,  function(req,res){
    res.render("shop");
})

module.exports = router;






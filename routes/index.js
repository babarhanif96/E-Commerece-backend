const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middleware/isLoggedIn');
const productModel = require('../models/product-model');
const userModel = require('../models/user-model');
const mongoose = require('mongoose');
const upload = require('../config/multer-config');

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
  let user = await userModel.findOne({email: req.user.email}).populate('cartDetail.product');

   console.log(user, 'user')
     res.render('cart', {user});
 } )
 

router.get('/addtocart/:productid', isLoggedIn, async (req, res) => {
    let user = await userModel.findOne({ email: req.user.email });
    let productIndex = user.cartDetail.findIndex(item => item.product === req.params.productid.toString());

    if (productIndex > -1) {
        // Product already in cart, increase quantity
        user.cartDetail[productIndex].quantity += 1;
    } else {
        // Add new product to cart
        user.cartDetail.push({ product: req.params.productid, quantity: 1 });
    }

    await user.save();
    req.flash("success", "Added to cart");
    res.redirect('/shop');
});

router.get('/increase/:productid', isLoggedIn, async (req, res) => {
    let user = await userModel.findOne({ email: req.user.email });
    let productIndex = user.cartDetail.findIndex(item => item.product.toString() === req.params.productid);

    if (productIndex > -1) {
        user.cartDetail[productIndex].quantity += 1;
        await user.save();
    }

    res.redirect('/cart');
});

router.get('/decrease/:productid', isLoggedIn, async (req, res) => {
    let user = await userModel.findOne({ email: req.user.email });
    let productIndex = user.cartDetail.findIndex(item => item.product.toString() === req.params.productid);

    if (productIndex > -1) {
        user.cartDetail[productIndex].quantity -= 1;
        await user.save();
    }

    res.redirect('/cart');
});


router.get('/delete/:productid', isLoggedIn, async (req, res) => {
    try {
        let user = await userModel.findOne({ email: req.user.email });
        user.cartDetail = user.cartDetail.filter(item => item.product.toString() !== req.params.productid);
        await user.save();
        res.redirect('/cart');
    } catch (error) {
        console.error('Error deleting product from cart:', error);
        res.status(500).send('Server error');
    }
});


router.get('/account', isLoggedIn, async(req,res)=> {
    try{
        let user =  await userModel.findOne({email: req.user.email});
        //console.log(user)
        res.render('myaccount', { user });
    }
    catch(err){
        res.send(err.message);
    }
   
})



    router.post('/profile/upload', isLoggedIn, upload.single('image'), async (req, res) => {
        try {
            let user = await userModel.findOne({ email: req.user.email });
            user.image = req.file.buffer;  
            await user.save();
    
            req.flash('success', 'Profile picture updated successfully');
            res.redirect('/account');
        } catch (error) {
            console.error('Error uploading profile picture:', error);
            res.status(500).send('Server error');
        }
    });

    router.post('/profile/update', isLoggedIn, async (req, res) => {
        try {

            let {fullname, phone} = req.body;
            let user = await userModel.findOneAndUpdate({ email: req.user.email },{
                fullname,
                phone,
            },
            { new: true });
         
            await user.save();
    
            req.flash('success', 'updated successfully');
            res.redirect('/account');
        } catch (error) {
            console.error('Error updatinng', error);
            res.status(500).send('Server error');
        }
    });



router.get('/logout', isLoggedIn,  function(req,res){
    res.render("shop");
})

module.exports = router;






const express = require('express');
const router = express.Router();
const productModel = require('../models/product-model');
const upload = require('../config/multer-config');


router.get('/', async (req, res) => {
    res.send('product router working');
});

router.post('/create', upload.single('image') , async (req, res) => {

    try{


        let {name, price, discount, bgcolor, panelcolor, textcolor} = req.body;
    
      let product  = await  productModel.create({
            image: req.file.buffer,
            name,
            price,
            discount,
            bgcolor,
            panelcolor,
            textcolor,
        })
        
        req.flash("success", "product created");
         res.redirect('/owner/admin');

    }
    catch(err){
        res.send(err.message)
    }

});



module.exports = router;
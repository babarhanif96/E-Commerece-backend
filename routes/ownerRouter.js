const express = require('express');
const router = express.Router();
const ownerModel = require('../models/owner-model');




if (process.env.NODE_ENV === "development") {
    router.post("/create", async (req, res) => {
        try {
            let checkOwner = await ownerModel.find();
            if (checkOwner.length > 0) {
                return res.status(401).send("You're not authorized");
            }

            let { username, email, password } = req.body;
            let createOwner = await ownerModel.create({
                username,
                email,
                password
            });

            res.json({ message: "It's working", data: createOwner });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
}


router.get('/', async(req,res) =>{
    res.send('owner router working');
});

router.get('/admin', async(req,res) =>{
    let success = req.flash("success")
    res.render('createproducts', {success});
});




module.exports = router;
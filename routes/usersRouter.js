const express = require('express');
const router = express.Router();
const {registerUser, loginUser} = require('../controllers/authController')




router.get('/', async (req, res) => {
    res.send('user router working');
});


router.post('/register', registerUser )

router.post('/login', loginUser )





module.exports = router;
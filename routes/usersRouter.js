const express = require('express');
const router = express.Router();
const {registerUser, loginUser, logout} = require('../controllers/authController')

const isLoggedIn = require("../middleware/isLoggedIn");




router.get('/', async (req, res) => {
    res.send('user router working');
});
router.post('/register', registerUser )

router.post('/login', loginUser )

router.get("/logout", logout);



module.exports = router;
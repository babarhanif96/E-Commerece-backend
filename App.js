const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cookieparser = require('cookie-parser');
const db = require('./config/mongoose-connection');
const productsRouter = require("./routes/productsRouter");
const ownerRouter = require("./routes/ownerRouter");
const usersRouter = require("./routes/usersRouter");
const indexRouter = require('./routes/index');
require('dotenv').config();
const expressSession = require('express-session');
const flash = require('connect-flash');



const path = require('path');
app.set('view engine', 'ejs');
app.use(cookieparser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(
    expressSession({
        resave: false,
        saveUninitialized: false,
        secret:process.env.EXPRESS_SESSION_SECRET,
    })
)

app.use(flash());
app.use("/", indexRouter);
app.use("/owner", ownerRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);


app.get("/", function (req, res) {
    res.send('signup');
})

app.listen(3000);
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cookieparser = require('cookie-parser');
const db = require('./config/mongoose-connection');
const productsRouter = require("./routes/productsRouter");
const ownerRouter = require("./routes/ownerRouter");
const usersRouter = require("./routes/usersRouter");



const path = require('path');
app.set('view engine', 'ejs');
app.use(cookieparser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use("/owner", ownerRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);


app.get("/", function (req, res) {
    res.send('signup');
})

app.listen(3000);
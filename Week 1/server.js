const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const User = require('./models/user');
const authRoutes = require('./routes/auth'); 
const bcrypt = require('bcrypt');

const app = express();
const port = 3000;

app.use(session({
    secret: 'your_secret_key', 
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 3600000 } 
}));

app.use(express.static('public'));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/', authRoutes);


mongoose.connect('mongodb://127.0.0.1:27017/authDB')
  .then(() => console.log("✅ Successfully connected to MongoDB"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

  
app.listen(3000, () => 
    console.log('Server running on http://localhost:3000'));

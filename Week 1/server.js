const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const path = require('path');
const authRoutes = require('./routes/auth'); 

const app = express();
const port = 3000;

app.use(session({
    secret: 'your_secret_key', 
    resave: false,
    saveUninitialized: false,
    cookie: { 
        maxAge: 3600000,
        secure: false //
    } 
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/auth', authRoutes);

mongoose.connect('mongodb://127.0.0.1:27017/authDB')
  .then(() => console.log("✅ Successfully connected to MongoDB"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

app.listen(port, () => 
    console.log(`🚀 Server running on http://localhost:${port}`));

const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const path = require('path');
const authRoutes = require('./routes/auth'); 
const nodemon = require('nodemon');                //nodemon is a nodejs module which automaticaly reload and starts server//   

const app = express();
const port = 3000;

app.use(session({                         //middleware of how to use sessions in app and defining its protocol for the app//
    secret: 'your_secret_key', 
    resave: false,
    saveUninitialized: false,
    cookie: { 
        maxAge: 3600000,
        secure: false //
    } 
}));

app.use(express.json());  // middleware to parse JSON bodies from incoming requests//
app.use(express.urlencoded({ extended: true }));  // middleware to parse URL-encoded bodies like forms//

app.use(express.static(path.join(__dirname, 'public')));    // Serve static files from the public directory//

app.use('/', authRoutes);              //connect the routes file to the server for each role like login, signup etc for getting api calls from other files.//

mongoose.connect('mongodb://127.0.0.1:27017/authDB')         // Connect to MongoDB database//
  .then(() => console.log("✅ Successfully connected to MongoDB"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

app.listen(port, '0.0.0.0', () =>                           // Start the server and listen on the specified port//
    console.log(`🚀 Server running on http://localhost:${port}`));

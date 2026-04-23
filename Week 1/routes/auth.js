const express = require('express');
const router = express.Router();
const multer = require('multer');
const bcrypt = require('bcrypt');
const path = require('path');
const User = require('../models/user'); 

const storage = multer.diskStorage({
    destination: './public/Assets/uploads/',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });




router.post('/upload-profile-pic', upload.single('profileImage'), async (req, res) => {
    try {
        if (!req.session.userId) return res.status(401).json({ message: "Not authorized" });
        if (!req.file) return res.status(400).send('No file uploaded.');

        
        const imagePath = `./Assets/uploads/${req.file.filename}`;

        
        await User.findByIdAndUpdate(req.session.userId, { profilePic: imagePath });

        res.json({ success: true, path: imagePath });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/get-profile', async (req, res) => {
    if (!req.session || !req.session.userId) {
        return res.status(401).json({ message: "Not authorized" });
    }

    try {
        const user = await User.findById(req.session.userId);
        if (!user) return res.status(404).json({ message: "User not found" });
        
       
        res.json({ 
            username: user.username, 
            email: user.email,
            profilePic: user.profilePic || "./Assets/user-profile.svg" // Fallback to default
        });
    } catch (err) {
        res.status(500).json({ message: "Error loading profile" });
    }
});


router.post('/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'User already exists!' });

        const newUser = new User({ username, email, password });
        await newUser.save();
        
        res.status(200).json({ message: 'User Created Successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error: ' + error.message });
    }
});


router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        req.session.userId = user._id; 
        res.status(200).json({ message: 'Login successful!' });
    } catch (error) {
        res.status(500).json({ message: 'Server error: ' + error.message });
    }
});


router.post('/logout', (req, res) => {
    if (req.session) {
        req.session.destroy((err) => {
            if (err) return res.status(500).json({ message: "Could not log out" });
            res.clearCookie('connect.sid'); 
            return res.status(200).json({ message: "Logged out" });
        });
    } else {
        res.status(200).json({ message: "Already logged out" });
    }
});


router.delete('/delete-account', async (req, res) => {
    try {
        if (!req.session.userId) return res.status(401).json({ message: "Not authorized" });

        await User.findByIdAndDelete(req.session.userId);
        req.session.destroy();
        res.clearCookie('connect.sid');
        res.status(200).json({ message: "Account deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error: " + error.message });
    }
});


router.put('/change-password', async (req, res) => {
    try {
        if (!req.session.userId) return res.status(401).json({ message: "Unauthorized" });

        const { newPassword } = req.body;
        const user = await User.findById(req.session.userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        user.password = newPassword; 
        await user.save();

        res.json({ message: "Password updated successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Server error: " + error.message });
    }
});

module.exports = router;
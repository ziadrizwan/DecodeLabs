const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {type: String, required: true,},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePic: { 
        type: String, 
        default: '/Assets/user-profile.svg' 
    }
});

userSchema.pre('save', async function() {
    if (!this.isModified('password')) return;
    
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.models.user || mongoose.model('user', userSchema);
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a username'],
        unique: true
    },
    id: {
        type: Number,
        required: [true, 'Please provide an id'],
        unique: true
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please provide a password']
    },
})

UserSchema.pre('save', async function () {
    const hash = await bcrypt.hash(this.password, 12);
    this.password = hash;
})

const User = mongoose.model('User', UserSchema);
module.exports = User;
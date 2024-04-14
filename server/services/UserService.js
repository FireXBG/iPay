const User = require('../schemas/UserSchema');
const Assets = require('../schemas/AssetsSchema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv').config();

exports.register = async (data) => {
    const assetsData = {
        BGN: 0,
        EUR: 0,
        USD: 0,
        History: []
    }

    User.create(data).then((user) => {
        return Assets.create({user: user._id, ...assetsData}).then((err) => {
            console.log(err)
        });
    })
}

exports.login = async (login, password) => {
    const data = {
        email: login,
        password: password
    }

    const user = await User.findOne({email: data.email});
    if (!user) {
        throw new Error('User not found');
    }

    const isPasswordCorrect = await bcrypt.compare(data.password, user.password);
    if (!isPasswordCorrect) {
        throw new Error('Invalid password');
    }

    // generate JWT token

    const token = jwt.sign({email: user.email}, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });

    return token;
}

exports.validate = async (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
}

exports.getUserId = async (email) => {
    const user = await User.findOne({email: email});
    if (user) {
        return user._id;
    }

}

exports.changePassword = async (data) => {
    console.log(user)
    return true;
}

exports.logout = async (token) => {
    return this.validate(token);
}
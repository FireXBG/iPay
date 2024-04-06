const mongoose = require('mongoose');

const AssetSchema = new mongoose.Schema({
    BGN: {
        type: Number,
    },
    EUR: {
        type: Number,
    },
    USD: {
        type: Number,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
})

const Assets = mongoose.model('Assets', AssetSchema);

module.exports = Assets;
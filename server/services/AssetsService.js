const Assets = require('../schemas/AssetsSchema');

exports.getAsset = async (userId) => {
    return Assets.findOne({user: userId})
}

exports.addAsset = async (currency, amount, userId) => {
    let assetData = {};
    assetData[currency] = amount;
    assetData['user'] = userId;

    const existingAssets = await Assets.findOne({ user: userId });

    if (existingAssets) {
        if (existingAssets[currency] !== undefined) {
            existingAssets[currency] += amount;
            return Assets.updateOne({ user: userId }, existingAssets);
        } else {
            return Assets.updateOne({ user: userId }, { $set: { [currency]: amount } });
        }
    } else {
        return Assets.create(assetData);
    }
}

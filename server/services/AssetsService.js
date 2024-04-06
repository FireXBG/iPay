const Assets = require('../schemas/AssetsSchema');

exports.addAsset = async (currency, amount, userId) => {
    let assetData = {};
    assetData[currency] = amount;
    assetData['user'] = userId;

    const existingAssets = await Assets.findOne({ user: userId });

    if (existingAssets) {
        // If the user already has assets, check if the currency exists
        if (existingAssets[currency] !== undefined) {
            // If the currency already exists, update the amount
            existingAssets[currency] += amount;
            // Update the existing assets document
            return Assets.updateOne({ user: userId }, existingAssets);
        } else {
            // If the currency doesn't exist, add it with the given amount
            return Assets.updateOne({ user: userId }, { $set: { [currency]: amount } });
        }
    } else {
        // If the user doesn't have assets, create a new document
        return Assets.create(assetData);
    }
}

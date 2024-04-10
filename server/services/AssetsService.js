const Assets = require('../schemas/AssetsSchema');

exports.getAsset = async (userId) => {
    return Assets.findOne({user: userId})
}

exports.addAsset = async (currency, amount, userId) => {
    let assetData = {};
    assetData[currency] = amount;
    assetData['user'] = userId;

    const existingAssets = await Assets.findOne({user: userId});

    if (existingAssets[currency] !== undefined) {
        existingAssets[currency] += amount;
        return Assets.updateOne({user: userId}, existingAssets).then(() => {
            this.setTransactionHistory(amount, currency, null, userId, 'deposits')
        });
    } else {
        return Assets.updateOne({user: userId}, {$set: {[currency]: amount}});
    }
}

exports.sendAsset = async (currency, amount, senderId, receiverId) => {
    let senderAssets = await Assets.findOne({user: senderId});
    let receiverAssets = await Assets.findOne({user: receiverId});

    if (senderAssets[currency] < amount) {
        return new Error('Insufficient funds');
    }

    senderAssets[currency] -= amount;
    receiverAssets[currency] += amount;

    return Promise.all([
        Assets.updateOne({user: senderId}, senderAssets),
        Assets.updateOne({user: receiverId}, receiverAssets),
    ]).finally(() => {
        this.setTransactionHistory(amount, currency, senderId, receiverId, 'transactions')
    });
}

exports.getHistory = async (userId) => {
    const user = await Assets.findOne({user: userId});
    return user.history;
}

exports.setTransactionHistory = async (amount, currency, senderId, receiverId, type) => {
    const id = generateRandomId();

    if (type !== 'transactions' && type !== 'deposits') {
        return new Error('Invalid transaction type');
    }

    if (type == 'transactions') {

        let receiverHistory = {
            id: id,
            amount: amount,
            currency: currency,
            action: 'received',
            date: new Date(),
        }

        let senderHistory = {
            id: id,
            amount: amount,
            currency: currency,
            action: 'sent',
            date: new Date(),
        }

        const existingHistorySender = await Assets.findOne({user: senderId});
        const existingHistoryReceiver = await Assets.findOne({user: receiverId});

        existingHistorySender.history.push(senderHistory);
        existingHistoryReceiver.history.push(receiverHistory);

        return Assets.updateOne({user: senderId}, existingHistorySender).then(() => {
            Assets.updateOne({user: receiverId}, existingHistoryReceiver).then(() => {
                console.log('Transaction history updated')
            }).catch((err) => {
                console.log(err)
            });
        }).catch((err) => {
            console.log(err)
        })
    } else if (type === 'deposits') {
        let depositHistory = {
            id: id,
            amount: amount,
            currency: currency,
            action: 'deposited',
            date: new Date(),
        }

        let existingHistory = await Assets.findOne({user: receiverId});

        existingHistory.history.push(depositHistory);

        Assets.updateOne({user: receiverId}, existingHistory).then(() => {
            console.log('Deposit history updated')
        }).catch((err) => {
            console.log(err)
        });
    }
}

function generateRandomId() {
    return Math.random().toString(36).substring(7);
}

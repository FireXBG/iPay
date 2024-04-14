const router = require('express').Router();
const AssetService = require('../services/AssetsService');
const UserService = require('../services/UserService');

router.get('/getAssets', (req, res) => {
    const {token} = req.query;
    UserService.validate(token).then(async (user) => {
        if (user) {
            const email = user.email;
            const id = await UserService.getUserId(email)
            const userId = id.toString();
            AssetService.getAsset(userId).then((assets) => {
                console.log(assets)
                res.json(assets)
            })
        }
    })
})

router.get("/getHistory", (req, res) => {
    const {token} = req.query;
    UserService.validate(token).then(async (user) => {
        const userId = await UserService.getUserId(user.email);
        AssetService.getHistory(userId).then((history) => {
            console.log(history)
            res.json(history);
        }).catch((err) => {
            res.status(500).json(err);
        })
    })
})

router.post('/addAsset', (req, res) => {
    const {currency, amount, token} = req.body;
    UserService.validate(token).then(async (user) => {
        if (user) {
            const email = user.email;
            const id = await UserService.getUserId(email)
            const userId = id.toString();
            AssetService.addAsset(currency, amount, userId).then(() => {
                res.json({message: 'Asset added successfully'});
            }).catch((err) => {
                res.status(500).json(err);
            })
        }
    })
})

router.post('/sendAsset', (req, res) => {
    const {email, amount, currency, token} = req.body;
    if (!email || !amount || !currency || !token) {
        return res.status(400).json({message: 'Missing required fields'});
    }
    UserService.validate(token).then(async (user) => {
        if (user) {
            const senderEmail = user.email;
            const senderId = await UserService.getUserId(senderEmail);
            const receiverId = await UserService.getUserId(email);
            AssetService.sendAsset(currency, amount, senderId, receiverId).then(() => {
                return res.json({message: 'Asset sent successfully'});
            }).catch((err) => {
                console.log(err)
                return res.status(500).json({message: err.message});
            })
        }
    })
})

module.exports = router;
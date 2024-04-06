const router = require('express').Router();
const AssetService = require('../services/AssetsService');
const UserService = require('../services/UserService');

router.post('/addAsset', (req, res)=> {
    const { currency, amount, token } = req.body;
    UserService.validate(token).then(async (user) => {
        if(user) {
            const email = user.email;
            const id = await UserService.getUserId(email)
            const userId = id.toString();
            AssetService.addAsset(currency, amount, userId).then((asset) => {
                res.json(asset);
            }).catch((err) => {
                res.status(500).json(err);
            })
        }
    })
})

module.exports = router;
const router = require('express').Router();
const UserService = require('../services/UserService');

router.post("/register", (req, res) => {
    const user = req.body;
    UserService.register(user)
        .then(() => {
            console.log('User registered');
            res.status(200).json({success: true})
        })
        .catch((error) => {
            res.status(400).json({error: error.message});
        })
})

router.post("/login", (req, res) => {
    const user = req.body;

    UserService.login(user).then((token) => {
        console.log('User logged in');
        res.status(200).json({success: true, jwt: token});
    }).catch((error) => {
        console.log(error.message);
        res.status(403).json({error: error.message});
    })
})

router.post("/validate", (req, res) => {
    const token = req.body.token;
    console.log('Recieved token: ', token);
    UserService.validate(token).then(((isValid) => {
        if (isValid) {
            console.log('Token is valid');
            res.status(200).json({success: true});
        } else {
            console.log('Invalid token');
            throw new Error('Invalid token');
        }
    })).catch((error) => {
        console.log(error.message);
        res.status(403).json({error: error.message, success: false});
    })
})

router.post("changePassword", (req, res) => {
    const {newPass, token} = req.body;
    const user = this.validate(token);
    UserService.changePassword(user, newPass).then(() => {
        console.log('Password changed');
        res.status(200).json({success: true});
    })
})

router.post("/logout", (req, res) => {
    const token = req.body.token;
    UserService.logout(token).then((isValid) => {
        if (isValid) {
            console.log('User logged out');
            res.status(200).json({success: true});
        } else {
            console.log('Invalid token');
            throw new Error('Invalid token');
        }
    }).catch((error) => {
        console.log(error.message);
        res.status(403).json({error: error.message, success: false});
    });
});

module.exports = router;
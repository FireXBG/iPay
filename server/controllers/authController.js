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
    const {email, password} = req.body;

    UserService.login(email, password).then((token) => {
        console.log('User logged in');
        res.status(200).json({success: true, jwt: token, message: 'User logged in'});
    }).catch((error) => {
        console.log(error.message);
        res.status(403).json({error: 'Invalid email or password', message: 'Invalid credentials'});
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

router.post("/changePassword", (req, res) => {
    const {newPass, token} = req.body;
    const user = UserService.validate(token);
    UserService.changePassword(user, newPass).then(() => {
        console.log('Password changed');
        res.status(200).json({message: 'Password changed successfully'});
    }).catch((err) => {
        console.log(err.message);
        res.status(400).json({error: err.message});
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
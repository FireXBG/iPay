const router = require('express').Router();

router.post("/login", (req, res) => {
   const user = req.body;
   console.log(user)
})

router.post("/register", (req, res) => {
   const user = req.body;
   console.log(user)
})

module.exports = router;
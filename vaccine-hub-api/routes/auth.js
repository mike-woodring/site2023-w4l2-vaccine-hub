const express = require("express");
const User = require("../models/user");
const router = express.Router();

router.post("/login", async (req, res, next) => {
    console.log({
        "context": "auth.js/login",
        "req": req
    });

    try {
        const user = await User.login(req.body);
        return res.status(200).json({ user });
    } catch (err) {
        next(err);
    }
});

router.post("/register", async (req, res, next) => {
    console.log({
        "context": "auth.js/register",
        "req.body": req.body
    });

    try {
        const user = await User.register(req.body);
        return res.status(200).json({ user });
    } catch (err) {
        next(err);
    }
});

module.exports = router;

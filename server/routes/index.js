const express = require("express");
const router = express.Router();
const userRoute = require("./userRoute");
const profilesRoute = require("./profiles");

router.use(express.json())
router.use("/user", userRoute());
router.use("/profile", profilesRoute());


module.exports = router;


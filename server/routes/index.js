const route = require("color-convert/route");
const path = require("path");
const express = require("express");
const citizenRoute = require("./citizen");
const profilesRoute = require("./profiles");
const router = express.Router();

router.use(express.json())
router.use("/user", citizenRoute());
router.use("/profile", profilesRoute());



module.exports = router;


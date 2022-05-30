const route = require("color-convert/route");
const path = require("path");
const express = require("express");
const swaggerUI = require("swagger-ui-express");
const swaggerOptions = require("../documentation/swagger.json");
const citizenRoute = require("./citizen");
const profilesRoute = require("./profiles");
const router = express.Router();

router.use(express.json())
router.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerOptions));
router.use("/user", citizenRoute());
router.use("/api", commentRoute());
router.use("/profile", profilesRoute());

// create a GET route
router.get('*', (request, response) => {
    // update this path to match how you set up express to serve static and where your build is output to
    response.sendFile(path.resolve('../client/build/index.html'));
});

module.exports = router;


const router = require('express').Router();
const authRoutes = require("./views/authRoutes")
const userRoutes = require("./views/userRoutes")


router.use("/auth", authRoutes);
router.use("/user", userRoutes);



module.exports = router;
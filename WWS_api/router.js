const router = require('express').Router();
const authRoutes = require("./views/authRoutes")
const userRoutes = require("./views/userRoutes")
const adminRoutes = require("./views/adminRoutes")



router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/admin", adminRoutes);



module.exports = router;
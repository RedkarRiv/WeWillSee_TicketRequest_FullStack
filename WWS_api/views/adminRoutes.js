const router = require("express").Router();
const adminController = require("../controllers/adminController");
const isAdmin = require("../middleware/isAdmin");
const auth = require("../middleware/tokenVerify");

router.get('/allSATs', auth, isAdmin,  adminController.getAllSAT);

module.exports = router;
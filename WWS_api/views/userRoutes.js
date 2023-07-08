const router = require("express").Router();
const userController = require('../controllers/userController');
const isAdmin = require("../middleware/isAdmin");
const auth = require("../middleware/tokenVerify");

router.get('/myprofile', auth,  userController.getOne);
router.get('/all', auth, isAdmin,  userController.getAll);

module.exports = router;
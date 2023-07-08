const router = require("express").Router();

const userController = require('../controllers/userController');
const auth = require("../middleware/tokenVerify");

router.get('/myprofile', auth,  userController.getOne);

module.exports = router;
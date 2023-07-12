const router = require("express").Router();
const userController = require('../controllers/userController');
const isAdmin = require("../middleware/isAdmin");
const auth = require("../middleware/tokenVerify");

router.get('/myprofile', auth,  userController.getOne);
router.post('/update', auth,  userController.updateUser);
router.get('/inactivate', auth,  userController.inactivateOne);
router.get('/activate', auth,  userController.activateOne);
router.delete('/destroy/:id', auth, isAdmin,  userController.deleteOne);

module.exports = router;
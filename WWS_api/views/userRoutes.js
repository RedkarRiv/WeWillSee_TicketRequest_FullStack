const router = require("express").Router();
const userController = require('../controllers/userController');
const isAdmin = require("../middleware/isAdmin");
const auth = require("../middleware/tokenVerify");

router.get('/myprofile', auth,  userController.getOne);
router.post('/update', auth,  userController.updateUser);
router.get('/all', auth, isAdmin,  userController.getAll);
router.delete('/destroy/:id', auth, isAdmin,  userController.deleteOne);
router.get('/all/filter', auth, isAdmin, userController.getAll);

module.exports = router;
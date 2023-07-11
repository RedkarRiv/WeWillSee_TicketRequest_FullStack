const router = require("express").Router();
const adminController = require("../controllers/adminController");
const isAdmin = require("../middleware/isAdmin");
const auth = require("../middleware/tokenVerify");

router.get('/allSATs', auth, isAdmin,  adminController.getAllSAT);
router.post('/newSAT', auth, isAdmin,  adminController.SATregister);
router.delete('/deleteSAT/:id', auth, isAdmin,  adminController.SATdelete);
router.get('/inactivateSAT/:id', auth, isAdmin,  adminController.inactivateOneSAT);

module.exports = router;
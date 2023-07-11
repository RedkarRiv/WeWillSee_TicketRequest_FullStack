const router = require("express").Router();
const adminController = require("../controllers/adminController");
const isAdmin = require("../middleware/isAdmin");
const auth = require("../middleware/tokenVerify");

router.get('/allSATs', auth, isAdmin,  adminController.getAllSAT);
router.post('/newSAT', auth, isAdmin,  adminController.SATregister);
router.delete('/deleteSAT/:id', auth, isAdmin,  adminController.SATdelete);
router.get('/inactivateSAT/:id', auth, isAdmin,  adminController.inactivateOneSAT);
router.get('/activateSAT/:id', auth, isAdmin,  adminController.activateOneSAT);
router.get('/inactivateUser/:id', auth, isAdmin,  adminController.inactivateOneByAdmin);
router.get('/activateUser/:id', auth, isAdmin,  adminController.activateOneByAdmin);
router.get('/tickets/all', auth, isAdmin,  adminController.getAllTickets);
router.get('/categories/all', auth, isAdmin,  adminController.getAllCategories);
router.post('/new_theme', auth, isAdmin,  adminController.newTheme);
router.post('/new_category', auth, isAdmin,  adminController.newCategory);

module.exports = router;
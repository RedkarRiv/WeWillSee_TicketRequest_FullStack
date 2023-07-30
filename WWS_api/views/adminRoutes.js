const router = require("express").Router();
const adminController = require("../controllers/adminController");
const isAdmin = require("../middleware/isAdmin");
const auth = require("../middleware/tokenVerify");


router.get('/inactivateSAT/:id', auth, isAdmin,  adminController.inactivateOneSAT);
router.get('/activateSAT/:id', auth, isAdmin,  adminController.activateOneSAT);
router.get('/inactivateUser/:id', auth, isAdmin,  adminController.inactivateOneByAdmin);
router.get('/activateUser/:id', auth, isAdmin,  adminController.activateOneByAdmin);
router.get('/inactivateCat/:id', auth, isAdmin,  adminController.inactivateCategory);
router.get('/activateCat/:id', auth, isAdmin,  adminController.activateCategory);

router.get('/all', auth, isAdmin, adminController.getAllUsers);
router.get('/all/filter', auth, isAdmin, adminController.getAllUsers);
router.get('/allSATs', auth, isAdmin,  adminController.getAllSAT);
router.get('/tickets/all', auth, isAdmin,  adminController.getAllTickets);
router.get('/categories/all', auth, isAdmin,  adminController.getAllCategories);
router.get('/themes/all', auth, isAdmin,  adminController.getAllThemes);

router.post('/new_theme', auth, isAdmin,  adminController.newTheme);
router.post('/newCategory', auth, isAdmin,  adminController.newCategory);
router.post('/new_faq', auth, isAdmin,  adminController.newFAQ);
router.post('/newSAT', auth, isAdmin,  adminController.SATregister);
router.delete('/deleteSAT/:id', auth, isAdmin,  adminController.SATdelete);
router.post('/newUser', auth, isAdmin,  adminController.userRegister);
router.put('/getFAQs/:id', auth, isAdmin,  adminController.getAllFAQs);

module.exports = router;

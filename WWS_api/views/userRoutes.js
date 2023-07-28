const router = require("express").Router();
const userController = require("../controllers/userController");
const isAdmin = require("../middleware/isAdmin");
const auth = require("../middleware/tokenVerify");

router.get("/myprofile", auth, userController.getOne);
router.post("/update", auth, userController.updateUser);
router.get("/inactivate", auth, userController.inactivateOne);
router.get("/activate", auth, userController.activateOne);
router.delete("/destroy/:id", auth, isAdmin, userController.deleteOne);
router.get("/themes", auth, userController.getAllThemesByUser);
router.post("/tickets/new", auth, userController.newTicketByUser);
router.get("/tickets/all", auth, userController.getAllTicketsByUser);


router.get("/tickets/sat/all", auth, userController.getAllTicketsBySAT);


module.exports = router;

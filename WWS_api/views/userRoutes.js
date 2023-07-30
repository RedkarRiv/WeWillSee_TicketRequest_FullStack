const router = require("express").Router();
const userController = require("../controllers/userController");
const isAdmin = require("../middleware/isAdmin");
const auth = require("../middleware/tokenVerify");
const isSAT = require("../middleware/isSAT");

router.get("/myprofile", auth, userController.getOne);
router.post("/update", auth, userController.updateUser);
router.get("/inactivate", auth, userController.inactivateOne);
router.put("/inactivate/ticket/:id", auth, userController.inactivateTicket);
router.put("/activate/ticket/:id", auth, userController.activateTicket);
router.put("/close/ticket/:id", auth, userController.closeTicket);
router.get("/activate", auth, userController.activateOne);
router.delete("/destroy/:id", auth, isAdmin, userController.deleteOne);
router.get("/themes", auth, userController.getAllThemesByUser);
router.post("/tickets/new", auth, userController.newTicketByUser);
router.post("/tickets/new/comment", auth, userController.newComment);
router.get("/tickets/all", auth, userController.getAllTicketsByUser);
router.get("/tickets/status", auth, userController.getTicketStatus);
router.get("/templates", auth, isSAT, userController.getAllTemplates);
router.post("/templates/new", auth, isSAT, userController.newTemplate);
router.put("/tickets/reassign", auth, isSAT, userController.reassignTicketBySAT);

router.get("/tickets/sat/all", auth, userController.getAllTicketsBySAT);

module.exports = router;

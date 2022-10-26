const { Router } = require("express");
const controller = require("./controller");

const { isLoggedIn } = require("../../middleware");

const router = Router();

router.get("/", isLoggedIn, controller.getAllProjectsController); //index page
router.get("/kanban", isLoggedIn, controller.getAllProjectsKanbanController); //kanban page
router.get("/activity", isLoggedIn, controller.getActivityController); //activity page

router.get("/new", isLoggedIn, controller.getNewProjectFormController); //new page -> loads form to create new project
router.get("/:projectid", isLoggedIn, controller.getProjectByIdController); //show page
router.get(
  "/:projectid/edit",
  isLoggedIn,
  controller.getProjectByIdEditController
); //edit page

router.post("/search", isLoggedIn, controller.searchStringController); //index page

router.post(
  "/:projectid/update",
  isLoggedIn,
  controller.updateProjectParametersController
); //updateparams page

router.put("/:projectid/edit", isLoggedIn, controller.editProjectController); //edit page
router.put(
  "/:projectid/updateKanban",
  isLoggedIn,
  controller.updateProjectParametersKanbanController
); //updateparams page

router.put("/:projectid/checkThrown", isLoggedIn, controller.checkThrown);
router.put("/:projectid/checkTrimmed", isLoggedIn, controller.checkTrimmed);
router.put("/:projectid/checkBisque", isLoggedIn, controller.checkBisque);
router.put("/:projectid/checkGlazed", isLoggedIn, controller.checkGlazed);
router.put(
  "/:projectid/checkGlazeFired",
  isLoggedIn,
  controller.checkGlazeFired
);

router.put("/:projectid/updateNotes", isLoggedIn, controller.updateNotes);

router.post("/newpost", isLoggedIn, controller.addNewProjectController); //new page

router.delete(
  "/:projectid/delete",
  isLoggedIn,
  controller.deleteProjectController
);

module.exports = router;

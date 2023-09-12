const { Router } = require("express");

const ExercisesController = require("../controllers/ExercisesController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const exercisesRoutes = Router();

const exercisesController = new ExercisesController();
exercisesRoutes.use(ensureAuthenticated);
exercisesRoutes.get("/bygroup/:group", exercisesController.index);
exercisesRoutes.get("/:id", exercisesController.show);

module.exports = exercisesRoutes;
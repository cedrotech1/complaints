const express = require("express");
const router = express.Router();
const agencyController = require("../controllers/agencyController");
import { protect } from "../middlewares/protect";

router.post("/", protect, agencyController.createAgency);
router.get("/", protect, agencyController.getAllAgencies);
router.get("/:id", protect, agencyController.getAgencyById);
router.put("/:id", protect, agencyController.updateAgency);
router.delete("/:id", protect, agencyController.deleteAgency);

module.exports = router;

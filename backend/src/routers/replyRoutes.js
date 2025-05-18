const express = require("express");
const router = express.Router();
const replyController = require("../controllers/replyController");
import { protect } from "../middlewares/protect";
router.post("/", protect, replyController.createReply);
router.get("/claim/:claimId", protect, replyController.getRepliesByClaim);

module.exports = router;

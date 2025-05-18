import express from "express";
import {
  addClaimController,
  Claims,
  approveClaimController,
  rejectClaimController,
  deleteOneClaimController,
  getOneClaimController,
  pendingController,
  updateClaimController,
  ckeckClaimController,
  unckeckClaimController,
  uploadPdf
} from "../controllers/ClaimsController";
import { protect } from "../middlewares/protect";
const router = express.Router();
router.delete("/delete/:id", protect, deleteOneClaimController);   
router.post("/", protect, addClaimController);
router.get("/", protect, Claims);
router.get("/pending", protect, pendingController);
router.get("/one/:id", protect, getOneClaimController);
router.put("/approve/:id", protect, approveClaimController);
router.put("/check/:id", protect, ckeckClaimController);
router.put("/uncheck/:id", protect, unckeckClaimController);
router.put("/reject/:id", protect, rejectClaimController);
router.put("/update/:id", protect, updateClaimController);
// Add the upload route
router.post('/upload/:id',protect, uploadPdf);

export default router;

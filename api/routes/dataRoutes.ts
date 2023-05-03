import { Router } from "express";
import {
  getAllData,
  updateData,
  deleteData,
} from "../controllers/dataController";

const router = Router();

router.route("/").get(getAllData);
router.route("/:id").delete(deleteData).patch(updateData);

export default router;

import { Router } from "express";
import {
  createData,
  getAllData,
  updateData,
  deleteData,
} from "../controllers/dataController";

const router = Router();

router.route("/").post(createData).get(getAllData);
router.route("/:id").delete(deleteData).patch(updateData);

export default router;

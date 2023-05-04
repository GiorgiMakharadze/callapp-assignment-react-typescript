"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dataController_1 = require("../controllers/dataController");
const router = (0, express_1.Router)();
router.route("/").post(dataController_1.createData).get(dataController_1.getAllData);
router.route("/:id").delete(dataController_1.deleteData).patch(dataController_1.updateData);
exports.default = router;

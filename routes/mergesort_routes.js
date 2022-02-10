const express = require("express");
const router = express.Router();

// Controlller
const mergeSortController = require("../controllers/mergesort_controller.js");

// Middleware
const randNumArr = require("../middleware/getRandNumArr_middleware.js");

// Returns a random array with size based on the current level
router.post(
  "/:lvl/get_arr",
  randNumArr.getArr,
  mergeSortController.getMergeSortRow
);

// Routes the page display level for a given level
router.get("/:lvl", mergeSortController.renderMergeSortLvl);

// Base route is level select
router.get("/", mergeSortController.renderLvlSelect);

module.exports = router;

const express = require("express");
const randNumArr = require("../middleware/getRandNumArr_middleware.js");
const nextArr = require("../middleware/getNextArr_middleware.js");

const mergeSortController = require("../controllers/mergesort_controller.js");
const router = express.Router();

// keopt with level for future use
router.post(
  "/:lvl/get_arr",
  randNumArr.getArr,
  mergeSortController.getMergeSortRow
);
router.get("/:lvl", mergeSortController.renderMergeSortLvl);

router.get("/", mergeSortController.renderLvlSelect);

module.exports = router;

const express = require('express');
const randNumArr = require('../middleware/getRandNumArr_middleware.js');
const nextArr = require('../middleware/getNextArr_middleware.js');

const mergeSortController = require('../controllers/mergesort_controller.js');
const router = express.Router();

// keopt with level for future use
router.post('/:lvl/get_next_arr', nextArr.getNextArr, mergeSortController.getMergeSortRow);
router.get('/:lvl', randNumArr.getArr, mergeSortController.renderMergeSortLvl);

router.get('/', mergeSortController.renderLvlSelect);

module.exports = router
const express = require('express');
const adminController = require('../controllers/admin_controller.js');
const adminLoginMW = require('../middleware/admin_mw/adminLogin_middleware.js');
const adminLogsMW = require('../middleware/admin_mw/adminLogs_middleware.js');
const createLogMW = require('../middleware/admin_mw/createLog_middleware.js');
const maxLevel = require('../middleware/login_mw/maxLvl_middleware.js');//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_


//const loginMW = require('../middleware/login_middleware.js');
const router = express.Router();

router.get('/', adminLogsMW.getAnalytics, adminController.renderAdminPage);
router.get('/login', adminController.renderAdminLogin);

router.post('/log_game', createLogMW.createGameLog);
router.post('/update_max_ms', maxLevel.changeMergeSortMaxLvl);
router.post('/verify_login', adminLoginMW.checkUser, adminLoginMW.checkPassword, adminController.redirectAdminPage);


module.exports = router
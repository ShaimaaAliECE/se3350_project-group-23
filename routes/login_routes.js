const express = require('express');
const loginController = require('../controllers/login_controller.js');
const newAccountMW = require('../middleware/login_mw/newAccount_middleware.js');
const newUsernameMW = require('../middleware/login_mw/newUsername_middleware.js');

const loginMW = require('../middleware/login_mw/login_middleware.js');
const router = express.Router();

router.get('/', loginMW.clearCookies, loginController.renderLogin);
router.get('/create_account', loginController.renderCreateAccount);
router.get('/forgot_usr', loginController.renderForgotUsername);

router.post('/verify_login', loginMW.checkUser, loginMW.setCookies, loginController.renderLoginSuccess);
router.post('/create_new_account', newAccountMW.verifyFormInput, newAccountMW.verifyStudentId, newAccountMW.verifyUsername, 
            newAccountMW.checkDuplicateStudentId, newAccountMW.checkDuplicateUsername, newAccountMW.createAccount, newAccountMW.createLvlsAccount, 
            loginMW.setCookies, loginController.renderNewAccount
        );
router.post('/set_new_username', newAccountMW.verifyFormInput, newUsernameMW.checkStudentId, newAccountMW.verifyUsername, 
            newAccountMW.checkDuplicateUsername, newUsernameMW.changeUsername, loginMW.setCookies, loginController.renderNewUsername
        );


module.exports = router
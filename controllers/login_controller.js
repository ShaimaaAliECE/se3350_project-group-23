const renderLogin = (req, res, next) => {
    console.log('-> Rendering Login Page:');
    res.status(200).render("logins/login", {
                                            tabTitle: "Login", 
                                            loginTitle: "Login"
                                        }
                            );
    console.log('* Rendered Login Page: SUCCESS\n');
}
const renderLoginSuccess = (req, res, next) => {
    console.log('-> Rendering Login Home Page:');
    res.status(200).redirect("/");

    console.log('* Rendered Login Home Page: SUCCESS\n');
}

const renderCreateAccount = (req, res, next) => {
    console.log('-> Rendering Create Account Page:');
    res.status(200).render("logins/create_account", {
                                            tabTitle: "Create Account", 
                                            loginTitle: "Create Account"
                                        }
                            );
    console.log('* Rendered Create Account Page: SUCCESS\n');
}

const renderForgotUsername = (req, res, next) => {
    console.log('-> Rendering Forgot Username Page:');
    res.status(200).render("logins/forgot_usr", {
                                            tabTitle: "Forgot Usr", 
                                            loginTitle: "Forgot Username"
                                        }
                            );
    console.log('* Rendered Forgot Username Page: SUCCESS\n');
}

const renderNewAccount = (req, res, next) => {
    console.log('-> Rendering New Account Page:');
    res.status(200).render("logins/new_account", {
                                            tabTitle: "New Account", 
                                            loginTitle: "New Account Created",
                                            username: req.body.usr,
                                            studentId: req.body.studentId
                                        }
                            );
    console.log('* Rendered New Account Page: SUCCESS\n');
}
const renderNewUsername = (req, res, next) => {
    console.log('-> Rendering New Account Page:');
    res.status(200).render("logins/new_username", {
                                            tabTitle: "New Username", 
                                            loginTitle: "New Username Created",
                                            username: req.body.usr,
                                            studentId: req.body.studentId
                                        }
                            );
    console.log('* Rendered New Account Page: SUCCESS\n');
}

module.exports = {
    renderLogin,
    renderLoginSuccess,
    renderCreateAccount,
    renderForgotUsername,
    renderNewAccount,
    renderNewUsername
};
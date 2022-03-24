const renderAdminPage = (req, res, next) => {
    console.log('-> Rendering Admin Page:');

    let jsonInfo = {
        tabTitle: "MS", 
        pageTitle: "Admin",
        usr: "Admin",
        logs: req.body.data
    }

    res.status(200).render("admins/admin", jsonInfo);
    console.log('* Rendered Admin Page: SUCCESS\n');
}
const renderAdminLogin = (req, res, next) => {
    console.log('-> Rendering Admin Login Page:');

    let jsonInfo = {
        tabTitle: "Admin", 
        loginTitle: "Admin Login"
    }
    if(req.cookies.studentId && req.cookies.usr) {
        jsonInfo.usr = req.cookies.usr;
    }

    res.status(200).render("admins/admin_login", jsonInfo);
    console.log('* Rendered Admin Login Page: SUCCESS\n');
}

const redirectAdminPage = (req, res, next) => {
    res.status(200).redirect("/admin");
}

module.exports = {
    renderAdminLogin,
    renderAdminPage,
    redirectAdminPage
};
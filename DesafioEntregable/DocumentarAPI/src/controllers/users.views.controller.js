const getLoginController = (req, res) => {
    if (req.session.user) {
        res.redirect('/products');
    } else {
        res.render('login');
    }

}

const getRegisterController = (req, res) => {
    res.render('register');
}

const getProfileController = (req, res) => {

    res.render('profile', { user: req.session.user });
}
export { getLoginController, getRegisterController, getProfileController }
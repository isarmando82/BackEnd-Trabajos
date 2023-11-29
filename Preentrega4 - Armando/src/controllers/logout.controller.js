const getLogoutController = (req, res) => {
    req.session.destroy();
    res.redirect('/users/login');
}

export { getLogoutController }
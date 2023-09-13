
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      // Si el usuario está autenticado, permite que continúe.
      return next();
    }
    // Si el usuario no está autenticado, redirige a la página de inicio de sesión.
    res.redirect('/users/login');
  }
  
  export { ensureAuthenticated };
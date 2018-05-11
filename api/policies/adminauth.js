module.exports = function (req, res, next) {
  console.log('here');
  if (req.session.authenticated) {
    return next();
  }else {
    req.flash('error', 'Session Timeout');
    res.redirect('/');
    // return next();
  }
};

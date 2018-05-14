module.exports = function (req, res, next) {
  if (req.session.authenticated) {
    return next();
  }else {
    req.flash('error', 'Session Timeout');
    res.send({status:'logout'});
    // return next();
  }
};

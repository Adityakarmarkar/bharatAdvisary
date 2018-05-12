var jwt = require('jsonwebtoken');
module.exports = {
  issueToken : function(payload, options) {
    var token = jwt.sign(payload, process.env.TOKEN_SECRET || sails.config.myGlobals.jwtToken, options);
    return token;
  },
  verifyToken : function(token, callback) {
    return jwt.verify(token, process.env.TOKEN_SECRET || sails.config.myGlobals.jwtToken, {}, callback);
  }
};

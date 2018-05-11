var bcrypt = require('bcryptjs');
module.exports = {

  attributes: {
    userName:{
      type:'string',
      unique: true
    },
    email:{
      type:'string',
      required: true,
      unique: true
    },
    password:{
      type:'string',
      required: true
    }
  },
  beforeCreate:function (admin, cb) {
    if (_.isEmpty(admin.userName)) {
      admin.userName = admin.email;
    }
    bcrypt.hash(admin.password, sails.config.myGlobals.salt, function(err, hash) {
        if (err) {
            console.log(err);
            cb(err);
        } else {
            admin.password = hash;
            cb(null);
        }
    });
  }
};

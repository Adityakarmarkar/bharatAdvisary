var bcrypt = require('bcryptjs');
module.exports = {

  attributes: {
    userName:{
      type:'string',
      required: true,
      unique: true
    },
    mobile:{
      type:'string',
      required: true,
      unique: true
    },
    city:{
      type:'string',
      required: true
    },
    macAddress:{
      type:'string',
      required: true
    },
    fcmId:{
      type:'string',
      required: true
    },
    device:{
      type:'string',
      enum: ['andriod','ios'],
      defaultsTo: 'andriod'
    },
    status:{
      type:'string',
      enum: ['active','suspended'],
      defaultsTo: 'active'
    },
    password:{
      type:'string',
      required: true
    },
    expiryFlag:{
      type:'boolean',
      defaultsTo:false
    },
    expiryDate:{
      type:'datetime'
    }
  },
  beforeCreate:function (user, cb) {
    if (_.isEmpty(user.userName)) {
      user.userName = user.mobile;
    }
    bcrypt.hash(user.password, sails.config.myGlobals.salt, function(err, hash) {
        if (err) {
            console.log(err);
            cb(err);
        } else {
            user.password = hash;
            cb(null);
        }
    });
  }
};

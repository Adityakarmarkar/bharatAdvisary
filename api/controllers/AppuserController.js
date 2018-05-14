var moment = require('moment');
var bcrypt = require('bcryptjs');
module.exports = {
	userlist:function (req, res) {
		Appuser.find().exec(function (err, alluers) {
			if (err){ res.serverError(err); }else {
				res.view('admin/userlist',{layout:'layout', data:{users:alluers}, moment:moment, active:((req.param.filter) ? req.param.filter : 'all')});
			}
		});
	},
	register:function (req, res) {
		var param = req.params.all();
		Appuser.create(param).exec(function (err, oneUers) {
			if (err || _.isUndefined(oneUers)){
				res.send({status:'error', data:{}, mess:'Error while creating user', error:err});
			} else {
				res.send({status:'success', data:oneUers, mess:'User Created successfully', error:{}});
			}
		});
	},
	login:function (req, res) {
		var param = req.params.all();
		if (param.mobile && param.password){
			Appuser.findOne({or:[{mobile:param.mobile}, {userName:param.mobile}]}).exec(function (err, oneUser) {
				if (err){
					res.send({status:'error', data:{}, mess:'Error while loggin in', error:err});
				} else if (oneUser){
					  bcrypt.hash(param.password, sails.config.myGlobals.salt, function(err, hash) {
							if (err){
								res.send({status:'error', data:{}, mess:'Error while loggin in', error:err});
							} else if (hash && hash === oneUser.password){
								var token = TokenAuth.issueToken({mobile:oneUser.mobile},{});
								res.send({status:'success', data:{user:oneUser, token:token}, mess:'User logged in', error:{}});
							} else {
								res.send({status:'error', data:{}, mess:'Password missed matched', error:{}});
							}
						});
				} else {
					res.send({status:'error', data:{}, mess:'No user found', error:{}})
				}
			});
		} else {
			res.send({status:'error', data:{}, mess:'keys missing', error:{}})
		}
	}
};

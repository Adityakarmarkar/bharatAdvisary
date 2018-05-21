var moment = require('moment');
var bcrypt = require('bcryptjs');
module.exports = {
	userlist:function (req, res) {
		var param = req.params.all();
		var condition = {};
		if (param.filter && param.filter == 'active'){
			condition['status'] = 'active';
		} else if (param.filter && param.filter == 'suspended'){
			condition['status'] = 'suspended';
		}
		Appuser.find(condition).exec(function (err, alluers) {
			if (err){ res.serverError(err); }else {
				res.view('admin/userlist',{layout:'layout', data:{users:alluers}, moment:moment, active:((param.filter) ? param.filter : 'all')});
			}
		});
	},
	register:function (req, res) {
		var param = req.params.all();
		param['expiryFlag'] = true;
		param['expiryDate'] = moment().add(5, 'days').toDate();

		Appuser.findOne({or:[{userName:param.userName},{mobile:param.mobile}]}).exec(function (err, checkUser){
			if (err){
				res.send({status:'error', data:{}, mess:'Error while creating user', error:err});
			} else if (checkUser){
				if (checkUser.userName == param.userName){
					res.send({status:'error', data:{}, mess:'Username already exsists', error:'unknown error'});
				} else if (checkUser.mobile == param.mobile){
					res.send({status:'error', data:{}, mess:'Mobile Number already exsists', error:'unknown error'});
				} else {
					res.send({status:'error', data:{}, mess:'Error while creating user', error:'unknown error'});
				}
			} else {
				Appuser.create(param).exec(function (err, oneUers) {
					if (err || _.isUndefined(oneUers)){
						console.log(err);
						res.send({status:'error', data:{}, mess:'Error while creating user', error:err});
					} else {
						res.send({status:'success', data:oneUers, mess:'User Created successfully', error:{}});
					}
				});
			}
		});
	},
	login:function (req, res) {
		var param = req.params.all();
		console.log(param);
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
								if (param.fcmId){
									oneUser.fcmId = param.fcmId;
									oneUser.save(function(err){
										if(err){ console.log(err); }
										res.send({status:'success', data:{user:oneUser, token:token}, mess:'User logged in', error:{}});
									})
								} else {
									res.send({status:'success', data:{user:oneUser, token:token}, mess:'User logged in', error:{}});
								}
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
	},
	suspendUser:function (req, res) {
		var param = req.params.all();
		if (param.UserId){
			Appuser.findOne({id:param.UserId}).exec(function (err, oneUser) {
				if (err){
					res.send({status:'error'});
				} else if (oneUser){
					oneUser.status = 'suspended'
					oneUser.save(function (err) {
						if (err){
							res.send({status:'error'});
						} else { res.send({status:'success'}); }
					});
				} else { res.send({status:'error'}); }
			});
		} else {
			res.send({status:'error'});
		}
	},
	sustainUser:function (req, res) {
		var param = req.params.all();
		if (param.UserId){
			Appuser.findOne({id:param.UserId}).exec(function (err, oneUser) {
				if (err){
					res.send({status:'error'});
				} else if (oneUser){
					oneUser.status = 'active'
					oneUser.save(function (err) {
						if (err){
							res.send({status:'error'});
						} else { res.send({status:'success'}); }
					});
				} else { res.send({status:'error'}); }
			});
		} else {
			res.send({status:'error'});
		}
	},
	setExpiration:function (req, res) {
		var param = req.params.all();
		if (param.UserId && param.date){
			Appuser.findOne({id:param.UserId}).exec(function (err, oneUser) {
				if (err){
					res.send({status:'error'});
				} else if (oneUser){
					oneUser.expiryFlag = true;
					oneUser.expiryDate = param.date;
					oneUser.save(function (err) {
						if (err){ res.send({status:'error'}); } else {
							res.send({status:'success'});
						}
					});
				} else { res.send({status:'error'}); }
			});
		} else {
			res.send({status:'error'});
		}
	},
	setAsExpired:function (req, res) {
		var param = req.params.all();
		if (param.UserId){
			Appuser.findOne({id:param.UserId}).exec(function (err, oneUser) {
				if (err){
					res.send({status:'error'});
				} else if (oneUser){
					oneUser.expiryFlag = false;
					oneUser.expiryDate = null;
					oneUser.save(function (err) {
						if (err){ res.send({status:'error'}); } else {
							res.send({status:'success'});
						}
					});
				} else { res.send({status:'error'}); }
			});
		} else {
			res.send({status:'error'});
		}
	}
};

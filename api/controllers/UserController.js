var moment = require('moment');
module.exports = {
	userlist:function (req, res) {
		User.find().exec(function (err, alluers) {
			if (err){ res.serverError(err); }else {
				res.view('admin/userlist',{layout:'layout', data:{users:alluers}, moment:moment, active:((req.param.filter) ? req.param.filter : 'all')});
			}
		});
	},
	register:function (req, res) {
		var param = req.params.all();
		User.create(param).exec(function (err, oneUers) {
			if (err || _.isUndefined(oneUers)){
				res.send({status:'error', data:{}, mess:'Error while creating user', error:err})
			} else {
				res.send({status:'success', data:oneUers, mess:'User Created successfully', error:{}});
			}
		});
	}
};

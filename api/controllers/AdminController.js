var bcrypt = require('bcryptjs');
module.exports = {
	index:function (req, res) {
		res.view('homepage',{layout:'layout',bodyClass:'hold-transition login-page'});
	},
	adminAuth:function (req, res) {
		var param = req.params.all();
		if (param.email && param.password){
			Admin.findOne({or:[{email:param.email} , {user:param.email}]}).exec(function (err, oneAdmin) {
				if (err){ res.serverError(err);
				} else if (oneAdmin){
					bcrypt.hash(param.password, sails.config.myGlobals.salt, function(err, hash) {
						if (err){ res.serverError(err);
						} else if (hash === oneAdmin.password){
							req.session.authenticated = true;
							res.redirect('/dashboard');
						} else {
							req.flash('error', 'Password incorrect');
							res.redirect('back');
						}
					});

				} else {
					req.flash('error', 'Email not registered');
					res.redirect('back');
				}
			});
		} else {
			req.flash('error', 'Email and Password manditory');
			res.redirect('back');
		}
	},
	dashboard:function (req, res) {
		res.view('admin/dashboard',{layout:'layout', data:{}, active:'dashboard'});
	},
	logout:function (req, res) {
		req.session.authenticated = false;
		req.session.destroy();
		res.redirect('/');
	}

};

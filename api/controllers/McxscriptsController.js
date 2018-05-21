var moment = require('moment');
module.exports = {
	lists:function (req, res) {
		var sendData = {
			layout : 'list',
			scripts:[]
		}
		Mcxscripts.find().sort('createdAt DESC').exec(function (err, allMaxscript) {
			if (err){ res.serverError(err); } else {
				sendData.scripts = allMaxscript;
				res.view('admin/mcxPage',{layout:'layout', data:sendData, moment:moment, active:'listMCX'});
			}
		});
	},


		create:function (req, res) {
			var sendData = {
				layout : 'create'
			}
			res.view('admin/mcxPage',{layout:'layout', data:sendData, active:'createMCX'});
		},
		createScript:function (req, res) {
			var param = req.params.all();
			Mcxscripts.create(param).exec(function (err) {
				if (err){ res.serverError(err); } else {
					res.redirect('/mcxscripts/list');
				}
			});
		},
		list:function (req, res) {
			var sendData = {
				layout : 'list',
				scripts:[]
			}
			Mcxscripts.find().sort('createdAt DESC').exec(function (err, allMaxscript) {
				if (err){ res.serverError(err); } else {
					sendData.scripts = allMaxscript;
					res.view('admin/mcxPage',{layout:'layout', data:sendData, moment:moment, active:'listMCX'});
				}
			});

		},
		deleteScript:function (req, res) {
			var param = req.params.all();
			if (param && param.id){
				Mcxscripts.destroy({id:param.id}).exec(function (err) {
					if (err){ res.serverError(err); } else {
						res.redirect('back');
					}
				});
			} else {
				res.serverError('Unknown Script');
			}
		},
		editScript:function (req, res) {
			var param = req.params.all();
			var sendData = {
				layout : 'edit',
				oneScript:null
			}
			if (param && param.id){
				Mcxscripts.findOne({id:param.id}).exec(function (err, oneScript) {
					if (err){
						res.serverError(err);
					} else if (oneScript){
						sendData.oneScript = oneScript;
						Mcxscripts.find().sort('createdAt DESC').exec(function (err, allMaxscript) {
							if (err){ res.serverError(err); } else {
								sendData.scripts = allMaxscript;
								res.view('admin/mcxPage',{layout:'layout', data:sendData, active:'', moment:moment});
							}
						});
					} else { res.serverError('No Script found with such `id`'); }
				});
			} else {
				res.serverError('Unknown Script');
			}
		},
		editSaveScript:function (req, res) {
			var param = req.params.all();
			if (param && param.id){
				var ScriptId = param.id;
				delete param.id;
				Mcxscripts.update({id:ScriptId},param).exec(function (err, oneScript) {
					if (err){ res.serverError(err); } else {
						res.redirect('/mcxscripts/list');
					}
				});
			} else { res.serverError('Unknown Script'); }
		}
};

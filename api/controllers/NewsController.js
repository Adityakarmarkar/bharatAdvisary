var moment = require('moment');
var translate = require('google-translate-api');
module.exports = {
		newsList:function (req, res) {
			var sendData = {};
			News.find().sort('createdAt DESC').exec(function (err, allnews) {
				if (err){ res.serverError(err); } else {
					sendData['allnews'] = allnews;
					res.view('admin/news',{layout:'layout', data:sendData, moment:moment, active:'news'});
				}
			});
		},
		editnews:function (req, res) {
			var param = req.params.all();
			var sendData = {};
			if (param && param.id){
				News.findOne({id:param.id}).exec(function (err, oneNews) {
					if (err){
						res.serverError(err);
					} else if (oneNews){
						sendData['oneNews'] = oneNews;
						News.find().sort('createdAt DESC').exec(function (err, allnews) {
							if (err){ res.serverError(err); } else {
								sendData['allnews'] = allnews;
								res.view('admin/news',{layout:'layout', data:sendData, moment:moment, active:'news'});
							}
						});
					} else {
						res.serverError('Unknown news');
					}
				});
			} else {
				res.serverError('Unknown news');
			}
		},
		editmyNews:function (req, res) {
			var param = req.params.all();
			var sendData = {};
			if (param && param.id){
				var newId = param.id
				delete param.id;
				News.update({id:newId},param).exec(function (err, oneNews) {
					if (err){ res.serverError(err); } else {
						res.redirect('/newsList');
					}
				});
			} else {
				res.serverError('Unknown news');
			}
		},
		translateToHindi:function (req, res) {
			var param = req.params.all();
			var newdata = {
				text1:'',
				text2:''
			}
			async.parallel([
				function (callback) {
					if (param.text1){
						translate(param.text1, {to: 'hi'}).then(res => {
					    console.log(res.text);
							newdata.text1 = res.text;
							callback(null);
						}).catch(err => {
						    console.log(err);
								callback(err);
						});
					} else {
						callback(null);
					}
				},
				function (callback) {
					if (param.text2){
						translate(param.text2, {to: 'hi'}).then(res => {
					    console.log(res.text);
							newdata.text2 = res.text;
							callback(null);
						}).catch(err => {
						    console.log(err);
								callback(err);
						});
					} else {
						callback(null);
					}
				}
			], function (err) {
				if (err){ res.send({status:'error'}); } else {
					res.send({status:'success', data:newdata});
				}
			})
		},
		translateToEnglish:function (req, res) {
			var param = req.params.all();
			var newdata = {
				text1:'',
				text2:''
			}
			async.parallel([
				function (callback) {
					if (param.text1){
						translate(param.text1, {to: 'en'}).then(res => {
					    console.log(res.text);
							newdata.text1 = res.text;
							callback(null);
						}).catch(err => {
						    console.log(err);
								callback(err);
						});
					} else {
						callback(null);
					}
				},
				function (callback) {
					if (param.text2){
						translate(param.text2, {to: 'en'}).then(res => {
					    console.log(res.text);
							newdata.text2 = res.text;
							callback(null);
						}).catch(err => {
						    console.log(err);
								callback(err);
						});
					} else {
						callback(null);
					}
				}
			], function (err) {
				if (err){ res.send({status:'error'}); } else {
					res.send({status:'success', data:newdata});
				}
			})
		},
		createNew:function (req, res) {
			var param = req.params.all();
			News.create(param).exec(function (err, newNEws) {
				if (err){ res.serverError(err); } else if (newNEws){
					Notification.sendNews(newNEws);
					res.redirect('/newsList');
				} else { res.serverError('Error while creating NEWS'); }
			})
		},
		deletenews:function (req, res) {
			var param = req.params.all();
			if (param && param.id){
				News.destroy({id:param.id}).exec(function (err) {
					if (err){ res.serverError(err); } else {
						res.redirect('/newsList');
					}
				});
			} else {
				res.serverError('Unknown news');
			}
		},
		getNews:function (req, res) {
			News.find().sort('createdAt DESC').exec(function (err, allNews) {
				if (err){
					res.send({status:'error', data:{}, mess:'Error while retrieving data', error:err});
				} else {
					res.send({status:'success', data:allNews, mess:'', error:null});
				}
			});
		}
};

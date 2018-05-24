var request = require('request');
var options = {
  url: 'https://fcm.googleapis.com/fcm/send',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'key=AAAAHZ45PFs:APA91bEs1Vu3VXZlRm9ABmAYbvuk-ZMhj5bSg7fCORNP9CBqxwGgTGIk6jCA0oVeYSRLxgrhODucLKc3MPP7fh81CunxM0jtzmtf7vbS_0chakynXAKqPziZuetd8hQNj6zwR1HHPOXX'
  },
  method:'POST'
};
 module.exports = {
   sendScript:function (script) {
     if (script && script.name && script.rating){
       var title = 'MCX '+script.name+' call'
       var Description = 'Live  '+script.rating+' call in MCX '+script.name+'.  Tab here to view the trading call and details.'
       Appuser.find({status:'active', fcmId:{'!' : null}}).exec(function (err, allUser) {
         if (err){ console.log(err); } else if (allUser && allUser.length){
           // console.log(allUser);
           async.each(allUser, function (val, cb) {
             if (val.fcmId){
               options["body"]=JSON.stringify(
                 {
                     data: {
                     title:title,
                     description:Description
                   },
                   priority: "high",
                   to : val.fcmId
                 });
                 request(options,function(error, response, body) {
              			if(error){
              				console.log(error);
              			}
                    cb(null);
                  });
             } else { cb(null); }
           });
         }
       });
     }
   },
   sendNews:function (news) {
     if (news && news.title && news.decription){
       var title = news.title;
       var Description = news.decription;
       Appuser.find({status:'active', fcmId:{'!' : null}}).exec(function (err, allUser) {
         if (err){ console.log(err); } else if (allUser && allUser.length){
           // console.log(allUser);
           async.each(allUser, function (val, cb) {
             if (val.fcmId){
               options["body"]=JSON.stringify(
                 {
                     data: {
                     title:title,
                     description:Description
                   },
                   priority: "high",
                   to : val.fcmId
                 });
                 request(options,function(error, response, body) {
              			if(error){
              				console.log(error);
              			}
                    cb(null);
                  });
             } else { cb(null); }
           });
         }
       });
     }
   }
 };

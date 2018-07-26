var request = require('request');
var options = {
  url: 'https://fcm.googleapis.com/fcm/send',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'key=AAAAZE9fzZw:APA91bFTYyvc8bT7WfJtNbuwSQ58f-5jhg-nkxxJl81UBrse3bPkTIO8tScdKnL0V-Iz7XIcY6MX3jzCAHXgSz1WdjMSpFj5zzJiq_eMzLYuQmlXSTRAuIw19WP4fTHQ_FnulnAdIG4a'
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
              console.log('response', val.fcmId);
               options["body"]=JSON.stringify(
                 {
                     data: {
                     title:title,
                     description:Description
                   },
                   priority: "high",
                   to : val.fcmId
                 });
               console.log(options);
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

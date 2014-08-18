var oh = oh || {};
oh.utils = oh.utils || {};
oh.user = oh.user || {};

oh.utils.getRandomSubarray = function(arr, size) {
    var shuffled = arr.slice(0), i = arr.length, temp, index;
    while (i--) {
        index = Math.floor(i * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled.slice(0, size);
}

oh.utils.delayexec = function(){
	var timer;
	function exec(call, delay){
		if(timer) {
			dashboard.message("clear " + timer);			
			clearTimeout(timer);
		}
		timer = setTimeout(function(){
			timer = null;
			call();
		}, delay);
		dashboard.message("added " + timer)		
	};
	return exec;
}

oh.utils.parsedate = function(datestring){
	if(!datestring) {
		return null;
	}
	var a = datestring.split(/[^0-9]/);
	return new Date (a[0],a[1]-1,a[2],a[3],a[4],a[5]);
}

oh.utils.get = function(item, na){
	na = na || "NA";
	return function(d){
		return d[item] || na;
	}
}

oh.utils.getnum = function(item, na){
	return function(d){
		var val = parseFloat(d[item]);
		if(val === 0) {
			return 0;
		} else {
			return val || na;
		}
	}
}

oh.utils.getdate = function(item, na){
	return function(d){
		if(d[item] && d[item] != "NOT_DISPLAYED" && d[item] != "SKIPPED"){
			return d3.time.day(oh.utils.parsedate(d[item])) || na;
		} else {
			return na;
		}
	}
}

oh.utils.gethour = function(item, na){
	return function(d){
		if(d[item] && d[item] != "NOT_DISPLAYED"){
			return oh.utils.parsedate(d[item]).getHours() || na;
		} else {
			return na;
		}
	}
}

oh.utils.bin = function(binwidth){
	return function(x){
		return Math.floor(x/binwidth) * binwidth;
	}
}



oh.utils.state = function(mycampaign, myresponse){
	if(!mycampaign){
		return window.location.hash.substring(1).split("/");
	} 
	if(!myresponse){
		window.location.hash = mycampaign;
		return;
	}
	window.location.hash = mycampaign + "/" + myresponse;
}

oh.utils.readconfig = function(next){
	$.ajax({
		url: "config.json",
		dataType: "json"
	})
	.success(function(data) {
		dashboard.config = data;
		if(next) next();
	})
	.fail(function(err) { 
		alert("error loading config.json"); 
		dashboard.message(err) 
	});
}

oh.utils.error = function(msg){
	throw new Error(msg)
}

oh.call = function(path, data, datafun){
	
	function processError(errors){
		if(errors[0].code && errors[0].code == "0200"){
			var pattern = /(is unknown)|(authentication token)|(not provided)/i;
			if(!errors[0].text.match(pattern)) {
				alert(errors[0].text);
			}
			if(!/login.html$/.test(window.location.pathname)){
				console.log("not logged in");
				if(datafun) datafun(myrequest.responseText);
				//oh.sendtologin();
			}
		} else {
			alert(errors[0].text)
		}
	}	
	
	//input processing
	var data = data ? data : {};		
	
	//default parameter
	data.client = "dashboard"
		
	var myrequest = $.ajax({
		type: "POST",
		url : "/app" + path,
		data: data,
		dataType: "text",
		xhrFields: {
			withCredentials: true
		}
	}).done(function(rsptxt) {
		if(!rsptxt || rsptxt == ""){
			alert("Undefined error.")
			return false;
		}
		var response = jQuery.parseJSON(rsptxt);
		if(response.result == "success"){
			if(datafun) datafun(response)
		} else if(response.result == "failure") {
			processError(response.errors)
			return false;
		} else{
			alert("JSON response did not contain result attribute.")
		}
		
	}).error(function(){alert("Ohmage returned an undefined error.")});		
	
	return(myrequest)
}
oh.call.xml = function(path, data, datafun){

        function processError(errors){
                if(errors[0].code && errors[0].code == "0200"){
                        var pattern = /(is unknown)|(authentication token)|(not provided)/i;
                        if(!errors[0].text.match(pattern)) {
                                alert(errors[0].text);
                        }
                        if(!/login.html$/.test(window.location.pathname)){
                                oh.sendtologin();
                        }
                } else {
                        alert(errors[0].text)
                }
        }

        //input processing
        var data = data ? data : {};

        //default parameter
        data.client = "dashboard"

        var myrequest = $.ajax({
                type: "POST",
                url : "/app" + path,
                data: data,
                dataType: "text",
                xhrFields: {
                        withCredentials: true
                }
        }).done(function(rsptxt) {
                if(!rsptxt || rsptxt == ""){
                        alert("Undefined error.")
                        return false;
                }
                //interestingly, ohmage returns json if error, and *only* xml if success
		try
		{
		  var response = $.parseXML(rsptxt)
		  if(datafun) datafun(response);		  
		}
		catch(err)
		{
		  var response = jQuery.parseJSON(rsptxt);
                  processError(response.errors)
                  return false;
                 }

        }).error(function(){alert("Ohmage returned an undefined error.")});

        return(myrequest)
}

oh.login = function(user, password, cb){
	var req = oh.call("/user/auth_token", { 
		user: user, 
		password: password
	}, function(response){
		if(!cb) return;
		cb()
	})
	return req;
}

oh.logout = function(cb){
	oh.call("/user/logout", {}, cb);
}

oh.sendtologin = function(){
	window.location = "../web/#login"
}

oh.campaign_read = function(cb){
	var req = oh.call("/campaign/read", {
		output_format : "short"
	}, function(res){
		if(!cb) return;
		var arg = (res.data ) ? res.data : null;
		cb(arg)
	});
	return req;
};
oh.campaign_read.long = function(campaign, cb){
        var req = oh.call("/campaign/read", {
                output_format : "long",
		campaign_urn_list : campaign
        }, function(res){
                if(!cb) return;
                var arg = (res.data ) ? res.data : null;
                cb(arg)
        });
        return req;
};
oh.campaign_read_xml = function(campaign, cb){
        var req = oh.call.xml("/campaign/read", {
                output_format : "xml",
                campaign_urn_list : campaign
        }, function(res){
                if(!cb) return;
                cb(res)
        });
        return req;
};
oh.campaign_read.meta = function(cb){
	var req = oh.call("/campaign/read", {
		output_format : "short"
	}, function(res){
		if(!cb) return;
		var arg = (res.metadata && res.metadata.items) ? res.metadata.items : null;
		cb(arg)
	});
	return req;
};
oh.survey_response_read = function(campaign, cb){
        var req = oh.call("/survey_response/read", {
                output_format : "json-rows",
                campaign_urn: campaign,
                collapse: "true",
                user_list: "urn:ohmage:special:all",
                survey_id_list: "urn:ohmage:special:all",
                column_list: "urn:ohmage:user:id,urn:ohmage:context:utc_timestamp,urn:ohmage:context:client,urn:ohmage:survey:privacy_state,urn:ohmage:context:location:status"
        }, function(res){
                if(!cb) return;
                var arg = (res.data ) ? res.data : null;
                cb(arg)
        });
        return req;
};
oh.survey_response_read.privacy = function(campaign, cb){
        var req = oh.call("/survey_response/read", {
                output_format : "json-rows",
                campaign_urn: campaign,
                collapse: "true",
                user_list: "urn:ohmage:special:all",
                survey_id_list: "urn:ohmage:special:all",
                column_list: "urn:ohmage:survey:privacy_state"
        }, function(res){
                if(!cb) return;
                var arg = (res.data ) ? res.data : null;
                cb(arg)
        });
        return req;
};
oh.user.read = function(user_list, cb){
        var req = oh.call("/user/read", {
                user_list: user_list
        }, function(res){
                if(!cb) return;
                var arg = (res.data ) ? res.data : null;
                cb(arg)
        });
        return req;
};
oh.user.password = function(user, password, username, new_password, cb){
	return oh.call("/user/change_password", {
		user : user,
		password : password,
		username : username,
		new_password : new_password
	}, function(res){
		if(!cb) return;
		cb(res)
	});
}


oh.utils.parsecsv = function(string){
	//dependency on d3!
	var rows = d3.csv.parse(string);
	
	//parse rows
	var records = [];
	rows.forEach(function(d, i) {
		//temp hack for the csv bug
//		if(! d["Holiday:label"] && /Halloween|Christmas/i.test(d["Holiday:label"])) {
//			dashboard.message("skipping invalid record")
//			dashboard.message(d)
//			return;
//		}
			
		//don't skip ND/SKP records for now. NA support in crossfilter is really bad.
		if(d[dashboard.config.item_main] == "NOT_DISPLAYED") return;
		
		d.hash = murmurhash3_32_gc(JSON.stringify(d));
		records.push(d);
	});
	
	//load into gui
	return records;
}

oh.user.whoami = function(cb){
	var req = oh.call("/user/whoami", {}, function(res){
		if(!cb) return;
		cb(res.username)
	});
	return req;
}

//no more than 1 ping every 60 sec
oh.ping = _.debounce(oh.user.whoami, 60*1000, true);

//ping once every t sec
oh.keepalive = _.once(function(t){
	t = t || 60;
	setInterval(oh.ping, t*1000)
});

//or: keep alive only when active
oh.keepactive = _.once(function(t){
	$('html').click(function() {
		oh.ping();
	});
});


oh.getimageurl = function(record){	
	var photo = dashboard.config.photo.item;
	
	//skip empty images
	if(!record[photo] || record[photo] == "SKIPPED" || record[photo] == "NOT_DISPLAYED"){
		return "images/nophoto.jpg"
	} 		

	//render url
	var thumbtemplate = dashboard.config.photo.image || oh.utils.error("No dashboard.config.photo.image specified");
	return Mustache.render(thumbtemplate, record);
}	

//this is the function initiated by Mustache that starts the ohmage events.
//the function gets the CSV for a given campaign_urn OR redirects to a page to select a campaign_urn.

//The async stuff is a bit of a temporary hack because ohmage is poorly implemented to return http 200
//when the csv download fails. So we do some additional calls to detect this.
oh.getcsvurl = function(){
	
	//some statics
	var filter = dashboard.config.data.filter || ".";
	var pattern = new RegExp(filter, "i");	
	var campaign_urn = oh.utils.state()[0];	
	
	//if the current campaign is invalid, pick a new one
	if(!campaign_urn || !pattern.test(campaign_urn)){
		window.location = "choosecampaign.html?filter=" + filter;
		oh.utils.error("Invalid campaign. Redirecting page.");
	}	
	
	//else continue
	var params = {
	    campaign_urn: campaign_urn,
	    client: "dashboard",
	    user_list: "urn:ohmage:special:all",
	    prompt_id_list: "urn:ohmage:special:all",
	    output_format: "csv",
	    sort_oder: "timestamp",
	    column_list: "" + [
	    	"urn:ohmage:user:id",
	        "urn:ohmage:context:timestamp",
	        "urn:ohmage:prompt:response",
	        "urn:ohmage:context:location:latitude",
	        "urn:ohmage:context:location:longitude"
	    ],
	    suppress_metadata: "true"
	};	

	//the following happens async (unfortunately)
	//checks if we are logged in and if we have access to the campaign.
	oh.user.whoami(function(){
		oh.campaign_read.meta(function(campaigns){
			//from here we can assume we are authenticated to ohmage.
			if($.inArray(campaign_urn, campaigns) < 0){
				alert("No such campaign: " + campaign_urn); 
				window.location = "choosecampaign.html?filter=" + filter;
			}
		});
	});
	
	//return to Mustache
	return decodeURIComponent("/app/survey_response/read?" + jQuery.param(params));
} 

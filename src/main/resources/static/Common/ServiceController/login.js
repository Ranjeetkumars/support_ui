
//Login
function loginComplaintLogger(){	
	var username=$('#usernameid').val();
	var password=$('#passwordid').val();
	

	
	 var objJson= {
			 "username":username,
			 "password":password,
			 "localIp":"0.0.0.0",
			 "publicIp":"0.0.0.0",
			 "siteID":"34",
			 "loginDateandTime":"now()"
		 }
	 
	if(username==""||username==''||username==null){
		showNotificationError("Please Enter UserName",
				"log_in", "info");
		return false;
	}
	 if(password==""||password==''||password==null){
			showNotificationError("Please Enter Password",
					"log_in", "info");
			return false;
		}
	var strUrl = Service.login;
	$.ajax({
		type : "POST",
		url : strUrl,
		dataType : "json",
		data : JSON.stringify(objJson),
		contentType : "application/json",
		async : false,
		crossDomain : true,
		success : function(data) {

			var userID,moduleid,tokenid,errormessage;
			var roleid;
			var responsecode = data.objSupportLoginControllerDTOs;
			console.log(responsecode);
			for (var i = 0; i < responsecode.length; i++) {
				userid = responsecode[i].userID;
				localStorage.setItem("username", responsecode[i].username);

				if(userid==null){
					showNotificationError("Invalid Credentials",
							"log_in", "warn");
				return false;
				}else{
		        userID=responsecode[i].userID;
			
				var token=responsecode[i].tockenID;
				tokenid=token;
		
				var modules=responsecode[i].modules;
				var roles=responsecode[i].roles;
				
//				localStorage.setItem("modid",JSON.stringify(modules));
			    localStorage.setItem("Roles",JSON.stringify(roles));
				var jsonRoles=responsecode[i].roles;
				for (var i = 0; i < jsonRoles.length; i++) {
				
					roleid=jsonRoles[i].roleID;
					
					moduleid=jsonRoles[i].moduleID;
				
					localStorage.setItem("roleid", roleid);
						
				}	
				}
			}			
			//setting data to local Storage
			localStorage.setItem("moduleid", moduleid);
			localStorage.setItem("userID", userID);
			localStorage.setItem("token", token);
			//getting data from localStorage
			var user_id=localStorage.getItem("userID");
			var module_id=localStorage.getItem("moduleid");
			var role_id=localStorage.getItem("roleid");
			var token_id=localStorage.getItem("token");
			//var mob_id=localStorage.getItem("modid");
			//var jsonparse=JSON.parse(mob_id);
			//Redirect to home page
			if(module_id!==null&&user_id!==null&&token_id===tokenid){
				window.location.href = Service.redirectToHomepage;		
			}else{
				showNotificationError("Invalid Credentials",
						"log_in", "warn");
				return false;
			}
		},
		error : function() {
			console.log('In Error of  Details ');
			alert('Error!');
		}
	});
}

//logout 
function logout(){

	localStorage.clear();	
	var user_id=localStorage.getItem("userID");
	var module_id=localStorage.getItem("moduleid");
	var role_id=localStorage.getItem("roleid");
	var token_id=localStorage.getItem("token");	
	console.log("userid====>"+user_id);
	console.log("module_id====>"+module_id);
	console.log("role_id====>"+role_id);
	if(module_id===null&&user_id===null&&role_id===null&&token_id===null){
		alert()
		window.location.href = Service.redirectToLoginPage;
	}
	
}

/*
 * For showing sweet alert{ 10-01-2020
 */
function showNotificationError(msg, id, msgType) {
	var boxId = '#' + id;
	var options = {
		// whether to hide the notification on click
		clickToHide : true,
		// whether to auto-hide the notification
		autoHide : true,
		// if autoHide, hide after milliseconds
		autoHideDelay : 2000,
		// show the arrow pointing at the element
		arrowShow : true,
		// arrow size in pixels
		arrowSize : 5,
		// position defines the notification position though uses the defaults
		// below
		position : 'top',
		// default positions
		elementPosition : 'top right',
		globalPosition : 'top right',
		// default style
		style : 'bootstrap',
		// default class (string or [string])
		className : msgType,
		// show animation
		showAnimation : 'slideDown',
		// show animation duration
		showDuration : 400,
		// hide animation
		hideAnimation : 'slideUp',
		// hide animation duration
		hideDuration : 200,
		// padding between element and notification
		gap : 2
	};
	$(boxId).notify(msg, options);
}

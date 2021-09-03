
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
			alert(""+data.objSupportLoginControllerDTOs)
			var userID,roleid,moduleid,tokenid,errormessage;
			var responsecode = data.objSupportLoginControllerDTOs;	
			for (var i = 0; i < responsecode.length; i++) {
				userid = responsecode[i].userID;
				if(userid==null){
					showNotificationError("Invalid Credentials",
							"log_in", "warn");
				return false;
				}else{
		        userID=responsecode[i].userID;
				console.log("userID===>"+userID);
				var token=responsecode[i].tockenID;
				tokenid=token;
				console.log("token=====>"+token);
				var jsonRoles=responsecode[i].roles;
				for (var i = 0; i < jsonRoles.length; i++) {
					console.log("roleid ===>  "+jsonRoles[i].roleID);
					roleid=jsonRoles[i].roleID;
					console.log("roles====>"+roleid);
					moduleid=jsonRoles[i].moduleID;
					console.log("ModuleId ===>  "+moduleid);				
				}	
				}
			}			
			//setting data to local Storage
			localStorage.setItem("roleid", roleid);
			localStorage.setItem("moduleid", moduleid);
			localStorage.setItem("userID", userID);
			localStorage.setItem("token", token);
			//getting data from localStorage
			var user_id=localStorage.getItem("userID");
			var module_id=localStorage.getItem("moduleid");
			alert("module_id---->"+module_id);
			var role_id=localStorage.getItem("roleid");
			var token_id=localStorage.getItem("token");							
			//Redirect to home page
			if(module_id!==null&&user_id!==null&&token_id===tokenid){
				//window.location.href = Service.redirectToHomepage;		
			}else{
				showNotificationError("Invalid Credentials",
						"log_in", "warn");
				return false;
			}
		},
		error : function() {
			console.log('In Error of  Details ');
		}
	});
}

//logout complaint response System
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
		window.location.href = Service.redirectToLoginPage;
	}
	
}


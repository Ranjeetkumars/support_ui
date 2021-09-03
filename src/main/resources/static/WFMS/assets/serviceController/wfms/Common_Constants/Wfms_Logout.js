function wfms_Logout(){

	localStorage.clear();	
	var user_id=localStorage.getItem("userID");
	var module_id=localStorage.getItem("moduleid");
	var role_id=localStorage.getItem("roleid");
	var token_id=localStorage.getItem("token");	
	var wfms_moduleID=localStorage.getItem("wfms_moduleID");	
	var wfms_roleID=localStorage.getItem("wfms_roleID");	
	var username=localStorage.getItem("username");	
	console.log("wfms_Logout====>"+user_id);

	if(module_id===null&&user_id===null&&role_id===null&&token_id===null &&module_id===null&&wfms_moduleID===null&&wfms_roleID===null&&username===null){

		window.location.href = "http://localhost:9034/login.html";
	}
	
}
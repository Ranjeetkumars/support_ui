
//logout dashboard
function logout(){
	alert("logout function is executed");
	localStorage.clear();	
	var user_id=localStorage.getItem("userID");
	var module_id=localStorage.getItem("moduleid");
	var role_id=localStorage.getItem("roleid");
	var token_id=localStorage.getItem("token");	
	console.log("userid====>"+user_id);
	console.log("module_id====>"+module_id);
	console.log("role_id====>"+role_id);
	alert("Service.redirectToLoginPage::"+Service.redirectToLoginPage);
	if(module_id===null&&user_id===null&&role_id===null&&token_id===null){
		alert('inside if condition');
		window.location.href = Service.redirectToLoginPage;
		
	}
	
}

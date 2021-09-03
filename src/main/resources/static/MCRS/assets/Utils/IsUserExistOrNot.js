/**
 * @author: Bhuvan
 * 
 * 
 */

function checkUserLogedInOrNot(){

	var user_id=localStorage.getItem("userID");
	var module_id=localStorage.getItem("moduleid");
	var role_id=localStorage.getItem("roleid");
	var token_id=localStorage.getItem("token");		
	if((module_id==null||module_id=="")||(user_id==null||user_id=="")||(role_id==null||role_id=="")||(token_id==null||token_id=="")){
		window.location.href = Service.redirectToLoginPage;
	}else{
		getNormalComplaint();
		getUserName();
	}

}
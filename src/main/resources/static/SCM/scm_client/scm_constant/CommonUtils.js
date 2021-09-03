var CommonUtils = {
	"Status_Issued" : "0"
};

function enableDisableMenuBasedOnRoleId() {
	console.log('enableDisableMenuBasedOnRoleId function executed');

	var moduleID = localStorage.getItem("scmModuleId");
	var roleID = localStorage.getItem("scmRoleId");
	var roleName = localStorage.getItem("roleName");

	if (roleID === '100' && moduleID === "40" && roleName === "Store") {
		console.log("Store module");

		$('#hideMaster').show();
		$('#hideItemRegistration').show();
		$('#hideVendorManagement').show();
		$('#hideProcurement').show();
		$('#hideGoodsReceivable').show();
		$('#hideItemReturns').show();
		$('#hideVendorManagement').show();
		$('#hideSubstoreAmbulanceIndents').show();
		$('#hideVendorManagement').show();

	} else if (roleID === '101' && moduleID === "40"
			&& roleName === "SubStroes") {
		console.log("SubStore module");
		$('#hideMaster').hide();
		$('#hideItemRegistration').hide();
		$('#hideVendorManagement').hide();
		$('#hideProcurement').hide();
		$('#hideGoodsReceivable').hide();
		$('#hideItemReturns').hide();
		$('#hideVendorManagement').hide();
		$('#hideSubstoreAmbulanceIndents').show();
		$('#hideVendorManagement').hide();

	} else if (roleID === '102' && moduleID === "40"
			&& roleName === "SCMReports") {
		console.log("SCM Reports");

		$('#hideMaster').hide();
		$('#hideItemRegistration').hide();
		$('#hideVendorManagement').hide();
		$('#hideProcurement').hide();
		$('#hideGoodsReceivable').hide();
		$('#hideItemReturns').hide();
		$('#hideVendorManagement').hide();
		$('#hideSubstoreAmbulanceIndents').hide();
		$('#hideVendorManagement').hide();

	} else {
		window.location.href = "http://localhost:9034/login.html";
	}

}


function logout(){
	console.log("logout function is executed");
	localStorage.clear();	
	var user_id=localStorage.getItem("userID");
	var module_id=localStorage.getItem("moduleid");
	var role_id=localStorage.getItem("roleid");
	var token_id=localStorage.getItem("token");	
	console.log("userid====>"+user_id);
	console.log("module_id====>"+module_id);
	console.log("role_id====>"+role_id);
	console.log("Service.redirectToLoginPage::"+Service.redirectToLoginPage);
	if(module_id===null&&user_id===null&&role_id===null&&token_id===null){
		console.log('inside if condition');
		window.location.href = 'http://localhost:9034/login.html';
		
	}
	
}

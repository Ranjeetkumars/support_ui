  $(document).ready(function() {
	  enableDisableMenuBasedOnRoleId();
         });
function enableDisableMenuBasedOnRoleId() {
	var user_Id = localStorage.getItem('userID');
	var role_Id = localStorage.getItem('wfms_roleID');
	var module_Id = localStorage.getItem('wfms_moduleID');
//Normal User
	if (role_Id === '43' && module_Id === "19") {
		$('#manageResource_HideId').hide();
		$('#zone_HideId').hide();
		$('#assign_HideId').hide();
		$('#reports_HideId').hide();
		$('#search_HideId').hide();
		$('#resource_HideId').hide();
		$('#holiday_HideId').hide();
		$('#allowances_HideId').hide();
		$('#mmu_HideId').hide();
		$('#myProfile_HideId').show();
		$('#ManagerMapping_HideId').hide();

		//Manager

	} else if (role_Id === '78' && module_Id === "19") {
		$('#manageResource_HideId').show();
		$('#zone_HideId').show();
		$('#assign_HideId').show();
		$('#reports_HideId').show();
		$('#search_HideId').show();
		$('#resource_HideId').show();
		$('#holiday_HideId').show();
		$('#allowances_HideId').show();
		$('#mmu_HideId').show();
		$('#myProfile_HideId').show();
		$('#ManagerMapping_HideId').show();

	} 
	 else if (role_Id === '9' && module_Id === "19") {
			$('#manageResource_HideId').show();
			$('#zone_HideId').show();
			$('#assign_HideId').show();
			$('#reports_HideId').show();
			$('#search_HideId').show();
			$('#resource_HideId').show();
			$('#holiday_HideId').show();
			$('#allowances_HideId').show();
			$('#mmu_HideId').show();
			$('#myProfile_HideId').show();
			$('#ManagerMapping_HideId').show();


		}else {
		window.location.href = "http://localhost:9034/login.html";
	}

}

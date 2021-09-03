/**
 * @Desc: This javascript file contains registration as well as update of
 *        equipment
 * @Scince:02/04/2020
 * @author:Ranjeet kr.
 * 
 */

function insertEquipmentDetails() {
	
	console.log('IT-Equipment');
	
	var rtnJsonObj = validationOfEquipmentRegistration();
	if(rtnJsonObj==false||rtnJsonObj=="false"||rtnJsonObj=='false'||rtnJsonObj==undefined||rtnJsonObj=='undefined')
		return
	var strUrl = Service.INSERT_DRUG_DETAILS;
	console.log('==== strUrl' + strUrl);
	$.ajax({
		type : "POST",
		url : strUrl,
		dataType : "json",
		data : JSON.stringify(rtnJsonObj),
		contentType : "application/json",
		async : false,
		crossDomain : true,
		success : function(data) {
			if (data.rtnReponseCount === 0 || data.rtnReponseCount === "0"
					|| data.rtnReponseCount === '0') {
				resetItemSearch();
				toastr.warning('Item Already Exist!');
			}
			if (data.rtnReponseCount === 1 || data.rtnReponseCount === "1"
					|| data.rtnReponseCount === '1') {
				toastr.success('Drug Registered Successfully!');
				resetItemSearch();

				//aftre save approval button should enable 
				$('#btnSubmit_approval').removeAttr("disabled");
				
			}
		},
		error : function(err) {
			console.log("Error log::"+err)
			toastr.error('something went wrong!');
		}
	});

}

function updateEquipmentDetails() {
	console.log("updateEquipmentDetails function is executed");

}

function resetEquipmentDetails() {
	console.log("resetEquipmentDetails function is executed");

	$("#registration").find("select").each(function() { // there is no such
		this.selectedIndex = 0; // this is a <select>
	});

}
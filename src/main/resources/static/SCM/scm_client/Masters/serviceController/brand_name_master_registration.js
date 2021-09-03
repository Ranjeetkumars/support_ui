var userId;
var roleId;
var moduleId;

$(document).ready(function() {
	userId = localStorage.getItem('userID');
	roleId = localStorage.getItem("scmRoleId");
	moduleId = localStorage.getItem("scmModuleId");
	
	loadBrandDetails();

});

$(document).ready(function(){
	
	
    var today = new Date(),
    days = daysInMonth(today.getMonth() + 1, today.getFullYear()),
    result = Array.from({length:days}, (_,i) => i+1).join(',');
    console.log('All days in current month:' + '<br>' + result);
    
    var splitresult = result.split(",");
   console.log(splitresult.length);
    var a = 190;
    for(var k = 0; k<splitresult.length; k++){
    	
    	if(splitresult[k]==a){
    		console.log('data is aavailable');
    	}
    	else{
    		console.log('else part');
    	}
    }
    
});

function daysInMonth(month,year) {
    return new Date(year, month, 0).getDate();
}


function openModalBox() {
	console.log('openModalBox  javascript function is executed');
	//$('#brandName').modal('show');
	
	$('#brandName').modal({
		  backdrop: 'static',
		  keyboard: true
		})
	
	$("#save_disable").attr("disabled", false);
	$("#reset_disable").attr("disabled", false);
	$("#item_approval_id").attr("disabled", false);
	$("#update_disable").attr("disabled", true);

}

function loadBrandDetails() {
	//var strUrl = "http://localhost:2000/scmservice/BrandRegistrationController/loadBrandDetails";
	
	var strUrl = MASTER_END_POINT.loadBrandDetails;
	$.ajax({
		type : 'GET',
		url : strUrl,
		dataType : 'json',
		async : false,
		success : function(data) {
			if (data.responseCode == 200 || data.responseCode == "200") {
				loadBrands(data.objBrandDetailsControllerDTO);
				loadDataTable();
			}
		},
		error : function(err) {

			console.error('itemSearch  error: ' + JSON.stringify(err));
		}
	});

}
function saveBrandDetails() {
	
	var strUrl = MASTER_END_POINT.saveBrandDetails;
	//var strUrl = "http://localhost:2000/scmservice/BrandRegistrationController/saveBrandDetails";

	var isStatus = ($('input:checkbox[name=checkme]').is(':checked'));
	var brandName = $('#brand_name_id').val();
	if (brandName == "" || brandName == '') {
		toastr.warning('Please enter Brand Name');
		return false;
	}

	
	
	    $.ajax({
				type : "POST",
				url : strUrl,
				dataType : "json",
				data : JSON.stringify({
					"brandName" : brandName,
					"userId" : userId,
					"moduleId" : moduleId,
					"roleId" : roleId,
					"status" : isStatus
				}),
				contentType : "application/json",
				async : false,
				crossDomain : true,
				success : function(data) {
					if (data.rtnReponseCount == "1"
							|| data.rtnReponseCount == 1) {
						toastr.info('Brand Registred successfully');
						resetMaster();
						$('#brandName').modal('hide');
						loadBrandDetails();
					} else if (data.rtnReponseCount == "0"
							|| data.rtnReponseCount == 0) {
						toastr.info('Same Brand already exist');
						resetMaster();
						$('#brandName').modal('hide');
						loadBrandDetails();
					} else {
						toastr.info('Something went wrong! try again');
					}
				},
				error : function(err) {
					console.log("@@@@@@@@@@@@@@@@@@@@@@@" + JSON.stringify(err));
					console.error('itemSearch  error: ' + JSON.stringify(err));
				}
			});

}

function resetMaster() {
	$('#brand_name_id').val('');
	$('#myCheckbox').attr('checked', false);
}

var intbrandId;
function getRowValues(brandId, brandName, status) {
	intbrandId = brandId;
	
	//$('#brandName').modal('show');
	$('#brandName').modal({
		  backdrop: 'static',
		  keyboard: true
		})
	
	$("#save_disable").attr("disabled", true);
	$("#reset_disable").attr("disabled", true);
	$("#update_disable").attr("disabled", false);
	$('#brand_name_id').val(brandName);

	
	if (status == "Active" || status == 'Active') {
		$('#myCheckbox').prop('checked', true);
	} else {
		$('#myCheckbox').prop('checked', false);
	}
	
	
	
	

}

function updateBrand() {
	var isStatus = ($('input:checkbox[name=checkme]').is(':checked'));
	var brandName = $('#brand_name_id').val();
	//var strUrl = "http://localhost:2000/scmservice/BrandRegistrationController/UpdateDrugDetails";
	
	

	
	var strUrl = MASTER_END_POINT.UpdateDrugDetails;
	    $.ajax({
				type : "POST",
				url : strUrl,
				dataType : "json",
				data : JSON.stringify({
					"brandId" : intbrandId,
					"brandName" : brandName,
					"userId" : userId,
					"moduleId" : roleId,
					"roleId" : moduleId,
					"status" : isStatus
				}),
				contentType : "application/json",
				async : false,
				crossDomain : true,
				success : function(data) {
					if (data.rtnReponseCount == "1"
							|| data.rtnReponseCount == 1) {
						toastr.info('Brand updated successfully');
						resetMaster();
						$('#brandName').modal('hide');
						loadBrandDetails();
					} else if (data.rtnReponseCount == "0"
							|| data.rtnReponseCount == 0) {
						toastr.info('Same Brand already exist');
						resetMaster();
						$('#brandName').modal('hide');
						loadBrandDetails();
					} else {
						toastr.info('Something went wrong! try again');
					}
				},
				error : function(err) {
					console.log("@@@@@@@@@@@@@@@@@@@@@@@" + JSON.stringify(err));
					console.error('itemSearch  error: ' + JSON.stringify(err));
				}
			});
}


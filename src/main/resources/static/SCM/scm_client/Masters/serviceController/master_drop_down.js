var userId;
var roleId;
var moduleId;
$(document).ready(function() {
	userId = localStorage.getItem('userID');
	roleId = localStorage.getItem("scmRoleId");
	moduleId = localStorage.getItem("scmModuleId");
	
	loadForm();
	loadManfacture();
	loadBrand();
	loadStores();
	
});


function loadForm() {
	var strUrl = MASTER_END_POINT.loadForm;
	try {
		$('#load_from_inventory_id').empty();
		console.log("loadForm Url is:" + strUrl);
		$
				.ajax({
					type : 'GET',
					url : strUrl,
					dataType : 'json',
					async : false,
					success : function(data) {
						var responsecode = data.responseCode;
						if (200 !== responsecode) {

						} else {
							var jsonArray = data.objAddNewLocalDrugControllerDTO;
							var selectfirst = "<option value='0'>Select Inventory Item From </option>";
							$('#load_from_inventory_id').append(selectfirst);
							$.each(jsonArray, function(i, resData) {
								var inventoryFrom = "<option value="
										+ resData.from_id + ">"
										+ resData.formType + "</option>";
								$(inventoryFrom).appendTo(
										'#load_from_inventory_id');
							});
						}
					},
					error : function(err) {
						console.error("Error in inventoryItemFormId"
								+ JSON.stringify(err));
					}
				});
	} catch (err) {
		console.error('Error in getGenericNamesDropDown()' + err);
	}
	$('#load_from_inventory_id').trigger("chosen:updated");
	$('#load_from_inventory_id').chosen();
}

function loadManfacture() {

	$('#manufactureId').empty();
	var strUrl = Service.GET_MANUFACTURE_DROPDOWN;
	console.log("getManufactureDropDown Url is:" + strUrl);
	$
			.ajax({
				type : 'GET',
				url : strUrl,
				dataType : 'json',
				async : false,
				success : function(data) {
					console.log("data@@@@@@@@@@@@@@@@@@@@@::"
							+ JSON.stringify(data));
					var responsecode = data.responseCode;
					if (200 !== responsecode) {
					} else {
						var jsonArray = data.objAddNewLocalDrugControllerDTO;
						var selectfirst = "<option value='0'>Select Brand Manufacture</option>";
						$('#manufactureId').append(selectfirst);
						$.each(jsonArray, function(i, resData) {
							var manufactureData = "<option value="
									+ resData.manufactureId + ">"
									+ resData.companyName + "</option>";
							$(manufactureData).appendTo('#manufactureId');
						});
					}
				},
				error : function(err) {
					console.log("Error in getManufactureDropDown"
							+ JSON.stringify(err));
				}
			});
	$('#manufactureId').trigger("chosen:updated");
	$('#manufactureId').chosen();
}

function loadBrand() {
	$('#brandNameId').empty();
	var strUrl = Service.GET_BRANDNAME_DROPDOWN;
	console.log("getbrandNameDropDown Url is:" + strUrl);
	$
			.ajax({
				type : 'GET',
				url : strUrl,
				dataType : 'json',
				async : false,
				success : function(data) {
					var responsecode = data.responseCode;
					if (200 !== responsecode) {

					} else {
						var jsonArray = data.objBrandDetailsControllerDTO;
						var selectfirst = "<option value='0'>Select Brand Name</option>";
						$('#brandNameId').append(selectfirst);
						$.each(jsonArray, function(i, resData) {
							var brandname = "<option value=" + resData.brandId
									+ ">" + resData.brandName + "</option>";

							$(brandname).appendTo('#brandNameId');
						});
					}
				},
				error : function(err) {
					console.error("Error in getbrandNameDropDown"
							+ JSON.stringify(err));
				}
			});
	$('#brandNameId').trigger("chosen:updated");
	$('#brandNameId').chosen();
}


//http://52.172.55.80:8081/2020_ap_projects/ap_mems_maps.git




function loadStores() {
	
	console.log('loadStores javascript function executed');
	$('#store_id').empty();
	
	var strUrl = MASTER_END_POINT.loadStores;
	console.log("loadStores Url is:" + strUrl);
	$
			.ajax({
				type : 'GET',
				url : strUrl,
				dataType : 'json',
				async : false,
				success : function(data) {
					var responsecode = data.responseCode;
					if (200 !== responsecode) {

					} else {
						var jsonArray = data.objControllerDto;
						var selectfirst = "<option value='0'>Select One</option>";
						$('#store_id').append(selectfirst);
						$.each(jsonArray, function(i, resData) {
							var brandname = "<option value=" + resData.countryId
									+ ">" + resData.countryName + "</option>";

							$(brandname).appendTo('#store_id');
						});
					}
				},
				error : function(err) {
					console.error("Error in loadStores"
							+ JSON.stringify(err));
				}
			});
	$('#store_id').trigger("chosen:updated");
	$('#store_id').chosen();
}
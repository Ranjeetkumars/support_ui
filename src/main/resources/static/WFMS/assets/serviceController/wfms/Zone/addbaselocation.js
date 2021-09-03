/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* 
 * @Author : Purushotham Akula
 */
var localityId;
var countryId;
var stateId;
var districtId;
var mandalId;
var cityId;
var locationId;
var user_Id;
var role_Id;
var module_Id;
$(document).ready(function() {
	user_Id = localStorage.getItem('userID');
	role_Id = localStorage.getItem('wfms_roleID');
	module_Id = localStorage.getItem('wfms_moduleID');
	try {
		getZones("zoneId");
		getBaselocationDetails();
	} catch (err) {
		console.log("errror in loading ready funtion" + err);
	}
});

/*
 * @Author : Purushotham Akula @Desc : getZones
 */
function getZones(zone_Id) {
	console.log("zone_Id ========>" + zone_Id);

	try {
		/*
		 * $('#zoneId').empty(); $('#up_zoneId').empty();
		 */
		var id = '#' + zone_Id;

		$(id).empty();
		var strUrl = Service.GETZONES;
		console.log("getZones Url is:" + strUrl);
		$.ajax({
			type : 'GET',
			url : strUrl,
			dataType : 'json',
			async : false,
			success : function(data) {
				var responsecode = data.responseCode;
				if (200 !== responsecode) {

				} else {
					var jsonArray = data.objGetCountriesControllerDTO;
					var selectfirst = "<option value='0'>Select zone</option>";
					/*
					 * $('#zoneId').append(selectfirst);
					 * $('#up_zoneId').append(selectfirst);
					 */
					$(id).append(selectfirst);

					$.each(jsonArray, function(i, resData) {
						var Country = "<option value=" + resData.locationId
								+ ">" + resData.locationName + "</option>";
						/*
						 * $(Country).appendTo('#zoneId');
						 * $(Country).appendTo('#up_zoneId');
						 */
						$(Country).appendTo(id);

					});
				}
			},
			error : function(err) {
				console.error("Error in getZones" + JSON.stringify(err));
			}
		});
	} catch (err) {
		console.error('Error in getZones()' + err);
	}
	// $('#zoneId').trigger("chosen:updated");
	// $('#up_zoneId').trigger("chosen:updated");
	// $('#zoneId').chosen();
	// $('#up_zoneId').chosen();
	$(id).trigger("chosen:updated");
	$(id).chosen();

}

$('#zoneId').on('change', function() {
	var baselocation_zoneId = $('#zoneId').val();
	getbaselocationInfo(baselocation_zoneId);
	getlandmarkBasedOnlocalityId(baselocation_zoneId, "landmarkId");
});

$('#up_zoneId').on('change', function() {
	$('#up_baselocationNameId').val("");
	var baselocation_zoneId = $('#up_zoneId').val();
	getbaselocationInfo(baselocation_zoneId);
	getlandmarkBasedOnlocalityId(baselocation_zoneId, "up_landmarkId");
});
/*
 * @Author : Purushotham Akula @Desc : getbaselocationInfo
 */

function getbaselocationInfo(baselocation_zoneId) {

	$('#countryId').empty();
	$('#stateId').empty();
	$('#districtId').empty();
	$('#mandalId').empty();
	$('#cityId').empty();
	$('#localityId').empty();
	$('#up_zoneId').val("").trigger("chosen:updated");
	$('#up_countryId').empty();
	$('#up_stateId').empty();
	$('#up_districtId').empty();
	$('#up_mandalId').empty();
	$('#up_cityId').empty();
	$('#up_localityId').empty();
	$('#up_landmarkId').val("").trigger("chosen:updated");

	var strUrl = Service.GET_LOCATION_INFO;
	console.log("getbaselocationInfo Url is:" + strUrl);
	var obj_Insert = {
		locationId : baselocation_zoneId
	};
	$
			.ajax({
				type : "POST",
				url : strUrl,
				dataType : "json",
				data : JSON.stringify(obj_Insert),
				contentType : "application/json",
				async : false,
				crossDomain : true,
				success : function(data) {
					var responsecode = data.responseCode;
					if (200 !== responsecode) {

					} else {
						var jsonArray = data.objWFMSZonesControllerDTO;
						$.each(jsonArray, function(i, resData) {
							$('#countryId').val(resData.countryName);
							$('#stateId').val(resData.stateName);
							$('#districtId').val(resData.districtName);
							$('#mandalId').val(resData.mandalName);
							$('#cityId').val(resData.cityName);
							$('#localityId').val(resData.localityName);

							$('#up_countryId').val(resData.countryName);
							$('#up_stateId').val(resData.stateName);
							$('#up_districtId').val(resData.districtName);
							$('#up_mandalId').val(resData.mandalName);
							$('#up_cityId').val(resData.cityName);
							$('#up_localityId').val(resData.localityName);

							localityId = resData.locationId;
							countryId = resData.countryId;
							stateId = resData.state;
							districtId = resData.district;
							mandalId = resData.mandal;
							cityId = resData.cityId;

						});
					}
				},
				error : function(err) {
					console.error("Error in getbaselocationInfo"
							+ JSON.stringify(err));
				}
			});
}

/*
 * @Author : Purushotham Akula @Desc : getlandmarkBasedOnlocalityId
 */
function getlandmarkBasedOnlocalityId(locationId, landmarkId) {
	/*
	 * $('#landmarkId').empty(); $('#up_landmarkId').empty();
	 */
	var id = '#' + landmarkId;
	$(id).empty();
	var strUrl = Service.GET_LANDMARK_BASEDON_LOCALITYID;
	console.log("getlandmarkBasedOnlocalityId Url is:" + strUrl);
	var obj_Insert = {
		localityId : locationId
	};

	$.ajax({
		type : "POST",
		url : strUrl,
		dataType : "json",
		data : JSON.stringify(obj_Insert),
		contentType : "application/json",
		async : false,
		crossDomain : true,
		success : function(data) {
			var responsecode = data.responseCode;
			if (200 !== responsecode) {

			} else {
				var jsonArray = data.objGetCountriesControllerDTO;
				var selectfirst = "<option value='0'>Select landmark</option>";
				/*
				 * $('#landmarkId').append(selectfirst);
				 * $('#up_landmarkId').append(selectfirst);
				 */
				$(id).append(selectfirst);
				$.each(jsonArray, function(i, resData) {
					var Country = "<option value=" + resData.landMarkId + ">"
							+ resData.landMarkName + "</option>";
					/*
					 * $(Country).appendTo('#landmarkId');
					 * $(Country).appendTo('#up_landmarkId');
					 */
					$(Country).appendTo(id);

				});
			}
		},
		error : function(err) {
			console.error("Error in getlandmarkBasedOnlocalityId"
					+ JSON.stringify(err));
		}
	});
	$(id).trigger("chosen:updated");
	$(id).chosen();
}

/*
 * @Desc : InsertBaselocation
 */
function InsertBaselocation() {
	var locationId = $('#zoneId').val();
	var userId = user_Id;
	var roleId = role_Id;
	var moduleId = module_Id;
	var locationName = $('#baselocationNameId').val();
	var landMarkId = $('#landmarkId').val();
	if (locationName === null || locationName === '' || locationName === "") {
		showNotificationError("Please Enter Base Location",
				"baselocationNameId", "error");
		return;
	} else if (landMarkId === "0" || landMarkId === '0') {
		showNotificationError("Select Land Mark", "landmarkId", "error");
		return;
	}
	obj_Insert = {
		locationId : locationId,
		countryId : countryId,
		stateId : stateId,
		districtId : districtId,
		mandalId : mandalId,
		cityId : cityId,
		localityId : localityId,
		userId : userId,
		roleId : roleId,
		moduleId : moduleId,
		locationName : locationName,
		landMarkId : landMarkId
	};

	var strUrl = Service.INSERT_BASE_LOCATION;
	$.ajax({
		type : "POST",
		url : strUrl,
		dataType : "json",
		data : JSON.stringify(obj_Insert),
		contentType : "application/json",
		async : false,
		crossDomain : true,
		success : function(data) {
			if (data !== null || data !== 0) {
				showNotificationError("Inserted Successfully",
						"insert_BaseLocationId", "success");
				getBaselocationDetails();
				setTimeout(function() {
					window.location.reload();
				}, 3000);
			}
		},
		error : function() {
			console.log("Error In InsertBaselocation");
		}
	});
}

/*
 * @Author : Purushotham Akula @Desc : getBaselocationDetails
 */
function getBaselocationDetails() {
	$('#driverTable').html("");
	var strUrl = Service.GET_BASE_LOCATION_DETAILS;
	console.log("strUrl : " + strUrl);
	$.ajax({
		type : 'GET',
		url : strUrl,
		dataType : 'json',
		async : false,
		success : function(data) {
			var responsecode = data.responseCode;
			if (200 !== responsecode || data.status === "NO_DATA_FOUND") {
				var divTag = document.createElement("h2");
				$(divTag).css("text-align", "center");
				$(divTag).html("No data available....");
				$('#driverTable').append(divTag);
			} else {
				var jsonArray = data.objGetCountriesControllerDTO;
				if (jsonArray.length > 0) {
					getBaselocationDetailsList(jsonArray);
					loadDataTable();
				}
			}
		},
		error : function(err) {
			console.error('getZonedetails : ' + JSON.stringify(err));
		}
	});
}

/*
 * @Author : Purushotham Akula @Desc : getBaselocationDetailsList
 */

function getBaselocationDetailsList(strData) {

	var objDivTag = document.createElement('div');
	$(objDivTag).addClass('table-responsive');

	var objTableTag = document.createElement('table');
	$(objTableTag)
			.addClass(
					'table table-striped table-bordered table-hover dataTables-example');
	$(objDivTag).append(objTableTag);

	var objTHead = document.createElement('thead');
	$(objTableTag).append(objTHead);

	var objTr = document.createElement('tr');
	$(objTHead).append(objTr);

	var objTHead1 = document.createElement('th');
	$(objTHead1).html('S.No');
	$(objTr).append(objTHead1);

	var objTHead2 = document.createElement('th');
	$(objTHead2).html('Base location');
	$(objTr).append(objTHead2);

	var objTHead3 = document.createElement('th');
	$(objTHead3).html('Zone');
	$(objTr).append(objTHead3);

	var objTHead4 = document.createElement('th');
	$(objTHead4).html('Country');
	$(objTr).append(objTHead4);

	var objTHead5 = document.createElement('th');
	$(objTHead5).html('State');
	$(objTr).append(objTHead5);

	var objTHead6 = document.createElement('th');
	$(objTHead6).html('District');
	$(objTr).append(objTHead6);

	var objTHead7 = document.createElement('th');
	$(objTHead7).html('Mandal');
	$(objTr).append(objTHead7);

	var objTHead8 = document.createElement('th');
	$(objTHead8).html('City');
	$(objTr).append(objTHead8);

	var objTHead9 = document.createElement('th');
	$(objTHead9).html('Locality');
	$(objTr).append(objTHead9);

	var objTHead10 = document.createElement('th');
	$(objTHead10).html('Landmark');
	$(objTr).append(objTHead10);

	var objTHead11 = document.createElement('th');
	$(objTHead11).html('Edit Baselocation');
	$(objTr).append(objTHead11);

	var objTHead12 = document.createElement('th');
	$(objTHead12).html('Delete Baselocation');
	$(objTr).append(objTHead12);

	var objTBody = document.createElement('tbody');
	$(objTBody).attr('id', 'driverTablebody');
	$(objTableTag).append(objTBody);

	for (var i = 0; i < strData.length; i++) {

		var index = i + 1;
		var tbleRow = document.createElement('tr');

		var tblCol = document.createElement('td');
		$(tblCol).addClass('text-center');
		$(tblCol).html(index);
		$(tbleRow).append(tblCol);

		var tblCol1 = document.createElement('td');
		$(tblCol1).addClass('text-center');
		$(tblCol1).html(strData[i].baseLocationName);
		$(tbleRow).append(tblCol1);

		var tblCol2 = document.createElement('td');
		$(tblCol2).addClass('text-center');
		$(tblCol2).html(strData[i].locationName);
		$(tbleRow).append(tblCol2);

		var tblCol3 = document.createElement('td');
		$(tblCol3).addClass('text-center');
		$(tblCol3).html(strData[i].countryName);
		$(tbleRow).append(tblCol3);

		var tblCol4 = document.createElement('td');
		$(tblCol4).addClass('text-center');
		$(tblCol4).html(strData[i].stateName);
		$(tbleRow).append(tblCol4);

		var tblCol5 = document.createElement('td');
		$(tblCol5).addClass('text-center');
		$(tblCol5).html(strData[i].districtName);
		$(tbleRow).append(tblCol5);

		var tblCol6 = document.createElement('td');
		$(tblCol6).addClass('text-center');
		$(tblCol6).html(strData[i].mandalName);
		$(tbleRow).append(tblCol6);

		var tblCol7 = document.createElement('td');
		$(tblCol7).addClass('text-center');
		$(tblCol7).html(strData[i].cityName);
		$(tbleRow).append(tblCol7);

		var tblCol8 = document.createElement('td');
		$(tblCol8).addClass('text-center');
		$(tblCol8).html(strData[i].localityName);
		$(tbleRow).append(tblCol8);

		var tblCol9 = document.createElement('td');
		$(tblCol9).addClass('text-center');
		$(tblCol9).html(strData[i].landMarkName);
		$(tbleRow).append(tblCol9);

		var tablcol11 = document.createElement("td");
		$(tablcol11).addClass('text-center');
		$(tablcol11)
				.html(
						'<div class="row"> <div class="col-sm-6"> <a href="#" data-toggle="modal"  data-toggle="tooltip"  data-placement="bottom" data-target="#update_Modal" title="Edit"><span class="glyphicon glyphicon-pencil" style="color:blue"></span></a> </div></div>');
		$(tablcol11).attr(
				'onclick',
				'getBaselocationDetailsForupdate("' + strData[i].baseLocationId
						+ '","' + strData[i].baseLocationName + '","'
						+ strData[i].locationId + '","'
						+ strData[i].locationName + '","'
						+ strData[i].countryName + '", "'
						+ strData[i].stateName + '", "'
						+ strData[i].districtName + '", "'
						+ strData[i].mandalName + '", "' + strData[i].cityName
						+ '", "' + strData[i].localityName + '", "'
						+ strData[i].landMarkId + '","'
						+ strData[i].landMarkName + '")');
		$(tbleRow).append(tablcol11);

		var tablcol12 = document.createElement("td");
		$(tablcol12).addClass('text-center');
		$(tablcol12)
				.html(
						'<div class="row"> <div class="col-sm-6"> <a href="#" data-toggle="tooltip"  data-placement="bottom" title="Cancel" id="update_Modal1"> <span class="glyphicon glyphicon-remove" style="color:red"></span> </a></div></div>');
		$(tablcol12).attr('onclick',
				'Delete_Base_Location("' + strData[i].baseLocationId + '")');
		$(tbleRow).append(tablcol12);

		$(objTBody).append(tbleRow);
	}
	$("#driverTable").append(objDivTag);
}

function getBaselocationDetailsForupdate(baseLocationId, baseLocationName,
		locationId, locationName, countryName, stateName, districtName,
		mandalName, cityName, localityName, landMarkId, landMarkName) {

	$('#up_baselocationNameId').empty();
	$('#up_zoneId').val("").trigger("chosen:updated");
	$('#up_countryId').empty();
	$('#up_stateId').empty();
	$('#up_districtId').empty();
	$('#up_mandalId').empty();
	$('#up_cityId').empty();
	$('#up_localityId').empty();
	$('#up_landmarkId').val("").trigger("chosen:updated");

	$('#hidden_BaseLocId').val(baseLocationId);
	$('#up_baselocationNameId').val(baseLocationName);
	getZones("up_zoneId");
	$('#up_zoneId').val(locationId).trigger("chosen:updated");
	$('#up_countryId').val(countryName);
	$('#up_stateId').val(stateName);
	$('#up_districtId').val(districtName);
	$('#up_mandalId').val(mandalName);
	$('#up_cityId').val(cityName);
	$('#up_localityId').val(localityName);
	getlandmarkBasedOnlocalityId(locationId, "up_landmarkId");
	$('#up_landmarkId').val(landMarkId).trigger("chosen:updated");

}

function upadate_baseclocations_Details() {
	var baselocation_Name = $('#up_baselocationNameId').val();
	if (baselocation_Name === null || baselocation_Name === ""
			|| baselocation_Name === '') {
		Update_Baselocation_Without_Name();
		console.log(" If baselocation_Name" + baselocation_Name);
	} else {
		Update_Baselocation_With_Name();
		console.log(" else baselocation_Name" + baselocation_Name);

	}
}

/*
 * @Desc : Update_Baselocation_Without_Name
 */
function Update_Baselocation_Without_Name() {
	var userId = user_Id;
	var roleId = role_Id;
	var moduleId = module_Id;

	var base_Location = $('#up_baselocationNameId').val();
	var hidden_BaseLocId = $('#hidden_BaseLocId').val();
	var landMarkId = $('#up_landmarkId').val();
	if (landMarkId === "0" || landMarkId === '0' || landMarkId === null) {
		showNotificationError("Select Land Mark", "up_landmarkId", "error");
		return;
	}
	obj_Insert = {
		"baseLocationId" : hidden_BaseLocId,
		"landMarkId" : landMarkId,
		"createdbyId" : userId,
		"moduleId" : moduleId,
		"roleId" : roleId
	};

	var strUrl = Service.UPDATE_BASE_LOCATION_WITHOUT_NAME;
	$.ajax({
		type : "POST",
		url : strUrl,
		dataType : "json",
		data : JSON.stringify(obj_Insert),
		contentType : "application/json",
		async : false,
		crossDomain : true,
		success : function(data) {
			if (data !== null || data !== 0) {
				showNotificationError("Updated Successfully",
						"update_BaseLocDetailsId", "success");
				setTimeout(function() {
					window.location.reload();
				}, 3000);
			}
		},
		error : function() {
			console.log("Error In Update_Baselocation_Without_Name");
		}
	});
}

/*
 * @Desc : Update_Baselocation_With_Name
 */
function Update_Baselocation_With_Name() {
	var userId = user_Id;
	var roleId = role_Id;
	var moduleId = module_Id;

	var base_Location = $('#up_baselocationNameId').val();
	var hidden_BaseLocId = $('#hidden_BaseLocId').val();
	var landMarkId = $('#up_landmarkId').val();
	if (base_Location === null || base_Location === '' || base_Location === "") {
		showNotificationError("Please Enter Base Location",
				"up_baselocationNameId", "error");
		return;
	} else if (landMarkId === "0" || landMarkId === '0' || landMarkId === null) {
		showNotificationError("Select Land Mark", "up_landmarkId", "error");
		return;
	}
	obj_Insert = {
		"baseLocationId" : hidden_BaseLocId,
		"locationName" : base_Location,
		"landMarkId" : landMarkId,
		"createdbyId" : userId,
		"moduleId" : moduleId,
		"roleId" : roleId
	};

	var strUrl = Service.UPDATE_BASE_LOCATION_WITH_NAME;
	$.ajax({
		type : "POST",
		url : strUrl,
		dataType : "json",
		data : JSON.stringify(obj_Insert),
		contentType : "application/json",
		async : false,
		crossDomain : true,
		success : function(data) {
			if (data !== null || data !== 0) {
				showNotificationError("Updated Successfully",
						"update_BaseLocDetailsId", "success");
				setTimeout(function() {
					window.location.reload();
				}, 3000);
			}
		},
		error : function() {
			console.log("Error In Update_Baselocation_With_Name");
		}
	});
}

/*
 * @Desc : Delete_Base_Location
 */
function Delete_Base_Location(hidden_BaseLocId) {
	if (confirm("Are you sure, do you want delete this base location?")) {
		var userId = user_Id;
		var roleId = role_Id;
		var moduleId = module_Id;
		// var hidden_BaseLocId = $('#hidden_BaseLocId').val();

		obj_Insert = {
				"baseLocationId": hidden_BaseLocId,
				"createdbyId":userId,
				"createdbymoduleId": roleId,
				"createdbyroleId": moduleId
			};

		var strUrl = Service.DELETE_BASE_LOCATION;
		$.ajax({
			type : "POST",
			url : strUrl,
			dataType : "json",
			data : JSON.stringify(obj_Insert),
			contentType : "application/json",
			async : false,
			crossDomain : true,
			success : function(data) {
				if (data !== null || data !== 0) {
					showNotificationError("Deleted Successfully",
							"update_BaseLocDetailsId", "success");
					setTimeout(function() {
						window.location.reload();
					}, 3000);
				}
			},
			error : function() {
				console.log("Error In Update_Baselocation_With_Name");
			}
		});
	} else {
		return false;
	}

}

/*
 * @Author : Purushotham Akula @Desc : loadDataTable
 */
function loadDataTable() {
	$('.dataTables-example').DataTable(
			// Data table
			{
				"aLengthMenu" : [ [ 5, 10, 15, 25, 50, 75, -1 ],
						[ 5, 10, 15, 25, 50, 75, "All" ] ],
				"iDisplayLength" : 5,
				responsive : true,
				dom : '<"html5buttons"B>lTfgitp',
				buttons : [
						]
			});
}

function validate_Characters() {
	$('#baselocationNameId')
			.keydown(
					function(e) {
						if (e.shiftKey || e.ctrlKey || e.altKey) {
							e.preventDefault();
						} else {
							var key = e.keyCode;
							if (!((key == 8) || (key == 32) || (key == 46)
									|| (key >= 35 && key <= 40) || (key >= 65 && key <= 90))) {
								e.preventDefault();
							}
						}
					});
}

/*
 * @DESC : Notification purpose @Author : Purushotham Akula @DATE : 2019-08-22
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
		position : 'right',
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
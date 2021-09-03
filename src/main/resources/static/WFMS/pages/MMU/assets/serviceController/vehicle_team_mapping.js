var createdyid=1;
var createdbymid=1;
var createdByRoleId=1;
var stateid=1;
var doctor=22;
var anm_id=27;
var pharmacy_id=25;
var pilot_id=26;
var lab_id=24;


//onload calling
$(document).ready(function() {
	try {
		getDistrictData(stateid)
	
		
	} catch (err) {
		console.log("errror in loading ready funtion" + err);
	}
});
// district dropdown function
function getDistrictData(stateid) {
	$('#district_id').empty();
	getDistrict(1);
	var selectfirst = "<option value='0'>Please Select District</option>";
	$('#district_id').append(selectfirst);
	$.each(district, function(i, resData) {
		var district = "<option value=" + resData.districtid + ">"
				+ resData.distname + "</option>";
		$(district).appendTo('#district_id');
	});
	$('#district_id').trigger("chosen:updated");
	$('#district_id').chosen();
};


$('#district_id').on('change', function() {
	var dist = $('#district_id').val();
	$("#vehicleid").empty();
	getVehicleBasedOnDistrict(dist);
});

$('#vehicleid').on('change', function() {
	var vehicleid = $('#vehicleid').val();	
	getMappingTeamWithVehicle(vehicleid);
});


//getAssignedVehicle Based On District.
function getVehicleBasedOnDistrict(districtid) {
	$('#vehicleid').empty();
	var objson = {
			districtid : districtid
	};
	var strUrl = Service.getVehicle;
	$
			.ajax({
				type : 'POST',
				url : strUrl,
				data : JSON.stringify(objson),
				dataType : 'json',
				contentType : "application/json",
				async : false,
				crossDomain : true,
				headers: {
		            "X-TENANT-ID": "tenantId2"
		        },
				success : function(data) {
					var responsecode = data.responseCode;
					if (200 !== responsecode) {
						showNotificationError("Vehicle Not Available", "vehicleid", "error");
						return;
					} else {
						var jsonArray = data.controllerDTO;
						var selectfirst = "<option value='0'>Please Select Vehicle</option>";
						$('#vehicleid').append(selectfirst);
						$.each(jsonArray, function(i, resData) {
							var vehicle = "<option value=" + resData.vehicleid
									+ ">" + resData.vehicleNo + "</option>";
							$(vehicle).appendTo('#vehicleid');
						});
					}
				},
				error : function(err) {
					console.error("Error in employee_type"
							+ JSON.stringify(err));
				}
			});
	$('#vehicleid').trigger("chosen:updated");
	$('#vehicleid').chosen();
}

function getMappingTeamWithVehicle(vehicleid) {
	$('#assigned_team').empty();
	var objson = {
			vehicleid : vehicleid
	};
	var strUrl = Service.getVehicleTeamMappingData;
	
	$
			.ajax({
				type : 'POST',
				url : strUrl,
				data : JSON.stringify(objson),
				dataType : 'json',
				contentType : "application/json",
				async : false,
				crossDomain : true,
				headers: {
		            "X-TENANT-ID": "tenantId2"
		        },
				success : function(data) {
					var responsecode = data.responseCode;
					if (200 !== responsecode) {
						$('#add_team_btnid').show();
					} else {
						var jsonArray = data.controllerDTO;
						if (jsonArray.length > 0) {
							$('#add_team_btnid').hide();
							getMappingTeamWithVehicle_DOM(jsonArray);
							//loadDataTable();
						}
						
					}
				},
				error : function(err) {
					console.error("Error in employee_type"
							+ JSON.stringify(err));
				}
			});

}

function getMappingTeamWithVehicle_DOM(strData) {
	try {
		// For Div Tag
		var objDivTag = document.createElement('div');
		$(objDivTag).addClass("table-responsive");

		// For table
		var ObjTableTag = document.createElement("table");
		$(ObjTableTag)
				.addClass(
						"table table-striped table-bordered table-hover dataTables-example");
		$(objDivTag).append(ObjTableTag);
		// For table head
		var objTHead = document.createElement("thead");
		$(ObjTableTag).append(objTHead);

		// For table row
		var objTr = document.createElement("tr");
		$(objTHead).append(objTr);

		// For table Heading1
		var objTHead1 = document.createElement("th");
		$(objTHead1).html('S.NO.');
		$(objTr).append(objTHead1);

		// For table Heading2
		var objTHead2 = document.createElement('th');
		$(objTHead2).html('Designation');
		$(objTr).append(objTHead2);

		// For table Heading3
		var objTHead3 = document.createElement('th');
		$(objTHead3).html('Name');
		$(objTr).append(objTHead3);
		// For table Heading4
		var objTHead4 = document.createElement('th');
		$(objTHead4).html('Update');
		$(objTr).append(objTHead4);
		// For table Heading5
		var objTHead5 = document.createElement('th');
		$(objTHead5).html('Change(Reliever team)');
		$(objTr).append(objTHead5);

	

		var objTBody = document.createElement("tbody");
		$(objTBody).attr("id", "tbodyData");
		$(ObjTableTag).append(objTBody);

		// Table Data Appending Here

		for (var i = 0; i < strData.length; i++) {

			var index = i + 1;
			var tbleRow = document.createElement("tr");

			var tablcol1 = document.createElement("td");

			$(tablcol1).addClass('text-center');
			var tablcol1 = document.createElement("td");
			$(tablcol1).html(index);
			$(tbleRow).append(tablcol1);

			var tablcol2 = document.createElement("td");
			$(tablcol2).addClass('text-center');
			$(tablcol2).html(strData[i].username);
			$(tbleRow).append(tablcol2);

			var tablcol3 = document.createElement("td");
			$(tablcol3).addClass('text-center');
			$(tablcol3).html(strData[i].designation_name);
			$(tbleRow).append(tablcol3);


			var tablcol4 = document.createElement("td");
			$(tablcol4).addClass('text-center');
			$(tablcol4).append('<u><a href="#" data-toggle="modal"data-placement="bottom" data-target="#update" title="View"><i	class="fa fa-edit"></i></a></u>');
			
			$(tablcol4).attr(
					'onclick',
					'get_Single_RowData("'+strData[i].designationid+'","'+strData[i].designation_name+'","'+strData[i].serialid+'")');
			$(tbleRow).append(tablcol4);
		


			var tablcol5 = document.createElement("td");
			$(tablcol5).addClass('text-center');
			$(tablcol5).append('<a href="#"><i  class="fa fa-edit" data-toggle="modal" data-target="#"></i><i></a> ');
			$(tbleRow).append(tablcol5);
			$(tablcol5).attr(
					'onclick',
					'get_RowData_for_reliever_team("'+strData[i].designationid+'","'+strData[i].designation_name+'","'+strData[i].serialid+'")');
			$(tbleRow).append(tablcol5);
			
			$(objTBody).append(tbleRow);
		}
		$("#assigned_team").append(objDivTag);

	} catch (err) {
		console.log("assigned_team" + err);
	}
}

function get_Single_RowData(designationid,desig,serialid){
	$("#user_id").empty();
	$('#updateid').modal('show');
	$("#user_id").append(desig);
	updateDesignationUsers(designationid);
	$('#serial_id').val(serialid);
	$('#designationid').val(designationid);
	$("#update_user option:contains(" + username+ ")").attr(
			'selected', 'selected').trigger("chosen:updated");
	
	//$('#relever_userid').append(designation_name);
}

function get_RowData_for_reliever_team(designationid,designation_name,serialid){
	$('#relever_userid').empty();
	var designationid;
	if(designationid==22){  
		designationid=29//for reliever team
	}else if(designationid==24){
		designationid=30;
	}else if(designationid==25){
		designationid=31;
	}else if(designationid==26){
		designationid=32;
	}else if(designationid==27){
		designationid=33;
	}
	$('#reliver_designation').val(designationid);
	$('#reliver_serialid').val(serialid);
	$('#update_reliever_team').modal('show');
	$('#relever_userid').append(designation_name);
	getUserFromReliverTeam(designationid)
}
//updateUserFromRelibleteam

function updateDesignationUsers(designationid) {
	$('#update_user').empty();
	var objson = {
			designationid : designationid
	};
	var strUrl = Service.getUserNameBasedOnDesignation;
	$
			.ajax({
				type : 'POST',
				url : strUrl,
				data : JSON.stringify(objson),
				dataType : 'json',
				contentType : "application/json",
				async : false,
				crossDomain : true,
				headers: {
		            "X-TENANT-ID": "tenantId2"
		        },
				success : function(data) {
					var responsecode = data.responseCode;
					if (200 !== responsecode) {
						
					} else {
						var jsonArray = data.controllerDTO;
						/*var selectfirst = "<option value='0'>Please Select One</option>";
						$('#update_user').append(selectfirst);*/
						$.each(jsonArray, function(i, resData) {
							var vehicle = "<option value=" + resData.userid
									+ ">" + resData.username + "</option>";
							$(vehicle).appendTo('#update_user');
						});
					}
				},
				error : function(err) {
					console.error("Error in employee_type"
							+ JSON.stringify(err));
				}
			});
	
	$('#update_user').trigger("chosen:updated");
	$('#update_user').chosen();
}

function getUserFromReliverTeam(designationid) {
	$('#reliver_user').empty();
	var objson = {
			designationid : designationid
	};
	var strUrl = Service.getUserNameBasedOnDesignation;
	$
			.ajax({
				type : 'POST',
				url : strUrl,
				data : JSON.stringify(objson),
				dataType : 'json',
				contentType : "application/json",
				async : false,
				crossDomain : true,
				headers: {
		            "X-TENANT-ID": "tenantId2"
		        },
				success : function(data) {
					var responsecode = data.responseCode;
					if (200 !== responsecode) {
						
					} else {
						var selectfirst = "<option value='0'>Please Select One</option>";
						$('#reliver_user').append(selectfirst);
						var jsonArray = data.controllerDTO;
						$.each(jsonArray, function(i, resData) {
							var vehicle = "<option value=" + resData.userid
									+ ">" + resData.username + "</option>";
							$(vehicle).appendTo('#reliver_user');
						});
					}
				},
				error : function(err) {
					console.error("Error in employee_type"
							+ JSON.stringify(err));
				}
			});
	
	$('#reliver_user').trigger("chosen:updated");
	$('#reliver_user').chosen();
}

function updateTeamVehicle(){
	var serialid=$('#serial_id').val();
	var userid=$('#update_user').val();
	var designation=$('#designationid').val();
	var objson={			   
				"userid":userid,
				"designationid":designation,
				"serialid":serialid
	}
	
	var strUrl = Service.updateVehicleTeam;
	$
			.ajax({
				type : 'POST',
				url : strUrl,
				data : JSON.stringify(objson),
				dataType : 'json',
				contentType : "application/json",
				async : false,
				crossDomain : true,
				headers: {
		            "X-TENANT-ID": "tenantId2"
		        },
				success : function(data) {
					var responsecode = data.responseCode;
					if (200 !== responsecode) {
						
					} else {
						showNotificationError("Update Successfully", "btn_added", "success");
							window.setTimeout(function() {
						location.reload();
					}, 3000);
	
					}
				},
				error : function(err) {
					console.error("Error in employee_type"
							+ JSON.stringify(err));
				}
			});
}



function updateVehicleTeamFromReliverUsers(){
	var serialid=$('#reliver_serialid').val();
	var userid=$('#reliver_user').val();
	var designationid=$('#reliver_designation').val();
	var objson={			   
				"userid":userid,
				"designationid":designationid,
				"serialid":serialid
	}
	
	var strUrl = Service.updateVehicleTeam;
	$
			.ajax({
				type : 'POST',
				url : strUrl,
				data : JSON.stringify(objson),
				dataType : 'json',
				contentType : "application/json",
				async : false,
				crossDomain : true,
				headers: {
		            "X-TENANT-ID": "tenantId2"
		        },
				success : function(data) {
					var responsecode = data.responseCode;
					if (200 !== responsecode) {
						
					} else {
						showNotificationError("Update Successfully", "reliver_added", "success");
							window.setTimeout(function() {
						location.reload();
					}, 3000);
					}
				},
				error : function(err) {
					console.error("Error in employee_type"
							+ JSON.stringify(err));
				}
			});
}


function loadDataTable() {
	$('.dataTables-example').DataTable(
			{
				"aLengthMenu" : [ [ 5, 10, 15, 25, 50, 75, -1 ],
						[ 5, 10, 15, 25, 50, 75, "All" ] ],
				"iDisplayLength" : 5,
				responsive : true,
				dom : '<"html5buttons"B>lTfgitp',
				buttons : [
						{
							extend : 'copy'
						},
						{
							extend : 'csv'
						},
						{
							extend : 'excel',
							title : 'TyreLifeData'
						},
						{
							extend : 'pdf',
							title : 'TyreLifeData'
						},
						{
							extend : 'print',
							customize : function(win) {
								$(win.document.body).addClass('white-bg');
								$(win.document.body).css('font-size', '10px');

								$(win.document.body).find('table').addClass(
										'compact').css('font-size', 'inherit');
							}
						} ]
			});
}


function getDoctor() {
	$('#doctor_id').empty();
	var objson = {
			designationid : 22
	};
	
	var strUrl = Service.getUserNameBasedOnDesignation;
	$
			.ajax({
				type : 'POST',
				url : strUrl,
				data : JSON.stringify(objson),
				dataType : 'json',
				contentType : "application/json",
				async : false,
				crossDomain : true,
				headers: {
		            "X-TENANT-ID": "tenantId2"
		        },
				success : function(data) {
					var responsecode = data.responseCode;
					if (200 !== responsecode) {
					} else {
						var jsonArray = data.controllerDTO;
						var selectfirst = "<option value='0'>Please Select Doctor</option>";
						$('#doctor_id').append(selectfirst);
						$.each(jsonArray, function(i, resData) {
							var vehicle = "<option value=" + resData.userid
									+ ">" + resData.username + "</option>";
							$(vehicle).appendTo('#doctor_id');
						});
					}
				},
				error : function(err) {
					console.error("Error in employee_type"
							+ JSON.stringify(err));
				}
			});
	$('#doctor_id').trigger("chosen:updated");
	$('#doctor_id').chosen();
}


function getPharmacy() {
	$('#pharmacyid').empty();
	var objson = {
			designationid : 25
	};
	var strUrl = Service.getUserNameBasedOnDesignation;
	$
			.ajax({
				type : 'POST',
				url : strUrl,
				data : JSON.stringify(objson),
				dataType : 'json',
				contentType : "application/json",
				async : false,
				crossDomain : true,
				headers: {
		            "X-TENANT-ID": "tenantId2"
		        },
				success : function(data) {
					var responsecode = data.responseCode;
					if (200 !== responsecode) {
						
					} else {
						var jsonArray = data.controllerDTO;
						var selectfirst = "<option value='0'>Please Select Pharmacy</option>";
						$('#pharmacyid').append(selectfirst);
						$.each(jsonArray, function(i, resData) {
							var vehicle = "<option value=" + resData.userid
									+ ">" + resData.username + "</option>";
							$(vehicle).appendTo('#pharmacyid');
						});
					}
				},
				error : function(err) {
					console.error("Error in employee_type"
							+ JSON.stringify(err));
				}
			});
	$('#pharmacyid').trigger("chosen:updated");
	$('#pharmacyid').chosen();
}



function getANM() {
	$('#anmid').empty();
	var objson = {
			designationid : 27
	};
	var strUrl =Service.getUserNameBasedOnDesignation;
	$
			.ajax({
				type : 'POST',
				url : strUrl,
				data : JSON.stringify(objson),
				dataType : 'json',
				contentType : "application/json",
				async : false,
				crossDomain : true,
				headers: {
		            "X-TENANT-ID": "tenantId2"
		        },
				success : function(data) {
					var responsecode = data.responseCode;
					if (200 !== responsecode) {
						
					} else {
						var jsonArray = data.controllerDTO;
						var selectfirst = "<option value='0'>Please Select ANM</option>";
						$('#anmid').append(selectfirst);
						$.each(jsonArray, function(i, resData) {
							var vehicle = "<option value=" + resData.userid
									+ ">" + resData.username + "</option>";
							$(vehicle).appendTo('#anmid');
						});
					}
				},
				error : function(err) {
					console.error("Error in employee_type"
							+ JSON.stringify(err));
				}
			});
	$('#anmid').trigger("chosen:updated");
	$('#anmid').chosen();
}


function getPilot() {
	$('#pilotid').empty();
	var objson = {
			designationid : 26
	};
	var strUrl = Service.getUserNameBasedOnDesignation;
	$
			.ajax({
				type : 'POST',
				url : strUrl,
				data : JSON.stringify(objson),
				dataType : 'json',
				contentType : "application/json",
				async : false,
				crossDomain : true,
				headers: {
		            "X-TENANT-ID": "tenantId2"
		        },
				success : function(data) {
					var responsecode = data.responseCode;
					if (200 !== responsecode) {
						
					} else {
						var jsonArray = data.controllerDTO;
						var selectfirst = "<option value='0'>Please Select Pilot</option>";
						$('#pilotid').append(selectfirst);
						$.each(jsonArray, function(i, resData) {
							var vehicle = "<option value=" + resData.userid
									+ ">" + resData.username + "</option>";
							$(vehicle).appendTo('#pilotid');
						});
					}
				},
				error : function(err) {
					console.error("Error in employee_type"
							+ JSON.stringify(err));
				}
			});
	$('#pilotid').trigger("chosen:updated");
	$('#pilotid').chosen();
}


function getLab() {
	$('#labid').empty();
	var objson = {
			designationid : 24
	};
	var strUrl = Service.getUserNameBasedOnDesignation;
	$
			.ajax({
				type : 'POST',
				url : strUrl,
				data : JSON.stringify(objson),
				dataType : 'json',
				contentType : "application/json",
				async : false,
				crossDomain : true,
				headers: {
		            "X-TENANT-ID": "tenantId2"
		        },
				success : function(data) {
					var responsecode = data.responseCode;
					if (200 !== responsecode) {
						
					} else {
						var jsonArray = data.controllerDTO;
						var selectfirst = "<option value='0'>Please Select Lab</option>";
						$('#labid').append(selectfirst);
						$.each(jsonArray, function(i, resData) {
							var vehicle = "<option value=" + resData.userid
									+ ">" + resData.username + "</option>";
							$(vehicle).appendTo('#labid');
						});
					}
				},
				error : function(err) {
					console.error("Error in employee_type"
							+ JSON.stringify(err));
				}
			});
	$('#labid').trigger("chosen:updated");
	$('#labid').chosen();
}

/*
 * For showing sweet alert{ priyadarshini 10-01-2020
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
		position : 'Right',
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


function addTeam(){

	
	var districtid=$('#district_id').val();
	var vehicleid=$('#vehicleid').val();
	if(districtid=="0"){
		showNotificationError("Please Select District", "district_id", "error");
		return;
	}
	if(vehicleid=="0"){
		showNotificationError("Please Select Vehicle", "vehicleid", "error");
		return;
	}
	$('#registration').modal('show');
	getLab();
	getDoctor();
	getPharmacy();
	getANM();
	getPilot();
	
	
}


function mappingTeamWithVehicle(){
	var districtid=$('#district_id').val();
	var vehicleid=$('#vehicleid').val();
	var doctorid=$('#doctor_id').val();
	var anm=$('#anmid').val();
	var pharmacy=$('#pharmacyid').val();
	var pilot=$('#pilotid').val();
	var lab=$('#labid').val();
	
	if(doctorid=="0"){
		showNotificationError("Please Select Doctor", "doctor_id", "error");
		return;
	}
	if(anm=="0"){
		showNotificationError("Please Select ANM", "anmid", "error");
		return;
	}
	if(pharmacy=="0"){
		showNotificationError("Please Select Pharmacy", "pharmacyid", "error");
		return;
	}
	if(pilot=="0"){
		showNotificationError("Please Select Pilot", "pilotid", "error");
		return;
	}
	if(lab=="0"){
		showNotificationError("Please Select Lab", "labid", "error");
		return;
	}
	
	var team=doctorid+","+anm+","+pharmacy+","+pilot+","+lab;
	var designationid=doctor+","+anm_id+","+pharmacy_id+","+pilot_id+","+lab_id;
	

	var objson={
			   "vehicleid":vehicleid,
				"userid":team,
				"districtid":districtid,
				"designationid":designationid,
				"createdByid":createdyid,
				"createdByModululeid":createdbymid,
				"createdByRoleid":createdByRoleId
	}
	
	var strUrl = Service.mappingVehicleToTeam;
	$
			.ajax({
				type : 'POST',
				url : strUrl,
				data : JSON.stringify(objson),
				dataType : 'json',
				contentType : "application/json",
				async : false,
				crossDomain : true,
				headers: {
		            "X-TENANT-ID": "tenantId2"
		        },
				success : function(data) {
					var responsecode = data.responseCode;
					if (200 !== responsecode) {
						
					} else {
						showNotificationError("Succcessfully team added", "team_added", "success");
							window.setTimeout(function() {
						location.reload();
					}, 3000);
					}
				},
				error : function(err) {
					console.error("Error in employee_type"
							+ JSON.stringify(err));
				}
			});

}

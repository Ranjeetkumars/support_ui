/* 
 * @Author : Habiboon Patan
 * @Date : 10-06-2019
 * @Desc : LifeCycle of TyreF
 */

$(document).ready(function() {
	try {
		getListOfDistrict();
		get_Tyres();
	} catch (err) {
		console.log("errror in loading ready funtion" + err);
	}
});

$('#registration').on('shown.bs.modal', function(e) {
	getListOfDistrict_reg()
	getShiftTypes();
	get_Tyres();
});


//Added By Bhuneshwar
//District Dropdown For Search
function getListOfDistrict() {
  loadingDistrictsMaster();
  $.each(district, function(i, resData) {
      var districts = "<option value=" + resData.districtID + ">" + resData.districtName + "</option>";
      $(districts).appendTo('#tyre_district_Id');
  });
  $('#tyre_district_Id').trigger("chosen:updated");
  $("#tyre_district_Id").chosen();
}
;

//District Dropdown For Registation
function getListOfDistrict_reg() {
  loadingDistrictsMaster();
  $.each(district, function(i, resData) {
      var districts = "<option value=" + resData.districtID + ">" + resData.districtName + "</option>";
      $(districts).appendTo('#tyre_reg_districtID');
  });
  $('#tyre_reg_districtID').trigger("chosen:updated");
  $("#tyre_reg_districtID").chosen();
}
;

//on change 
$('#tyre_district_Id').on('change', function() {
  var baseLocation = $('#tyre_district_Id').val();
  $('#tyre_baseLocation_Id').empty();
  baseLocation_search(baseLocation);
});

$('#tyre_reg_districtID').on('change', function() {
  var baseLocation = $('#tyre_reg_districtID').val();
  $('#tyre_reg_baseLocID').empty();
  baseLocation_reg(baseLocation);
});

//Baselocation  for Search
function baseLocation_search(listOfDistrict) {
	$('#tyre_baseLocation_Id').empty();
  // here calling masterdata ajax call
  loadingBaseLocationMaster(listOfDistrict);
  var selectfirst = "<option value='0'>Select Base Location</option>";
  $('#tyre_baseLocation_Id').append(selectfirst);
  $.each(baselocations, function(i, resData) {
      var baselocation = "<option value=" + resData.baselocationID + ">" + resData.baselocationName + "</option>";
      $(baselocation).appendTo('#tyre_baseLocation_Id');
  });
  $('#tyre_baseLocation_Id').trigger("chosen:updated");
  $("#tyre_baseLocation_Id").chosen();
}
;

//Baselocation for Registation
function baseLocation_reg(listOfDistrict) {
	$('#tyre_reg_baseLocID').empty();
  // here calling masterdata ajax call
  loadingBaseLocationMaster(listOfDistrict);
  var selectfirst = "<option value='0'>Select Base Location</option>";
  $('#tyre_reg_baseLocID').append(selectfirst);
  $.each(baselocations, function(i, resData) {
      var baselocation = "<option value=" + resData.baselocationID + ">" + resData.baselocationName + "</option>";
      $(baselocation).appendTo('#tyre_reg_baseLocID');
  });

  $('#tyre_reg_baseLocID').trigger("chosen:updated");
  $("#tyre_reg_baseLocID").chosen();
}
;



$('#tyre_baseLocation_Id').on('change', function() {
  var baseLocation = $('#tyre_baseLocation_Id').val();
  $('#tyre_ambulance_Id').empty();
  getAmbulance_tyre(baseLocation);
});

$('#tyre_reg_baseLocID').on('change', function() {
  var baseLocation = $('#tyre_reg_baseLocID').val();
  $('#tyre_reg_ambulanceID').empty();
  getAmbulance_tyre_reg(baseLocation);
});


/*
 * @DESX : For loading the Ambulance based on the baseLocation calling to
 * masterdata @NAME : Habiboon Patan @DATE : 10-06-2019 @INPUTS: BaselocationId
 */
function getAmbulance_tyre(baseLocation) {
	$('#tyre_ambulance_Id').empty();
	// here calling masterdata ajax call
	loadingAmbulanceMaster(baseLocation);
	var selectfirst = "<option value='0'>Select Ambulance</option>";
	$('#tyre_ambulance_Id').append(selectfirst);
	$.each(ambulances, function(i, resData) {
		var ambulances = "<option value=" + resData.vehicleID + ">"
				+ resData.vehicleName + "</option>";
		$(ambulances).appendTo('#tyre_ambulance_Id');
	});
	$('#tyre_ambulance_Id').trigger("chosen:updated");
	$('#tyre_ambulance_Id').chosen();
};

function getAmbulance_tyre_reg(baseLocation) {
	$('#tyre_reg_ambulanceID').empty();
	// here calling masterdata ajax call
	loadingAmbulanceMaster(baseLocation);
	var selectfirst = "<option value='0'>Select Ambulance</option>";
	$('#tyre_reg_ambulanceID').append(selectfirst);
	$.each(ambulances, function(i, resData) {
		var ambulances = "<option value=" + resData.vehicleID +","+resData.vehicleName+ ">"
				+ resData.vehicleName + "</option>";
		$(ambulances).appendTo('#tyre_reg_ambulanceID');
	});
	$('#tyre_reg_ambulanceID').trigger("chosen:updated");
	$('#tyre_reg_ambulanceID').chosen();
};



function get_Tyres() {
	try {
		$('#tyreId').empty();
		$('#reg_tyre_id').empty();
		var strUrl = Service.get_tyres;
		console.log("get_tyres Url is:" + strUrl);
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
							var jsonArray = data.tyreLifeControllerDTOs;
							var selectfirst = "<option value='0'>Select Tyres</option>";
							$('#tyreId').append(selectfirst);
							$('#reg_tyre_id').append(selectfirst);

							$.each(jsonArray, function(i, resData) {
								var tyreData = "<option value="
										+ resData.tt_serialid + ">"
										+ resData.tt_tyre_type + "</option>";
								$(tyreData).appendTo('#tyreId');
								$(tyreData).appendTo('#reg_tyre_id');
							});
						}
					},
					error : function(err) {
						console.error("Error in districts"
								+ JSON.stringify(err));
					}
				});
	} catch (err) {
		console.error('Error in getDistrictsData()' + err);
	}
	$('#tyreId').trigger("chosen:updated");
	$('#reg_tyre_id').trigger("chosen:updated");
	$('#tyreId').chosen();
	$('#reg_tyre_id').chosen();
}



/*
 * @DESC : For loading the ShiftType calling to masterdata @AuthorName :
 * Habiboon Patan @DATE : 10-06-2019 @INPUTS : no input
 */
function getShiftTypes() {
	if (shiftType.length < 1 || shiftType === []) {
		loadingShiftTypeMaster();
		$.each(shiftType, function(i, resData) {
			var shiftType = "<option value=" + resData.shiftTypeID + ">"
					+ resData.shiftTypeName + "</option>";
			$(shiftType).appendTo('#reg_tyre_shiftId');

		});
	}
};
$('#tyre_reg_ambulanceID').on('change', function() {
	var vehicleID = $('#tyre_reg_ambulanceID').val();
	getOdoMeter(vehicleID);
	//var supername = getSupervisorType(baseLocation, 'tyre_reg_supervisor');
	//alert("supername" + supername);
	//$('#tyre_reg_supervisor').val(supername);
});

/*
 * @DESC : Getting Odometer based on baselocation @AuthorName : Habiboon Patan
 * @DATE : 10-06-2019 @INPUTS : Baselocation
 */
function getOdoMeter(vehicleID) {
	var vehicle_id=vehicleID.split(",");
	console.log('Base location Id' + vehicle_id[0]);
	var strUrl = Service.getOdoMeter + vehicle_id[0];
	console.log("comming into getOdoMeter === " + strUrl);
	$.ajax({
		type : "GET",
		url : strUrl,
		dataType : "json",
		async : false,
		success : function(data) {
			var responsecode = data.responseCode;
			if (200 !== responsecode) {

			} else {
				alert("-------"+OdoMeter);
				var OdoMeter = data.output;
				console.log('----- OdoMeter -----' + OdoMeter);
				$('#reg_preodometer').val(OdoMeter);

			}
		},
		error : function() {
			console.log('Error in loading loadBaseLocation Data' + 'strUrl');
		}
	});
}

/*
 * @DESC : Getting SupervisorName based on baselocation @AuthorName : Habiboon
 * Patan @DATE : 10-06-2019 @INPUTS : Baselocation
 */
function getSupervisorType(baseLocation, tempSupId) {
	var tempSupId;
	var tempSupNAME;

	try {
		var strUrl = Service.SupervisorType + "/" + baseLocation;
		console.log("getSupervisorType Url is:" + strUrl);
		$.ajax({
			type : 'GET',
			url : strUrl,
			dataType : 'json',
			async : false,
			success : function(data) {

				var responsecode = data.responseCode;
				if (200 !== responsecode) {

				} else {
					var jsonArray = data.breakDownMaitainceControllerDTOs;
					$.each(jsonArray, function(i, resData) {

						tempSupId = resData.user_Id;

						tempSupNAME = resData.user_Name;
					});
				}
			}
		});
	} catch (err) {
		console.error('Error in getSupervisorType()' + err);
	}
	return tempSupNAME;
}

/*
 * @DESC : Tyre Registration @AuthorName : Habiboon Patan @DATE : 10-06-2019
 */
function tyre_Registraion() {
	   var createdbyid=localStorage.getItem("userID");
		var createdbymodelid=localStorage.getItem("opdesk_moduleID");
		var createdbyroleid=localStorage.getItem("opdesk_roleID");
	var otherDistrictManager = $('#tyre_reg_other_distManagerID').val();
	var remarksId = $('#tyre_reg_remarksId').val();
	$('#remark_id').val(remarksId);
	var loadistrict = $('#tyre_reg_districtID').val();
	$('#distId').val(loadistrict);
	var loadBaseLocation = $('#tyre_reg_baseLocID').val();//
	$('#baselocId').val(loadBaseLocation);
	var vehicleID = $('#tyre_reg_ambulanceID').val();
	var ambulance_reg_number = $("#tyre_reg_ambulanceID").val();
	var vehicle_id=vehicleID.split(",");
	$('#ambulance_no').val(vehicle_id[1]);
	var shiftTypeId = $('#reg_tyre_shiftId').val();
	var activityid = 6;
	var reportDataTime = $('#tyre_reg_reportTimeId').val();
	var reportDataTime1 = moment(reportDataTime).format("YYYY-MM-DD");

	var statusid = 1;
	var uniqId = $('#tyre_reg_uniqID').val();
	var loadTyresReg = $('#reg_tyre_id').val();
	var typeModel = $('#tyre_reg_typeModelID').val();
	var preodometerReading = $('#reg_preodometer').val();
	var currentOdoMeterReading = $('#tyre_reg_currOdoMeterID').val();
	var tyreRemarksId = $('#tyre_reg_tyreRemarksID').val();
	var previousOdometerReading=$('#reg_preodometer').val();
	var reportdate=$('#report_date_reg').val();
	$('#reportedDate').val(reportdate);
	var supervisorId=$('#tyre_reg_supervisor').val();
	var distManagerId=$('#tyre_reg_distmanagerID').val();
	if(tyreRemarksId==null||tyreRemarksId==''){
		tyreRemarksId='0';
	}
	if(supervisorId==null||supervisorId==''){
		supervisorId=0;
	}
	if(distManagerId==null||distManagerId==''){
		distManagerId=0;
	}
	if(otherDistrictManager==null||otherDistrictManager==''){
		otherDistrictManager=0;
	}
	if(remarksId==null||remarksId==''){
		remarksId=0;
	}
	
	var obj_Insert = {
		tm_vehicle_id : vehicle_id[0],
		tm_reg_number : vehicle_id[1],
		tm_districtid : loadistrict,
		tm_baselocation_id : loadBaseLocation,
		tm_remarks : remarksId,
		tm_other_district_manager : otherDistrictManager,
		tm_activity_id : activityid,
		tm_repot_time : reportdate,
		ti_created_by_id : createdbyid,
		ti_created_by_roleid : createdbyroleid,
		tm_status_id : statusid,
		tm_shift_id : shiftTypeId,
		ti_type_of_tyreid : loadTyresReg,
		ti_uid_no : uniqId,
		ti_tyre_model : typeModel,
		ti_start_odometer : preodometerReading,
		ti_end_odometer : currentOdoMeterReading,
		ti_remarks : tyreRemarksId,
	};
	if (loadistrict === "0") {
		showNotificationError("Select District", "tyre_reg_districtID", "error");
		return;
	} else if (loadBaseLocation === "0") {
		showNotificationError("Select Base Location", "tyre_reg_baseLocID",
				"error");
		return;
	} else if (ambulance_reg_number === "0") {
		showNotificationError("Select Ambulances", "tyre_reg_ambulanceID",
				"error");
		return;
	} else if (shiftTypeId === "0") {
		showNotificationError("Select Shift Type", "reg_tyre_shiftId", "error");
		return;
	} else if (loadTyresReg === "0") {
		showNotificationError("Select Tyre", "reg_tyre_id", "error");
		return;
	} else if (uniqId === "0" || uniqId === "") {
		showNotificationError("Select UniqNO", "tyre_reg_uniqID", "error");
		return;
	} else if (uniqId.length > 20) {
		showNotificationError("UniqId Must Be Below 20", "tyre_reg_uniqID",
				"error");
		return;
	} else if (typeModel === "0" || typeModel === "") {
		showNotificationError("Enter Type Model", "tyre_reg_typeModelID",
				"error");
		return;
	}
	else if (previousOdometerReading === "0" || previousOdometerReading === "") {
		showNotificationError("Enter Previous Odo-Meter Reading",
				"reg_preodometer", "error");
		return;
	}
	else if (currentOdoMeterReading === "0" || currentOdoMeterReading === "") {
		showNotificationError("Enter Current Odo-Meter Reading",
				"tyre_reg_currOdoMeterID", "error");
		return;
	} else if (parseInt(currentOdoMeterReading) < parseInt(preodometerReading)) {
		showNotificationError(
				"Current Odo-Meter Reading Must Be Greater Or Equal To Preodometer",
				"tyre_reg_currOdoMeterID", "error");
		return;
	} else if (reportdate === '' || reportdate === "") {
		showNotificationError("Select Report Date", "report_date_reg",
				"error");
		return;
	} /*else if (!isNaN(otherDistrictManager)) {
		showNotificationError("Name Must Be Characters",
				"tyre_reg_other_distManagerID", "error");
		return;
	}*/
	console.log('==== Obj_Insert' + JSON.stringify(obj_Insert));
	var strUrl = Service.insertTyreManagementANDInfoDetails;
	console.log('==== strUrl' + strUrl);
	$.ajax({
		type : "POST",
		url : strUrl,
		dataType : "json",
		data : JSON.stringify(obj_Insert),
		contentType : "application/json",
		async : false,
		crossDomain : true,
		// headers: {
		// "X-TENANT-ID":"tenantId1"
		// }
		success : function(data) {
			$('#ticket_id').val(data.output);
			get_ohd_mail_directory();
			if (data !== null || data !== 0) {
				showNotificationError("Inserted Successfully",
						"tyre_registration_id", "success");
			    window.setTimeout(function() {
	                location.reload();
	            }, 3000);
			}
		},
		error : function() {
			console.log("Error In case_ReOpen Not Inserted");
		}
	});
}

/*
 * @DESC : Search Tyre Details @AuthorName : Habiboon Patan @DATE : 11-06-2019
 */

function search() {
	$('#driverTable').html("");
	try {
		var districtId = document.getElementById('tyre_district_Id').value;
		var baselocation = document.getElementById('tyre_baseLocation_Id').value;
		var ambulanceId = document.getElementById('tyre_ambulance_Id').value;
		var tyreid = document.getElementById('tyreId').value;
		var ticketid = document.getElementById('tyre_ticketId').value;
		var fromdate = document.getElementById('tyre_fromDataID').value;
		var todate = document.getElementById('tyre_toDateID').value;
		if(districtId=="0"){
			districtId=0;
		}
		if(baselocation=="0"){
			baselocation=0;
		}
		if(ambulanceId=="0"){
			ambulanceId=0;
		}
		if (ticketid === null | ticketid === '') {
			ticketid = 0;
		}
		if (fromdate === null | fromdate === '') {
			fromdate = 0;
		}
		if (todate === null | todate === '') {
			todate = 0;
		}

		 if (districtId==0 &&baselocation==0 &&ambulanceId==0 &&ticketid==0&&fromdate==0&&todate==0){   
	          	showNotificationError("Please Select At Least One Search Parameter", "search_id", "error");
	          	//$.toaster({ priority : 'warning', title : 'fgdfg', message : 'plzzz selsdfgsdgf'});
	          	return true;
	          }
		
		var obj_Insert = {
			tm_districtid : districtId,
			tm_baselocation_id : baselocation,
			tm_reg_number : ambulanceId,
			ti_type_of_tyreid : tyreid,
			fromdate : fromdate,
			todate : todate,
			tm_tyreccondtion_number : ticketid,
		};
		var strUrl = Service.getSearchForTypeOfTyre;
		console.log("strUrl : " + strUrl);
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
				if (200 !== responsecode || data.status === "NO_DATA_FOUND") {
					var divTag = document.createElement("h2");
					$(divTag).css("text-align", "center");
					$(divTag).html("No data available....");
					$('#driverTable').append(divTag);
				}

				else {
					var jsonArray = data.tyreLifeControllerDTOs;
					if (jsonArray.length > 0) {
						gettingTyreSearchList(jsonArray);
						loadDataTable();

					}
				}
			},
			error : function(err) {
				console.error('update Stock error: ' + JSON.stringify(err));
			}
		});
	} catch (err) {
		console.error("error occur in search()" + JSON.stringify(err))
	}
}
function gettingTyreSearchList(strData) {

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

	var objTHead3 = document.createElement('th');
	$(objTHead3).html('Ticket Id');
	$(objTr).append(objTHead3);

	var objTHead4 = document.createElement('th');
	$(objTHead4).html('District');
	$(objTr).append(objTHead4);

	var objTHead5 = document.createElement('th');
	$(objTHead5).html('Base Location');
	$(objTr).append(objTHead5);

	var objTHead6 = document.createElement('th');
	$(objTHead6).html('Ambulance No');
	$(objTr).append(objTHead6);

	var objTHead7 = document.createElement('th');
	$(objTHead7).html('Reported Road Date');
	$(objTr).append(objTHead7);

	var objTHead8 = document.createElement('th');
	$(objTHead8).html('Type of Tyre');
	$(objTr).append(objTHead8);

	var objTHead9 = document.createElement('th');
	$(objTHead9).html('UID No');
	$(objTr).append(objTHead9);

	var objTHead10 = document.createElement('th');
	$(objTHead10).html('Start Odo Meter Readings');
	$(objTr).append(objTHead10);

	var objTHead11 = document.createElement('th');
	$(objTHead11).html('Current Odo Meter Readings');
	$(objTr).append(objTHead11);

/*	var objTHead12 = document.createElement('th');
	$(objTHead12).html('Pilot Name');
	$(objTr).append(objTHead12);

	var objTHead13 = document.createElement('th');
	$(objTHead13).html('EMT Name');
	$(objTr).append(objTHead13);

	var objTHead14 = document.createElement('th');
	$(objTHead14).html('Supervisor Name');
	$(objTr).append(objTHead14);

	var objTHead15 = document.createElement('th');
	$(objTHead15).html('District Manager Name');*/
	
	//$(objTr).append(objTHead15);
	var objTHead16 = document.createElement('th');
	$(objTHead16).html('Status');
	$(objTr).append(objTHead16);

	var objTHead17 = document.createElement('th');
	$(objTHead17).html('Update');
	$(objTr).append(objTHead17);

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
		$(tblCol1).html(strData[i].tm_tyreccondtion_number);

		$(tbleRow).append(tblCol1);

		var tblCol2 = document.createElement('td');
		$(tblCol2).addClass('text-center');

		$(tblCol2).html(strData[i].districtName);
		$(tbleRow).append(tblCol2);

		var tblCol3 = document.createElement('td');
		$(tblCol3).addClass('text-center');

		$(tblCol3).html(strData[i].baselocName);
		$(tbleRow).append(tblCol3);

		var tblCol4 = document.createElement('td');
		$(tblCol4).addClass('text-center');
		$(tblCol4).html(strData[i].tm_reg_number);
		$(tbleRow).append(tblCol4);

		var tblCol5 = document.createElement('td');
		$(tblCol5).addClass('text-center');
		$(tblCol5).html(strData[i].tm_repot_time);
		$(tbleRow).append(tblCol5);

		var tblCol6 = document.createElement('td');
		$(tblCol6).addClass('text-center');
		$(tblCol6).html(strData[i].tt_tyre_type);
		$(tbleRow).append(tblCol6);

		var tblCol7 = document.createElement('td');
		$(tblCol7).addClass('text-center');
		$(tblCol7).html(strData[i].ti_uid_no);
		$(tbleRow).append(tblCol7);

		var tblCol8 = document.createElement('td');
		$(tblCol8).addClass('text-center');
		$(tblCol8).html(strData[i].ti_start_odometer);
		$(tbleRow).append(tblCol8);

		var tblCol9 = document.createElement('td');
		$(tblCol9).addClass('text-center');
		$(tblCol9).html(strData[i].ti_end_odometer);
		$(tbleRow).append(tblCol9);

		/*var tblCol10 = document.createElement('td');
		$(tblCol10).addClass('text-center');
		var pilotId = strData[i].tm_pilot_name;
		if (pilotId === undefined) {
			$(tblCol10).html('NA');
		} else {
			$(tblCol10).html(strData[i].tm_pilot_name);
		}
		$(tbleRow).append(tblCol10);

		var tblCol11 = document.createElement('td');
		$(tblCol11).addClass('text-center');
		var emsoName = strData[i].tm_emso_name;
		if (emsoName === undefined) {
			$(tblCol11).html('NA');
		} else {
			$(tblCol11).html(strData[i].tm_emso_name);
		}
		$(tbleRow).append(tblCol11);

		var tblCol12 = document.createElement('td');
		$(tblCol12).addClass('text-center');
		var supervisorName = strData[i].supervisorid;
		if (supervisorName === undefined) {
			$(tblCol12).html('NA');
		} else {
			$(tblCol12).html(strData[i].tm_supervior_id);
		}
		$(tbleRow).append(tblCol12);

		var tblCol13 = document.createElement('td');
		$(tblCol13).addClass('text-center');
		var distmanger = strData[i].tm_distmanager_id;
		if (distmanger === undefined) {
			$(tblCol13).html('NA');
		} else {
			$(tblCol13).html(strData[i].tm_distmanager_id);
		}

		$(tbleRow).append(tblCol13);
*/
		var tblCol14 = document.createElement('td');
		$(tblCol14).addClass('text-center');
		$(tblCol14).html(strData[i].tm_status_id);
		$(tbleRow).append(tblCol14);

		var tablcol11 = document.createElement("td");

		var buttonTag = document.createElement('button');
		var text = document.createTextNode("Update");
		buttonTag.appendChild(text);
		$(buttonTag).addClass('btn btn-primary btn-sm');
		$(buttonTag).attr(
				'onclick',
				'get_RowData("' + strData[i].tm_tyreccondtion_number + '","'
						+ strData[i].districtName + '","'
						+ strData[i].baselocName + '","'
						+ strData[i].tm_reg_number + '","'
						+ strData[i].ti_start_odometer + '","'
						+ strData[i].ti_uid_no + '","'
						+ strData[i].tm_repot_time + '","'
						+ strData[i].tt_tyre_type + '","'
						+ strData[i].tm_shift_id + '")');
		$(tablcol11).append(buttonTag);
		$(tablcol11).css('height', '36px');

		var tblCol15 = document.createElement('td');
		$(tblCol15).addClass('text-center');
		$(tblCol15).html(strData[i].tm_status_id);

		if (strData[i].tm_status_id === "Closed") {
			$(tbleRow).append(tblCol15);
		} else {
			$(tbleRow).append(tablcol11);
		}

		$(objTBody).append(tbleRow);
	}
	$("#driverTable").append(objDivTag);
}

function get_RowData(tm_tyreccondtion_number, districtName, baselocName,
		tm_reg_number, ti_start_odometer, ti_uid_no, tm_repot_time,
		tt_tyre_type, tm_shift_id) {
	$('#tyreConditionID').val(tm_tyreccondtion_number);
	$('#UpdateModal').modal('show');
	$('#tyre_up_districtID').val(districtName);
	$('#tyre_up_baseLocID').val(baselocName);
	$('#tyre_up_ambulanceID').val(tm_reg_number);
	$('#up_preodometer').val(ti_start_odometer);
	$('#tyre_up_uniqID').val(ti_uid_no);
	$('#tyre_up_reportTimeId').val(tm_repot_time);
	$('#up_tyre_id').val(tt_tyre_type);
	$('#up_tyre_shiftId').val(tm_shift_id);
}
function loadDataTable() {
	$('.dataTables-example').DataTable(
			{
				"aLengthMenu" : [ [ 5, 10, 15, 25, 50, 75, -1 ],
						[ 5, 10, 15, 25, 50, 75, "All" ] ],
				"iDisplayLength" : 10,
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

/*
 * @DESC : Updating TyreDetails @AuthorName : Habiboon Patan @DATE : 11-06-2019
 */
function tyreUpdate() {
	var uprems = $('#tyre_up_remarksId').val();
	var odometer = $('#tyre_up_currOdoMeterID').val();
	var statusId = 2;
	var tyreConditionID = $('#tyreConditionID').val();
	var preodo = $('#up_preodometer').val();
	
	if(uprems==null||uprems==""||uprems==''){
		uprems=' ';
	}
	
	if (odometer === "0" || odometer === "") {
		showNotificationError("Enter Current Odo-Meter",
				"tyre_up_currOdoMeterID", "error");
		return;
	} else if (parseInt(odometer) < parseInt(preodo)) {
		showNotificationError(
				"Current Odo-Meter Should Be Greater Than Previous Odo-Meter Reading",
				"tyre_up_currOdoMeterID", "error");
		return;
	}
	/*if (uprems === "0" || uprems === "") {
		showNotificationError("Enter Remarks", "tyre_up_remarksId", "error");
		return;
	}*/
	var objUpd = {
		ti_end_odometer : odometer,
		tm_update_remarks : uprems,
		tm_status_id : statusId,
		tm_tyreccondtion_number : tyreConditionID
	}
	var strUrl2 = Service.updateTyreInfo;
	console.log('==== strUrl' + strUrl2);
	$.ajax({
		type : "POST",
		url : strUrl2,
		dataType : "json",
		data : JSON.stringify(objUpd),
		contentType : "application/json",
		async : false,
		crossDomain : true,
		success : function(data) {
			if (data !== null || data !== 0) {
				showNotificationError("Updated Successfully", "tyre_update_id",
						"success");
			}
		},
		error : function() {
			console.log("Error In case_ReOpen Not updating");
		}
	});
}



function isNumberKey(evt)
{
	var charCode = (evt.which) ? evt.which : evt.keyCode;
	if (charCode != 46 && charCode > 31 
	&& (charCode < 48 || charCode > 57))
	return false;
	return true;
}  
/*
 * @DESC : Notification purpose @AuthorName : Habiboon Patan @DATE : 10-06-2019
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

function resetSearch(){
	$('#tyre_district_Id').val('0').trigger("chosen:updated");
	$('#tyre_baseLocation_Id').val('0').trigger("chosen:updated");
	$('#tyre_ambulance_Id').val('0').trigger("chosen:updated");
	$('#tyreId').val('0').trigger("chosen:updated");
	$('#tyre_ticketId').val('');
	$('#tyre_fromDataID').val('');
	$('#tyre_toDateID').val('');
	baseLocation_search(0);
	getAmbulance_tyre(0);
	$('#driverTable').empty();
}

function resetInsert(){
	$('#tyre_reg_districtID').val('0').trigger("chosen:updated");
	$('#tyre_reg_baseLocID').val('0').trigger("chosen:updated");
	$('#tyre_reg_ambulanceID').val('0').trigger("chosen:updated");
	$('#reg_tyre_shiftId').val('0').trigger("chosen:updated");
	$('#reg_tyre_id').val('0').trigger("chosen:updated");
	$('#tyre_reg_uniqID').val('');
	$('#tyre_reg_typeModelID').val('');
	$('#reg_preodometer').val('');
	$('#tyre_reg_currOdoMeterID').val('');
	$('#report_date_reg').val('');
	$('#tyre_reg_tyreRemarksID').val('');
	$('#tyre_reg_remarksId').val();
	$('#reg_preodometer').val('');
	$('#tyre_reg_supervisor').val('');
	$('#tyre_reg_distmanagerID').val('');
	$('#tyre_reg_other_distManagerID').val('');
	$('#tyre_reg_remarksId').val('');
	getAmbulance_tyre_reg(0);
	baseLocation_reg(0);
}

$(document).ready(function () {
    $('#endDate').datepicker({
      //  format: 'mm-dd-yyyy',
        format: 'yyyy-mm-dd',
        autoclose:true,
        todayHighlight: true,
        changeMonth: true,
        changeYear: true,
        endDate: "today",

    }).on('changeDate', function (ev) {
            $(this).datepicker('hide');
        });

    $('#endDate').keyup(function () {
        if (this.value.match(/[^0-9]/g)) {
            this.value = this.value.replace(/[^0-9^-]/g, '');
        }
    });
});//strtDate

$(document).ready(function () {
    $('#strtDate').datepicker({
      //  format: 'mm-dd-yyyy',
        format: 'yyyy-mm-dd',
        autoclose:true,
        todayHighlight: true,
        changeMonth: true,
        changeYear: true,
        endDate: "today",

    }).on('changeDate', function (ev) {
            $(this).datepicker('hide');
        });

    $('#strtDate').keyup(function () {
        if (this.value.match(/[^0-9]/g)) {
            this.value = this.value.replace(/[^0-9^-]/g, '');
        }
    });
});//


//here getting mail and mobile no. to send mail
function get_ohd_mail_directory(){
  //distId baselocId ambulance_no reported_date ticket_id
	var amb_number=$('#ambNo').val();
	var ticket_id=$('#ticket_id').val();//hiddenId
	var distid=$('#distId').val();
	var baselocId=$('#baselocId').val();
	
	alert("====amb_number====="+amb_number);
	var reported_date=$('#reportedDate').val();
	var emsoId=$('#emsoid').val();
	var pilot=$('#pilotid').val();
	var message="AP opdesk Tkt ID:"+ticket_id+",Dist:"+distid+",BL:" +baselocId+",A.No:" +amb_number+",Category:Statutory Complaince:"+reported_date+" ERS";	
	var re_marks=$('#remarks').val();
	var odometerId=$('#endOdometerNo').val();
	var start_dateTime=$('#start_date_time').val();

	var emailtext;
	//alert("remarks4535====>"+remarks);
	
var emailtext =	'<html><head><title>Tyre Life</title><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">';

emailtext=emailtext+' <style>.container{width: 650px;margin:0px auto;padding:20px;}body{padding: 50px;}.gray-bg{background:#f6f6f6;}.white-bg{background:#fff;}';

emailtext=emailtext+' table, th, td { border: 1px solid black; border-collapse: collapse; } table{width:100%;  }th, td { padding: 5px; color: black;text-align:center; font-size: 14px;}.fw-600{font-weight:600;}';        

emailtext=emailtext+'.maintext{background-color: #1f74bd;color: white; height: 50px;font-weight: 800; text-align: center;  font-size: 18px;}.text2{background-color:  #f5f5f5;}.text-light-gray{margin-left: 930px; }</style> </head>'; 

emailtext=emailtext+'<body class="gray-bg"><div class="container white-bg"><h4> Dear All</h4><p>The Following are the activity Details of Operational Helpdesk</p><table ><tr><th colspan="2" class="maintext">Issue Type:Tyre Life</th></tr> <tr><td >Reason</td> <td>'+re_marks+'</td> ';

emailtext=emailtext+'</tr> <tr><td class="text2">Base Location</td><td class="text2">'+baselocId+'</td></tr><tr><td>Ambulance Register No:</td> <td>'+amb_number+'</td>' ;   

emailtext=emailtext+'</tr><tr><td>Escalateed To:</td><td>Fleet Manager</td>';

emailtext=emailtext+'</tr><tr><td class="text2">District:</td><td class="text2">'+distid+'</td></tr><tr><td>EMT No:</td><td class="text2"></td>';

emailtext=emailtext+'</tr><tr><td class="text2">PILOT No:</td><td class="text2"></td>';

emailtext=emailtext+'</tr><tr><td>Status:</td><td>Open</td></tr><tr><td >Date:</td><td class="text2">'+reported_date+'</td>';

emailtext=emailtext+'</tr></table><br><br><div><span class="text-green">Thanks and Regards,<br><span class="text-purple">AP ERS Team.</span></div></div>';                     

emailtext=emailtext+'<div class="text-center "> <p><span class="text-light-gray">Powered by</span> <a href="http://www.procreate.co.in/" target="_blank" class="text-purple">ProCreate Techno Systems Pvt Ltd.</a></p></div></body></html>';                                                                       	
console.log("====>"+message);
  var strUrl = Service.get_ohd_mail_directory+"/"+distid;
  console.log("get_ohd_mail_directory url====>:" + strUrl);
  $.ajax({
      type: 'GET',
      url: strUrl,
      dataType: 'json',
      async: false,
      success: function (data) {
          var responsecode = data.responseCode;
          if (600== responsecode) {
              alert("No Data Found");          
           }else if(600!== responsecode) {
              var jsonArray = data.mailAndSmsControllerDTO;
              $.each(jsonArray, function (i, resData) {
              	insertHmSmsOutboxTreans(resData.sm_contact_num1,message);
              	var email=resData.sm_email_id;
              	insertHmEmailOutboxTreans(resData.sm_email_id,emailtext,ticket_id)
              


              });
          }
      },
      error: function (err) {
          console.error("Error in fuel_card_number" + JSON.stringify(err));
      }
  });
}
;

//inserting sms here
function insertHmSmsOutboxTreans(contactno,message){
	alert("========insertHmSmsOutboxTreans========");
	var contactnolength=$('#contact_no_length').val();
	var contact_no=contactno;
	var message=message;
	var from_mobile=0;
	var no_of_attempts=0;
	var statusId=1;
		
	   var createdyid=localStorage.getItem("userID");
		var createdbymodelid=localStorage.getItem("opdesk_moduleID");
		var createdbtroleid=localStorage.getItem("opdesk_roleID");
	 var objJson={
			"so_message":message,
			"so_tomobile_no":contact_no,
			"so_from_mobile_no":from_mobile,
			"so_no_of_attempts":no_of_attempts,
			"so_status_id":statusId,
			"so_createdbyid":createdyid,
			"createdbymoduleid":createdbymodelid,
			"createdbyroleid":createdbtroleid
		    };
		    var strUrl = Service.insertHmSmsOutboxTreans;
		    console.log("Input is:::::::" + JSON.stringify(objJson));
		    $.ajax({
		        type: "POST",
		        url: strUrl,
		        dataType: "json",
		        data: JSON.stringify(objJson),
		        contentType: "application/json",
		        async: false,
		        crossDomain: true,
		        success: function (data) {
		            //var responsecode = data.responseCode;
		          //  if (200 !== responsecode) {
		           //     alert("Not Inserted ");
		           // } else {
                   alert("SMS Sent Sucessfully ")
                  
		            //}

		        }, error: function () {
		            console.log('In Error of  Details ');
		        }
		    });
		}

//inserting email here
function insertHmEmailOutboxTreans(to_mail,emailtext,ticket_id){
	alert("========insertHmEmailOutboxTreans========");
	  var createdyid=localStorage.getItem("userID");
		var createdbymodelid=localStorage.getItem("opdesk_moduleID");
		var createdbtroleid=localStorage.getItem("opdesk_roleID");
	var subject="AP ERS-Tyre Life with Ticket Id:"+ticket_id
	 var objJson={		
				"inboxqueueid":0,
				"replyuser":0,
				"toemailid":to_mail,
				"subject":subject,
				"replybody":emailtext,
				"actionid":1,
				"templateid":1,
			  	"so_createdbyid":createdyid,
				"createdbymoduleid":createdbymodelid,
				"createdbyroleid":createdbtroleid
		    };
		    var strUrl = Service.insertHmEmailOutboxTreansPrev;
		    console.log("Input is:::::::" + JSON.stringify(objJson));
		    $.ajax({
		        type: "POST",
		        url: strUrl,
		        dataType: "json",
		        data: JSON.stringify(objJson),
		        contentType: "application/json",
		        async: false,
		        crossDomain: true,
		        success: function (data) {
		            var responsecode = data.responseCode;
		          //  if (200 !== responsecode) {
		               alert(" Mail Sent Sucessfully");
		         //   } else {
		            	// showNotificationError("Sms And Mail Sent Sucessfully", "fuel_registration_id", "success");
		         //   }

		        }, error: function () {
		            console.log('In Error of  Details ');
		        }
		    });
		}



$(document).ready(function() {
    get_Zone();
    get_Department();
});

$('#EAO_ZoneId').on('change', function() {
	var zone_id = $('#EAO_ZoneId').val();
	$('#EAO_BaselocatioId').empty();
	get_Baselocation(zone_id);
});

$('#EAO_BaselocatioId').on('change', function() {
	var locid = $('#EAO_BaselocatioId').val();
	$('#EAO_VehicleId').empty();
	get_Vehicle(locid);
});



function  get_Baselocation(locid) {
   $('#EAO_BaselocatioId').val();
    var json_Employee_Details = {
    		 "location_id":locid
        };
     // var strUrl = 'http://localhost:9160/wfms/ManageResourceController/getBaseLocationsDropDown';
        var strUrl = Service.Get_BaseLocation_DropDown;
        $.ajax({
            type: "POST",
            url: strUrl,
            dataType: "json",
            data: JSON.stringify(json_Employee_Details),
            contentType: "application/json",
            async: false,
            crossDomain: true,
            headers: {
                "X-TENANT-ID": "PROCREATE"
            },
            success: function(data) {
            var responsecode = data.responseCode;
            if (200 !== responsecode) {
              //  alert("No Data Found");
            } else {
                var jsonArray = data.objResourceProfilesControllerDTO;
                var selectfirst = "<option value='0'>Select Baselocation</option>";
                $('#EAO_BaselocatioId').append(selectfirst);
                $.each(jsonArray, function(i, resData) {
                    var ShiftPattern = "<option value=" + resData.location_id + ">" + resData.location_name + "</option>";
                    $(ShiftPattern).appendTo('#EAO_BaselocatioId');
                });
            }
        },
        error: function(err) {
            console.error("Error in zoneid" + JSON.stringify(err));
        }
    });
        $('#EAO_BaselocatioId').trigger("chosen:updated");
    	$('#EAO_BaselocatioId').chosen();
}


function  get_Department() {
    var strUrl = Service.getDepartment;
    $.ajax({
        type: 'GET',
        url: strUrl,
        dataType: 'json',
        async: false,
        headers: {
            "X-TENANT-ID": "PROCREATE"
        },
        success: function(data) {
            var responsecode = data.responseCode;
            if (200 !== responsecode) {
               // alert("No Data Found");
            } else {
                var jsonArray = data.objSheduledOfFieldOperatorsControllerDTO;
                var selectfirst = "<option value='0'>Select Department</option>";
                $('#EAO_department_Id').append(selectfirst);
                $.each(jsonArray, function(i, resData) {
                    var ShiftPattern = "<option value=" + resData.module_id + ">" + resData.module_Name + "</option>";
                    $(ShiftPattern).appendTo('#EAO_department_Id');
                });
            }
        },
        error: function(err) {
            console.error("Error in zoneid" + JSON.stringify(err));
        }
    });
}


function  get_Zone() {
	$('#EAO_ZoneId').empty();
   // var strUrl = 'http://localhost:9160/wfms/ManageResourceController/getusersZonesDropDowns';
    var strUrl=Service.GetZones_DropDown;
    $.ajax({
        type: 'GET',
        url: strUrl,
        dataType: 'json',
        async: false,
        headers: {
            "X-TENANT-ID": "PROCREATE"
        },
        success: function(data) {
            var responsecode = data.responseCode;
            if (200 !== responsecode) {
               // alert("No Data Found");
            } else {
                var jsonArray = data.objSheduledOfFieldOperatorsControllerDTO;
                var selectfirst = "<option value='0'>Select Shift Zone</option>";
                $('#EAO_ZoneId').append(selectfirst);
                $.each(jsonArray, function(i, resData) {
                    var ShiftPattern = "<option value=" + resData.location_id + ">" + resData.location_name + "</option>";
                    $(ShiftPattern).appendTo('#EAO_ZoneId');
                });
            }
        },
        error: function(err) {
            console.error("Error in zoneid" + JSON.stringify(err));
        }
    });
}



function  get_Vehicle(locid) {
   $('#EAO_VehicleId').val();
    var json_Employee_Details = {
    		 "location_id":locid
        };
    //  var strUrl = 'http://localhost:9160/wfms/ManageResourceController/getVehiclesDropDown';
        var strUrl = Service.getVehiclesDropDown;
        $.ajax({
            type: "POST",
            url: strUrl,
            dataType: "json",
            data: JSON.stringify(json_Employee_Details),
            contentType: "application/json",
            async: false,
            crossDomain: true,
            headers: {
                "X-TENANT-ID": "PROCREATE"
            },
            success: function(data) {
            var responsecode = data.responseCode;
            if (200 !== responsecode) {
              //  alert("No Data Found");
            } else {
                var jsonArray = data.objResourceProfilesControllerDTO;
                var selectfirst = "<option value='0'>Select Vehicle</option>";
                $('#EAO_BaselocatioId').append(selectfirst);
                $.each(jsonArray, function(i, resData) {
                    var ShiftPattern = "<option value=" + resData.vehicle_id + ">" + resData.vehicle_name + "</option>";
                    $(ShiftPattern).appendTo('#EAO_VehicleId');
                });
            }
        },
        error: function(err) {
            console.error("Error in zoneid" + JSON.stringify(err));
        }
    });
        $('#EAO_VehicleId').trigger("chosen:updated");
    	$('#EAO_VehicleId').chosen();
}


function resetEmployeeAvailability(){
	$('#EAO_ZoneId').val("0").trigger("chosen:updated");
	$('#EAO_department_Id').val("0").trigger("chosen:updated");
	$('#EAO_BaselocatioId').val("0").trigger("chosen:updated");
	$('#EAO_VehicleId').val("0").trigger("chosen:updated");
}

//
function  getEmployeeAvaiability(){
	$('#EA_OperatorsId').empty();
	var moduleid=$('#EAO_department_Id').val();	
	if(moduleid=="0"){
    showNotificationError('Please Select Department', 'EAO_department_Id', 'error');
    return false;
	}
	var zoneid=$('#EAO_ZoneId').val();
	var baselocid=$('#EAO_BaselocatioId').val();
	var vehicleid=$('#EAO_VehicleId').val();
	 var json_Employee_Details = {
			 "moduleid":moduleid,
             "status":true,
 
        };
	// var strUrl='http://localhost:9160/wfms/ManageResourceController/getEmployeeAvailbilityOperators'
	 var strUrl=Service.getEmployeeAvailbilityOperators;
	    $.ajax({
	    	    type: "POST",
	            url: strUrl,
	            dataType: "json",
	            data: JSON.stringify(json_Employee_Details),
	            contentType: "application/json",
	            async: false,
	            crossDomain: true,
	        headers: {
	            "X-TENANT-ID": "PROCREATE"
	        },
	        success: function(data) {
	            var responsecode = data.responseCode;
	            if (responsecode !== 200) {
	            	var divTag = document.createElement("h2");
					$(divTag).css("text-align", "center");
					$(divTag).html("No Data Available");
					$('#EA_OperatorsId').append(divTag);
	               // alert('NO DATA FOUND');
	            } else {            	
	                var jsonArray = data.objResourceProfilesControllerDTO;
	                getEmployeeAvailability_DOM(jsonArray);
	                loadDataTable();
	            }
	        },
	        error: function(err) {
	            console.error("Error in Get_ShiftPatterns_Operators_Details" + JSON.stringify(err));
	        }
	    });
}


//Load Data Table Function Here.
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


function getEmployeeAvailability_DOM(strData) {
	$('#EA_OperatorsId').empty();
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
		$(objTHead1).html('S.NO');
		$(objTr).append(objTHead1);
		// For table Heading2
		var objTHead2 = document.createElement('th');
		$(objTHead2).html('Baselocation');
		$(objTr).append(objTHead2);
		// For table Heading3
		var objTHead3 = document.createElement('th');
		$(objTHead3).html('Name Of Staff');
		$(objTr).append(objTHead3);
		// For table Heading4
		var objTHead4 = document.createElement('th');
		$(objTHead4).html('Flack ID');
		$(objTr).append(objTHead4);
		// For table Heading5
		var objTHead5 = document.createElement('th');
		$(objTHead5).html('Department');
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
			$(tablcol2).html(strData[i].location_basename);
			$(tbleRow).append(tablcol2);

			var tablcol3 = document.createElement("td");
			$(tablcol3).addClass('text-center');
			$(tablcol3).html(strData[i].user_name);
			$(tbleRow).append(tablcol3);

			var tablcol4 = document.createElement("td");
			$(tablcol4).addClass('text-center');
			$(tablcol4).html(strData[i].module_name);
			$(tbleRow).append(tablcol4);

			var tablcol5 = document.createElement("td");
			$(tablcol5).addClass('text-center');
			$(tablcol5).html(strData[i].module_name);
			$(tbleRow).append(tablcol5);
		    $(objTBody).append(tbleRow);
			
		}
		$("#EA_OperatorsId").append(objDivTag);

	} catch (err) {
		console.log("EA_OperatorsId" + err);
	}
}


function showNotificationError(msg, id, msgType) {
    var boxId = '#' + id;
    var options = {
        // whether to hide the notification on click
        clickToHide: true,
        // whether to auto-hide the notification
        autoHide: true,
        // if autoHide, hide after milliseconds
        autoHideDelay: 2000,
        // show the arrow pointing at the element
        arrowShow: true,
        // arrow size in pixels
        arrowSize: 5,
        // position defines the notification position though uses the defaults below
        position: 'top',
        // default positions
        elementPosition: 'top right',
        globalPosition: 'top right',
        // default style
        style: 'bootstrap',
        // default class (string or [string])
        className: msgType,
        // show animation
        showAnimation: 'slideDown',
        // show animation duration
        showDuration: 400,
        // hide animation
        hideAnimation: 'slideUp',
        // hide animation duration
        hideDuration: 200,
        // padding between element and notification
        gap: 2
    };
    $(boxId).notify(msg, options);
}

/**
 * @date:17/1/2020
 * @author:Bhuneshwar Patel
 */

//on load page function calling
$(document).ready(function () {
    try {
    	getDistrictForUpdate(1);
    	getAssignedVehicleDetails()
    }
    catch (err) {
        console.log("errror in loading ready funtion" + err);
    }
});

/**
 * @url:assignDistrictToVehicle
 * @returns:
 */
 function assignDistrictToVehicle(){
    	//alert("hi--->"+$('#unassign_vehicleId').val())
    	var district_id=$('#districtid').val();
    	var unassignvehicleId=$('#unassign_vehicleId').val();
    	
    	if(district_id=="0"||district_id=='0'){
    		  showNotificationError("Please Select District", "districtid", "error");
    		return;
    	}
    	 if(unassignvehicleId==null){
    		  showNotificationError("Please Select Vehicle", "unassign_vehicleId", "error");
    		return;
    	}
    	 
    	var vehicle = unassignvehicleId.toString();
    	//alert("DistrictId---->"+district_id);
    	//alert("vehicleId------>"+unassignvehicleId.length())  	
    	var objson={
    				  "vehicleId":vehicle,
    				  "districtId":district_id,
    				  "createdbyId":1,
    				  "createdbymodId":1,
    				  "createdbyroleId":1	
    	};
     	
    	console.log("ObJson---->" + JSON.stringify(objson));
    	var strUrl = Service.insertVehicleToDistrictMapping;
    		
    	$.ajax({
    		type : 'POST',
    		url : strUrl,
    		data : JSON.stringify(objson),
    		dataType : 'json',
    		contentType : "application/json",
    		async : false,
    		crossDomain : true,
    		success : function(data) {
    			//alert("Successfully Updated");
    			showNotificationError("Assigend Successfully", "assigned", "success");
    			getUnAssignDistrictToVehicle();
    			getAssignDistrictToVehicleData();
    			getAssignedVehicleDetails();
    		},
    		error : function() {
    			console.log('In Error of  Details ');
    		}
    	})
    }

//district dropdown function
 function getDistrictForUpdate(countryId) {
 //alert("getDistrictForUpdate function calling");
 	$('#districtid').empty();
 	 getDistrict(1);	
 	  var selectfirst = "<option value='0'>Please Select District</option>";
 	  $('#districtid').append(selectfirst);	 
 	 $.each(district, function(i, resData) {
 		var district = "<option value=" + resData.districtId + ">"
 				+ resData.districtName + "</option>";
 		// alert("resData.districtId"+resData.districtId);
 		$(district).appendTo('#districtid');
 	});
 	$('#districtid').trigger("chosen:updated");
 	$('#districtid').chosen();
 };
 


function getUnAssignDistrictToVehicle() {
	//alert("getUnAssignDistrictToVehicle");
	$('#unassign_vehicleId').empty();
	// $('#employeeTypeUpdate').empty();
	var strUrl = Service.districtToVehicleNotMapping;
	$.ajax({
		type : 'GET',
		url : strUrl,
		dataType : 'json',
		async : false,
		/*
		 * headers: { "X-TENANT-ID": "tenantId2" },
		 */
		success : function(data) {
			var responsecode = data.responseCode;
			if (200 !== responsecode) {
				alert("No Data Found");
			} else {
				var jsonArray = data.vehicleToDistrictMappingControllerDTOs;
				var selectfirst = "<option value='0'>Please Select Vehicle</option>";
				$('#unassign_vehicleId').append(selectfirst);
				$.each(jsonArray, function(i, resData) {
					var vehicle = "<option value=" + resData.vehicleId
							+ ">" + resData.vehicleName + "</option>";
					$(vehicle).appendTo('#unassign_vehicleId');

				});
			}
		},
		error : function(err) {
			console.error("Error in employee_type" + JSON.stringify(err));
		}
	});	
	//$('#unassign_vehicleId').trigger("chosen:updated");
 	//$('#unassign_vehicleId').chosen();
}


//unassign vehiclelist loading here
function getUnAssignVehicleList() {
	$('#unassigned_vehicle').empty();
	var strUrl = Service.districtToVehicleNotMapping;
	$.ajax({
		type : 'GET',
		url : strUrl,
		dataType : 'json',
		async : false,
		success : function(data) {
			  var responseCode = data.responseCode;
              $('#unassigned_vehicle').empty();
              if (200 !== responseCode || data.status === "NO_DATA_FOUND") {
                  var divTag = document.createElement("h2");
                  $(divTag).css("text-align", "center");
                  $(divTag).html("No data available....");
                  $('#unassigned_vehicle').append(divTag);

              } else {
                  var jsonArray = data.vehicleToDistrictMappingControllerDTOs;
                  if (jsonArray.length > 0) {
                	  getUnAssignVehicleList_DOM(jsonArray);
                      loadDataTable1();
                  }
              }
		}
	
	});	

}

	function getUnAssignVehicleList_DOM(strData) {
	    try {
	        //For Div Tag
	        var objDivTag = document.createElement('div');
	        $(objDivTag).addClass("table-responsive");

	//For table
	        var ObjTableTag = document.createElement("table");
	        $(ObjTableTag).addClass("table table-striped table-bordered table-hover dataTables-example1");
	        $(objDivTag).append(ObjTableTag);
	//For table head
	        var objTHead = document.createElement("thead");
	        $(ObjTableTag).append(objTHead);

	//For table row
	        var objTr = document.createElement("tr");
	        $(objTHead).append(objTr);

	//For table Heading1
	        var objTHead1 = document.createElement("th");
	        $(objTHead1).html('S.NO');
	        $(objTr).append(objTHead1);

	//For table Heading2
	        var objTHead2 = document.createElement('th');
	        $(objTHead2).html('UnAssigend Vehicle');
	        $(objTr).append(objTHead2);

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
	            $(tablcol2).html(strData[i].vehicleName);
	            $(tbleRow).append(tablcol2);
	            $(objTBody).append(tbleRow);
	        }
	        $("#unassigned_vehicle").append(objDivTag);

	    } catch (err) {
	        console.log("unassigned_vehicle" + err);
	    }
	}

function getAssignDistrictToVehicleData() {
	//alert("getUnAssignDistrictToVehicle");
	$('#assign_vehicleId').empty();
	// $('#employeeTypeUpdate').empty();
	var strUrl = Service.districtToVehicleMapping;
	$.ajax({
		type : 'GET',
		url : strUrl,
		dataType : 'json',
		async : false,
		/*
		 * headers: { "X-TENANT-ID": "tenantId2" },
		 */
		success : function(data) {
			var responsecode = data.responseCode;
			if (200 !== responsecode) {
				alert("No Data Found");
			} else {
				var jsonArray = data.vehicleToDistrictMappingControllerDTOs;
				var selectfirst = "<option value='0'>Please Select Vehicle</option>";
				$('#assign_vehicleId').append(selectfirst);
				$.each(jsonArray, function(i, resData) {
					var vehicle = "<option value=" + resData.vehicleId
							+ ">" + resData.vehicleName + "</option>";
					$(vehicle).appendTo('#assign_vehicleId');

				});
			}
		},
		error : function(err) {
			console.error("Error in employee_type" + JSON.stringify(err));
		}
	});
	//$('#assign_vehicleId').trigger("chosen:updated");
 	//$('#assign_vehicleId').chosen();
}

/*
 * For getServicePointRegistationDetails.
 * priyadarshini
 * 30-11-2019
 * inputs :no
 */
function getServicePointRegistationDetails() {
    $('#servicepointDataTable').empty();
    try {
        var strUrl = Service.getServicePointRegistationDetails;
        console.log("strUrl : " + strUrl);
        $.ajax({
            type: "GET",
            url: strUrl,
            dataType: "json",
            async: false,
            crossDomain: false,
            success: function (data) {
                console.log("data : " + data);
                var responseCode = data.responseCode;
                $('#servicepointDataTable').empty();
                if (200 !== responseCode || data.status === "NO_DATA_FOUND") {
                    var divTag = document.createElement("h2");
                    $(divTag).css("text-align", "center");
                    $(divTag).html("No data available....");
                    $('#servicepointDataTable').append(divTag);

                } else {
                    var jsonArray = data.objGetServicePointRegistrationDetailsControllerDTO;
                    if (jsonArray.length > 0) {
                        servicePointRegistation_DOM(jsonArray);
                        loadDataTable();
                    }
                }
            },
            error: function (err) {
                console.error('getServicePointRegistationDetails error: ' + JSON.stringify(err));
            }
        });
    }
    catch (err) {
        console.error("error occur in search()" + JSON.stringify(err));
    }
}
/*
 * For data table loading.
 * 30-11-2019
 * 
 */
function servicePointRegistation_DOM(strData) {
    try {
        //For Div Tag
        var objDivTag = document.createElement('div');
        $(objDivTag).addClass("table-responsive");

//For table
        var ObjTableTag = document.createElement("table");
        $(ObjTableTag).addClass("table table-striped table-bordered table-hover dataTables-example");
        $(objDivTag).append(ObjTableTag);
//For table head
        var objTHead = document.createElement("thead");
        $(ObjTableTag).append(objTHead);

//For table row
        var objTr = document.createElement("tr");
        $(objTHead).append(objTr);

//For table Heading1
        var objTHead1 = document.createElement("th");
        $(objTHead1).html('S.NO');
        $(objTr).append(objTHead1);

//For table Heading2
        var objTHead2 = document.createElement('th');
        $(objTHead2).html('District');
        $(objTr).append(objTHead2);


//For table Heading3
        var objTHead3 = document.createElement('th');
        $(objTHead3).html('Assigend Vehicle');
        $(objTr).append(objTHead3);
//For table Heading4
        var objTHead4 = document.createElement('th');
        $(objTHead4).html('Assigned Date');
        $(objTr).append(objTHead4);

        //For table Heading8
        var objTHead8 = document.createElement('th');
        $(objTHead8).html('Update');
        $(objTr).append(objTHead8);

        //For table Heading9
        var objTHead9 = document.createElement('th');
        $(objTHead9).html('Delete');
        $(objTr).append(objTHead9);

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
            $(tablcol2).html(strData[i].districtName);
            $(tbleRow).append(tablcol2);

            var tablcol3 = document.createElement("td");
            $(tablcol3).addClass('text-center');
            $(tablcol3).html(strData[i].mandalName);
            $(tbleRow).append(tablcol3);

            var tablcol4 = document.createElement("td");
            $(tablcol4).addClass('text-center');
            $(tablcol4).html(strData[i].cityName);
            $(tbleRow).append(tablcol4);

            var tablcol8 = document.createElement("td");
            $(tablcol8).addClass('text-center');
            $(tablcol8).append('<a href="#"><i  class="fa fa-edit" data-toggle="modal" data-target="#updateId"></i><i></a> ');
            $(tablcol8).attr('onclick', 'get_RowData("' + strData[i].servicepointName + '","' + strData[i].servicepointId + '","' + strData[i].districtId + '","' + strData[i].districtName + '","' + strData[i].cityId + '","' + strData[i].cityName + '","' + strData[i].mandalId + '","' + strData[i].mandalName + '","' + strData[i].latitude + '","' + strData[i].longitude + '")');


            var tablcol9 = document.createElement("td");
            $(tablcol9).addClass('text-center');
            $(tablcol9).append('<a href="#"><i class="fa fa-trash"></i><i></a> ');
            $(tablcol9).attr('onclick', 'deleteServicePointRegistationData("' + strData[i].servicepointId + '")');
            $(tablcol9).css('height', '5px');

            $(tbleRow).append(tablcol8);
            $(tbleRow).append(tablcol9);
            $(objTBody).append(tbleRow);
        }
        $("#servicepointDataTable1").append(objDivTag);

    } catch (err) {
        console.log("servicepointDataTable1" + err);
    }
}
var serialId;
function get_RowData(servicepointName, servicepointId, districtId, districtName, cityId, cityName, mandalId, mandalName, latitude, longitude) {
    getDistrictBasedonStateId('up_districtId');
    $("#up_districtId option:contains(" + districtName + ")").attr('selected', 'selected').trigger("chosen:updated");
    getMandalBasedonDistrictId(districtId, 'up_mandalId');
    $("#up_mandalId option:contains(" + mandalName + ")").attr('selected', 'selected').trigger("chosen:updated");
    getCityBasedonMandalId(mandalId, 'up_cityId');
    $("#up_cityId option:contains(" + cityName + ")").attr('selected', 'selected').trigger("chosen:updated");
    $('#up_servicePointNameId').val(servicepointName);
    $('#up_latitudeId').val(latitude);
    $('#up_longitudeId').val(longitude);
    serialId = servicepointId;

}

/*

 */
function getAssignedVehicleDetails() {
    $('#assigned_vehicle').empty();
    try {
    	var objson={
				  "districtId":null	 
	     };
        var strUrl = Service.getAssignedVehicleList;
        console.log("strUrl : " + strUrl);
        $.ajax({
        	type : 'POST',
    		url : strUrl,
    		data : JSON.stringify(objson),
    		dataType : 'json',
    		contentType : "application/json",
    		async : false,
    		crossDomain : true,
            success: function (data) {
                console.log("data : " + data);
                var responseCode = data.responseCode;
                $('#assigned_vehicle').empty();
                if (200 !== responseCode || data.status === "NO_DATA_FOUND") {
                    var divTag = document.createElement("h2");
                    $(divTag).css("text-align", "center");
                    $(divTag).html("No data available....");
                    $('#assigned_vehicle').append(divTag);

                } else {
                    var jsonArray = data.vehicleToDistrictMappingControllerDTOs;
                    if (jsonArray.length > 0) {
                    	getAssignedVehicleDetailsDom(jsonArray);
                        loadDataTable();
                    }
                }
            },
            error: function (err) {
                console.error('getServicePointRegistationDetails error: ' + JSON.stringify(err));
            }
        });
    }
    catch (err) {
        console.error("error occur in search()" + JSON.stringify(err));
    }
}


function getAssignedVehicleDetailsDom(strData) {
    try {
        //For Div Tag
        var objDivTag = document.createElement('div');
        $(objDivTag).addClass("table-responsive");

//For table
        var ObjTableTag = document.createElement("table");
        $(ObjTableTag).addClass("table table-striped table-bordered table-hover dataTables-example");
        $(objDivTag).append(ObjTableTag);
//For table head
        var objTHead = document.createElement("thead");
        $(ObjTableTag).append(objTHead);

//For table row
        var objTr = document.createElement("tr");
        $(objTHead).append(objTr);

//For table Heading1
        var objTHead1 = document.createElement("th");
        $(objTHead1).html('S.NO');
        $(objTr).append(objTHead1);

//For table Heading2
        var objTHead2 = document.createElement('th');
        $(objTHead2).html('District');
        $(objTr).append(objTHead2);


//For table Heading3
        var objTHead3 = document.createElement('th');
        $(objTHead3).html('Assigend Vehicle');
        $(objTr).append(objTHead3);
//For table Heading4
        var objTHead4 = document.createElement('th');
        $(objTHead4).html('Assigned Date');
        $(objTr).append(objTHead4);
        
       /* //For table Heading8
        var objTHead8 = document.createElement('th');
        $(objTHead8).html('Update');
        $(objTr).append(objTHead8);

        //For table Heading9
        var objTHead9 = document.createElement('th');
        $(objTHead9).html('Delete');
        $(objTr).append(objTHead9);*/

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
            $(tablcol2).html(strData[i].districtId);
            $(tbleRow).append(tablcol2);

            var tablcol3 = document.createElement("td");
            $(tablcol3).addClass('text-center');
            $(tablcol3).html(strData[i].vehicleName);
            $(tbleRow).append(tablcol3);

            var tablcol4 = document.createElement("td");
            $(tablcol4).addClass('text-center');
            $(tablcol4).html(strData[i].assigndate);
            $(tbleRow).append(tablcol4);


         /*   var tablcol8 = document.createElement("td");
            $(tablcol8).addClass('text-center');
            $(tablcol8).append('<a href="#"><i  class="fa fa-edit" data-toggle="modal" data-target="#updateId"></i><i></a> ');
            $(tablcol8).attr('onclick', 'get_RowData("' + strData[i].servicepointName + '","' + strData[i].servicepointId + '","' + strData[i].districtId + '","' + strData[i].districtName + '","' + strData[i].cityId + '","' + strData[i].cityName + '","' + strData[i].mandalId + '","' + strData[i].mandalName + '","' + strData[i].latitude + '","' + strData[i].longitude + '")');


            var tablcol9 = document.createElement("td");
            $(tablcol9).addClass('text-center');
            $(tablcol9).append('<a href="#"><i class="fa fa-trash"></i><i></a> ');
            $(tablcol9).attr('onclick', 'deleteServicePointRegistationData("' + strData[i].servicepointId + '")');
            $(tablcol9).css('height', '5px');

            $(tbleRow).append(tablcol8);
            $(tbleRow).append(tablcol9);*/
            $(objTBody).append(tbleRow);
        }
        $("#assigned_vehicle").append(objDivTag);

    } catch (err) {
        console.log("assigned_vehicle" + err);
    }
}

function loadDataTable() {
    $('.dataTables-example').DataTable({
        "aLengthMenu": [[5, 10, 15, 25, 50, 75, -1], [5, 10, 15, 25, 50, 75, "All"]],
        "iDisplayLength": 5,
        responsive: true,
        dom: '<"html5buttons"B>lTfgitp',
        buttons: [
            {extend: 'copy'},
            {extend: 'csv'},
            {extend: 'excel', title: 'TyreLifeData'},
            {extend: 'pdf', title: 'TyreLifeData'},
            {extend: 'print',
                customize: function (win) {
                    $(win.document.body).addClass('white-bg');
                    $(win.document.body).css('font-size', '10px');

                    $(win.document.body).find('table')
                            .addClass('compact')
                            .css('font-size', 'inherit');
                }
            }
        ]
    });
}

function loadDataTable1() {
    $('.dataTables-example1').DataTable({
        "aLengthMenu": [[5, 10, 15, 25, 50, 75, -1], [5, 10, 15, 25, 50, 75, "All"]],
        "iDisplayLength": 5,
        responsive: true,
        dom: '<"html5buttons"B>lTfgitp',
        buttons: [
            {extend: 'copy'},
            {extend: 'csv'},
            {extend: 'excel', title: 'TyreLifeData'},
            {extend: 'pdf', title: 'TyreLifeData'},
            {extend: 'print',
                customize: function (win) {
                    $(win.document.body).addClass('white-bg');
                    $(win.document.body).css('font-size', '10px');

                    $(win.document.body).find('table')
                            .addClass('compact')
                            .css('font-size', 'inherit');
                }
            }
        ]
    });
}

//For showing sweet alert
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
var user_Id;
var role_Id;
var module_Id;
$(document).ready(function() {
	 user_Id = localStorage.getItem('userID');
	 role_Id = localStorage.getItem('wfms_roleID');
	 module_Id = localStorage.getItem('wfms_moduleID');
	 get_Zones_DropDown();
});


function reset_ZoneReport(){
    $("#zone_ZoneId").val('').trigger("chosen:updated");
    $("#zone_BaseId").val('').trigger("chosen:updated");
    $("#zone_VehicleId").val('').trigger("chosen:updated");
	$("#zone_FromDate").val("");
	$("#zone_ToDate").val("");
}



$('#zone_ZoneId').on('change', function() {
	var zone_ZoneId = $("#zone_ZoneId").val();
	if (zone_ZoneId === "0") {
	} else {
		get_BasedOn_ZoneId_BaseLocations();
	}

});

$('#zone_BaseId').on('change', function() {
	var zone_BaseId = $("#zone_BaseId").val();
	if (zone_BaseId === "0") {
	} else {
		get_BasedOn_BaseId_VehiclesLoading();
	}

});

/* 
 * @Author : Purushotham Akula
 * @Desc : get_Zones_DropDown
 */
function get_Zones_DropDown() {
	try {
		$('#zone_ZoneId').empty();
		var strUrl = Service.Get_Zones_DropDown;
		$.ajax({
			type: 'GET',
			url: strUrl,
			dataType: 'json',
			async: false,
			success: function(data) {
				var responsecode = data.responseCode;
				if (200 !== responsecode) {

				} else {
					var jsonArray = data.objResourceProfilesControllerDTO;
					var selectfirst = "<option value='0'>Select Department</option>";
					$('#zone_ZoneId').append(selectfirst);
					$.each(jsonArray, function(i, resData) {
						var Country = "<option value=" + resData.location_id + ">" + resData.location_name + "</option>";
						$(Country).appendTo('#zone_ZoneId');
					});
				}
			},
			error: function(err) {
				console.error("Error in get_Zones_DropDown" + JSON.stringify(err));
			}
		});
	} catch (err) {
		console.error('Error in get_Zones_DropDown()' + err);
	}
	$('#zone_ZoneId').trigger("chosen:updated");
	$('#zone_ZoneId').chosen();
}


/* 
 * @Author : Purushotham Akula
 * @Desc : get_BasedOn_ZoneId_BaseLocations
 */
function get_BasedOn_ZoneId_BaseLocations() {
	try {
		$('#zone_BaseId').empty();
		var zone_ZoneId = $("#zone_ZoneId").val();
		var strUrl = Service.Get_BasedOn_ZoneId_BaseLocations;
		var obj_Json = {
				 "location_id": zone_ZoneId
		    	};
		$.ajax({
			type : "POST",
			url : strUrl,
			dataType : "json",
			data : JSON.stringify(obj_Json),
			contentType : "application/json",
			async : false,
			crossDomain : true,
			success: function(data) {
				var responsecode = data.responseCode;
				if (200 !== responsecode) {

				} else {
					var jsonArray = data.objReportsControllerDTO;
					var selectfirst = "<option value='0'>Select Department</option>";
					$('#zone_BaseId').append(selectfirst);
					$.each(jsonArray, function(i, resData) {
						var Country = "<option value=" + resData.base_locationid + ">" + resData.base_locationname + "</option>";
						$(Country).appendTo('#zone_BaseId');
					});
				}
			},
			error: function(err) {
				console.error("Error in get_BasedOn_ZoneId_BaseLocations" + JSON.stringify(err));
			}
		});
	} catch (err) {
		console.error('Error in get_BasedOn_ZoneId_BaseLocations()' + err);
	}
	$('#zone_BaseId').trigger("chosen:updated");
	$('#zone_BaseId').chosen();
}





/* 
 * @Author : Purushotham Akula
 * @Desc : get_BasedOn_BaseId_VehiclesLoading
 */
function get_BasedOn_BaseId_VehiclesLoading() {
	try {
		$('#zone_VehicleId').empty();
		var zone_BaseId = $("#zone_BaseId").val();
		var strUrl = Service.Get_BasedOn_BaseLocId_VehicleNumbers;
		var obj_Json = {
				 "base_locationid": zone_BaseId
		    	};
		$.ajax({
			type : "POST",
			url : strUrl,
			dataType : "json",
			data : JSON.stringify(obj_Json),
			contentType : "application/json",
			async : false,
			crossDomain : true,
			success: function(data) {
				var responsecode = data.responseCode;
				if (200 !== responsecode) {

				} else {
					var jsonArray = data.objReportsControllerDTO;
					var selectfirst = "<option value='0'>Select Department</option>";
					$('#zone_VehicleId').append(selectfirst);
					$.each(jsonArray, function(i, resData) {
						var Country = "<option value=" + resData.vehicle_num + ">" + resData.vehicle_regno + "</option>";
						$(Country).appendTo('#zone_VehicleId');
					});
				}
			},
			error: function(err) {
				console.error("Error in get_BasedOn_BaseId_VehiclesLoading" + JSON.stringify(err));
			}
		});
	} catch (err) {
		console.error('Error in get_BasedOn_BaseId_VehiclesLoading()' + err);
	}
	$('#zone_VehicleId').trigger("chosen:updated");
	$('#zone_VehicleId').chosen();
}





/*
 * @Author : Purushotham Akula 
 * @Date : 2021-08-04 
 * @Desc : get_Zone_Wise_Report_Details
 */

function get_Zone_Wise_Report_Details() {
	$('#zone_TableId').empty();
	var from_Date = $("#zone_FromDate").val();
	var to_Date = $("#zone_ToDate").val();
	var zoneId = $("#zone_ZoneId").val();
	var baseId = $("#zone_BaseId").val();
	var vehicleId = $("#zone_VehicleId").val();

	if (zoneId === "0" || zoneId === undefined || zoneId === "") {
		showNotificationError('Please select  zone', 'zone_ZoneId','error');
		return false;
	}
	if (baseId === "0" || baseId === undefined || baseId === "") {
		showNotificationError('Please select base location', 'zone_BaseId','error');
		return false;
	}
	if (vehicleId === "0" || vehicleId === undefined || vehicleId === "") {
		showNotificationError('Please select vehicle', 'zone_BaseId','error');
		return false;
	}
	if (from_Date === "" || from_Date === undefined || from_Date === '') {
		showNotificationError('Please select  from date', 'zone_VehicleId','error');
		return false;
	}
	if (to_Date === "" || to_Date === undefined || to_Date === '') {
		showNotificationError('Please select to date', 'zone_ToDate','error');
		return false;
	}
	try {
		var strUrl = Service.Get_Zone_Wise_Reports_Details;
		var obj_Json = {
				"from_date": from_Date,
		        "end_date":to_Date,
		    	"vehicle_num": baseId,
		    	"base_locationid": vehicleId
		    	};
		$.ajax({
			type : "POST",
			url : strUrl,
			dataType : "json",
			data : JSON.stringify(obj_Json),
			contentType : "application/json",
			async : false,
			crossDomain : true,
			success : function(data) {
				var responsecode = data.responseCode;
				if (200 !== responsecode) {
			var trTag = document.createElement("tr");
			var tdTag = document.createElement("td");
			 $(trTag).append(tdTag);
             $(tdTag).attr('colspan', '12');
			 $(tdTag).css("text-align", "center");
             $(tdTag).css('color', 'red');
			 $(tdTag).html("No Data Available");
            $('#zone_TableId').append(trTag);
				} else{
					var jsonArray = data.objReportsControllerDTO;
					get_Zone_Wise_Report_Details_DOM(jsonArray);
					dom_Table();
				}
			},
			error : function(err) {
				console.error("Error in get_Zone_Wise_Report_Details"
						+ JSON.stringify(err));
			}
		});
	} catch (err1) {
		console.error('Error in get_Zone_Wise_Report_Details()' + err1);
	}

}


function get_Zone_Wise_Report_Details_DOM(strData) {
	
	$('#zone_TableId').empty();
    try {

        var sum = 0;
        for (var i = 0; i < strData.length; i++) {
            var index = i + 1;
            var tbleRow = document.createElement("tr");
            var tablcol1 = document.createElement("td");
            $(tablcol1).html(index);
            $(tbleRow).append(tablcol1);

            var tablcol2 = document.createElement("td");
            var user_name = strData[i].user_name;
            if (user_name === "NA" || user_name === "") {
                $(tablcol2).html('Not Found');
            } else {
                $(tablcol2).html(user_name);
            }
            $(tbleRow).append(tablcol2);
              
              var tablcol3 = document.createElement("td");
              var user_desc = strData[i].user_desc;
              if (user_desc === "NA" || user_desc === "") {
                  $(tablcol3).html('Not Found');
              } else {
                  $(tablcol3).html(user_desc);
              }
              $(tbleRow).append(tablcol3);
           
              var tablcol4 = document.createElement("td");
              var allocated_date = strData[i].allocated_date;
              if (allocated_date === "NA" || allocated_date === "") {
                  $(tablcol4).html('Not Found');
              } else {
                  $(tablcol4).html(allocated_date);
              }
              $(tbleRow).append(tablcol4);

              var tablcol5 = document.createElement("td");
              var module_name = strData[i].module_name;
              if (module_name === "NA" || module_name === "") {
                  $(tablcol5).html('Not Found');
              } else {
                  $(tablcol5).html(module_name);
              }
              $(tbleRow).append(tablcol5);
  
              var tablcol6 = document.createElement("td");
              var designation_name = strData[i].designation_name;
              if (designation_name === "NA" || designation_name === "") {
                  $(tablcol6).html('Not Found');
              } else {
                  $(tablcol6).html(designation_name);
              }
              $(tbleRow).append(tablcol6);

              var tablcol7 = document.createElement("td");
              var base_locationname = strData[i].base_locationname;
              if (base_locationname === "NA" || base_locationname === "" ) {
                  $(tablcol7).html('Not Found');
              } else {
                  $(tablcol7).html(base_locationname);
              }
              $(tbleRow).append(tablcol7);
              
              var tablcol8 = document.createElement("td");
              var manager_name = strData[i].manager_name;
              if (manager_name === "NA" || manager_name === "" ) {
                  $(tablcol8).html('Not Found');
              } else {
                  $(tablcol8).html(manager_name);
              }
              $(tbleRow).append(tablcol8);
              
              
              var tablcol9 = document.createElement("td");
              var location_name = strData[i].location_name;
              if (location_name === "NA" || location_name === "" ) {
                  $(tablcol9).html('Not Found');
              } else {
                  $(tablcol9).html(location_name);
              }
              $(tbleRow).append(tablcol9);
                          
              var tablcol10 = document.createElement("td");
              var base_locationname = strData[i].base_locationname;
              if (base_locationname === "NA" || base_locationname === "" ) {
                  $(tablcol10).html('Not Found');
              } else {
                  $(tablcol10).html(base_locationname);
              }
              $(tbleRow).append(tablcol10);
              
              var tablcol11 = document.createElement("td");
              var vehicle_regno = strData[i].vehicle_regno;
              if (vehicle_regno === "NA" || vehicle_regno === "" ) {
                  $(tablcol11).html('Not Found');
              } else {
                  $(tablcol11).html(vehicle_regno);
              }
              $(tbleRow).append(tablcol11);
              
              var tablcol12 = document.createElement("td");
              var vehicle_type = strData[i].vehicle_type;
              if (vehicle_type === "NA" || vehicle_type === "" ) {
                  $(tablcol12).html('Not Found');
              } else {
                  $(tablcol12).html(vehicle_type);
              }
              $(tbleRow).append(tablcol12);
              
              var tablcol13 = document.createElement("td");
              var status = strData[i].status;
              if (status === "NA" || status === "" ) {
                  $(tablcol13).html('Not Found');
              } else {
                  $(tablcol13).html(status);
              }
              $(tbleRow).append(tablcol13);
              
              
            //Appending Body Here
            $("#zone_TableId").append(tbleRow);
        }

    } catch (err) {
        console.log("get_Zone_Wise_Report_Details_DOM" + err);
    }
}













function dom_Table(){
	  $('#zone_Table').DataTable({
		destroy: true,
      pageLength: 10,
      responsive: true,
      dom: '<"html5buttons"B>lTfgitp',
      buttons: [
          {extend: 'copy'},
          {extend: 'csv'},
          {extend: 'excel', title: 'ExampleFile'},
          {extend: 'pdf', title: 'ExampleFile'},
          {extend: 'print',
              customize: function(win) {
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
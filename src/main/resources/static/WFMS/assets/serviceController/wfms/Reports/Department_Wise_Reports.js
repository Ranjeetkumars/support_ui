

var user_Id;
var role_Id;
var module_Id;
$(document).ready(function() {
	 user_Id = localStorage.getItem('userID');
	 role_Id = localStorage.getItem('wfms_roleID');
	 module_Id = localStorage.getItem('wfms_moduleID');
	 get_Scheduleallocated_All_Data();
	 get_Module_Details();

});


/* 
 * @Author : Purushotham Akula
 * @Date : 2021-07-26
 * @Desc : get_Module_Details
 */
function get_Module_Details() {
	try {
		$('#dep_DepartmentId').empty();
		var strUrl = Service.Get_Module_Details;
		//	console.log("getCountries Url is:" + strUrl);
		$.ajax({
			type: 'GET',
			url: strUrl,
			dataType: 'json',
			async: false,
			success: function(data) {
				var responsecode = data.responseCode;
				if (200 !== responsecode) {

				} else {
					var jsonArray = data.objReportsControllerDTO;
					var selectfirst = "<option value='0'>Select Department</option>";
					$('#dep_DepartmentId').append(selectfirst);
					$.each(jsonArray, function(i, resData) {
						var Country = "<option value=" + resData.module_id + ">" + resData.module_name + "</option>";
						$(Country).appendTo('#dep_DepartmentId');
					});
				}
			},
			error: function(err) {
				console.error("Error in get_Module_Details" + JSON.stringify(err));
			}
		});
	} catch (err) {
		console.error('Error in get_Module_Details()' + err);
	}
	$('#dep_DepartmentId').trigger("chosen:updated");
	$('#dep_DepartmentId').chosen();
}


/*
 * @Author : Purushotham Akula @Date : 2021-07-29 @Desc : get_Scheduleallocated_All_Data
 */

function get_Scheduleallocated_All_Data() {
	try {
		var strUrl = Service.Get_Scheduleallocated_All_Data;
		$.ajax({
			type : "GET",
			url : strUrl,
			dataType : "json",
			contentType : "application/json",
			async : false,
			crossDomain : true,
			success : function(data) {
				var responsecode = data.responseCode;
				if (200 !== responsecode) {

				} else {
					var jsonArray = data.objReportsControllerDTO;
					get_Scheduleallocated_All_Data_DOM(jsonArray);
					dom_Table();
				}
			},
			error : function(err) {
				console.error("Error in get_Scheduleallocated_All_Data"
						+ JSON.stringify(err));
			}
		});
	} catch (err1) {
		console.error('Error in get_Scheduleallocated_All_Data()' + err1);
	}

}

/*
 * @Author : Purushotham Akula 
 * @Date : 2021-08-03 
 * @Desc : Get_Scheduleallocated_All_Data_WithInputs
 */

function get_Scheduleallocated_All_Data_WithInputs() {
	$('#department_ReportId').empty();
	var from_Date = $("#dep_FromDate").val();
	var to_Date = $("#dep_ToDate").val();
	var moduleId = $("#dep_DepartmentId").val();
	
	if (moduleId === "0" || moduleId === undefined || moduleId === "") {
		showNotificationError('Please select to department', 'dep_DepartmentId','error');
		return false;
	}
	if (from_Date === "" || from_Date === undefined || from_Date === '') {
		showNotificationError('Please select to from date', 'dep_FromDate','error');
		return false;
	}
	if (to_Date === "" || to_Date === undefined || to_Date === '') {
		showNotificationError('Please select to to date', 'dep_FromDate','error');
		return false;
	}

	try {
		var strUrl = Service.Get_Scheduleallocated_All_Data_WithInputs;
		var obj_Json = {
				"from_date": from_Date,
		    	"end_date": to_Date,
		    	"module_id":moduleId
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

				} else {
					var jsonArray = data.objReportsControllerDTO;
					get_Scheduleallocated_All_Data_DOM(jsonArray);
					dom_Table();
				}
			},
			error : function(err) {
				console.error("Error in get_Scheduleallocated_All_Data_WithInputs"
						+ JSON.stringify(err));
			}
		});
	} catch (err1) {
		console.error('Error in get_Scheduleallocated_All_Data_WithInputs()' + err1);
	}

}


function get_Scheduleallocated_All_Data_DOM(strData) {
	
	$('#department_ReportId').empty();
    try {

        var sum = 0;
        for (var i = 0; i < strData.length; i++) {
            //  console.log('JSON DATA ----> ' + JSON.stringify(strData));
            var index = i + 1;
            var tbleRow = document.createElement("tr");
            var tablcol1 = document.createElement("td");
            $(tablcol1).html(index);
            $(tbleRow).append(tablcol1);

            var tablcol2 = document.createElement("td");
            var user_name = strData[i].user_name;
            if (user_name === "NA") {
                $(tablcol2).html('Not Found');
            } else {
                $(tablcol2).html(user_name);
            }
            $(tbleRow).append(tablcol2);
              
              var tablcol3 = document.createElement("td");
              var user_desc = strData[i].user_desc;
              if (user_desc === "NA") {
                  $(tablcol3).html('Not Found');
              } else {
                  $(tablcol3).html(user_desc);
              }
              $(tbleRow).append(tablcol3);
           
              var tablcol4 = document.createElement("td");
              var allocated_date = strData[i].allocated_date;
              if (allocated_date === "NA") {
                  $(tablcol4).html('Not Found');
              } else {
                  $(tablcol4).html(allocated_date);
              }
              $(tbleRow).append(tablcol4);

              var tablcol5 = document.createElement("td");
              var module_name = strData[i].module_name;
              if (module_name === "NA") {
                  $(tablcol5).html('Not Found');
              } else {
                  $(tablcol5).html(module_name);
              }
              $(tbleRow).append(tablcol5);
  
              var tablcol6 = document.createElement("td");
              var designation_name = strData[i].designation_name;
              if (designation_name === "NA") {
                  $(tablcol6).html('Not Found');
              } else {
                  $(tablcol6).html(designation_name);
              }
              $(tbleRow).append(tablcol6);

              
              var tablcol7 = document.createElement("td");
             var manager_name = strData[i].manager_name;
              if (manager_name === "NA") {
                  $(tablcol7).html('Not Found');
              } else {
                  $(tablcol7).html(manager_name);
              }
              $(tbleRow).append(tablcol7);
              
            
              
              
            //Appending Body Here
            $("#department_ReportId").append(tbleRow);
        }

    } catch (err) {
        console.log("get_Scheduleallocated_All_Data_DOM" + err);
    }
}
function reset_Report(){
    console.log("rest calling");
	//$('#dep_DepartmentId').html("");
    $("#dep_DepartmentId").val('').trigger("chosen:updated");

	// $("#dep_DepartmentId").empty();
	$("#dep_FromDate").val("");
	$("#dep_ToDate").val("");

}
function dom_Table(){
	  $('#department_Reports').DataTable({
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
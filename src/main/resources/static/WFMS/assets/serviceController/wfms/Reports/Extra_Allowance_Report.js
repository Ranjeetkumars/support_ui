var user_Id;
var role_Id;
var module_Id;
$(document).ready(function() {
	 user_Id = localStorage.getItem('userID');
	 role_Id = localStorage.getItem('wfms_roleID');
	 module_Id = localStorage.getItem('wfms_moduleID');
	 get_Module_Details_EM_EMT();
});

function reset_ExtraReport(){
	$("#extra_FromDate").val("");
	$("#extra_ToDate").val("");
}



/* 
 * @Author : Purushotham Akula
 * @Desc : get_Module_Details_EM_EMT
 */
function get_Module_Details_EM_EMT() {
	try {
		$('#extra_DepartmentId').empty();
		var strUrl = Service.Get_Module_Details_EM_EMT;
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
					$('#extra_DepartmentId').append(selectfirst);
					$.each(jsonArray, function(i, resData) {
						var Country = "<option value=" + resData.module_id + ">" + resData.module_name + "</option>";
						$(Country).appendTo('#extra_DepartmentId');
					});
				}
			},
			error: function(err) {
				console.error("Error in get_Module_Details_EM_EMT" + JSON.stringify(err));
			}
		});
	} catch (err) {
		console.error('Error in get_Module_Details_EM_EMT()' + err);
	}
	$('#extra_DepartmentId').trigger("chosen:updated");
	$('#extra_DepartmentId').chosen();
}

$('#extra_DepartmentId').on('change', function() {
	var departmentId = $("#extra_DepartmentId").val();
	if (departmentId === "0") {
	} else {
		get_BasedOn_DepartmentId_EmployeeDetails();
	}

});


/* 
 * @Author : Purushotham Akula
 * @Desc : get_BasedOn_DepartmentId_EmployeeDetails
 */
function get_BasedOn_DepartmentId_EmployeeDetails() {
	try {
		$('#extra_EmployeeId').empty();
		var module_Id = $("#extra_DepartmentId").val();
		var strUrl = Service.Get_User_Details_Baseon_ModuleId;
		var obj_Json = {
				 "manager_id": user_Id,
			     "module_id": module_Id
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
					$('#extra_EmployeeId').append(selectfirst);
					$.each(jsonArray, function(i, resData) {
						var Country = "<option value=" + resData.user_id + ">" + resData.user_name + "</option>";
						$(Country).appendTo('#extra_EmployeeId');
					});
				}
			},
			error: function(err) {
				console.error("Error in get_BasedOn_DepartmentId_EmployeeDetails" + JSON.stringify(err));
			}
		});
	} catch (err) {
		console.error('Error in get_BasedOn_DepartmentId_EmployeeDetails()' + err);
	}
	$('#extra_EmployeeId').trigger("chosen:updated");
	$('#extra_EmployeeId').chosen();
}





/*
 * @Author : Purushotham Akula 
 * @Date : 2021-08-04 
 * @Desc : get_User_Allowance_Details
 */

function get_User_Allowance_Details() {
	$('#extra_TableId').empty();
	var from_Date = $("#extra_FromDate").val();
	var to_Date = $("#extra_ToDate").val();
	var moduleid = $("#extra_DepartmentId").val();
	var userId = $("#extra_EmployeeId").val();
	
	if (moduleid === "0" || moduleid === undefined || moduleid === "") {
		showNotificationError('Please select  department', 'extra_DepartmentId','error');
		return false;
	}
	if (userId === "0" || userId === undefined || userId === "") {
		showNotificationError('Please select employee', 'extra_DepartmentId','error');
		return false;
	}
	if (from_Date === "" || from_Date === undefined || from_Date === '') {
		showNotificationError('Please select  from date', 'extra_FromDate','error');
		return false;
	}
	if (to_Date === "" || to_Date === undefined || to_Date === '') {
		showNotificationError('Please select to date', 'extra_FromDate','error');
		return false;
	}
	try {
		var strUrl = Service.Get_User_Allowance_Details;
		var obj_Json = {
				"from_date": from_Date,
		        "end_date":to_Date,
		        "user_id":userId,
		    	"module_id": moduleid
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
             $(tdTag).attr('colspan', '11');
			 $(tdTag).css("text-align", "center");
             $(tdTag).attr('color', 'red');
			 $(tdTag).html("No Data Available");
            $('#extra_TableId').append(trTag);
				} else{
					var jsonArray = data.objReportsControllerDTO;
					get_User_Allowance_Details_DOM(jsonArray);
					dom_Table();
				}
			},
			error : function(err) {
				console.error("Error in get_User_Allowance_Details"
						+ JSON.stringify(err));
			}
		});
	} catch (err1) {
		console.error('Error in get_User_Allowance_Details()' + err1);
	}

}


function get_User_Allowance_Details_DOM(strData) {
	
	$('#extra_TableId').empty();
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
              var description = strData[i].description;
              if (description === "NA" || description === "") {
                  $(tablcol3).html('Not Found');
              } else {
                  $(tablcol3).html(description);
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
              var location_name = strData[i].location_name;
              if (location_name === "NA" || location_name === "") {
                  $(tablcol6).html('Not Found');
              } else {
                  $(tablcol6).html(location_name);
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
              var vehicle_num = strData[i].vehicle_num;
              if (vehicle_num === "NA" || vehicle_num === "" ) {
                  $(tablcol8).html('Not Found');
              } else {
                  $(tablcol8).html(vehicle_num);
              }
              $(tbleRow).append(tablcol8);
              
              
              var tablcol9 = document.createElement("td");
              var remarks = strData[i].remarks;
              if (remarks === "NA" || remarks === "" ) {
                  $(tablcol9).html('Not Found');
              } else {
                  $(tablcol9).html(remarks);
              }
              $(tbleRow).append(tablcol9);
                          
              var tablcol10 = document.createElement("td");
              var allowance_type = strData[i].allowance_type;
              if (allowance_type === "NA" || allowance_type === "" ) {
                  $(tablcol10).html('Not Found');
              } else {
                  $(tablcol10).html(allowance_type);
              }
              $(tbleRow).append(tablcol10);
              
              var tablcol11 = document.createElement("td");
              var amount = strData[i].amount;
              if (amount === "NA" || amount === "" ) {
                  $(tablcol11).html('Not Found');
              } else {
                  $(tablcol11).html(amount);
              }
              $(tbleRow).append(tablcol11);
            //Appending Body Here
            $("#extra_TableId").append(tbleRow);
        }

    } catch (err) {
        console.log("get_User_Allowance_Details_DOM" + err);
    }
}









function dom_Table(){
	  $('#extra_Table').DataTable({
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
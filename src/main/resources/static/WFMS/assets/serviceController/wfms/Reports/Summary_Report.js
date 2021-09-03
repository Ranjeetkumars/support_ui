var user_Id;
var role_Id;
var module_Id;
var table;
$(document).ready(function() {
	user_Id = localStorage.getItem('userID');
	role_Id = localStorage.getItem('wfms_roleID');
	module_Id = localStorage.getItem('wfms_moduleID');

	get_Module_Details();
	try {
	} catch (err) {
		console.log("errror in loading ready funtion" + err);
	}
});


/* 
 * @Author : Purushotham Akula
 * @Date : 2021-07-26
 * @Desc : get_Module_Details
 */
function get_Module_Details() {
	try {
		$('#summ_DepartmentId').empty();
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
					$('#summ_DepartmentId').append(selectfirst);
					$.each(jsonArray, function(i, resData) {
						var Country = "<option value=" + resData.module_id + ">" + resData.module_name + "</option>";
						$(Country).appendTo('#summ_DepartmentId');
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
	$('#summ_DepartmentId').trigger("chosen:updated");
	$('#summ_DepartmentId').chosen();
}




/*
 * @Author : Purushotham Akula 
 * @Date : 2021-08-03 
 * @Desc : get_UsersShifts_Start_End_Timings
 */

 function get_UsersShifts_Start_End_Timings(user_id,from_Date,to_Date,i) {
	var from_Date = $("#sum_FromDate").val();
	var to_Date = $("#sum_EndDate").val();
	try {
		var strUrl = Service.Get_UsersShifts_Start_End_Timings;
		var obj_Json = {
				"from_date": from_Date,
		       	"to_date":to_Date,
		       	"user_id":user_id
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
					$.each(jsonArray, function(i, resData) {
						var diii=getMytimeDiff(resData.shift_start_time, resData.shift_end_time,i)
						
						//console.log(diii);

					});
				}
			},
			error : function(err) {
				console.error("Error in Get_UsersShifts_Start_End_Timings"
						+ JSON.stringify(err));
			}
		});
	} catch (err1) {
		console.error('Error in Get_UsersShifts_Start_End_Timings()' + err1);
	}

}

function getMytimeDiff(t1, t2,rowNum) {
	console.log(t1+"t2"+t1);

	var time1 = parseInt(t1);
	var time2 = parseInt(t2);
	var diff = Math.abs(time1 - time2);
	console.log(diff);
	
	table.cell({
		row: rowNum,
		column: 7
	}).data(diff);
	
	return diff;
}



/*
 * @Author : Purushotham Akula 
 * @Date : 2021-08-03 
 * @Desc : Get_Users_Leave_Days
 */

function Get_Users_Leave_Days() {
	var from_Date = $("#sum_FromDate").val();
	var to_Date = $("#sum_EndDate").val();
	try {
		var strUrl = Service.Get_Users_Leave_Days;
		var obj_Json = {
				"from_date": from_Date,
		       	"to_date":to_Date,
		       	"user_id":user_Id
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
					$.each(jsonArray, function(i, resData) {
						console.log(resData);
					});
				}
			},
			error : function(err) {
				console.error("Error in Get_Users_Leave_Days"
						+ JSON.stringify(err));
			}
		});
	} catch (err1) {
		console.error('Error in Get_Users_Leave_Days()' + err1);
	}

}

/*
 * @Author : Purushotham Akula 
 * @Date : 2021-08-03 
 * @Desc : Get_Desigination_Details
 */

function get_Desigination_Details() {

	try {
		var strUrl = Service.Get_Desigination_Details;
		var obj_Json = {
				"designation_id": 2//temporrary
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
					$.each(jsonArray, function(i, resData) {
						console.log(resData);
					});
				}
			},
			error : function(err) {
				console.error("Error in Get_Desigination_Details"
						+ JSON.stringify(err));
			}
		});
	} catch (err1) {
		console.error('Error in Get_Desigination_Details()' + err1);
	}

}

/*
 * @Author : Purushotham Akula 
 * @Date : 2021-08-03 
 * @Desc : Get_User_Module_Location_Vehicle_Data
 */

function get_User_Module_Location_Vehicle_Data() {
	var from_Date = $("#sum_FromDate").val();
	var to_Date = $("#sum_EndDate").val();
	var moduleId = $("#summ_DepartmentId").val();

	try {
		var strUrl = Service.Get_User_Module_Location_Vehicle_Data;
		var obj_Json = {
				"from_date": from_Date,
		    	"to_date": to_Date,
		    	"user_id": user_Id,
		    	"module_id":moduleId,
		    	"manager_id":user_Id
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
					get_User_Module_Location_Vehicle_Data_DOM(jsonArray,from_Date,to_Date);
					 dom_Table();
				}
			},
			error : function(err) {
				console.error("Error in Get_User_Module_Location_Vehicle_Data"
						+ JSON.stringify(err));
			}
		});
	} catch (err1) {
		console.error('Error in Get_User_Module_Location_Vehicle_Data()' + err1);
	}

}


function get_User_Module_Location_Vehicle_Data_DOM(strData,from_Date,to_Date) {
	
	$('#summary_ReportId').empty();
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
              var module_name = strData[i].module_name;
              if (module_name === "NA") {
                  $(tablcol3).html('Not Found');
              } else {
                  $(tablcol3).html(module_name);
              }
              $(tbleRow).append(tablcol3);
           
              var tablcol4 = document.createElement("td");
              var location_name = strData[i].location_name;
              if (location_name === "NA") {
                  $(tablcol4).html('Not Found');
              } else {
                  $(tablcol4).html(location_name);
              }
              $(tbleRow).append(tablcol4);

              var tablcol5 = document.createElement("td");
              var base_locationname = strData[i].base_locationname;
              if (base_locationname === "NA") {
                  $(tablcol5).html('Not Found');
              } else {
                  $(tablcol5).html(base_locationname);
              }
              $(tbleRow).append(tablcol5);
  
              var tablcol6 = document.createElement("td");
              var vehicle_num = strData[i].vehicle_num;
              if (vehicle_num === "NA") {
                  $(tablcol6).html('Not Found');
              } else {
                  $(tablcol6).html(vehicle_num);
              }
              $(tbleRow).append(tablcol6);

              
              var tablcol7 = document.createElement("td");
             var hours = "22";
       // var tiemngs=   get_UsersShifts_Start_End_Timings(strData[i].user_id,from_Date,to_Date);
              if (hours === "NA") {
                  $(tablcol7).html('Not Found');
              } else {
                  $(tablcol7).html(hours);
              }
              $(tbleRow).append(tablcol7);
              var tablcol8 = document.createElement("td");
             // var timme =getMytimeDiff(shift_start_time,shift_end_time);
              var leave_hours = "22";
               if (leave_hours === "NA") {
                   $(tablcol8).html('Not Found');
               } else {
                   $(tablcol8).html(leave_hours);
               }
               $(tbleRow).append(tablcol8);
              
               var tablcol9 = document.createElement("td");
               // var timme =getMytimeDiff(shift_start_time,shift_end_time);
                var paid_hours = "32";
                 if (paid_hours === "NA") {
                     $(tablcol9).html('Not Found');
                 } else {
                     $(tablcol9).html(paid_hours);
                 }
                 $(tbleRow).append(tablcol9);
               

              
            //Appending Body Here
            $("#summary_ReportId").append(tbleRow);
            
         
        }

    } catch (err) {
        console.log("get_User_Module_Location_Vehicle_Data_DOM" + err);
    }
}


function reset_Report(){
    $("#summ_DepartmentId").val('').trigger("chosen:updated");
	$("#sum_FromDate").val("");
	$("#sum_EndDate").val("");

}

function dom_Table(){
$('#summary_ReportTable').DataTable({
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

  
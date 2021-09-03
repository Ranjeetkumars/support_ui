var user_Id;
var role_Id;
var module_Id;
$(document).ready(function() {
	user_Id = localStorage.getItem('userID');
	role_Id = localStorage.getItem('wfms_roleID');
	module_Id = localStorage.getItem('wfms_moduleID');

	get_User_Details();
   $("#mywork_TableId").html("No DATA AVAILABLE");

	try {
	} catch (err) {
		console.log("errror in loading ready funtion" + err);
	}
});

/*
 * @Author : Purushotham Akula @Date : 2021-07-20 @Desc : get_User_Details
 */

function get_User_Details() {
	try {
		var strUrl = Service.Get_User_Details;
		var obj_Json = {
			user_id : user_Id
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
						console.log(resData.user_name);
						$("#hidden_UserName").val(resData.user_name);
					});
				}
			},
			error : function(err) {
				console
						.error("Error in get_User_Details"
								+ JSON.stringify(err));
			}
		});
	} catch (err) {
		console.error('Error in get_User_Details()' + err);
	}

}

/*
 * @Author : Purushotham Akula @Date : 2021-07-20 @Desc : Get_Shedule_Details
 */

function get_Shedule_Details() {
	var from_Date = $("#from_Date").val();
	var to_Date = $("#to_Date").val();
	try {
		var strUrl = Service.Get_Shedule_Details;
		var obj_Json = {
			"user_id" : user_Id,
			"start_date" : from_Date,
			"end_date" : to_Date

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
					Get_Leave_Days_Count();
					get_Work_Report_Details_DOM(jsonArray);
					dom_Table();
					$.each(jsonArray, function(i, resData) {
						console.log(resData);
					});
				}
			},
			error : function(err) {
				console.error("Error in Get_Shedule_Details"
						+ JSON.stringify(err));
			}
		});
	} catch (err1) {
		console.error('Error in Get_Shedule_Details()' + err1);
	}

}

function Get_Leave_Days_Count() {
	var from_Date = $("#from_Date").val();
	var to_Date = $("#to_Date").val();
	try {
		var strUrl = Service.Get_Leave_Days_Count;
		var obj_Json = {
			"user_id" : user_Id,
			"from_date" : from_Date,
			"to_date" : to_Date,
			"noofleavedays" : "2"
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
					// console.log(jsonArray);
					get_Leave_Days(jsonArray);
				}
			},
			error : function(err) {
				console.error("Error in Get_Leave_Days_Count"
						+ JSON.stringify(err));
			}
		});
	} catch (err1) {
		console.error('Error in Get_Leave_Days_Count()' + err1);
	}

}

var noofdays = 0;

function get_Leave_Days(jsonArray) {

	$.each(jsonArray, function(i, resData) {
		console.log(resData.noofleavedays);
		var getLeavedays = JSON.parse(resData.noofleavedays);
		var Leavedays = getLeavedays;
		noofdays = noofdays + Leavedays;
		console.log("noofdays =====> " + noofdays);

	});

}
var temp = 0;
var r = temp;
var schCount = 1;
var overallHrs = 0;

function getMytimeDiff(t1, t2) {
	var time1 = parseInt(t1);
	var time2 = parseInt(t2);
	var diff = Math.abs(time1 - time2);
	console.log(diff);
	return diff;
}

function get_Work_Report_Details_DOM(strData) {
	
	$('#mywork_TableId').empty();
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
            var allocated_date = strData[i].allocated_date;
            if (allocated_date === "NA") {
                $(tablcol2).html('Not Found');
            } else {
                $(tablcol2).html(allocated_date);
            }
            $(tbleRow).append(tablcol2);
            
           // var timediff =getMytimeDiff(strData[i].shift_start_time,strData[i].shift_end_time);
          //    console.log('JSON DATA ----> ' + timediff);
              
              var tablcol3 = document.createElement("td");
              var shift_start_time = strData[i].shift_start_time;
              if (shift_start_time === "NA") {
                  $(tablcol3).html('Not Found');
              } else {
                  $(tablcol3).html(shift_start_time);
              }
              $(tbleRow).append(tablcol3);
           
              var tablcol4 = document.createElement("td");
              var shift_end_time = strData[i].shift_end_time;
              if (shift_end_time === "NA") {
                  $(tablcol4).html('Not Found');
              } else {
                  $(tablcol4).html(shift_end_time);
              }
              $(tbleRow).append(tablcol4);

              var tablcol5 = document.createElement("td");
              var locationname = strData[i].location_name;
              if (locationname === "NA") {
                  $(tablcol5).html('Not Found');
              } else {
                  $(tablcol5).html(locationname);
              }
              $(tbleRow).append(tablcol5);
  
              var tablcol6 = document.createElement("td");
              var base_locationname = strData[i].base_locationname;
              if (base_locationname === "NA") {
                  $(tablcol6).html('Not Found');
              } else {
                  $(tablcol6).html(base_locationname);
              }
              $(tbleRow).append(tablcol6);

              
              var tablcol7 = document.createElement("td");
             var vehicle_num = strData[i].vehicle_num;
              if (hours === "NA") {
                  $(tablcol7).html('Not Found');
              } else {
                  $(tablcol7).html(vehicle_num);
              }
              $(tbleRow).append(tablcol7);
              
              var tablcol8 = document.createElement("td");
              var timme =getMytimeDiff(shift_start_time,shift_end_time);
              var hours = timme;
               if (hours === "NA") {
                   $(tablcol8).html('Not Found');
               } else {
                   $(tablcol8).html(hours);
               }
               $(tbleRow).append(tablcol8);
              
              
            //Appending Body Here
            $("#mywork_TableId").append(tbleRow);
        }

    } catch (err) {
        console.log("get_ModulesMapping_Details_DOM" + err);
    }
}

function reset_Report(){
	
	$("#from_Date").val("");
	$("#to_Date").val("");

}
function dom_Table(){
	  $('#mywork_Reports').DataTable({
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
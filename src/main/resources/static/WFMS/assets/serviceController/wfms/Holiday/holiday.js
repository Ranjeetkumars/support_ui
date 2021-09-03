/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/*
 Page onload Calling functions
 */
var user_Id;
var role_Id;
var module_Id;
$(document).ready(function() {
	years_List();
	user_Id = localStorage.getItem('userID');
	role_Id = localStorage.getItem('wfms_roleID');
	module_Id = localStorage.getItem('wfms_moduleID');
	get_User_Name();
	$("#tabel_HideId").hide();
});

/*
 * Holiday Name Characters Validations
 */
$("#HolidayName").keypress(function(event) {
	var regex = new RegExp("^[a-zA-Z ]+$");
	var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
	if (!regex.test(key)) {
		event.preventDefault();
		$('#HolidayName_Error').html('Please enter  alphabits only').css('color', 'red');
		return false;
	}
	$('#HolidayName_Error').empty();
});


$("#holidayDate").change(function() {
	$('#holidayDate_Error').empty();
});

$("#holiday_Remarks").keypress(function(event) {
	$("#holidayRemarks_Error").empty();
});


$('#holidayDate').change(function() {
	//======================== Start of Verify Holiday =========================
	Verifying_HolidayCount();
	//======================== Getting Holiday Details =========================
	get_Holiday_Details();
	//======================== Getting Holiday Count =========================
	get_Holidays_Count();
});
$('#select_Year').change(function() {
	var selcted_Year = $('#select_Year').val();
	if (selcted_Year === "0") {
		$("#tabel_HideId").hide();
	} else {
		get_HolidayList_Details();
		$("#tabel_HideId").show();
	}
});



function validations_Checcking() {
	var holiDay = $("#HolidayName").val();
	if (holiDay === "" || holiDay === undefined || holiDay === null) {
		$('#HolidayName_Error').html('Please Enter Holiday Name').css('color', 'red');
		return false;
	}
	var holidayDate = $("#holidayDate").val();
	if (holidayDate === "" || holidayDate === undefined || holidayDate === null) {
		$('#holidayDate_Error').html('Please Select Holiday Date').css('color', 'red');
		return false;
	}
	var d = new Date(holidayDate.split("-").reverse().join("-"));
	var dd = d.getDate();
	var mm = d.getMonth() + 1;
	var yy = d.getFullYear();
	var current_Date = yy + "-" + mm + "-" + dd;

	var holiday_Remarks = $("#holiday_Remarks").val();
	if (holiday_Remarks === "" || holiday_Remarks === undefined || holiday_Remarks === null) {
		$('#holidayRemarks_Error').html('Please Enter Remarks').css('color', 'red');
		return false;
	}
	var holiday_Count = $('#holiday_Count').text();
	var holidayDate = $("#holidayDate").val();
	var d = new Date(holidayDate.split("-").reverse().join("-"));
	var dd = d.getDate();
	var mm = d.getMonth() + 1;
	var yy = d.getFullYear();
	var current_Date = yy + "-" + mm + "-" + dd;
	if (holiday_Count !== 0) {
		var holiday = $('#holiday_Details').val();
		var hd_Details = holiday.split(",");
		var htdatecompare = hd_Details[2];
		if (current_Date === htdatecompare) {
			alert("Holiday Details Already Exists, Please Select Year and view the Details.");
		} else {
			var holidays_Count = $("#holidays_Count").val();
			holidays_Count++;
			inserting_Holidays(holidays_Count, holiDay, current_Date, holiday_Remarks);
		}
	} else {
		//======================== Inserting Holiday =========================
		inserting_Holidays(holidays_Count, holiDay, current_Date, holiday_Remarks);
	}
}


/*
 * Holiday Name Characters Validations
 */
$("#update_HolidayName").keypress(function(event) {
	var regex = new RegExp("^[a-zA-Z ]+$");
	var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
	if (!regex.test(key)) {
		event.preventDefault();
		$('#update_Holiday_Error').html('Please enter  alphabits only').css('color', 'red');
		return false;
	}
	$('#update_Holiday_Error').empty();
});


$("#update_HolidayDate").change(function() {
	$('#update_HDate_Error').empty();
});

$("#update_Remarks").keypress(function(event) {
	$("#update_HRemarks_Error").empty();
});


function update_Validations_Checking() {
	var holiDay = $("#update_HolidayName").val();
	var holidayDate = $("#update_HolidayDate").val();
	var holiday_Remarks = $("#update_Remarks").val();

	if (holiDay === "" || holiDay === undefined || holiDay === null) {
		$('#update_Holiday_Error').html('Please Enter Holiday Name').css('color', 'red');
		return false;
	}
	else if (holidayDate === "" || holidayDate === undefined || holidayDate === null) {
		$('#update_HDate_Error').html('Please Select Holiday Date').css('color', 'red');
		return false;
	}
	else if (holiday_Remarks === "" || holiday_Remarks === undefined || holiday_Remarks === null) {
		$('#update_HRemarks_Error').html('Please Enter Remarks').css('color', 'red');
		return false;
	} else {
		update_Holidays(holiDay, holidayDate, holiday_Remarks);
	}

}





/*
 For Getting User_Name Purpose
 */
function get_User_Name() {
	//var user_Id = "161"; //Temporary Purpose
	var json_UserName = {
		"user_id": user_Id
	};
	var strUrl = Service.Get_UserName;
	$.ajax({
		type: "POST",
		url: strUrl,
		dataType: "json",
		data: JSON.stringify(json_UserName),
		contentType: "application/json",
		async: false,
		crossDomain: true,
		headers: {
			"X-TENANT-ID": "PROCREATE"
		},
		success: function(data) {
			var responsecode = data.responseCode;
			if (200 !== responsecode) {
				alert("No Data Found");
			} else {
				$('#h_User_Name').html(data.us_Mname);
			}
		},
		error: function(err) {
			console.error("Error in get_UserName" + JSON.stringify(err));
		}
	});
}


/*
 For Verifying_HolidayCout
 */
function Verifying_HolidayCount() {
	var holidayDate = $("#holidayDate").val();
	var d = new Date(holidayDate.split("-").reverse().join("-"));
	var dd = d.getDate();
	var mm = d.getMonth() + 1;
	var yy = d.getFullYear();
	var current_Date = yy + "-" + mm + "-" + dd;
	var json_HolidayCount = {
		"current_date": current_Date
	};
	var strUrl = Service.Verifying_HolidayCount;
	$.ajax({
		type: "POST",
		url: strUrl,
		dataType: "json",
		data: JSON.stringify(json_HolidayCount),
		contentType: "application/json",
		async: false,
		crossDomain: true,
		headers: {
			"X-TENANT-ID": "PROCREATE"
		},
		success: function(data) {
			var responsecode = data.responseCode;
			if (200 !== responsecode) {
			} else {
				$('#holiday_Count').html(data.count);
				// test();
			}
		},
		error: function(err) {
			console.error("Error in Verifying_HolidayCount" + JSON.stringify(err));
		}
	});
}

/*
 For Get_Holiday_Details
 */
function get_Holiday_Details() {
	var holidayDate = $("#holidayDate").val();
	var d = new Date(holidayDate.split("-").reverse().join("-"));
	var dd = d.getDate();
	var mm = d.getMonth() + 1;
	var yy = d.getFullYear();
	var current_Date = yy + "-" + mm + "-" + dd;
	var json_HolidayCount = {
		"current_date": current_Date
	};
	var strUrl = Service.Get_Holiday_Details;
	$.ajax({
		type: "POST",
		url: strUrl,
		dataType: "json",
		data: JSON.stringify(json_HolidayCount),
		contentType: "application/json",
		async: false,
		crossDomain: true,
		headers: {
			"X-TENANT-ID": "PROCREATE"
		},
		success: function(data) {
			var responsecode = data.responseCode;
			if (200 !== responsecode) {
			}
			var jsonArray = data.objHolidayControllerDTO;
			$.each(jsonArray, function(index, resData) {
				var holiday_Details = resData.holiday_id + "," + resData.holiday + "," + resData.holiday_date + "," + resData.holiday_remarks;
				$('#holiday_Details').val(holiday_Details);
			});

		},
		error: function(err) {
			console.error("Error in Get_Holiday_Details" + JSON.stringify(err));
		}
	});
}

/*
 For get_Holidays_Count
 */
function get_Holidays_Count() {
	var strUrl = Service.Get_Holidays_Count;
	$.ajax({
		type: "GET",
		url: strUrl,
		dataType: "json",
		contentType: "application/json",
		async: false,
		crossDomain: true,
		headers: {
			"X-TENANT-ID": "PROCREATE"
		},
		success: function(data) {
			var responsecode = data.responseCode;
			if (200 !== responsecode) {
			}
			$('#holidays_Count').val(data.count);
		},
		error: function(err) {
			console.error("Error in Get_Holiday_Details" + JSON.stringify(err));
		}
	});
}

/*
 For Inserting_Holidays Purpose
 */
function inserting_Holidays(htidcountnew, holiDay, current_Date, holiday_Remarks) {
	var createdby_Id = user_Id; //Temporary Purpose
	var createdby_Roleid = role_Id; //Temporary Purpose
	var createdby_Moduelid = module_Id; //Temporary Purpose
	var json_inserting_Holidays = {
		"holiday_id": htidcountnew,
		"holiday": holiDay,
		"holiday_date": current_Date,
		"holiday_remarks": holiday_Remarks,
		"createdby_id": createdby_Id,
		"createdby_roleid": createdby_Roleid,
		"createdby_moduelid": createdby_Moduelid
	};
	var strUrl = Service.Inserting_Holidays;
	$.ajax({
		type: "POST",
		url: strUrl,
		dataType: "json",
		data: JSON.stringify(json_inserting_Holidays),
		contentType: "application/json",
		async: false,
		crossDomain: true,
		headers: {
			"X-TENANT-ID": "PROCREATE"
		},
		success: function(data) {
			var responsecode = data.responseCode;
			if (200 !== responsecode) {
			} else {
				$('#save_Id').html('Holiday Details Saved Successfully').css('color', 'blue');
				setTimeout(function() {
					window.location.reload();
				}, 3000);
			}
		},
		error: function(err) {
			console.error("Error in Inserting_Holidays" + JSON.stringify(err));
		}
	});
}

/*
 For get_HolidayList_Details
 */
function get_HolidayList_Details() {
	var current_year = $("#select_Year").val();
	var json_HolidayList = {
		"current_year": current_year
	};
	var strUrl = Service.Get_HolidayList_Details;
	$.ajax({
		type: "POST",
		url: strUrl,
		dataType: "json",
		data: JSON.stringify(json_HolidayList),
		contentType: "application/json",
		async: false,
		crossDomain: true,
		headers: {
			"X-TENANT-ID": "PROCREATE"
		},
		success: function(data) {
			var responsecode = data.responseCode;
			if (200 !== responsecode) {
				$("#holiday_TableId").html("NO DATA FOUND");
			}
			var jsonArray = data.objHolidayControllerDTO;
			get_All_Holidays_Details_DOM(jsonArray);

		},
		error: function(err) {
			console.error("Error in Get_Holiday_Details" + JSON.stringify(err));
		}
	});
}


function get_All_Holidays_Details_DOM(strData) {
	$('#holiday_TableId').empty();
	try {
		for (var i = 0; i < strData.length; i++) {
			var index = i + 1;
			var tbleRow = document.createElement("tr");

			var tablcol1 = document.createElement("td");
			$(tablcol1).html(index);
			$(tbleRow).append(tablcol1);

			var tablcol2 = document.createElement("td");
			var holiday = strData[i].holiday;
			if (holiday === "NA") {
				$(tablcol2).html('Not Found');
			} else {
				$(tablcol2).html(holiday);
			}
			$(tbleRow).append(tablcol2);

			var holiday_id = strData[i].holiday_id;
			var tablcol3 = document.createElement("td");
			var holiday_date = strData[i].holiday_date;
			if (holiday_date === "NA") {
				$(tablcol3).html('Not Found');
			} else {
				$(tablcol3).html(holiday_date);
			}
			$(tbleRow).append(tablcol3);

			var tablcol4 = document.createElement("td");
			var holiday_remarks = strData[i].holiday_remarks;
			if (holiday_remarks === "NA") {
				$(tablcol4).html('Not Found');
			} else {
				$(tablcol4).html(holiday_remarks);
			}
			$(tbleRow).append(tablcol4);


			var tablcol5 = document.createElement("td");
			$(tablcol5).html('<div class="row"> <div class="col-sm-6"> <a href="#" data-toggle="modal"  data-toggle="tooltip"  data-placement="bottom" data-target="#update_Holiday" title="Edit" style="margin-left: 38px;"><span class="glyphicon glyphicon-pencil" style="color:blue"></span></a> </div></div>');
			$(tablcol5).attr('onclick', 'get_RowData("' + holiday_id + '","' + holiday + '","' + holiday_date + '","' + holiday_remarks + '")');
			$(tbleRow).append(tablcol5);
			$(tbleRow).append(tablcol5);
			//Appending Body Here
			$("#holiday_TableId").append(tbleRow);
		}

	} catch (err) {
		console.log("get_All_Holidays_Details_DOM ERROR" + err);
	}
}
function get_RowData(holiday_id, holiday, holiday_date, holiday_remarks) {
	$('#update_HolidayName').val(holiday);
	$('#hidden_HolidayId').val(holiday_id);
	var d = new Date(holiday_date);
	var dd = d.getDate();
	var mm = d.getMonth() + 1;
	var yy = d.getFullYear();
	var current_Date = dd + "-" + mm + "-" + yy;
	$('#update_HolidayDate').val(current_Date);
	$('#update_Remarks').val(holiday_remarks);
	var user_Name = $('#h_User_Name').text();
	$('#update_User_Name').html(user_Name);
}


/*
 For Inserting_Holidays Purpose
 */
function update_Holidays(holiDay, current_Date, holiday_Remarks) {
	var holiday_Id = $('#hidden_HolidayId').val();
	var createdby_Id = user_Id; //Temporary Purpose
	var createdby_Roleid = role_Id; //Temporary Purpose
	var createdby_Moduelid = module_Id; //Temporary Purpose
	var json_inserting_Holidays = {
		"holiday_id": holiday_Id,
		"holiday": holiDay,
		"holiday_date": current_Date,
		"holiday_remarks": holiday_Remarks,
		"createdby_id": createdby_Id,
		"createdby_roleid": createdby_Roleid,
		"createdby_moduelid": createdby_Moduelid
	};
	var strUrl = Service.Update_Holidays;
	$.ajax({
		type: "POST",
		url: strUrl,
		dataType: "json",
		data: JSON.stringify(json_inserting_Holidays),
		contentType: "application/json",
		async: false,
		crossDomain: true,
		headers: {
			"X-TENANT-ID": "PROCREATE"
		},
		success: function(data) {
			var responsecode = data.responseCode;
			if (200 !== responsecode) {
			} else {
				$('#update_Id').html('Successfully Changed Holiday Details').css('color', 'blue');
				setTimeout(function() {
					window.location.reload();
				}, 3000);
			}
		},
		error: function(err) {
			console.error("Error in Inserting_Holidays" + JSON.stringify(err));
		}
	});
}

function years_List() {

	//Reference the DropDownList.
	var ddlYears = $("#ddlYears");

	//Determine the Current Year.
	var currentYear = (new Date()).getFullYear();
	$('#select_Year').empty();
	var selectfirst = "<option value='0'>Select Zone</option>";
	$('#select_Year').append(selectfirst);
	//Loop and add the Year values to DropDownList.
	for (var i = 1950; i <= currentYear; i++) {
		var option = $("<option />");
		option.html(i);
		option.val(i);
		ddlYears.append(option);
		console.log(i);
		var status = "<option value=" + i + ">" + i + "</option>";
		$(status).appendTo('#select_Year');

	}



}

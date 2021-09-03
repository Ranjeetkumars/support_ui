/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function() {
	try {
		var data = JSON.parse(localStorage.getItem('Lobject'));
		if (data.responseCode === 200) {
			$.each(data.controllerDTOs, function(i, eachitem) {
				if (eachitem.errorcode == null) {

				} else {
					window.location.href = "login.html";
				}
			});
		} else {
			window.location.href = "login.html";
		}

	} catch (err) {
		window.location.href = "login.html";
	}
	get_Not_Mapped_Shift_Managers();
	get_shift_Managers_Details();
});

$('#sm_ResetId').click(function() {
	$("#sm_UserName").val('').trigger("chosen:updated");
});

$('#sm_UserName').change(function() {
	$("#sm_UserName_Error").empty();
});

/*
 * For get_Not_Mapped_Shift_Managers Purpose
 */
function get_Not_Mapped_Shift_Managers() {
	$("#sm_UserName").val('').trigger("chosen:updated");
	try {
		var siteid = localStorage.getItem('active_SiteId');
		var json_siteid = {
			"siteId" : siteid
		};
		var strUrl = Service.getNotMappedShiftManagers;
		$.ajax({
			type : "POST",
			url : strUrl,
			dataType : "json",
			data : JSON.stringify(json_siteid),
			contentType : "application/json",
			async : false,
			crossDomain : true,
			headers : {
				"X-TENANT-ID" : "PROCREATE"
			},
			success : function(data) {
				var responsecode = data.responseCode;
				if (200 !== responsecode) {
				} else {
					var jsonArray = data.shiftManagerControllerDTO;
					$.each(jsonArray, function(i, resData) {
						var modules = "<option value=" + resData.user_id + ","
								+ resData.user_name + ">" + resData.user_name
								+ "</option>";
						$(modules).appendTo('#sm_UserName');
					});
				}
			},
			error : function(err) {
				console.error("Error in get_Not_Mapped_Shift_Managers"
						+ JSON.stringify(err));
			}
		});
	} catch (err) {
		console.log("Error in get_Not_Mapped_Team_Leaders" + err);
	}
}

/*
 * For insert_Shift_Managers_Details Purpose
 */
function insert_Shift_Managers_Details() {
	try {
		var createdbyid = 1;// Temporary Purpose
		var createdbyroleid = 1;// Temporary Purpose
		var createdbymoduleid = 1;// Temporary Purpose
		var inCondition = 1;// Temporary Purpose
		var sm_isactive = "true";// Temporary Purpose
		var sm_id = 1;// Temporary Purpose

		var sm_UserName = $('#sm_UserName').val();
		var bfr_sm_UserName_Split = sm_UserName.split(',')
		var sm_UserId = bfr_sm_UserName_Split[0];
		var sm_UserName = bfr_sm_UserName_Split[1];
		if (sm_UserId === '' || sm_UserId === "" || sm_UserId === null || sm_UserId === "0") {
			$('#sm_UserName').focus();
			$('#sm_UserName_Error').html('please select user').css('color',
					"red");
			return;
		}

		var json_sm_Details = {
			"inCondition" : inCondition,
			"sm_id" : sm_id,
			"user_id" : sm_UserId,
			"user_name" : sm_UserName,
			"sm_createdbyid" : createdbyid,
			"sm_createdbymodid" : createdbymoduleid,
			"sm_createdbyroleid" : createdbyroleid,
			"sm_isactive" : sm_isactive

		};
		var JSON_OBJECT = JSON.stringify(json_sm_Details);
		var strUrl1 = Service.insert_Update_ShiftMangersDetails;

		$.ajax({
			type : "POST",
			url : strUrl1,
			dataType : "json",
			data : JSON.stringify(json_sm_Details),
			contentType : "application/json",
			async : false,
			crossDomain : true,
			headers : {
				"X-TENANT-ID" : "PROCREATE"
			},
			success : function(data) {
				var responsecode = data.responseCode;
				if (200 !== responsecode) {
				} else {
					var errorMsg = data.output;
					$('#sm_SaveId').html('Shift Manager Designation Added Sucessfully').css('color', "green");
					setTimeout(function() {
						window.location.reload();
					}, 3000);
				}
			},
			error : function(err) {
				console.error("Error in Inserted_Shift_Managers_Details"
						+ JSON.stringify(err));
			}
		});
	}

	catch (err) {
		console.log('Inserted_Shift_Managers_Details Error Occured' + err);
	}
}
/*
 * For get_shift_Managers_Details
 */
function get_shift_Managers_Details() {
	try {
		var siteid = localStorage.getItem('active_SiteId');
		var json_tlDetails = {
			"siteId" : siteid
		};

		var strUrl = Service.getShiftManagersDetails;
		$.ajax({
			type : "POST",
			url : strUrl,
			dataType : "json",
			data : JSON.stringify(json_tlDetails),
			contentType : "application/json",
			async : false,
			crossDomain : true,
			headers : {
				"X-TENANT-ID" : "PROCREATE"
			},
			success : function(data) {
				var responsecode = data.responseCode;
				if (responsecode !== 200) {
				} else {
					var jsonArray = data.shiftManagerControllerDTO;
					get_shift_Managers_Details_DOM(jsonArray);
				}
			},
			error : function(err) {
				console.log('In Error of  get_shift_Managers_Details ' + err);
			}

		});
	} catch (err) {
		console.log('In Error of  get_shift_Managers_Details ' + err);
	}
}

function get_shift_Managers_Details_DOM(strData) {
	$('#sm_TableId').empty();
	try {
		var sum = 0;
		for (var i = 0; i < strData.length; i++) {
			var index = i + 1;
			var tbleRow = document.createElement("tr");

			var tablcol1 = document.createElement("td");
			$(tablcol1).html(index);
			$(tbleRow).append(tablcol1);

			var tablcol2 = document.createElement("td");
			var sm_name = strData[i].sm_name;
			if (sm_name === "NA") {
				$(tablcol2).html('Not Found');
			} else {
				$(tablcol2).html(sm_name);
			}
			$(tbleRow).append(tablcol2);

			var tablcol3 = document.createElement("td");
			var sm_createddtm = strData[i].sm_createddtm;
			var date_split = sm_createddtm.split(' ');
			var time_split = date_split[1];
			var time1 = time_split.split('.');
			var time = time1[0];
			var total_date_time = date_split[0] + "  " + " " + time;
			if (total_date_time === "NA") {
				$(tablcol3).html('Not Found');
			} else {
				$(tablcol3).html(total_date_time);
			}
			$(tbleRow).append(tablcol3);

			var tablcol4 = document.createElement("td");
			var sm_isactive = strData[i].sm_isactive;
			if (sm_isactive === "false") {
				sm_isactive = "In Active";
				$(tablcol4).attr('style', 'color: red;');
			} else if (sm_isactive === "true") {
				sm_isactive = "Active";
				$(tablcol4).attr('style', 'color: blue;');
			}
			if (sm_isactive === "NA") {
				$(tablcol4).html('Not Found');
			} else {
				$(tablcol4).html(sm_isactive);
			}
			$(tbleRow).append(tablcol4);

			var sm_id = strData[i].sm_id;
			var tablcol5 = document.createElement("td");
			var deleteicon = document.createElement("i");
			$(deleteicon).addClass("f205 fas fa-toggle-on");
			$(deleteicon).attr('data-toggle', 'tooltip');
			$(deleteicon).attr('style', 'font-size: 26px; color: #7c2be2;');
			$(deleteicon).attr('data-placement', 'bottom');
			var showStatus = sm_isactive;
			if (showStatus === "Active") {
				showStatus = "In Active";
			} else if (showStatus === "In Active") {
				showStatus = "Active";
			}
			$(deleteicon).attr(
					'onclick',
					'update_TeamLeader_Status(' + sm_id + ',"' + sm_isactive
							+ '","' + showStatus + '")');
			$(deleteicon).attr('title', showStatus);
			$(tablcol5).append(deleteicon);
			$(tbleRow).append(tablcol5);

			// Appending Body Here
			$("#sm_TableId").append(tbleRow);
		}

	} catch (err) {
		console.log("get_shift_Managers_Details_DOM" + err);
	}
}

function update_TeamLeader_Status(sm_id, sm_isactive, showStatus) {

	
	var cnfrm = confirm("Do you want to update status!");
	if (cnfrm === true) {
		try {
			var createdbyid = 1;// Temporary Purpose
			var createdbyroleid = 1;// Temporary Purpose
			var createdbymoduleid = 1;// Temporary Purpose
			var inCondition = 2;// Temporary Purpose
			var sm_isactive = "false";// Temporary Purpose
			var sm_id = sm_id;// Temporary Purpose
			var sm_UserName = "test";
			var sm_UserId = 2;		
			var json_sm_Details = {
				"inCondition" : inCondition,
				"sm_id" : sm_id,
				"user_id" : sm_UserId,
				"user_name" : sm_UserName,
				"sm_createdbyid" : createdbyid,
				"sm_createdbymodid" : createdbymoduleid,
				"sm_createdbyroleid" : createdbyroleid,
				"sm_isactive" : sm_isactive

			};
			var JSON_OBJECT = JSON.stringify(json_sm_Details);
			var strUrl1 = Service.insert_Update_ShiftMangersDetails;

			$.ajax({
				type : "POST",
				url : strUrl1,
				dataType : "json",
				data : JSON.stringify(json_sm_Details),
				contentType : "application/json",
				async : false,
				crossDomain : true,
				headers : {
					"X-TENANT-ID" : "PROCREATE"
				},
				success : function(data) {
					var responsecode = data.responseCode;
					if (200 !== responsecode) {
					} else {
						if (sm_isactive === "false") {
							showstatus = "In Actived";
						}
						$('#sm_SaveId').html(showstatus+" "+' Sucessfully').css('color', "green");
						setTimeout(function() {
							window.location.reload();
						}, 2000);
					}
				},
				error : function(err) {
					console.error("Error in Inserted_Shift_Managers_Details"
							+ JSON.stringify(err));
				}
			});
		}

		catch (err) {
			console.log('Inserted_Shift_Managers_Details Error Occured' + err);
		}
	
	}

}
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
	get_Shift_Managers_Drop_Down();
	get_Shift_Team_Leaders_Details_Drop_Down();
});

/*
 * For get_Shift_Managers_Drop_Down Purpose
 */
function get_Shift_Managers_Drop_Down() {
	$("#sm_ManagerId").val('').trigger("chosen:updated");
	try {
		var siteid = localStorage.getItem('active_SiteId');
		var json_siteid = {
			"siteId" : siteid
		};
		var strUrl = Service.getShiftManagersDetails;
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
						var sm_ManagerId = "<option value=" + resData.sm_id
								+ ">" + resData.sm_name + "</option>";
						$(sm_ManagerId).appendTo('#sm_ManagerId');
					});
				}
			},
			error : function(err) {
				console.error("Error in get_Shift_Managers_Drop_Down"
						+ JSON.stringify(err));
			}
		});
	} catch (err) {
		console.log("Error in get_Shift_Managers_Drop_Down" + err);
	}
}

$("#sm_ManagerId").change(function() {
	var sm_id = $("#sm_ManagerId").val();

	get_shift_Managers_Mapping_Details(sm_id);
});

/*
 * For get_Shift_Team_Leaders_Details_Drop_Down Purpose
 */
function get_Shift_Team_Leaders_Details_Drop_Down() {
	$("#sm_TlNameId").val('').trigger("chosen:updated");
	try {
		var siteid = localStorage.getItem('active_SiteId');
		var json_siteid = {
			"siteId" : siteid
		};
		var strUrl = Service.getTeamLeadersDetailsNotin_ShiftManager;
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
					var jsonArray = data.teamLeaderControllerDTO;
					$.each(jsonArray, function(i, resData) {
						var sm_TlNameId = "<option value=" + resData.tl_id
								+ ">" + resData.tl_leadername + "</option>";
						$(sm_TlNameId).appendTo("#sm_TlNameId");
					});
				}
			},
			error : function(err) {
				console.error("Error in get_Team_Leaders_Details_Drop_Down"
						+ JSON.stringify(err));
			}
		});
	} catch (err) {
		console.log("Error in get_Team_Leaders_Details_Drop_Down" + err);
	}
}

function insert_Update_Shift_Mangers_Mapping_Details() {
	var createdbyId = 1;
	var createdbyModuleId = 1;
	var createdbyRoleId = 1;
	var incondition = 1;
	var shift_Id = 1;
	var isActive = "true";

	var sm_ManagerId = $('#sm_ManagerId').val();
	if (sm_ManagerId === '' || sm_ManagerId === "" || sm_ManagerId === "0"
			|| sm_ManagerId === undefined) {
		$('#sm_ManagerId').focus();
		$('#sm_ManagerId_Error').html('Please select shift manager').css(
				'color', "red");
		return;
	}

	var sm_TlNameId = $('#sm_TlNameId').val();
	if (sm_TlNameId === '' || sm_TlNameId === "" || sm_TlNameId === "0"
			|| sm_TlNameId === undefined) {
		$('#sm_TlNameId').focus();
		$('#sm_TlNameId_Error').html('Please select team leader').css('color',
				"red");
		return;
	}
	var json_Shift_Details = {
		"inCondition" : incondition,
		"sm_id" : shift_Id,
		"team_leaderid" : sm_TlNameId,
		"user_id" : sm_ManagerId,
		"sm_createdbyid" : createdbyId,
		"sm_createdbymodid" : createdbyModuleId,
		"sm_createdbyroleid" : createdbyRoleId,
		"sm_isactive" : isActive
	};

	var JSON_OBJECT = JSON.stringify(json_Shift_Details);
	var strUrl = Service.insert_Update_ShiftMangersTeamLeadersMappingDetails;

	$
			.ajax({
				type : "POST",
				url : strUrl,
				dataType : "json",
				data : JSON.stringify(json_Shift_Details),
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
						$('#sm_SaveId').html('Inserted Sucessfully').css(
								'color', "green");
						setTimeout(function() {
							window.location.reload();
						}, 2000);
					}
				},
				error : function(err) {
					console
							.error("Error in insert_Update_Shift_Mangers_Mapping_Details"
									+ JSON.stringify(err));
				}
			});

}
/*
 * For get_shift_Managers_Mapping_Details
 */
function get_shift_Managers_Mapping_Details(sm_id) {
	try {
		var siteid = localStorage.getItem('active_SiteId');
		var json_tlDetails = {
			"siteId" : siteid,
			"sm_id" : sm_id
		};

		var strUrl = Service.getShiftManagersTeamLeadersMappingDetails;
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
					$('#sm_Mapping_TableId').empty();
					$('#sm_Mapping_TableId').html('<tr class="odd"><td valign="top" colspan="6" class="dataTables_empty" style="color: mediumblue;">This Shift Manager Not Mapped With Any Team Leader</td></tr>');
				} else {
					var jsonArray = data.shiftManagerControllerDTO;
					get_shift_Managers_Mapping_Details_DOM(jsonArray);
					$('[data-toggle="tooltip"]').tooltip();
				}
			},
			error : function(err) {
				console.log('In Error of  get_shift_Managers_Mapping_Details '
						+ err);
			}

		});
	} catch (err) {
		console.log('In Error of  get_shift_Managers_Mapping_Details ' + err);
	}
}

function get_shift_Managers_Mapping_Details_DOM(strData) {
	$('#sm_Mapping_TableId').empty();
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
			var team_leader_name = strData[i].team_leader_name;
			if (team_leader_name === "NA") {
				$(tablcol3).html('Not Found');
			} else {
				$(tablcol3).html(team_leader_name);
			}
			$(tbleRow).append(tablcol3);

			var tablcol4 = document.createElement("td");
			var sm_createddtm = strData[i].sm_createddtm;
			$(tablcol4).attr('style', 'width: 121px;');
			var date_split = sm_createddtm.split(' ');
			var time_split = date_split[1];
			var time1 = time_split.split('.');
			var time = time1[0];
			var total_date_time = date_split[0] + " " + time;
			if (total_date_time === "NA") {
				$(tablcol4).html('Not Found');
			} else {
				$(tablcol4).html(total_date_time);
			}
			$(tbleRow).append(tablcol4);

			var tablcol5 = document.createElement("td");
			var sm_isactive = strData[i].sm_isactive;
			if (sm_isactive === "false") {
				sm_isactive = "In Active";
				$(tablcol5).attr('style', 'color: red;');
			} else if (sm_isactive === "true") {
				sm_isactive = "Active";
				$(tablcol5).attr('style', 'color: blue;');
			}
			if (sm_isactive === "NA") {
				$(tablcol5).html('Not Found');
			} else {
				$(tablcol5).html(sm_isactive);
			}
			$(tbleRow).append(tablcol5);

			var sm_id = strData[i].sm_id;
			var tablcol6 = document.createElement("td");
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
					'update_Shift_Manager_TeamLeader_Status(' + sm_id + ',"'
							+ sm_isactive + '","' + showStatus + '")');
			$(deleteicon).attr('title', showStatus);
			$(tablcol6).append(deleteicon);
			$(tbleRow).append(tablcol6);

			// Appending Body Here
			$("#sm_Mapping_TableId").append(tbleRow);
		}

	} catch (err) {
		console.log("get_shift_Managers_Mapping_Details_DOM" + err);
	}
}

function update_Shift_Manager_TeamLeader_Status(sm_id, sm_isactive, showStatus) {

	var cnfrm = confirm("Do you want to update status!");
	if (cnfrm === true) {
		try {
			var createdbyId = 1;
			var createdbyModuleId = 1;
			var createdbyRoleId = 1;
			var incondition = 2;
			var shift_Id = sm_id;
			var isActive = "false";
			var sm_ManagerId = 2;
			var sm_teamID = 2;

			var json_sm_Details = {
				"inCondition" : incondition,
				"sm_id" : shift_Id,
				"team_leaderid" : sm_teamID,
				"user_id" : sm_ManagerId,
				"sm_createdbyid" : createdbyId,
				"sm_createdbymodid" : createdbyModuleId,
				"sm_createdbyroleid" : createdbyRoleId,
				"sm_isactive" : isActive

			};
			var JSON_OBJECT = JSON.stringify(json_sm_Details);
			var strUrl1 = Service.insert_Update_ShiftMangersTeamLeadersMappingDetails;

			$
					.ajax({
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
								if (isActive === "false") {
									showstatus = "In Actived";
								}
								$('#sm_SaveId').html(
										showstatus + " " + ' Sucessfully').css(
										'color', "green");
								setTimeout(function() {
									window.location.reload();
								}, 2000);
							}
						},
						error : function(err) {
							console
									.error("Error in update_Shift_Manager_TeamLeader_Status"
											+ JSON.stringify(err));
						}
					});
		}

		catch (err) {
			console.log('update_Shift_Manager_TeamLeader_Status Error Occured'
					+ err);
		}

	}

}
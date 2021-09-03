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
	get_Team_Leaders_Details_Drop_Down();
	get_Not_Mapped_Team_Leaders();
});

$('#tla_ResetId').click(function() {
	$("#teamLeaderId").val('').trigger("chosen:updated");
	$("#agentId").val('').trigger("chosen:updated");
});

$('#teamLeaderId').change(function() {
	$("#teamLeaderId_Error").empty();
	var teamLeaderId = $("#teamLeaderId").val();
	get_Team_Leaders_Agent_Details(teamLeaderId)
});

$('#agentId').change(function() {
	$("#agentId_Error").empty();
});
/*
 * For get_Team_Leaders_Details_Drop_Down Purpose
 */
function get_Team_Leaders_Details_Drop_Down() {
	$("#teamLeaderId").val('').trigger("chosen:updated");
	try {
		var siteid = localStorage.getItem('active_SiteId');
		var json_siteid = {
			"siteId" : siteid
		};
		var strUrl = Service.getTeamLeadersDetails;
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
						var sm_TlNameId = "<option value=" + resData.tl_id + ">"
								+ resData.tl_leadername + "</option>";
						$(sm_TlNameId).appendTo('#teamLeaderId');
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

/*
 * For get_Not_Mapped_Team_Leaders Purpose
 */
function get_Not_Mapped_Team_Leaders() {
	try {
		var siteid = localStorage.getItem('active_SiteId');
		var json_siteid = {
			"siteId" : siteid
		};
		var strUrl = Service.getNotMappedTeamLeaders_Agnets;
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
						var modules = "<option value=" + resData.tl_userid
								+ ">" + resData.tl_leadername + "</option>";
						$(modules).appendTo('#agentId');
					});
				}
			},
			error : function(err) {
				console.error("Error in get_Not_Mapped_Team_Leaders"
						+ JSON.stringify(err));
			}
		});
	} catch (err) {
		console.log("Error in get_Not_Mapped_Team_Leaders" + err);
	}
}
/*
 * For insert_Team_Leaders_Agent_Details Purpose
 */
function insert_Team_Leaders_Agent_Details() {
	try {
		var createdbyid = 1;// Temporary Purpose
		var createdbyroleid = 1;// Temporary Purpose
		var createdbymoduleid = 1;// Temporary Purpose

		var teamLeaderId = $('#teamLeaderId').val();
		if (teamLeaderId === '' || teamLeaderId === "" || teamLeaderId === null
				|| teamLeaderId === "0") {
			$('#teamLeaderId').focus();
			$('#teamLeaderId_Error').html('please select team leader').css('color',"red");
			return;
		}
		var agentId = $('#agentId').val();
		if (agentId === '' || agentId === "" || agentId === null
				|| agentId === "0") {
			$('#agentId').focus();
			$('#agentId_Error').html('please select agent').css('color',"red");
			return;
		}

		var json_tl_Details = {
			"tl_id" :teamLeaderId,
			"tl_userid" : agentId,
			"tl_createdbyid" :createdbyid,
			"tl_createdbymodid" : createdbymoduleid,
			"tl_createdbyroleid" : createdbyroleid

		};
		var JSON_OBJECT = JSON.stringify(json_tl_Details);
		var strUrl1 = Service.insertTeamLeadersAgentDetails;

		$.ajax({
			type : "POST",
			url : strUrl1,
			dataType : "json",
			data : JSON.stringify(json_tl_Details),
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
					$('#tla_SaveId').html('Agent Mapped Successfully').css('color',"green");
					setTimeout(function() {
						window.location.reload();
					}, 3000);
				}
			},
			error : function(err) {
				console.error("Error in insert_Team_Leaders_Agent_Details"
						+ JSON.stringify(err));
			}
		});
	}

	catch (err) {
		console.log('insert_Team_Leaders_Agent_Details Error Occured' + err);
	}
}

/*
 * For get_Team_Leaders_Agent_Details
 */
function get_Team_Leaders_Agent_Details(teamLeaderId) {
	try {
		var siteid = localStorage.getItem('active_SiteId');
		var tl_Id = teamLeaderId;
		var json_tl_Agent_Details = {
			"siteId" : siteid,
			"tl_id" : tl_Id
		};

		var strUrl = Service.getTeamLeadersAgentDetails;
		$.ajax({
			type : "POST",
			url : strUrl,
			dataType : "json",
			data : JSON.stringify(json_tl_Agent_Details),
			contentType : "application/json",
			async : false,
			crossDomain : true,
			headers : {
				"X-TENANT-ID" : "PROCREATE"
			},
			success : function(data) {
				var responsecode = data.responseCode;
				if (responsecode !== 200) {
					$('#tl_Mapping_TableId').html('<tr class="odd"><td valign="top" colspan="6" class="dataTables_empty" style="color: mediumblue;">This Team Leader Not Mapped With Any Agent</td></tr>');
				} else {
					var jsonArray = data.teamLeaderControllerDTO;
					get_Team_Leaders_Agent_Details_DOM(jsonArray);
					$('[data-toggle="tooltip"]').tooltip();
				}
			},
			error : function(err) {
				console.log('In Error of  get_Team_Leaders_Agent_Details '
						+ err);
			}

		});
	} catch (err) {
		console.log('In Error of  get_Team_Leaders_Agent_Details ' + err);
	}
}

function get_Team_Leaders_Agent_Details_DOM(strData) {
	$('#tl_Mapping_TableId').empty();
	try {
		var sum = 0;
		for (var i = 0; i < strData.length; i++) {
			var index = i + 1;
			var tbleRow = document.createElement("tr");

			var tablcol1 = document.createElement("td");
			$(tablcol1).html(index);
			$(tbleRow).append(tablcol1);

			var tablcol2 = document.createElement("td");
			var tl_leadername = strData[i].tl_leadername;
			if (tl_leadername === "NA") {
				$(tablcol2).html('Not Found');
			} else {
				$(tablcol2).html(tl_leadername);
			}
			$(tbleRow).append(tablcol2);

			var tablcol3 = document.createElement("td");
			var tl_agentname = strData[i].tl_agentname;
			if (tl_agentname === "NA") {
				$(tablcol3).html('Not Found');
			} else {
				$(tablcol3).html(tl_agentname);
			}
			$(tbleRow).append(tablcol3);

			var tablcol4 = document.createElement("td");
			var tl_createddtm = strData[i].tl_createddtm;
			var date_split = tl_createddtm.split(' ');
			var time_split = date_split[1];
			var time1 = time_split.split('.');
			var time = time1[0];
			var total_date_time = date_split[0] + "  " + " " + time;
			if (total_date_time === "NA") {
				$(tablcol4).html('Not Found');
			} else {
				$(tablcol4).html(total_date_time);
			}
			$(tbleRow).append(tablcol4);

			var tablcol5 = document.createElement("td");
			var tl_isactive = strData[i].tl_isactive;
			if (tl_isactive === "false") {
				tl_isactive = "In Active";
				$(tablcol5).attr('style', 'color: red;');
			} else if (tl_isactive === "true") {
				tl_isactive = "Active";
				$(tablcol5).attr('style', 'color: blue;');
			}
			if (tl_isactive === "NA") {
				$(tablcol5).html('Not Found');
			} else {
				$(tablcol5).html(tl_isactive);
			}
			$(tbleRow).append(tablcol5);

			var tl_agentid = strData[i].tl_agentid;
			
			var tablcol6 = document.createElement("td");
			var updateicon = document.createElement("i");
			$(updateicon).addClass("f205 fas fa-toggle-on");
			$(updateicon).attr('data-toggle', 'tooltip');
			$(updateicon).attr('style', 'font-size: 26px; color: #7c2be2;');
			$(updateicon).attr('data-placement', 'bottom');
			var showStatus = tl_isactive;
			if (showStatus === "Active") {
				showStatus = "In Active";
			} else if (showStatus === "In Active") {
				showStatus = "Active";
			}
			$(updateicon).attr('onclick','update_TeamLeader_Agent_Status(' + tl_agentid + ',"' + tl_isactive+ '","' + showStatus + '")');
			$(updateicon).attr('title', showStatus);
			$(tablcol6).append(updateicon);
			$(tbleRow).append(tablcol6);

			// Appending Body Here
			$("#tl_Mapping_TableId").append(tbleRow);
		}

	} catch (err) {
		console.log("get_Team_Leaders_Agent_Details_DOM" + err);
	}
}

function update_TeamLeader_Agent_Status(tl_agentid, tl_isactive, showStatus) {
	try {
		if (tl_isactive === "In Active") {
			tl_isactive = "true";
		} else if (tl_isactive === "Active") {
			tl_isactive = "false";
		}
		var cnfrm = confirm("Do you want to update status!");
		if (cnfrm === true) {
			var tl_agentid = tl_agentid;
			var tl_isactive = tl_isactive;
			var json_up_status = {
				"tl_agentid" : tl_agentid,
				"tl_isactive" : tl_isactive
			};

			var strUrl = Service.updateTeamLeadersAgentDetailsStatus;
			$
					.ajax({
						type : "POST",
						url : strUrl,
						dataType : "json",
						data : JSON.stringify(json_up_status),
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
								if (showStatus === "Active") {
									showStatus = "Activated";
								} else if (showStatus === "In Active") {
									showStatus = "In  Activated";
								}
								$("#tla_SaveId").html('Agent Mapping' + " " + showStatus + " "+ 'Succesfully').css('color','green');
								setTimeout(function() {
									window.location.reload();
								}, 3000);
							}
						},
						error : function(err) {
							console
									.log('In Error of  Team_Leaders_Agent_Details_Status '
											+ err);
						}
					});
		} else {
		}

	} catch (err) {
		console.log('In Error of  Team_Leaders_Agent_Details_Status ' + err);
	}

}
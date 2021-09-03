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
	get_Not_Mapped_Team_Leaders();
	get_Team_Leaders_Details();
});

$('#tl_ResetId').click(function() {
	$("#tl_UserName").val('').trigger("chosen:updated");
});

$('#tl_UserName').change(function() {
	$("#tl_UserName_Error").empty();
});

/*
 * For get_Not_Mapped_Team_Leaders Purpose
 */
function get_Not_Mapped_Team_Leaders() {
	$("#tl_UserName").val('').trigger("chosen:updated");
	try {
		var siteid = localStorage.getItem('active_SiteId');
		var json_siteid = {
			"siteId" : siteid
		};
		var strUrl = Service.getNotMappedTeamLeaders;
		$
				.ajax({
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
								var modules = "<option value="
										+ resData.tl_userid + ","
										+ resData.tl_leadername + ">"
										+ resData.tl_leadername + "</option>";
								$(modules).appendTo('#tl_UserName');
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
 * For insert_Team_Leaders_Details Purpose
 */
function insert_Team_Leaders_Details() {
	try {
		var createdbyid = 1;// Temporary Purpose
		var createdbyroleid = 1;// Temporary Purpose
		var createdbymoduleid = 1;// Temporary Purpose

		var tl_UserName = $('#tl_UserName').val();
		var bfr_tl_UserName_Split = tl_UserName.split(',')
		var tl_userID = bfr_tl_UserName_Split[0];
		var tl_UserName = bfr_tl_UserName_Split[1];
		if (tl_userID === '' || tl_userID === "" || tl_userID === null
				|| tl_userID === "0") {
			$('#tl_UserName').focus();
			$('#tl_UserName_Error').html('please select user').css('color',
					"red");
			return;
		}

		var json_tl_Details = {
			"tl_userid" : tl_userID,
			"tl_leadername" : tl_UserName,
			"tl_createdbyid" : createdbyid,
			"tl_createdbymodid" : createdbymoduleid,
			"tl_createdbyroleid" : createdbyroleid

		};
		var JSON_OBJECT = JSON.stringify(json_tl_Details);
		var strUrl1 = Service.insertTeamLeadersDetails;

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
					$('#tl_SaveId').html('Team Leader Designation Added Successfully').css('color',
							"green");
					setTimeout(function() {
						window.location.reload();
					}, 3000);
				}
			},
			error : function(err) {
				console.error("Error in insert_Team_Leaders_Details"
						+ JSON.stringify(err));
			}
		});
	}

	catch (err) {
		console.log('insert_Team_Leaders_Details Error Occured' + err);
	}
}
/*
 * For get_Team_Leaders_Details
 */
function get_Team_Leaders_Details() {
	try {
		var siteid = localStorage.getItem('active_SiteId');
		var json_tlDetails = {
			"siteId" : siteid
		};

		var strUrl = Service.getTeamLeadersDetails;
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
					var jsonArray = data.teamLeaderControllerDTO;
					get_Team_Leaders_Details_DOM(jsonArray);
				}
			},
			error : function(err) {
				console.log('In Error of  get_Team_Leaders_Details ' + err);
			}

		});
	} catch (err) {
		console.log('In Error of  get_Team_Leaders_Details ' + err);
	}
}

function get_Team_Leaders_Details_DOM(strData) {
	$('#tl_TableId').empty();
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
			var tl_createddtm = strData[i].tl_createddtm;
			var date_split = tl_createddtm.split(' ');
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
			var tl_isactive = strData[i].tl_isactive;
			if (tl_isactive === "false") {
				tl_isactive = "In Active";
				$(tablcol4).attr('style', 'color: red;');
			} else if (tl_isactive === "true") {
				tl_isactive = "Active";
				$(tablcol4).attr('style', 'color: blue;');
			}
			if (tl_isactive === "NA") {
				$(tablcol4).html('Not Found');
			} else {
				$(tablcol4).html(tl_isactive);
			}
			$(tbleRow).append(tablcol4);

			var userId = strData[i].tl_id;
			var tablcol5 = document.createElement("td");
			var deleteicon = document.createElement("i");
			$(deleteicon).addClass("f205 fas fa-toggle-on");
			$(deleteicon).attr('data-toggle', 'tooltip');
			$(deleteicon).attr('style', 'font-size: 26px; color: #7c2be2;');
			$(deleteicon).attr('data-placement', 'bottom');
			var showStatus = tl_isactive;
			if (showStatus === "Active") {
				showStatus = "In Active";
			} else if (showStatus === "In Active") {
				showStatus = "Active";
			}
			$(deleteicon).attr('onclick','update_TeamLeader_Status(' + userId + ',"' + tl_isactive+ '","' + showStatus + '")');
			$(deleteicon).attr('title', showStatus);
			$(tablcol5).append(deleteicon);
			$(tbleRow).append(tablcol5);

			// Appending Body Here
			$("#tl_TableId").append(tbleRow);
		}

	} catch (err) {
		console.log("get_Team_Leaders_Details_DOM" + err);
	}
}

function update_TeamLeader_Status(userId, tl_isactive, showStatus) {
	try {
		if (tl_isactive === "In Active") {
			tl_isactive = "true";
		} else if (tl_isactive === "Active") {
			tl_isactive = "false";
		}
		var cnfrm = confirm("Do you want to update status!");
		if (cnfrm === true) {
			var userId = userId;
			var tl_isactive = tl_isactive;
			var json_up_status = {
				"tl_id" : userId,
				"tl_isactive" :tl_isactive
			};

			var strUrl = Service.updateTeamLeaderStatus;
			$.ajax({
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
						alert('NO DATA FOUND');
					} else {
						if (showStatus === "Active") {
							showStatus = "Activated";
						} else if (showStatus === "In Active") {
							showStatus = "In  Activated";
						}
						$("#tl_SaveId").html('Team leader' + " " + showStatus + " "+ 'Succesfully').css('color','green');
						setTimeout(function() {
							window.location.reload();
						}, 3000);
					}
				},
				error : function(err) {
					console.log('In Error of  update_Sites_Status ' + err);
				}
			});
		} else {
		}

	} catch (err) {
		console.log('In Error of  update_Sites_Status ' + err);
	}

}
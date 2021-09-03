/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * For getting getNormalComplaint Details. 30-11-2019 inputs :no
 */
// getting normal complaint of Complaint Logger

var token_id = localStorage.getItem("token");

function getNormalComplaint() {
	$('#finalReply').empty();
	$('#normalComplaintTable').empty();
	var userId = localStorage.getItem("userID");
	var roleid = localStorage.getItem("roleid");
	console.log("token_id====>" + token_id);
	console.log("userId====>" + userId)
	var objJson = {
		"complaintTypeId" : 1,// 1 for normal complaint
		"userid" : userId
	}
	try {
		var strUrl = Service.getNormalComplaint;
		$.ajax({
			type : "POST",
			url : strUrl,
			dataType : "json",
			data : JSON.stringify(objJson),
			contentType : "application/json",
			async : false,
			crossDomain : true,
			headers : {
			'Access-Control-Allow-Origin': '*',
		    'Access-Control-Allow-Origin':  'http://192.168.1.191:3000',
		    	'Access-Control-Allow-Methods': 'POST',
		    	'Access-Control-Allow-Headers': 'Content-Type, Authorization',
				'Accept' : 'application/json',
				'Content-Type' : 'application/json',
				 "X-TENANT-ID": "PROCREATE",
				 'Access-Control-Allow-Origin': '*',
				"Authorization" : 'Bearer ' + token_id,
			},
			success : function(data) {
				var responseCode = data.responseCode;
				$('#servicepointDataTable').empty();
				if (200 !== responseCode || data.status === "NO_DATA_FOUND") {
					var divTag = document.createElement("h2");
					$(divTag).css("text-align", "center");
					$(divTag).html("No data available");
					$('#servicepointDataTable').append(divTag);

				} else {
					var jsonArray = data.complaintResponseControllerDTO;
					console.log("Json---->" + JSON.stringify(jsonArray));
					if (jsonArray.length > 0) {
						getNormalComplaint_DOM(jsonArray);
						loadDataTable();
					}
				}
			},
			error : function(err) {
				console.error('getServicePointRegistationDetails error: '
						+ JSON.stringify(err));
			}
		});
	} catch (err) {
		console.error("error occur in search()" + JSON.stringify(err));
	}
}

// For data table loading.
function getNormalComplaint_DOM(strData) {
	try {
		// For Div Tag
		var objDivTag = document.createElement('div');
		$(objDivTag).addClass("table-responsive");

		// For table
		var ObjTableTag = document.createElement("table");
		$(ObjTableTag)
				.addClass(
						"table table-striped table-bordered table-hover dataTables-example");
		$(objDivTag).append(ObjTableTag);
		// For table head
		var objTHead = document.createElement("thead");
		$(ObjTableTag).append(objTHead);

		// For table row
		var objTr = document.createElement("tr");
		$(objTHead).append(objTr);

		// For table Heading1
		var objTHead1 = document.createElement("th");
		$(objTHead1).html('S.NO');
		$(objTr).append(objTHead1);

		// For table Heading2
		var objTHead2 = document.createElement('th');
		$(objTHead2).html('Call Id');
		$(objTr).append(objTHead2);

		// For table Heading2
		var objTHead3 = document.createElement('th');
		$(objTHead3).html('Nature Of Complaint');
		$(objTr).append(objTHead3);

		// For table Heading3
		var objTHead4 = document.createElement('th');
		$(objTHead4).html('Current Status');
		$(objTr).append(objTHead4);

		// For table Heading3
		var objTHead4 = document.createElement('th');
		$(objTHead4).html('Complaint Completed Days');
		$(objTr).append(objTHead4);

		// For table Heading4
		var objTHead4 = document.createElement('th');
		$(objTHead4).html('Complaint Date');
		$(objTr).append(objTHead4);
		var objTBody = document.createElement("tbody");
		$(objTBody).attr("id", "tbodyData");
		$(ObjTableTag).append(objTBody);

		// Table Data Appending Here
		for (var i = 0; i < strData.length; i++) {
			var index = i + 1;
			var tbleRow = document.createElement("tr");

			var tablcol1 = document.createElement("td");

			$(tablcol1).addClass('text-center');
			var tablcol1 = document.createElement("td");
			$(tablcol1).html(index);
			$(tbleRow).append(tablcol1);
			if (strData[i].statusType == "Final Reply Provided") {
				$(tablcol1).addClass('greenBg')
			}
			if (strData[i].statusType == "Interim Reply Provided") {
				$(tablcol1).addClass('yellowBg');
			}

			var tablcol2 = document.createElement("td");
			$(tablcol2).addClass('text-center');
			// $(tablcol2).html(strData[i].districtName);
			$(tablcol2).append('<a href="#">' + strData[i].eventId + '</a>');
			$(tablcol2).attr(
					'onclick',
					'getSingleRecordOfNormalComplaints("'
							+ strData[i].complaintTypeId + '","'
							+ strData[i].eventId + '","'
							+ strData[i].complaintDescription + '","'
							+ strData[i].natureOfComplaints + '","'
							+ strData[i].city + '","' + strData[i].mandal
							+ '","' + strData[i].district + '","'
							+ strData[i].state + '","' + strData[i].country
							+ '","' + strData[i].complaintToWhom + '","'
							+ strData[i].designation + '","'
							+ strData[i].complaintRefrencedate + '","'
							+ strData[i].interimReply + '","'
							+ strData[i].finalReply + '","'
							+ strData[i].institueName + '","'
							+ strData[i].statusType + '","' + strData[i].days
							+ '","' + strData[i].noOfpersonEffected + '","'
							+ strData[i].complaintRegistationId + '","'
							+ strData[i].tomobileNo + '","'
							+ strData[i].callerEmailid + '","'
							+ strData[i].interimReply + '","'
							+ strData[i].finalReply + '")');
			$(tbleRow).append(tablcol2);
			if (strData[i].statusType == "Final Reply Provided") {
				$(tablcol2).addClass('greenBg')
			}
			if (strData[i].statusType == "Interim Reply Provided") {
				$(tablcol2).addClass('yellowBg');
			}
			// hidden Id
			$('#registaionId').val(strData[i].complaintRegistationId);

			var tablcol3 = document.createElement("td");
			$(tablcol3).addClass('text-center');
			$(tablcol3).html(strData[i].natureOfComplaints);
			$(tbleRow).append(tablcol3);
			if (strData[i].statusType == "Final Reply Provided") {
				$(tablcol3).addClass('greenBg')
			}
			if (strData[i].statusType == "Interim Reply Provided") {
				$(tablcol3).addClass('yellowBg');
			}

			var tablcol3 = document.createElement("td");
			$(tablcol3).addClass('text-center');
			$(tablcol3).html(strData[i].statusType);
			$(tbleRow).append(tablcol3);
			if (strData[i].statusType == "Final Reply Provided") {
				$(tablcol3).addClass('greenBg')
			}
			if (strData[i].statusType == "Interim Reply Provided") {
				$(tablcol3).addClass('yellowBg');
			}

			var tablcol3 = document.createElement("td");
			$(tablcol3).addClass('text-center');
			$(tablcol3).html(strData[i].days);
			$(tbleRow).append(tablcol3);
			if (strData[i].statusType == "Final Reply Provided") {
				$(tablcol3).addClass('greenBg')
			}
			if (strData[i].statusType == "Interim Reply Provided") {
				$(tablcol3).addClass('yellowBg');
			}

			var tablcol4 = document.createElement("td");
			$(tablcol4).addClass('text-center');
			$(tablcol4).html(strData[i].complaintRefrencedate);
			$(tbleRow).append(tablcol4);
			if (strData[i].statusType == "Final Reply Provided") {
				$(tablcol4).addClass('greenBg')
			}
			if (strData[i].statusType == "Interim Reply Provided") {
				$(tablcol4).addClass('yellowBg');
			}
			// $(tablcol4).addClass('greenBg')
			$(objTBody).append(tbleRow);
		}
		$("#normalComplaintTable").append(objDivTag);

	} catch (err) {
		console.log("normalComplaintTable" + err);
	}
}

// getting single record of Normal Complaint
function getSingleRecordOfNormalComplaints(complaintTypeId, eventId,
		complaintDescription, natureOfComplaints, city, mandal, district,
		state, country, complaintToWhom, designation, complaintRefrencedate,
		interimReply, finalReply, institueName, statusType, days,
		noOfpersonEffected, complaintRegistationId, tomobileNo, emailid,
		interimReply, finalReply) {
	$("#status_TypeId").val(statusType);
	$('#interimReply').empty();
	$('#finalReply').empty();
	$('#normalcomplaint').modal('show');
	$('#event_id').val(eventId);
	$('#email_id').val(emailid);
	$('#comregistationId').val(complaintRegistationId);
	$('#mobile_no').val(tomobileNo);
	document.getElementById("interimReply").disabled = false;
	document.getElementById("finalReply").disabled = false;
	var event_id = "Complaint Id: " + eventId
	$('#registration1').modal('show');
	$('#callid').empty();
	$("#complaint_Type").empty();
	$('#gist_complaintByAgent').empty();
	$('#natureofcomplaint').empty();
	$('#complaintAgainstWhichInsitution').empty();
	$('#complaintADistrict').empty();
	$('#complaintCity').empty();
	$('#complaintMandal').empty();
	$('#designation').empty();
	$('#ComlaintRefdate').empty();
	$("#callid").append(event_id);
	$("#complaint_Type").append(complaintTypeId)
	$('#gist_complaintByAgent').append(complaintDescription)
	$('#natureofcomplaint').append(natureOfComplaints)
	$('#complaintAgainstWhichInsitution').append(institueName)
	$('#complaintADistrict').append(district)
	$('#complaintMandal').append(mandal)
	$('#complaintCity').append(city)
	$('#designation').append(designation)
	$('#ComlaintRefdate').append(complaintRefrencedate);
	$('#interimReply').append(interimReply);
	$('#finalReply').append(finalReply);
	if (statusType == "Complaint Approved"
			|| statusType == "Approved by Supervisor") {
		// document.getElementById("interimReply").disabled = true;
		document.getElementById("finalReply").disabled = true;
		$('#normalcombtn').show();
		$('#nresert').show();
	}
	if (statusType == "Interim Reply Provided") {
		document.getElementById("interimReply").disabled = true;
		// document.getElementById("finalReply").disabled = true;
		$('#normalcombtn').show();
		$('#nresert').show();
	}
	if (statusType == "Final Reply Provided") {
		document.getElementById("interimReply").disabled = true;
		document.getElementById("finalReply").disabled = true;
		$('#normalcombtn').hide();
		$('#nresert').hide();
	} else {
		$('#normalcombtn').show();
		$('#nresert').show();
	}
}

/**
 * Getting data of getEpidemicComplaints Details. 22-11-2020
 */
function getEpidemicComplaint() {
	var userId = localStorage.getItem("userID");
	var roleid = localStorage.getItem("roleid");
	$('#epidemicComplaintTable1').empty();
	var objJson = {
		"complaintTypeId" : 2,// complaint type id 1 for epidemic complaint
		"userid" : userId,
	// "createdbyroleid" : 168
	}
	try {
		var strUrl = Service.getEpidemicComplaint;
		console.log("strUrl : " + strUrl);
		$.ajax({
			type : "POST",
			url : strUrl,
			dataType : "json",
			data : JSON.stringify(objJson),
			contentType : "application/json",
			async : false,
			crossDomain : true,
			headers : {
				'Accept' : 'application/json',
				'Content-Type' : 'application/json',
				"X-TENANT-ID" : "PROCREATE",
				'Access-Control-Allow-Origin' : '*',
				// 'Authorization': 'Bearer ' + token
				"Authorization" : 'Bearer ' + token_id,
			},
			success : function(data) {
				console.log("data : " + data);
				var responseCode = data.responseCode;
				$('#epidemicComplaintTable').empty();
				if (200 !== responseCode || data.status === "NO_DATA_FOUND") {
					var divTag = document.createElement("h2");
					$(divTag).css("text-align", "center");
					$(divTag).html("No data available");
					$('#epidemicComplaintTable').append(divTag);

				} else {
					var jsonArray = data.complaintResponseControllerDTO;
					console.log("Epidemic Json---->"
							+ JSON.stringify(jsonArray));
					if (jsonArray.length > 0) {
						getEpidemicComplaints_DOM1(jsonArray);
						loadDataTable1();
					}
				}
			},
			error : function(err) {
				console.error('getServicePointRegistationDetails error: '
						+ JSON.stringify(err));
			}
		});
	} catch (err) {
		console.error("error occur in search()" + JSON.stringify(err));
	}
}

// For data table loading.
function getEpidemicComplaints_DOM1(strData) {
	try {
		// For Div Tag
		var objDivTag = document.createElement('div');
		$(objDivTag).addClass("table-responsive");

		// For table
		var ObjTableTag = document.createElement("table");
		$(ObjTableTag)
				.addClass(
						"table table-striped table-bordered table-hover dataTables-example1");
		$(objDivTag).append(ObjTableTag);
		// For table head
		var objTHead = document.createElement("thead");
		$(ObjTableTag).append(objTHead);

		// For table row
		var objTr = document.createElement("tr");
		$(objTHead).append(objTr);

		// For table Heading1
		var objTHead1 = document.createElement("th");
		$(objTHead1).html('S.NO');
		$(objTr).append(objTHead1);

		// For table Heading2
		var objTHead2 = document.createElement('th');
		$(objTHead2).html('Call Id');
		$(objTr).append(objTHead2);

		// For table Heading3
		var objTHead3 = document.createElement('th');
		$(objTHead3).html('Epidemic Type');
		$(objTr).append(objTHead3);

		// For table Heading3
		var objTHead3 = document.createElement('th');
		$(objTHead3).html('Current Status');
		$(objTr).append(objTHead3);

		// For table Heading3
		var objTHead3 = document.createElement('th');
		$(objTHead3).html('Complaint Completed Days');
		$(objTr).append(objTHead3);

		// For table Heading4 epidemicType
		var objTHead4 = document.createElement('th');
		$(objTHead4).html('Complaint Date');
		$(objTr).append(objTHead4);
		var objTBody = document.createElement("tbody");
		$(objTBody).attr("id", "tbodyData");
		$(ObjTableTag).append(objTBody);

		// Table Data Appending Here

		for (var i = 0; i < strData.length; i++) {

			var index = i + 1;
			var tbleRow = document.createElement("tr");

			var tablcol1 = document.createElement("td");

			$(tablcol1).addClass('text-center');
			var tablcol1 = document.createElement("td");
			$(tablcol1).html(index);
			$(tbleRow).append(tablcol1);
			if (strData[i].statusType == "Final Reply Provided") {
				$(tablcol1).addClass('greenBg')
			}
			if (strData[i].statusType == "Interim Reply Provided") {
				$(tablcol1).addClass('yellowBg');
			}

			var tablcol2 = document.createElement("td");
			$(tablcol2).addClass('text-center');
			$(tablcol2).append('<a href="#">' + strData[i].eventId + '</a>');
			$(tablcol2).attr(
					'onclick',
					'getSingleRecordEpidemicComplaint("'
							+ strData[i].complaintTypeId + '","'
							+ strData[i].eventId + '","'
							+ strData[i].complaintDescription + '","'
							+ strData[i].natureOfComplaints + '","'
							+ strData[i].city + '","' + strData[i].mandal
							+ '","' + strData[i].district + '","'
							+ strData[i].state + '","' + strData[i].country
							+ '","' + strData[i].complaintToWhom + '","'
							+ strData[i].designation + '","'
							+ strData[i].complaintRefrencedate + '","'
							+ strData[i].interimReply + '","'
							+ strData[i].finalReply + '","'
							+ strData[i].institueName + '","'
							+ strData[i].statusType + '","' + strData[i].days
							+ '","' + strData[i].noOfpersonEffected + '","'
							+ strData[i].complaintRegistationId + '","'
							+ strData[i].tomobileNo + '","'
							+ strData[i].callerEmailid + '","'
							+ strData[i].interimReply + '","'
							+ strData[i].finalReply + '")');
			$(tbleRow).append(tablcol2);
			if (strData[i].statusType == "Final Reply Provided") {
				$(tablcol2).addClass('greenBg')
			}
			if (strData[i].statusType == "Interim Reply Provided") {
				$(tablcol2).addClass('yellowBg');
			}

			var tablcol3 = document.createElement("td");
			$(tablcol3).addClass('text-center');
			$(tablcol3).html(strData[i].epidemicType);
			$(tbleRow).append(tablcol3);
			if (strData[i].statusType == "Final Reply Provided") {
				$(tablcol3).addClass('greenBg')
			}
			if (strData[i].statusType == "Interim Reply Provided") {
				$(tablcol3).addClass('yellowBg');
			}

			var tablcol3 = document.createElement("td");
			$(tablcol3).addClass('text-center');
			$(tablcol3).html(strData[i].statusType);
			$(tbleRow).append(tablcol3);
			if (strData[i].statusType == "Final Reply Provided") {
				$(tablcol3).addClass('greenBg')
			}
			if (strData[i].statusType == "Interim Reply Provided") {
				$(tablcol3).addClass('yellowBg');
			}

			var tablcol3 = document.createElement("td");
			$(tablcol3).addClass('text-center');
			$(tablcol3).html(strData[i].days);
			$(tbleRow).append(tablcol3);
			if (strData[i].statusType == "Final Reply Provided") {
				$(tablcol3).addClass('greenBg')
			}
			if (strData[i].statusType == "Interim Reply Provided") {
				$(tablcol3).addClass('yellowBg');
			}

			var tablcol4 = document.createElement("td");
			$(tablcol4).addClass('text-center');
			$(tablcol4).html(strData[i].complaintRefrencedate);
			$(tbleRow).append(tablcol4);
			if (strData[i].statusType == "Final Reply Provided") {
				$(tablcol4).addClass('greenBg')
			}
			if (strData[i].statusType == "Interim Reply Provided") {
				$(tablcol4).addClass('yellowBg');
			}
			$(objTBody).append(tbleRow);
		}
		$("#epidemicComplaintTable1").append(objDivTag);

	} catch (err) {
		console.log("epidemicComplaintTable" + err);
	}
}

/**
 * Getting data of getEpidemicComplaints Details. 22-11-2020
 */
function getAllEscalatedComplaint() {
	$('#escalatedid').empty();
	var userId = localStorage.getItem("userID");
	var roleid = localStorage.getItem("roleid");
	var objJson = {
		// "complaintTypeId" : 2,// complaint type id 1 for epidemic complaint
		"userid" : userId,
	// "createdbyroleid" : 168
	}
	try {
		var strUrl = Service.getAllEscalatedComplaints;
		console.log("strUrl : " + strUrl);
		$.ajax({
			type : "POST",
			url : strUrl,
			dataType : "json",
			data : JSON.stringify(objJson),
			contentType : "application/json",
			async : false,
			crossDomain : true,
			headers : {
				'Accept' : 'application/json',
				'Content-Type' : 'application/json',
				"X-TENANT-ID" : "PROCREATE",
				'Access-Control-Allow-Origin' : '*',
				// 'Authorization': 'Bearer ' + token
				"Authorization" : 'Bearer ' + token_id,
			},
			success : function(data) {
				console.log("data : " + data);
				var responseCode = data.responseCode;

				$('#escalatedid').empty();
				if (200 !== responseCode || data.status === "NO_DATA_FOUND") {
					var divTag = document.createElement("h2");
					$(divTag).css("text-align", "center");
					$(divTag).html("No data available");
					$('#escalatedid').append(divTag);
				} else {
					var jsonArray = data.complaintResponseControllerDTO;
					console.log("Epidemic Json---->"
							+ JSON.stringify(jsonArray));
					if (jsonArray.length > 0) {
						getAllEscalatedComplaints_DOM(jsonArray);
						loadDataTable2();
					}
				}
			},
			error : function(err) {
				console.error('getServicePointRegistationDetails error: '
						+ JSON.stringify(err));
			}
		});
	} catch (err) {
		console.error("error occur in search()" + JSON.stringify(err));
	}
}

// For data table loading.
function getAllEscalatedComplaints_DOM(strData) {
	$('#escalatedid').empty();
	try {
		// For Div Tag
		var objDivTag = document.createElement('div');
		$(objDivTag).addClass("table-responsive");

		// For table
		var ObjTableTag = document.createElement("table");
		$(ObjTableTag)
				.addClass(
						"table table-striped table-bordered table-hover dataTables-example2");
		$(objDivTag).append(ObjTableTag);
		// For table head
		var objTHead = document.createElement("thead");
		$(ObjTableTag).append(objTHead);

		// For table row
		var objTr = document.createElement("tr");
		$(objTHead).append(objTr);

		// For table Heading1
		var objTHead1 = document.createElement("th");
		$(objTHead1).html('S.NO');
		$(objTr).append(objTHead1);

		// For table Heading2
		var objTHead2 = document.createElement('th');
		$(objTHead2).html('Call Id');
		$(objTr).append(objTHead2);

		// For table Heading3
		var objTHead3 = document.createElement('th');
		$(objTHead3).html('Nature Of Complaint');
		$(objTr).append(objTHead3);

		// For table Heading3
		var objTHead3 = document.createElement('th');
		$(objTHead3).html('Epidemic Type');
		$(objTr).append(objTHead3);

		// For table Heading3
		var objTHead3 = document.createElement('th');
		$(objTHead3).html('Current Status');
		$(objTr).append(objTHead3);

		// For table Heading3
		var objTHead3 = document.createElement('th');
		$(objTHead3).html('Complaint Completed Days');
		$(objTr).append(objTHead3);

		// For table Heading4 epidemicType
		var objTHead4 = document.createElement('th');
		$(objTHead4).html('Complaint Date');
		$(objTr).append(objTHead4);
		var objTBody = document.createElement("tbody");
		$(objTBody).attr("id", "tbodyData");
		$(ObjTableTag).append(objTBody);

		// Table Data Appending Here

		for (var i = 0; i < strData.length; i++) {

			var index = i + 1;
			var tbleRow = document.createElement("tr");

			var tablcol1 = document.createElement("td");

			$(tablcol1).addClass('text-center');
			var tablcol1 = document.createElement("td");
			$(tablcol1).html(index);
			$(tbleRow).append(tablcol1);
			if (strData[i].statusType == "Final Reply Provided") {
				$(tablcol1).addClass('greenBg')
			}
			if (strData[i].statusType == "Interim Reply Provided") {
				$(tablcol1).addClass('yellowBg');
			}

			var tablcol2 = document.createElement("td");
			$(tablcol2).addClass('text-center');
			$(tablcol2).append('<a href="#">' + strData[i].eventId + '</a>');
			$(tablcol2).attr(
					'onclick',
					'getSingleRecordEpidemicComplaint("'
							+ strData[i].complaintTypeId + '","'
							+ strData[i].eventId + '","'
							+ strData[i].complaintDescription + '","'
							+ strData[i].natureOfComplaints + '","'
							+ strData[i].city + '","' + strData[i].mandal
							+ '","' + strData[i].district + '","'
							+ strData[i].state + '","' + strData[i].country
							+ '","' + strData[i].complaintToWhom + '","'
							+ strData[i].designation + '","'
							+ strData[i].complaintRefrencedate + '","'
							+ strData[i].interimReply + '","'
							+ strData[i].finalReply + '","'
							+ strData[i].institueName + '","'
							+ strData[i].statusType + '","' + strData[i].days
							+ '","' + strData[i].noOfpersonEffected + '","'
							+ strData[i].complaintRegistationId + '","'
							+ strData[i].tomobileNo + '","'
							+ strData[i].callerEmailid + '","'
							+ strData[i].interimReply + '","'
							+ strData[i].finalReply + '")');
			$(tbleRow).append(tablcol2);
			if (strData[i].statusType == "Final Reply Provided") {
				$(tablcol2).addClass('greenBg')
			}
			if (strData[i].statusType == "Interim Reply Provided") {
				$(tablcol2).addClass('yellowBg');
			}

			var tablcol3 = document.createElement("td");
			$(tablcol3).addClass('text-center');
			$(tablcol3).html(strData[i].natureOfComplaints);
			$(tbleRow).append(tablcol3);
			if (strData[i].statusType == "Final Reply Provided") {
				$(tablcol3).addClass('greenBg')
			}
			if (strData[i].statusType == "Interim Reply Provided") {
				$(tablcol3).addClass('yellowBg');
			}

			var tablcol3 = document.createElement("td");
			$(tablcol3).addClass('text-center');
			$(tablcol3).html(strData[i].epidemicType);
			$(tbleRow).append(tablcol3);
			if (strData[i].statusType == "Final Reply Provided") {
				$(tablcol3).addClass('greenBg')
			}
			if (strData[i].statusType == "Interim Reply Provided") {
				$(tablcol3).addClass('yellowBg');
			}

			var tablcol3 = document.createElement("td");
			$(tablcol3).addClass('text-center');
			$(tablcol3).html(strData[i].statusType);
			$(tbleRow).append(tablcol3);
			if (strData[i].statusType == "Final Reply Provided") {
				$(tablcol3).addClass('greenBg')
			}
			if (strData[i].statusType == "Interim Reply Provided") {
				$(tablcol3).addClass('yellowBg');
			}

			var tablcol3 = document.createElement("td");
			$(tablcol3).addClass('text-center');
			$(tablcol3).html(strData[i].days);
			$(tbleRow).append(tablcol3);
			if (strData[i].statusType == "Final Reply Provided") {
				$(tablcol3).addClass('greenBg')
			}
			if (strData[i].statusType == "Interim Reply Provided") {
				$(tablcol3).addClass('yellowBg');
			}

			var tablcol4 = document.createElement("td");
			$(tablcol4).addClass('text-center');
			$(tablcol4).html(strData[i].complaintRefrencedate);
			$(tbleRow).append(tablcol4);
			if (strData[i].statusType == "Final Reply Provided") {
				$(tablcol4).addClass('greenBg')
			}
			if (strData[i].statusType == "Interim Reply Provided") {
				$(tablcol4).addClass('yellowBg');
			}
			$(objTBody).append(tbleRow);
		}
		$("#escalatedid").append(objDivTag);

	} catch (err) {
		console.log("epidemicComplaintTable1" + err);
	}
}

// getting single record of Epidemic complaint Details
function getSingleRecordEpidemicComplaint(complaintTypeId, eventId,
		complaintDescription, natureOfComplaints, city, mandal, district,
		state, country, complaintToWhom, designation, complaintRefrencedate,
		interimReply, finalReply, institueName, statusType, days,
		noOfpersonEffected, complaintRegistationId, tomobileNo, emailid,
		interimReply, finalReply) {
	$("#status_TypeId").val(statusType);
	$('#einterimReply').empty();
	$('#efinalReply').empty();
	$('#event_id').val(eventId);
	$('#comregistationId').val(complaintRegistationId);
	$('#mobile_no').val(tomobileNo);
	$('#email_id').val(emailid);
	document.getElementById("einterimReply").disabled = false;
	document.getElementById("efinalReply").disabled = false;
	$('#epidemiccomplaint').modal('show');
	var event_id = "Complaint Id: " + eventId
	$('#ecallid').empty();
	$("#ecomplaint_Type").empty();
	$('#egist_complaintByAgent').empty();
	$('#enatureofcomplaint').empty();
	$('#ecomplaintAgainstWhichInsitution').empty();
	$('#ecomplaintmandal').empty();
	$('#ecomplaintstate').empty();
	$('#ecomplaintAboutCity').empty();
	$('#edesignation').empty();
	$('#eComlaintRefdate').empty();

	$("#ecallid").append(event_id);
	$("#ecomplaint_Type").append(complaintTypeId)
	$('#egist_complaintByAgent').append(complaintDescription)
	$('#enatureofcomplaint').append(natureOfComplaints)
	$('#ecomplaintAgainstWhichInsitution').append(institueName)
	$('#ecomplaintstate').append(district)
	$('#ecomplaintmandal').append(mandal)
	$('#ecomplaintAboutCity').append(city)
	$('#edesignation').append(designation)
	$('#eComlaintRefdate').append(complaintRefrencedate);
	$('#einterimReply').append(interimReply);
	$('#efinalReply').append(finalReply)
	if (statusType == "Complaint Approved"
			|| statusType == "Approved by Supervisor") {
		// document.getElementById("interimReply").disabled = true;
		document.getElementById("efinalReply").disabled = true;
		$('#enormalcombtn').show();
		$('#eresert').show();
	}
	if (statusType == "Interim Reply Provided") {
		document.getElementById("einterimReply").disabled = true;
		// document.getElementById("efinalReply").disabled = true;
		$('#enormalcombtn').show();
		$('#eresert').show();
	}

	if (statusType == "Final Reply Provided") {
		document.getElementById("einterimReply").disabled = true;
		document.getElementById("efinalReply").disabled = true;
		$('#epidemiccombtn').hide();
		$('#eresert').hide();
	}

	else {
		$('#epidemiccombtn').show();
		$('#eresert').show();
	}
}

function onpressKeyForEpidemic() {
	console.log("___>" + $('#einterimReply').val())
	var enterimReply = $('#einterimReply').val();
	console.log("Length====>" + enterimReply.length);
	if (enterimReply.length == "" || myFunction == '') {
	} else {
		document.getElementById("efinalReply").disabled = false;
	}
}

// calling here update complaint status
function updateStatus(interimReply, finalReply) {
	var statusType;
	var interimReplyid = interimReply.trim();
	var finalReplyid = finalReply.trim();
	if (interimReplyid.length > 0 && finalReplyid.length > 0) {
		statusType = 3;
	} else {
		if (interimReplyid.length > 0 && finalReplyid.length == 0) {
			statusType = 2;
		} else {
			statusType = 3;
		}
	}
	updateStatusOfComplaintsDetails(statusType);
}

// final reply given by complaint Responce Officer for normal complaint
function finalReplyOfNormalComplaints() {
	var userId = localStorage.getItem("userID");
	var eventId = $('#event_id').val();
	var interimReply = $('#interimReply').val().trim();
	var finalReply = $('#finalReply').val().trim();
	var intermReply_Date;
	var finalReply_date;
	var intermreplygivenby_id;
	var finalreplygivenby_id;
	var status_Type = $("#status_TypeId").val();
	if (interimReply == "" || interimReply == '' || interimReply == null
			|| interimReply == " ") {
		intermReply_Date = null;
		intermreplygivenby_id = null;
		// interimReply=null;
	} else {
		intermReply_Date = "now()";
		intermreplygivenby_id = userId;
	}
	if (finalReply == "" || finalReply == '' || finalReply == null
			|| finalReply == " ") {
		finalReply_date = null;
		finalreplygivenby_id = null;
		// finalReply=null;

	} else {
		finalReply_date = "now()";
		finalreplygivenby_id = userId;
	}
	if (status_Type == "Complaint Approved"
			|| status_Type == "Approved by Supervisor") {
		if (interimReply.trim() == '' || interimReply.trim() == "") {
			showNotificationError("Please  Provide  Enterim Reply",
					"normalcombtn", "error");
			return false;
		}
		updateStatus(interimReply, finalReply);
	} else {

	}
	if (status_Type == "Interim Reply Provided") {
		if (finalReply == '' || finalReply == "" || interimReply == ''
				|| interimReply == "") {
			showNotificationError("Please  Provide  Final Reply",
					"normalcombtn", "error");
			return false;
		}
		updateStatus(interimReply, finalReply);
	} else {

	}

	var objJson = {
		"eventId" : eventId,
		"complaintTypeId" : 1,
		"finalReply" : finalReply,
		"interimReply" : interimReply,
		"finalreplygivenbyid" : finalreplygivenby_id,
		"intermreplygivenbyid" : intermreplygivenby_id,
		"finalReplyReceiveDate" : finalReply_date,
		"interimReplyRecievedate" : intermReply_Date,
	};

	var strUrl = Service.finalReplyOfNormalComplaints;
	$.ajax({
		type : "POST",
		url : strUrl,
		dataType : "json",
		data : JSON.stringify(objJson),
		contentType : "application/json",
		async : false,
		crossDomain : true,
		headers : {
			'Accept' : 'application/json',
			'Content-Type' : 'application/json',
			"X-TENANT-ID" : "PROCREATE",
			'Access-Control-Allow-Origin' : '*',
			// 'Authorization': 'Bearer ' + token
			"Authorization" : 'Bearer ' + token_id,
		},
		success : function(data) {
			var responseCode = data.responseCode;
			if (200 !== responseCode) {
				console.log("Response Code------>" + responseCode);
			} else {
				// showNotificationError("Saved Successfully", "normalcombtn",
				// "success");
				console.log("Saved Successfully");
			}

		},
		error : function() {

			console.log('In Error of  deleteVehicle ');
		}
	})
}

// final reply given by complaint Responce Officer for normal complaint
function finalReplyOfEpidemicComplaints() {
	var eventId = $('#event_id').val();
	var interim_Reply = $('#einterimReply').val();
	var final_Reply = $('#efinalReply').val();
	var userId = localStorage.getItem("userID");
	var intermReplyDate;
	var finalReplydate;
	var intermreplygivenbyid;
	var finalreplygivenbyid;
	var status_Type = $("#status_TypeId").val();
	if (interim_Reply == "" || interim_Reply == '' || interim_Reply == null
			|| interim_Reply == " ") {
		intermReplyDate = null;
		intermreplygivenbyid = null;
	} else {
		intermReplyDate = "now()";
		intermreplygivenbyid = userId;
	}
	if (final_Reply == "" || final_Reply == '' || final_Reply == null
			|| final_Reply == " ") {
		finalReplydate = null;
		finalreplygivenbyid = null;

	} else {
		finalReplydate = "now()";
		finalreplygivenbyid = userId;
	}
	if (status_Type == "Complaint Approved"
			|| status_Type == "Approved by Supervisor") {
		if (interim_Reply.trim() == "") {
			showNotificationError("Please  Provide Enterim Reply",
					"epidemiccombtn", "error");
			return false;
			;
		}
		updateStatus(interim_Reply, final_Reply);
	} else {

	}
	if (status_Type == "Interim Reply Provided") {
		if (final_Reply.trim() == "" || final_Reply == null) {
			showNotificationError("Please  Provide Final Reply",
					"epidemiccombtn", "error");
			return false;
			;
		}
		updateStatus(interim_Reply, final_Reply);
	} else {

	}

	var objJson = {
		"eventId" : eventId,
		"complaintTypeId" : 2,// Epidemic Complaint
		"finalReply" : final_Reply,
		"interimReply" : interim_Reply,
		"finalreplygivenbyid" : finalreplygivenbyid,
		"intermreplygivenbyid" : intermreplygivenbyid,
		"finalReplyReceiveDate" : finalReplydate,
		"interimReplyRecievedate" : intermReplyDate,
	};
	var strUrl = Service.finalReplyOfEpidemicComplaints;
	$.ajax({
		type : "POST",
		url : strUrl,
		dataType : "json",
		data : JSON.stringify(objJson),
		contentType : "application/json",
		async : false,
		crossDomain : true,
		headers : {
			'Accept' : 'application/json',
			'Content-Type' : 'application/json',
			"X-TENANT-ID" : "PROCREATE",
			'Access-Control-Allow-Origin' : '*',
			// 'Authorization': 'Bearer ' + token
			"Authorization" : 'Bearer ' + token_id,
		},
		success : function(data) {
			var responseCode = data.responseCode;
			if (200 !== responseCode) {
				console.log("Response Code------>" + responseCode);
			} else {

			}

		},
		error : function() {

			console.log('In Error of  deleteVehicle ');
		}
	})
}

// final reply given by complaint Responce Officer for normal complaint
function updateStatusOfComplaintsDetails(statusType) {
	var complaintRegId = $('#comregistationId').val();
	var token_id = localStorage.getItem("token");
	var objJson = {
		"complaintRegistationId" : complaintRegId,
		"statusType" : statusType,

	};
	var strUrl = Service.updateStatusOfComplaintsDetails;
	$.ajax({
		type : "POST",
		url : strUrl,
		dataType : "json",
		data : JSON.stringify(objJson),
		contentType : "application/json",
		async : false,
		crossDomain : true,
		headers : {
			'Accept' : 'application/json',
			'Content-Type' : 'application/json',
			"X-TENANT-ID" : "PROCREATE",
			'Access-Control-Allow-Origin' : '*',
			// 'Authorization': 'Bearer ' + token
			"Authorization" : 'Bearer ' + token_id,
		},
		success : function(data) {
			console.log("Saved Successfully");
			var responseCode = data.responseCode;
			if (200 !== responseCode) {
				console.log("Response Code------>" + responseCode);
			} else {
				/*
				 * showNotificationError("Message Sent Successfully",
				 * "epidemiccombtn", "success");
				 */
				insertHmSmsOutboxTreans1();
				insertHmEmailOutboxTreans();
			}

		},
		error : function() {

			console.log('In Error of  deleteVehicle ');
		}
	})
}

/**
 * functionality:insertHmSmsOutboxTreans1
 * 
 * @desc: for sending sms to caller
 * @returns 1
 */
function insertHmSmsOutboxTreans1() {
	var userId = localStorage.getItem("userID");
	var roleid = localStorage.getItem("roleid");
	var moduleid = localStorage.getItem("moduleid");
	var eventId = $('#event_id').val();
	var complaintRegId = $('#comregistationId').val();
	var mobileNo = $('#mobile_no').val();
	var message = "Your complaint will be resolved very soon Thank-You For Complaint";
	var from_mobile = 0;
	var no_of_attempts = 0;
	var msgSentDtm = 'now()';
	var objJson = {
		"eventId" : eventId,
		"inboxId" : 0,
		"message" : message,
		"tomobileNo" : mobileNo,
		"from_mobile" : from_mobile,
		"no_of_attempts" : no_of_attempts,
		"msg_sent_dtm" : msgSentDtm,
		"createdbyid" : userId,
		"createdbymoduleid" : moduleid,
		"createdbyroleid" : roleid
	};
	var strUrl = Service.insertHmSmsOutboxTreans1;
	$.ajax({
		type : "POST",
		url : strUrl,
		dataType : "json",
		data : JSON.stringify(objJson),
		contentType : "application/json",
		async : false,
		crossDomain : true,
		headers : {
			'Accept' : 'application/json',
			'Content-Type' : 'application/json',
			"X-TENANT-ID" : "PROCREATE",
			'Access-Control-Allow-Origin' : '*',
			// 'Authorization': 'Bearer ' + token
			"Authorization" : 'Bearer ' + token_id,
		},
		success : function(data) {
			var responseCode = data.responseCode;
			if (200 !== responseCode) {
				console.log("Response Code------>" + responseCode);
			} else {
				showNotificationError("Message Sent Successfully",
						"normalcombtn", "success");
				window.setTimeout(function() {
					location.reload();
				}, 3000);

			}

		},
		error : function() {

			console.log('In Error of  deleteVehicle ');
		}
	})

}

// reset Epidemic Complaint
function resetEpidemicComplaints() {
	$("#einterimReply").val("");
	$('#efinalReply').val("");
}

// reset Normal Complaint
function resetNormalComplaints() {
	$('#interimReply').val("");
	$('#finalReply').val("");
}

// Complaint Response mail Template
var emailtext = '<html><head><title>Complaint Response System</title><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">';

emailtext = emailtext
		+ ' <style>.container{width: 650px;margin:0px auto;padding:20px;}body{padding: 50px;}.gray-bg{background:#f6f6f6;}.white-bg{background:#fff;}';

emailtext = emailtext
		+ ' table, th, td { border: 1px solid black; border-collapse: collapse; } table{width:100%;  }th, td { padding: 5px; color: black;text-align:center; font-size: 14px;}.fw-600{font-weight:600;}';

emailtext = emailtext
		+ '.maintext{background-color: #1f74bd;color: white; height: 50px;font-weight: 800; text-align: center;  font-size: 18px;}.text2{background-color:  #f5f5f5;}.text-light-gray{margin-left: 930px; }</style> </head>';

emailtext = emailtext
		+ '<body class="gray-bg"><div class="container white-bg"><h4> Dear All</h4><p>Thank-You For Complaints</p><br><br><div><span class="text-green">Thanks and Regards,<br><span class="text-purple">AP ERS Team.</span></div></div>';

emailtext = emailtext
		+ '<div class="text-center "> <p><span class="text-light-gray">Powered by</span> <a href="http://www.procreate.co.in/" target="_blank" class="text-purple">ProCreate Techno Systems Pvt Ltd.</a></p></div></body></html>';

/**
 * @desc:sending mail to caller
 * @functionality:insertHmEmailOutboxTreans
 * @returns 1
 */
function insertHmEmailOutboxTreans() {
	var userId = localStorage.getItem("userID");
	var roleid = localStorage.getItem("roleid");
	var moduleid = localStorage.getItem("moduleid");
	var emailid = $('#email_id').val();
	var subject = "Complaint Response System ";
	var objJson = {
		"inboxqueueid" : 0,
		"replyuser" : 0,
		"toemailid" : emailid,
		"subject" : subject,
		"ccmailids" : "0",
		"bccmailids" : "0",
		"replybody" : emailtext,
		"actionid" : 1,
		"templateid" : 1,
		"so_createdbyid" : userId,
		"createdbymoduleid" : moduleid,
		"createdbyroleid" : roleid
	};
	var strUrl = Service.insertHmEmailOutboxTreans;
	console.log("Input is:::::::" + JSON.stringify(objJson));
	$.ajax({
		type : "POST",
		url : strUrl,
		dataType : "json",
		data : JSON.stringify(objJson),
		contentType : "application/json",
		async : false,
		crossDomain : true,
		headers : {
			'Accept' : 'application/json',
			'Content-Type' : 'application/json',
			"X-TENANT-ID" : "PROCREATE",
			'Access-Control-Allow-Origin' : '*',
			// 'Authorization': 'Bearer ' + token
			"Authorization" : 'Bearer ' + token_id,
		},
		success : function(data) {
			var responsecode = data.responseCode;
			showNotificationError("Message Sent Successfully",
					"epidemiccombtn", "success");
		},
		error : function() {
			console.log('In Error of  Details ');
		}
	});
}

/**
 * @desc:sending mail to caller
 * @functionality:insertHmEmailOutboxTreans
 * @returns 1
 */
function getUserName() {
	$("#usernameid").empty();
	var userId = localStorage.getItem("userID");
	if (userId != "" || userId != null) {
		var objJson = {
			"userid" : userId
		};
		var strUrl = Service.getUserName;
		console.log("Input is:::::::" + JSON.stringify(objJson));
		$.ajax({
			type : "POST",
			url : strUrl,
			dataType : "json",
			data : JSON.stringify(objJson),
			contentType : "application/json",
			async : false,
			crossDomain : false,
			headers : {
				'Accept' : 'application/json',
				'Content-Type' : 'application/json',
				"X-TENANT-ID" : "PROCREATE",
				'Access-Control-Allow-Origin' : '*',
				// 'Authorization': 'Bearer ' + token
				"Authorization" : 'Bearer ' + token_id,
			},
			success : function(data) {
				var username = data.result;
				$("#usernameid").append(username);
			},
			error : function() {
				console.log('In Error of  Details ');
			}
		});
	}
}

/*
 * For showing sweet alert{ 10-01-2020
 */
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
		position : 'top',
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

// data table
function loadDataTable1() {
	$('.dataTables-example1').DataTable(
			{
				"aLengthMenu" : [ [ 5, 10, 15, 25, 50, 75, -1 ],
						[ 5, 10, 15, 25, 50, 75, "All" ] ],
				"iDisplayLength" : 10,
				responsive : true,
				dom : '<"html5buttons"B>lTfgitp',
				buttons : [
						{
							extend : 'copy'
						},
						{
							extend : 'csv'
						},
						{
							extend : 'excel',
							title : 'TyreLifeData'
						},
						{
							extend : 'pdf',
							title : 'TyreLifeData'
						},
						{
							extend : 'print',
							customize : function(win) {
								$(win.document.body).addClass('white-bg');
								$(win.document.body).css('font-size', '10px');

								$(win.document.body).find('table').addClass(
										'compact').css('font-size', 'inherit');
							}
						} ]
			});
}

// data table
function loadDataTable2() {
	$('.dataTables-example2').DataTable(
			{
				"aLengthMenu" : [ [ 5, 10, 15, 25, 50, 75, -1 ],
						[ 5, 10, 15, 25, 50, 75, "All" ] ],
				"iDisplayLength" : 10,
				responsive : true,
				dom : '<"html5buttons"B>lTfgitp',
				buttons : [
						{
							extend : 'copy'
						},
						{
							extend : 'csv'
						},
						{
							extend : 'excel',
							title : 'page'
						},
						{
							extend : 'pdf',
							title : 'page'
						},
						{
							extend : 'print',
							customize : function(win) {
								$(win.document.body).addClass('white-bg');
								$(win.document.body).css('font-size', '10px');

								$(win.document.body).find('table').addClass(
										'compact').css('font-size', 'inherit');
							}
						} ]
			});
}
// data table
function loadDataTable() {
	$('.dataTables-example').DataTable(
			{
				"aLengthMenu" : [ [ 5, 10, 15, 25, 50, 75, -1 ],
						[ 5, 10, 15, 25, 50, 75, "All" ] ],
				"iDisplayLength" : 10,
				responsive : true,
				dom : '<"html5buttons"B>lTfgitp',
				buttons : [
						{
							extend : 'copy'
						},
						{
							extend : 'csv'
						},
						{
							extend : 'excel',
							title : 'page'
						},
						{
							extend : 'pdf',
							title : 'page'
						},
						{
							extend : 'print',
							customize : function(win) {
								$(win.document.body).addClass('white-bg');
								$(win.document.body).css('font-size', '10px');

								$(win.document.body).find('table').addClass(
										'compact').css('font-size', 'inherit');
							}
						} ]
			});

}

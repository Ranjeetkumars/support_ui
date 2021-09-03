/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/*
 Page onload Calling functions
 */
var user_Id;
var roleid;
var moduleid;

$(document).ready(function() {
	user_Id = localStorage.getItem('userID');
	 roleid = localStorage.getItem('wfms_roleID');
	 moduleid = localStorage.getItem('wfms_moduleID');

	get_My_Shedule_Details();
});

function resetDetails() {
	$('#current_Date').val("");
}
/*
 * @returns {Boolean}
 For Getting Myshedule Details
 */
function get_My_Shedule_Details() {
	var StartDate = $('#current_Date').val();
	var current_Date;
	if (StartDate === "" || StartDate === "Invalid date") {
		var date = new Date();
		var day = date.getDate();
		var month = date.getMonth() + 1;
		var year = date.getFullYear();
		var lesstwo = year + "-" + month + "-" + day;
		var bfrspt = lesstwo.split('-');
		if (bfrspt[1] < 10) {
			var getMonth = '0' + bfrspt[1];
		}
		var current_Date = year + "-" + getMonth;

	} else {
		var dobdate = $('#current_Date').val();
		var d = new Date(dobdate.split("-").reverse().join("-"));
		var dd = d.getDate();
		var mm = d.getMonth() + 1;
		var yy = d.getFullYear();
		var lesstwo = yy + "-" + mm + "-" + dd;
		var bfrspt = lesstwo.split('-');
		if (bfrspt[1] < 10) {
			var getMonth = '0' + bfrspt[1];
		}
		current_Date = yy + "-" + getMonth;
	}
	//    var user_Id = "2"; //Temporary Purpose 
	if (user_Id === "" || user_Id === undefined || user_Id === '') {
		return false;
	}
	var json_Shedule = {
		"user_id": user_Id,
		"currentdate": current_Date
	};
	var strUrl = Service.My_Sheduled_Details;
	$.ajax({
		type: "POST",
		url: strUrl,
		dataType: "json",
		data: JSON.stringify(json_Shedule),
		contentType: "application/json",
		async: false,
		crossDomain: true,
		headers: {
			"X-TENANT-ID": "PROCREATE"
		},
		success: function(data) {
			var responsecode = data.responseCode;
			get_My_Shedule_Details_DOM(jsonArray);
			// my_Shcedule_Tabel();

			if (responsecode !== 200) {
				var trTag = document.createElement("tr");
				var tdTag = document.createElement("td");
				 $(trTag).append(tdTag);
	             $(tdTag).attr('colspan', '11');
				 $(tdTag).css("text-align", "center");
	             $(tdTag).attr('color', 'red');
				 $(tdTag).html("No Data Available");
	            $('#my_Shedule_Table').append(trTag);
				//                alert('NO DATA FOUND');
			} else {
				var jsonArray = data.objMyProfileControllerDTO;
				get_My_Shedule_Details_DOM(jsonArray);
				// my_Shcedule_Tabel();
			}

		}, error: function() {
			console.log('In Error of  Details ');
		}
	});
}


function get_My_Shedule_Details_DOM(strData) {

	$('#my_Shedule_Table').empty();
	var objDivTag = document.createElement('div');
	$(objDivTag).addClass("table-responsive");

	var ObjTableTag = document.createElement("table");
	$(ObjTableTag).addClass("table table-striped table-bordered table-hover dataTables-example11");
	$(objDivTag).append(ObjTableTag);

	var objTHead = document.createElement("thead");
	$(ObjTableTag).append(objTHead);
	var objTr = document.createElement("tr");
	$(objTHead).append(objTr);

	var objTHead1 = document.createElement("th");
	$(objTHead1).html("SNO");
	$(objTHead1).addClass("text-center");
	$(objTr).append(objTHead1);

	var objTHead2 = document.createElement("th");
	$(objTHead2).html("Allocated Date");
	$(objTHead2).addClass("text-center");
	$(objTr).append(objTHead2);

	var objTHead3 = document.createElement("th");
	$(objTHead3).html("Shift Type");
	$(objTHead3).addClass("text-center");
	$(objTr).append(objTHead3);

	var objTHead4 = document.createElement("th");
	$(objTHead4).html("Shift Description");
	$(objTHead4).addClass("text-center");
	$(objTr).append(objTHead4);

	var objTHead5 = document.createElement("th");
	$(objTHead5).html("Start Time");
	$(objTHead5).addClass("text-center");
	$(objTr).append(objTHead5);

	var objTHead6 = document.createElement("th");
	$(objTHead6).html("End Time");
	$(objTHead6).addClass("text-center");
	$(objTr).append(objTHead6);

	var objTBody = document.createElement("tbody");
	$(objTBody).attr("id", "tbodyData");
	$(ObjTableTag).append(objTBody);
	try {
		for (var i = 0; i < strData.length; i++) {
			var index = i + 1;
			var tbleRow = document.createElement("tr");
			var tablcol1 = document.createElement("td");
			$(tablcol1).html(index);
			$(tbleRow).append(tablcol1);
			var tablcol2 = document.createElement("td");
			$(tablcol2).html(strData[i].allocateddate);
			$(tbleRow).append(tablcol2);

			var tablcol3 = document.createElement("td");
			var wsa_typeofshift = strData[i].typeofshift;
			switch (wsa_typeofshift) {
				case "D":
					$(tablcol3).attr('bgcolor', '#EEE8AA');
					$(tablcol3).html(wsa_typeofshift);
					$(tbleRow).append(tablcol3);
					break;
				case "D1":
					$(tablcol3).attr('bgcolor', '#EEE8AA');
					$(tablcol3).html(wsa_typeofshift);
					$(tbleRow).append(tablcol3);
					break;
				case "E":
					$(tablcol3).attr('bgcolor', '#ccccccc');
					$(tablcol3).html(wsa_typeofshift);
					$(tbleRow).append(tablcol3);
					break;
				case "E1":
					$(tablcol3).attr('bgcolor', '#ccccccc');
					$(tablcol3).html(wsa_typeofshift);
					$(tbleRow).append(tablcol3);
					break;
				case "E2":
					$(tablcol3).attr('bgcolor', '#ccccccc');
					$(tablcol3).html(wsa_typeofshift);
					$(tbleRow).append(tablcol3);
					break;
				case "N":
					$(tablcol3).attr('bgcolor', '#DEB887');
					$(tablcol3).html(wsa_typeofshift);
					$(tbleRow).append(tablcol3);
					break;
				case "G":
					$(tablcol3).attr('bgcolor', '#BCD7BC');
					$(tablcol3).html(wsa_typeofshift);
					$(tbleRow).append(tablcol3);
					break;
				case "H":
					$(tablcol3).attr('bgcolor', '#669999');
					$(tablcol3).html(wsa_typeofshift);
					$(tbleRow).append(tablcol3);
					break;
				case 'RO':
					$(tablcol3).attr('bgcolor', '#669999');
					$(tablcol3).html(wsa_typeofshift);
					$(tbleRow).append(tablcol3);
					break;
				case 'M1':
					$(tablcol3).attr('bgcolor', '#EEE8AA');
					$(tablcol3).html(wsa_typeofshift);
					$(tbleRow).append(tablcol3);
					break;
				case 'M':
					$(tablcol3).attr('bgcolor', '#EEE8AA');
					$(tablcol3).html(wsa_typeofshift);
					$(tbleRow).append(tablcol3);
					break;
				case 'LOP':
					$(tablcol3).attr('bgcolor', '#CD5C5C');
					$(tablcol3).html(wsa_typeofshift);
					$(tbleRow).append(tablcol3);
					break;
				case 'TRG':
					$(tablcol3).attr('bgcolor', '#E68A8A');
					$(tablcol3).html(wsa_typeofshift);
					$(tbleRow).append(tablcol3);
					break;
				case 'CO':
					$(tablcol3).attr('bgcolor', '#8FBC8F');
					$(tablcol3).html(wsa_typeofshift);
					$(tbleRow).append(tablcol3);
					break;
				case 'N2':
					$(tablcol3).attr('bgcolor', '#DEB887');
					$(tablcol3).html(wsa_typeofshift);
					$(tbleRow).append(tablcol3);
					break;
				case 'D2':
					$(tablcol3).attr('bgcolor', '#EEE8AA');
					$(tablcol3).html(wsa_typeofshift);
					$(tbleRow).append(tablcol3);
					break;
				case 'AB':
					$(tablcol3).attr('bgcolor', '#CD5C5C');
					$(tablcol3).html(wsa_typeofshift);
					$(tbleRow).append(tablcol3);
					break;
				case 'PL':
					$(tablcol3).attr('bgcolor', '#87CEFA');
					$(tablcol3).html(wsa_typeofshift);
					$(tbleRow).append(tablcol3);
					break;
				case 'ES':
					$(tablcol3).attr('bgcolor', '#BFFF80');
					$(tablcol3).html(wsa_typeofshift);
					$(tbleRow).append(tablcol3);
					break;
				case 'SL':
					$(tablcol3).attr('bgcolor', '#87CEFA');
					$(tablcol3).html(wsa_typeofshift);
					$(tbleRow).append(tablcol3);
					break;
				case 'CL':
					$(tablcol3).attr('bgcolor', '#40E0D0');
					$(tablcol3).html(wsa_typeofshift);
					$(tbleRow).append(tablcol3);
					break;
				case 'EL':
					$(tablcol3).attr('bgcolor', '#FFC0CB');
					$(tablcol3).html(wsa_typeofshift);
					$(tbleRow).append(tablcol3);
				case 'U':
					$(tablcol3).attr('bgcolor', '#ADD8E6');
					$(tablcol3).html(wsa_typeofshift);
					$(tbleRow).append(tablcol3);
					break;
				default:
					$(tablcol3).attr('bgcolor', '#FFC0CB');
					$(tablcol3).html(wsa_typeofshift);
					$(tbleRow).append(tablcol3);
			}

			var tablcol4 = document.createElement("td");
			$(tablcol4).html(strData[i].user_desc);
			$(tbleRow).append(tablcol4);
			var shift_Start_Time;
			var tablcol5 = document.createElement("td");
			var sft_T = strData[i].shiftstarttime;
			var tt = sft_T.split(":");
			switch (tt[0]) {
				case "01":
					shift_Start_Time = "1AM";
					$(tablcol5).html(shift_Start_Time);
					$(tbleRow).append(tablcol5);
					break;
				case "02":
					shift_Start_Time = "2AM";
					$(tablcol5).html(shift_Start_Time);
					$(tbleRow).append(tablcol5);
					break;
				case "03":
					shift_Start_Time = "3AM";
					$(tablcol5).html(shift_Start_Time);
					$(tbleRow).append(tablcol5);
					break;
				case "04":
					shift_Start_Time = "4AM";
					$(tablcol5).html(shift_Start_Time);
					$(tbleRow).append(tablcol5);
					break;
				case "05":
					shift_Start_Time = "5AM";
					$(tablcol5).html(shift_Start_Time);
					$(tbleRow).append(tablcol5);
					break;
				case "06":
					shift_Start_Time = "6AM";
					$(tablcol5).html(shift_Start_Time);
					$(tbleRow).append(tablcol5);
					break;
				case "07":
					shift_Start_Time = "7AM";
					$(tablcol5).html(shift_Start_Time);
					$(tbleRow).append(tablcol5);
					break;
				case "08":
					shift_Start_Time = "8AM";
					$(tablcol5).html(shift_Start_Time);
					$(tbleRow).append(tablcol5);
					break;
				case "09":
					shift_Start_Time = "9AM";
					$(tablcol5).html(shift_Start_Time);
					$(tbleRow).append(tablcol5);
					break;
				case "10":
					shift_Start_Time = "10AM";
					$(tablcol5).html(shift_Start_Time);
					$(tbleRow).append(tablcol5);
					break;
				case "11":
					shift_Start_Time = "11AM";
					$(tablcol5).html(shift_Start_Time);
					$(tbleRow).append(tablcol5);
					break;
				case "12":
					shift_Start_Time = "12PM";
					$(tablcol5).html(shift_Start_Time);
					$(tbleRow).append(tablcol5);
					break;
				case "13":
					shift_Start_Time = "1PM";
					$(tablcol5).html(shift_Start_Time);
					$(tbleRow).append(tablcol5);
					break;
				case "14":
					shift_Start_Time = "2PM";
					$(tablcol5).html(shift_Start_Time);
					$(tbleRow).append(tablcol5);
					break;
				case "15":
					shift_Start_Time = "3PM";
					$(tablcol5).html(shift_Start_Time);
					$(tbleRow).append(tablcol5);
					break;
				case "16":
					shift_Start_Time = "4PM";
					$(tablcol5).html(shift_Start_Time);
					$(tbleRow).append(tablcol5);
					break;
				case "17":
					shift_Start_Time = "5PM";
					$(tablcol5).html(shift_Start_Time);
					$(tbleRow).append(tablcol5);
					break;
				case "18":
					shift_Start_Time = "6PM";
					$(tablcol5).html(shift_Start_Time);
					$(tbleRow).append(tablcol5);
					break;
				case "19":
					shift_Start_Time = "7PM";
					$(tablcol5).html(shift_Start_Time);
					$(tbleRow).append(tablcol5);
					break;
				case "20":
					shift_Start_Time = "8PM";
					$(tablcol5).html(shift_Start_Time);
					$(tbleRow).append(tablcol5);
					break;
				case "21":
					shift_Start_Time = "9PM";
					$(tablcol5).html(shift_Start_Time);
					$(tbleRow).append(tablcol5);
					break;
				case "22":
					shift_Start_Time = "10PM";
					$(tablcol5).html(shift_Start_Time);
					$(tbleRow).append(tablcol5);
					break;
				case "23":
					shift_Start_Time = "11PM";
					$(tablcol5).html(shift_Start_Time);
					$(tbleRow).append(tablcol5);
					break;
				case "24":
					shift_Start_Time = "12AM";
					$(tablcol5).html(shift_Start_Time);
					$(tbleRow).append(tablcol5);
				default:
					shift_Start_Time = "NA";
					$(tablcol5).html(shift_Start_Time);
					$(tbleRow).append(tablcol5);

			}

			var tablcol6 = document.createElement("td");
			var shift_End_Time;
			var sft_Et = strData[i].shiftendttime;
			var sft_E = sft_Et.split(":");
			switch (sft_E[0]) {
				case "01":
						shift_End_Time = "1AM";
					$(tablcol6).html(shift_End_Time);
					$(tbleRow).append(tablcol6);
					break;
				case "02":
					shift_End_Time = "2AM";
					$(tablcol6).html(shift_End_Time);
					break;
				case "03":
					shift_End_Time = "3AM";
					$(tablcol6).html(shift_End_Time);
					$(tbleRow).append(tablcol6);
					break;
				case "04":
					shift_End_Time = "4AM";
					$(tablcol6).html(shift_End_Time);
					$(tbleRow).append(tablcol6);
					break;
				case "05":
					shift_End_Time = "5AM";
					$(tablcol6).html(shift_End_Time);
					$(tbleRow).append(tablcol6);
					break;
				case "06":
					shift_End_Time = "6AM";
					$(tablcol6).html(shift_End_Time);
					$(tbleRow).append(tablcol6);
					break;
				case "07":
					shift_End_Time = "7AM";
					$(tablcol6).html(shift_End_Time);
					$(tbleRow).append(tablcol6);
					break;
				case "08":
					shift_End_Time = "8AM";
					$(tablcol6).html(shift_End_Time);
					$(tbleRow).append(tablcol6);
					break;
				case "09":
					shift_End_Time = "9AM";
					$(tablcol6).html(shift_End_Time);
					$(tbleRow).append(tablcol6);
					break;
				case "10":
					shift_End_Time = "10AM";
					$(tablcol6).html(shift_End_Time);
					$(tbleRow).append(tablcol6);
					break;
				case "11":
					shift_End_Time = "11AM";
					$(tablcol6).html(shift_End_Time);
					$(tbleRow).append(tablcol6);
					break;
				case "12":
					shift_End_Time = "12PM";
					$(tablcol6).html(shift_End_Time);
					$(tbleRow).append(tablcol6);
					break;
				case "13":
					shift_End_Time = "1PM";
					$(tablcol6).html(shift_End_Time);
					$(tbleRow).append(tablcol6);
					break;
				case "14":
					shift_End_Time = "2PM";
					$(tablcol6).html(shift_End_Time);
					$(tbleRow).append(tablcol6);
					break;
				case "15":
					shift_End_Time = "3PM";
					$(tablcol6).html(shift_End_Time);
					$(tbleRow).append(tablcol6);
					break;
				case "16":
					shift_End_Time = "4PM";
					$(tablcol6).html(shift_End_Time);
					$(tbleRow).append(tablcol6);
					break;
				case "17":
					shift_End_Time = "5PM";
					$(tablcol6).html(shift_End_Time);
					$(tbleRow).append(tablcol6);
					break;
				case "18":
					shift_End_Time = "6PM";
					$(tablcol6).html(shift_End_Time);
					$(tbleRow).append(tablcol6);
					break;
				case "19":
					shift_End_Time = "7PM";
					$(tablcol6).html(shift_End_Time);
					$(tbleRow).append(tablcol6);
					break;
				case "20":
					shift_End_Time = "8PM";
					$(tablcol6).html(shift_End_Time);
					$(tbleRow).append(tablcol6);
					break;
				case "21":
					shift_End_Time = "9PM";
					$(tablcol6).html(shift_End_Time);
					$(tbleRow).append(tablcol6);
					break;
				case "22":
					shift_End_Time = "10PM";
					$(tablcol6).html(shift_End_Time);
					$(tbleRow).append(tablcol6);
					break;
				case "23":
					shift_End_Time = "11PM";
					$(tablcol6).html(shift_End_Time);
					$(tbleRow).append(tablcol6);
					break;
				case "24":
					shift_End_Time = "12AM";
					$(tablcol6).html(shift_End_Time);
					$(tbleRow).append(tablcol6);
				default:
					shift_End_Time = "NA";
					$(tablcol6).html(shift_End_Time);
					$(tbleRow).append(tablcol6);
			}
			//Appending Body Here
			// $(tbleRow).append(tbleRow);
			$(objTBody).append(tbleRow);
		}
		$("#my_Shedule_Table").append(objDivTag);

	} catch (err) {
		console.log("my_Shedule_Table" + err);
	}
}

function my_Shcedule_Tabel() {
	$('.dataTables-example11').DataTable({// Data table
		pageLength: 10,
		responsive: true,
		dom: '<"html5buttons"B>lTfgitp',
		buttons: [
			{  extend: 'copy' },
			{ extend: 'csv' },
			{ extend: 'excel', title: 'ExampleFile' },
			{ extend: 'pdf', title: 'ExampleFile' },
			{
				extend: 'print',
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
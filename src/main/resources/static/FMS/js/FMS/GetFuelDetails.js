
$(document).ready(function() {

	try {

		loadVehicleType();
		getfuelDetails();
	} catch (err) {
		console.log("errror in loading ready funtion" + err);
	}
});

function loadVehicleType() {
    try {
	$("#vehicleId").empty();
	var strUrl = Service.getVehicle;
	 console.log("getVehicle Url is:" + strUrl);
        $.ajax({
            type: 'GET',
            url: strUrl,
            dataType: 'json',
            async: false,
            success: function (data) {
                var responsecode = data.responseCode;
                if (200 !== responsecode) {
                    console.log('Vehicles not loaded');

                } else {
                    var jsonArray = data.objVehicleControllerDTO;
                    var selectfirst = "<option value='0'>Please Select vehicle</option>";
                    $('#vehicleId').append(selectfirst);
                    $.each(jsonArray, function (i, resData) {
                        var vehicleName = "<option value=" + resData.vehicleId + ">" + resData.vehicleName + "</option>";
                        $(vehicleName).appendTo('#vehicleId');
                    });
                }
            },
            error: function (err) {
                console.error("Error in getVehicle" + JSON.stringify(err));
            }
        });
    } catch (err) {
        console.error('Error in getVehicle()' + err);
    }
    $('#vehicleid').trigger("chosen:updated");
    $('#vehicleid').chosen();

}

$('#vehicleId').on('change', function () {
    var vehicleName = $('#vehicleId :selected').text();
    $("#ResisterNumberId").empty();
    getRegsertNo(vehicleName);
});

/*
 * For getting RegsertNo.
 * priyadarshini
 * 30-11-2019
 */
function getRegsertNo(vehicleName) {
    var strUrl = Service.GetRegisterNo;
    console.log("getRegsertNo Url is:" + strUrl);
    var obj_Insert =
            {"vehicleName": vehicleName}
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(obj_Insert),
        //"Content-Type": "application/json",
        async: false,
        crossDomain: false,
        headers: {
            "Content-Type": "application/json"
        },
        success: function (data) {
            var responsecode = data.responseCode;
            if (200 !== responsecode) {
                console.log('RegsertNo not loaded');
            } else {
                var jsonArray = data.objControllerDTO;
                var selectfirst = "<option value='0'>Select RegisterNo</option>";
                $('#ResisterNumberId').append(selectfirst);
                $.each(jsonArray, function (i, resData) {
                    var DistrictData = "<option value=" + resData.vehicleID + ">" + resData.registerNo + "</option>";
                    $(DistrictData).appendTo('#ResisterNumberId');
                });
            }
        },
        error: function (err) {
            console.error("Error in  getBaseLoc" + JSON.stringify(err));
        }
    });
    $('#ResisterNumberId').trigger("chosen:updated");
    $('#ResisterNumberId').chosen();
}
function getfuelDetails() {

	$('#FuelList_Id').empty();

	var startDate = $("#start-date-id").val();

	var endDate = $("#end-date-id").val();
	var vehicleId;
	 vehicleId= $("#ResisterNumberId").val();
	var concatString;
	if (startDate === "" || startDate === 'undefined') {
		var d = new Date();
		var date = d.getDate();
		var month = d.getMonth() + 1; // Since getMonth() returns month from 0-11 not 1-12
		var year = d.getFullYear();
		var dateStr = date + "/" + month + "/" + year;
		var pdFormate = year + "-" + month + "-" + date;
		startDate = pdFormate;
		endDate = pdFormate;
	}
	//else if (startDate > endDate || startDate == endDate){
	//alert("End date should be greater than Start date or euql");
	//        $("#date-validation").text('');
	//        $("#date-validation").append("End date should be greater than Start date or euql");
	//        return false
	//
	//}
	if (vehicleId == "0" || vehicleId === '0' || vehicleId === 'undefined'
			|| vehicleId === undefined) {
			
		vehicleId = "null";
	}
	//else{
	//concatString = "'{" + vehicleId + "}'";
	//}
	var jObj = {

		"par_vehicleid" : vehicleId,
		"from_date" : startDate,
		"to_date" : endDate

	}

	var strUrl = Service.getFuelList;

	console.log("strUrl : " + strUrl);
	$
			.ajax({
				type : "POST",
				url : strUrl,
				dataType : "json",
				data : JSON.stringify(jObj),
				contentType : "application/json",
				async : false,
				crossDomain : true,
				success : function(data) {

					console.log("data : " + data);
					var responseCode = data.responseCode;

					$('#FuelList_Id').empty();
					if (200 !== responseCode || data.status === "NO_DATA_FOUND") {
						appendNo_DataInDataTable();
						//$('#deleteButtonID').hide();
					} else {
						// $('#deleteButtonID').show();

						var jsonArray = data.objGetFuelRegisterFuelDetailsControllerDto;
						if (jsonArray.length > 0) {
							$("#FuelList_Id").empty();
							appendDataInDataTable(jsonArray);
							loadDataTable();
						}
					}
				},
				error : function(err) {
					console.error('update Stock error: ' + JSON.stringify(err));
				}
			});
}

function appendDataInDataTable(strData) {
$("#FuelList_Id").empty();
	//For Div Tag
	try {
		var objDivTag = document.createElement('div');
		$(objDivTag).addClass("table-responsive");

		//For table
		var ObjTableTag = document.createElement("table");
		$(ObjTableTag)
				.addClass(
						"table table-striped table-bordered table-hover dataTables-example");
		$(objDivTag).append(ObjTableTag);
		//For table head
		var objTHead = document.createElement("thead");
		$(ObjTableTag).append(objTHead);

		//For table row
		var objTr = document.createElement("tr");
		$(objTHead).append(objTr);

		var objTHead1 = document.createElement("th");

		//For table Heading1

		//For table Heading2
		$(objTHead1).html('Vehicle');
		$(objTr).append(objTHead1);
		
		
		
	    var objTHead2 = document.createElement("th");

		$(objTHead2).html('Registration No');
		$(objTr).append(objTHead2);
		
		

		//For table Heading3
		var objTHead3 = document.createElement('th');
		$(objTHead3).html('Fuel Station Name');
		$(objTr).append(objTHead3);

		var objTHead4 = document.createElement('th');
		$(objTHead4).html('Volume');
		$(objTr).append(objTHead4);
		//For table Heading4
		var objTHead5 = document.createElement('th');
		$(objTHead5).html('Payment Type');
		$(objTr).append(objTHead5);

		var objTBody = document.createElement("tbody");
		$(objTBody).attr("id", "tbodyData");
		$(ObjTableTag).append(objTBody);

		// Table Data Appending Here
		for (var i = 0; i < strData.length; i++) {
			var index = i + 1;

			var tbleRow = document.createElement("tr");

			var tablcol1 = document.createElement("td");
			$(tablcol1).addClass('text-center');
			$(tablcol1).html(strData[i].vd_vehicle_type);
			$(tbleRow).append(tablcol1);
			
			
				var tablcol2 = document.createElement("td");
			$(tablcol2).addClass('text-center');
			$(tablcol2).html(strData[i].vd_vehicle_name);
			$(tbleRow).append(tablcol2);

			var tablcol3 = document.createElement("td");
			$(tablcol3).addClass('text-center');
			$(tablcol3).html(strData[i].ff_fuel_stationid);
			$(tbleRow).append(tablcol3);

			var tablcol4 = document.createElement("td");
			$(tablcol4).addClass('text-center');
			$(tablcol4).html(strData[i].ff_fuel_qty + "liters");
			$(tbleRow).append(tablcol4);

			var tablcol5 = document.createElement("td");
			$(tablcol5).addClass('text-center');
			$(tablcol5).html(strData[i].ff_payment_typeid);
			$(tbleRow).append(tablcol5);

			$(objTBody).append(tbleRow);

		}

		$("#FuelList_Id").append(objDivTag);

	} catch (err) {
		console.log("FuelList_Id" + err);
	}
}

function appendNo_DataInDataTable() {
	try {
		var objDivTag = document.createElement('div');
		$(objDivTag).addClass("table-responsive");

		//For table
		var ObjTableTag = document.createElement("table");
		$(ObjTableTag)
				.addClass(
						"table table-striped table-bordered table-hover dataTables-example");
		$(objDivTag).append(ObjTableTag);
		//For table head
		var objTHead = document.createElement("thead");
		$(ObjTableTag).append(objTHead);

		//For table row
		var objTr = document.createElement("tr");
		$(objTHead).append(objTr);

		var objTHead1 = document.createElement("th");

		//For table Heading1

		//For table Heading2
		$(objTHead1).html('Vehicle');
		$(objTr).append(objTHead1);
		
		 var objTHead2 = document.createElement("th");

		$(objTHead2).html('Registration No');
		$(objTr).append(objTHead2);

		//For table Heading3
		var objTHead3 = document.createElement('th');
		$(objTHead3).html('Fuel Station Name');
		$(objTr).append(objTHead3);

		var objTHead4 = document.createElement('th');
		$(objTHead4).html('Volume');
		$(objTr).append(objTHead4);
		//For table Heading4
		var objTHead5 = document.createElement('th');
		$(objTHead5).html('Payment Type');
		$(objTr).append(objTHead5);

		var objTBody = document.createElement("tbody");
		$(objTBody).attr("id", "tbodyData");
		$(ObjTableTag).append(objTBody);

		$(objDivTag).addClass('objDivTag1');
		$(objDivTag).addClass('text-center');
		$(objDivTag).append("NO DATA AVAILABLE");

		$("#FuelList_Id").append(objDivTag);

	} catch (err) {
		console.log("FuelList_Id" + err);
	}
}
function loadDataTable() {
	$('.dataTables-example').DataTable(
			{
				"aLengthMenu" : [ [ 5, 10, 15, 25, 50, 75, -1 ],
						[ 5, 10, 15, 25, 50, 75, "All" ] ],
				"iDisplayLength" : 5,
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
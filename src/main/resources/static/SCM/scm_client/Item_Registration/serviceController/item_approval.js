var intDrugId;
$(document).ready(function() {
	try {
		itemApproval();
	} catch (err) {
		console.log("errror in loading ready funtion" + err);
	}
});

$(document).ready(function() {
	$("#parent").click(function() {
		$(".child").prop("checked", this.checked);

	});
	$('.child').click(function() {
		if ($('.child:checked').length == $('.child').length) {
			$('#parent').prop('checked', true);
		} else {
			var id = $("#parent").val();
			$('#parent').prop('checked', false);
		}
	});
});



function itemApproval() {
	console.log("itemApproval javascript function executed");
	var strUrl = itemRegistration.getListOfActiveDrugs;
	console.log("@@@@@@@@@@@@@@@@@@@@@@@"+strUrl);
	var activeId = {
		"activeId" : "1"
	};
	$.ajax({
		type : "POST",
		url : strUrl,
		dataType : "json",
		data : JSON.stringify(activeId),
		contentType : "application/json",
		async : false,
		crossDomain : true,
		success : function(data) {
			console.log("@@@@@@@@@@@@@@@@@@@@@@@" + JSON.stringify(data));
			var responsecode = data.responseCode;
			if (200 !== responsecode || data.status === "NO_DATA_FOUND") {
				toastr.info('Data Not Found');
			} else {
				var jsonArray = data.itemAprovalControllerDto;
				console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@  "+JSON.stringify(jsonArray));
				appendInItemApprovalTable(jsonArray);
			}
		},
		error : function(err) {
			console.log("@@@@@@@@@@@@@@@@@@@@@@@" + err);
			console.error('itemSearch  error: ' + JSON.stringify(err));
		}
	});
}

function appendInItemApprovalTable(jsonArray) {
	$('#dynamicTable').empty();
	for (var i = 0; i < jsonArray.length; i++) {
		console.log("appendInItemApprovalTable function::"
				+ jsonArray[i].seriaalId);
		var dom = '<tr>' + '<td><label class="check">'
				+ '<input type="checkbox" class="child" name="checkme" onClick="test('
				+ jsonArray[i].seriaalId + ')">'
				+ '<span class="checkmark"></span>' + '</label></td>' + '<td>'
				+ jsonArray[i].drugName + '</td>'
				+'<td>'+ jsonArray[i].drugBrandLang1 +'</td>' + '<td>'
				+ jsonArray[i].strcompanyName + '</td>' + '<td>'+ jsonArray[i].strformType +'</td>'
				+ '</tr>'
		$("#dynamicTable").append(dom);
	}

}




function test(seriaalId) {
	var isStatus = ($('input:checkbox[name=checkme]').is(':checked'));
	
	
	if(isStatus==true){
		//$('#registration').modal('show');
		$('#registration').modal({
			  backdrop: 'static',
			  keyboard: true
			})
	}
	else{
		return false;
	}
	
	var strUrl = itemRegistration.getListOfDrugsDetailsBasedOnDrugId;
	var drugId = {
		"strdrugId" : seriaalId
	};
	$.ajax({
		type : "POST",
		url : strUrl,
		dataType : "json",
		data : JSON.stringify(drugId),
		contentType : "application/json",
		async : false,
		crossDomain : true,
		success : function(data) {
			console.log("@@@@@@@@@@@@@@@@@@@@@@@" + JSON.stringify(data));
			var responsecode = data.responseCode;
			if (200 !== responsecode || data.status === "NO_DATA_FOUND") {
				// alert('inside if-condition');
			} else {
				// alert('inside else-part');
				var jsonArray = data.drugsDetailsBasedOnDrugIdControllerDto;

				itemDetails(jsonArray);
			}
		},
		error : function(err) {
			console.log("@@@@@@@@@@@@@@@@@@@@@@@" + err);
			console.error('itemSearch  error: ' + JSON.stringify(err));
		}
	});
}

function itemDetails(jsonArray) {
	$("#itemname").val(jsonArray[0].strgenricname);
	$("#brandName").val(jsonArray[0].strdrugBrandName);
	$("#schedule").val(jsonArray[0].strsheduleType);
	$("#manufacture").val(jsonArray[0].strgrpmoduleTypelangone);
	$("#materialforme").val(jsonArray[0].strformType);
	$("#strength").val(jsonArray[0].strstregnth);
	$("#packingtype").val(jsonArray[0].strpackingType);
	$("#shortcodes").val(jsonArray[0].strshortUnicode);
	$("#central_min_level_qty").val(jsonArray[0].strminimumlevelQty);
	$("#central_max_level_qty").val(jsonArray[0].strmaxLevelQty);
	$("#expiry_alert").val(jsonArray[0].strexpiryalert);
	$("#cretaed_by").val(jsonArray[0].struserName);
	$("#desigid").val(jsonArray[0].strrolename);
	$("#date").val(jsonArray[0].strcreatedDate);

	intDrugId = jsonArray[0].strdrugId;
}

function approval() {
	var strUrl = itemRegistration.updateActiveDrugForApproval;
	var intCount = 1;// every time one row will approve
	var intDrugTypeId = 2; // Active
	var intuserId = 268;// At the time of login that time we can get userId;
	var jsonApprovalObj = {
		"size" : intCount,
		"drugIds" : intDrugId,
		"userId" : intuserId,
		"drugTypeId" : intDrugTypeId,
		"strdrugId" : "dummy"
	};
	$.ajax({
		type : "POST",
		url : strUrl,
		dataType : "json",
		data : JSON.stringify(jsonApprovalObj),
		contentType : "application/json",
		async : false,
		crossDomain : true,
		success : function(data) {
			var responsecode = data.rtnReponseCount;
			if (responsecode == 1 || responsecode == '1') {
				toastr.success('Registered item approved successfully');
				clearItemApprovalFilds();
				//closeModelBox();
				//
				 //$('#registration').modal('show');

			} else {
				// alert('inside else-part');
				// $('#registration').modal().hide();

			}
		},
		error : function(err) {
			toastr.error('Something went wrong!');
			console.error('itemSearch  error: ' + JSON.stringify(err));
		}
	});
	window.location.reload();
}

function closeModelBox() {
	$('#registration').modal().hide();
	itemApproval();
}

function itemRejection() {
	console.log('itemRejection function executed');
	var intCount = 1;
	var intDrugTypeId = 0;// reject type drug
	var intDrugApproval = 0;// reject of item

	var jsonItemRejection = {
		"approvalId" : intDrugApproval,
		"drugIds" : intDrugId,
		"drugTypeId" : intDrugTypeId,
		"size" : intCount,
		"userId" : "295"
	}

	var strUrl = itemRegistration.updateActiveDrugForRejectApproval;

	$.ajax({
		type : "POST",
		url : strUrl,
		dataType : "json",
		data : JSON.stringify(jsonItemRejection),
		contentType : "application/json",
		async : false,
		crossDomain : true,
		success : function(data) {
			console.log("@@@@@@@@@@@@@@@@@@@@@@@" + JSON.stringify(data));
			var responsecode = data.rtnReponseCount;
			if (responsecode == 1 || responsecode == '1') {
				toastr.success('Registered item rejected successfully');
				clearItemApprovalFilds();
			} else {
				console.log('inside else-part');

			}
		},
		error : function(err) {
			toastr.success('Something went wrong');
			console.error('itemSearch  error: ' + JSON.stringify(err));
		}
	});
}

function clearItemApprovalFilds() {
	$('#itemname').val('');
	$('#brandName').val('');
	$('#schedule').val('');
	$('#manufacture').val('');
	$('#strength').val('');
	$('#packingtype').val('');
	$('#shortcodes').val('');
	$('#central_min_level_qty').val('');
	$('#central_max_level_qty').val('');
	$('#expiry_alert').val('');
	$('#cretaed_by').val('');
	$('#desigid').val('');
	$('#date').val('');

}

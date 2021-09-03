$(document).ready(function() {
	try {
		getAllIndentDetails();

	} catch (err) {
		console.log("errror in loading ready funtion" + err);
	}
});
/**

 * @Author: Habiboon Patan
 * @Functionality: getAllIndentDetails
 * @Date: 16-04-2020
 */
function getAllIndentDetails() {
$('#indentapprovalTable').empty();
$('#indentapprovallstTable').empty();
	try {
		var strUrl = ServiceProcreument.GET_ALL_INDENT_DETAILS;
		console.log("GET_ALL_INDENT_DETAILS::::: " + strUrl);
		$.ajax({
			type : 'GET',
			url : strUrl,
			dataType : 'json',
			async : false,
			success : function(data) {
				var responsecode = data.responseCode;
				
				if (200 !== responsecode || data.status === "NO_DATA_FOUND") {
					//var divTag = document.createElement("h2");
					//$(divTag).css("text-align", "center");
					//$(divTag).html("No data available....");
					//$('#indentapprovalTable').append(divTag);
				} else {
					var jsonArray = data.objControllerDto;
					if (jsonArray.length > 0) {
						loadIndentData(jsonArray);
					}
				}
			},
			error : function(err) {
				console.error('loadPurchagesOrderList error: '
						+ JSON.stringify(err));
			}
		});
	} catch (err) {
		console.error("error occur in loadPurchagesOrderList()"
				+ JSON.stringify(err))
	}
}

function loadIndentData(strData) {

	$('#indentapprovalTable').empty();
	try {
		var sum = 0;
		for (var i = 0; i < strData.length; i++) {
			var index = i + 1;
			var tbleRow = document.createElement("tr");

			var tablcol1 = document.createElement("td");
			$(tablcol1).html(index);
			$(tbleRow).append(tablcol1);

			var indent_id = strData[i].indetId;

			var tablcol2 = document.createElement("td");
			$(tablcol2).html(strData[i].indentCode);
			$(tbleRow).append(tablcol2);

			var tablcol3 = document.createElement("td");
			$(tablcol3).html(strData[i].indentraiseddate);
			$(tbleRow).append(tablcol3);

			var tablcol4 = document.createElement("td");
			$(tablcol4)
					.html(
							'<label class="check "><input type="checkbox" id="myCheck12"  class="case"  value='
									+ indent_id
									+ ' name="case"  )" ><span class="checkmark"> </label>');

			$(tablcol4).attr('onclick', 'onclickCheckbox()');
			$(tbleRow).append(tablcol4);

			var tablcol5 = document.createElement("td");
			var buttonTag = document.createElement('button');
			var text = document.createTextNode(" Add");
			buttonTag.appendChild(text);
			$(buttonTag).addClass('btn btn-primary btn-sm');
			$(buttonTag).attr('onclick', 'getRowData("' + indent_id + '")');
			$(tablcol5).append(buttonTag);
			$(tablcol5).css('height', '36px');
			$(tbleRow).append(tablcol5);

			$("#indentapprovalTable").append(tbleRow);
		}

	} catch (err) {
		console.log("indentapprovalTable ERROR" + err);
	}
}

function onclickCheckbox() {
	var arrSelectedData = [];
	var count = 0;
	$("input:checkbox[name=case]:checked").each(function() {
		arrSelectedData.push($(this).val());
		count++;
		$('#reg_no').val(arrSelectedData);
	});
}

function rejectIndent() {
	var indent_id = $('#reg_no').val();
	
	if(indent_id==""||indent_id==''||indent_id=="0"||indent_id=='0'||indent_id==undefined){
		toastr.error('please select indent for rejection');
		return false;
	}
	
	console.log("indent_id: " + indent_id);
	var rejection_remarks_id = $('#rejection_remarks_id').val();
	var indent_count = indent_id.split(",");
	// var indent_id = indent.trim();
	var indent = indent_id.slice(1, -1);
	console.log("indent: " + indent);

	console.log("druglist: " + indent);
	var indent_size = indent_count.length;
	if (rejection_remarks_id == "" || rejection_remarks_id == ''
			|| rejection_remarks_id == null) {
		toastr.error("Please enter remarks for indent rejection");
		return flase;
	}
	var obj_Insert = {
		"intIndentId" : indent_id,
		"count" : indent_size,
		"userId" : 1,
		"roleId" : 1,
		"moduleId" : 1,
		"remarks" : rejection_remarks_id
	};
	var strUrl = ServiceProcreument.UPDATE_INDENT_REJECTION;
	console.log("UPDATE_INDENT_REJECTION::::: " + JSON.stringify(obj_Insert));
	$.ajax({
		type : "POST",
		url : strUrl,
		dataType : "json",
		data : JSON.stringify(obj_Insert),
		contentType : "application/json",
		async : false,
		crossDomain : true,
		success : function(data) {
			if (data.rtnReponseCount == 1) {
				 $('#rejection_remarks_id').val('');
				getAllIndentDetails();
			}
		}
	});
}

function getRowData(indent_id) {
	getApprovalItemData(indent_id);
	var indent_data = getIndentData(indent_id);

	$('#data_id').val(indent_data);
}

function getApprovalItemData(indent_id) {
	$('#indentapprovallstTable').empty();
	
	try {
		var obj_Insert = {
		
			"indentId" : indent_id
		};
		var strUrl = ServiceProcreument.APPROVAL_ITEM_LIST;
		console.log("APPROVAL_ITEM_LIST::::: " + strUrl);
		$.ajax({
			type : "POST",
			url : strUrl,
			dataType : "json",
			data : JSON.stringify(obj_Insert),
			contentType : "application/json",
			async : false,
			crossDomain : true,

			success : function(data) {
				var responsecode = data.responseCode;
				
				if (200 !== responsecode || data.status === "NO_DATA_FOUND") {
					var divTag = document.createElement("h2");
					$(divTag).css("text-align", "center");
//					$(divTag).html("No data available....");
					$('#indentapprovallstTable').append(divTag);
				} else {
				
					var jsonArray = data.objControllerDto;
					
					if (jsonArray.length > 0) {
						loadApprovedItem(jsonArray);
					}
				}
			},
			error : function(err) {
				console.error('loadPurchagesOrderList error: '
						+ JSON.stringify(err));
			}
		});
	} catch (err) {
		console.error("error occur in loadPurchagesOrderList()"
				+ JSON.stringify(err))
	}
}

function loadApprovedItem(strData) {
	$('#indentapprovallstTable').empty();
	try {
		var sum = 0;
		for (var i = 0; i < strData.length; i++) {
			var index = i + 1;
			var tbleRow = document.createElement("tr");

			var tablcol1 = document.createElement("td");
			$(tablcol1).html(index);
			$(tbleRow).append(tablcol1);

			var indent_id = strData[i].citIndentId;

			var tablcol2 = document.createElement("td");
			$(tablcol2).html(strData[i].drDrudName);
			$(tbleRow).append(tablcol2);

			var tablcol3 = document.createElement("td");
			$(tablcol3).html(strData[i].dbDrugBrandLang1);
			$(tbleRow).append(tablcol3);

			var tablcol4 = document.createElement("td");
			$(tablcol4).html(strData[i].dfFormType);
			$(tbleRow).append(tablcol4);

			var tablcol5 = document.createElement("td");
			$(tablcol5).html(strData[i].drStrengthType);
			$(tbleRow).append(tablcol5);

			var tablcol6 = document.createElement("td");
			$(tablcol6).html(strData[i].maCompanyName);
			$(tbleRow).append(tablcol6);

			var tablcol7 = document.createElement("td");
			$(tablcol7).html(strData[i].citIndentQty);
			$(tbleRow).append(tablcol7);

			$('#drug').val(strData[i].citItemId);

			var tblCol11 = document.createElement("td");
			$(tblCol11).html(
					'<input type="number"  id="description_id' + i
							+ '" class="form-control">');
			$(tbleRow).append(tblCol11);
			
		 var quantity = $('#description_id' + i).val();
		
		// $('#quanity').val(quantity);

			var tablcol9 = document.createElement("td");
			$(tablcol9)
					.html(
							'<label class="check "><input type="checkbox" id="myCheck12"  class="case"  value='
									+ indent_id
									+ ' name="case"  )" ><span class="checkmark"> </label>');
 
			$(tablcol9).attr('onclick', 'onclickCheckbox2("' + i + '")');
			$(tbleRow).append(tablcol9);

			$("#indentapprovallstTable").append(tbleRow);
		}

	} catch (err) {
		console.log("indentapprovallstTable ERROR" + err);
	}
}


//function onclickCheckbox2(index) {
	//var arrSelectedData = [];
	//var quantity = [];
	//var count = 0;
//$("input:checkbox[name=case]:checked").each(function() {
		//arrSelectedData.push($(this).val());
		//count++;
	//	alert("arrSelectedData::::::::"+arrSelectedData);
		//$('#reg_no1').val(arrSelectedData);
		//$('#quanity').val(quantity);
	//});
//}

var textBoxIndex=0;
function onclickCheckbox2(index) {
textBoxIndex=index;
   var arrSelectedData = [];
	var quantity = [];
	var count = 0;

    $("input:checkbox[name=case]:checked").each(function () {
       $('#reg_no1').val("");
if(arrSelectedData.length==0||arrSelectedData.length=="0"){
        arrSelectedData.push($(this).val());
}
        count++;

        $('#reg_no1').val(arrSelectedData);
    });
    if ($(".case").length === $(".case:checked").length) {
    }
    else {
    }
var regno=$('#reg_no1').val();


}


function getIndentData(indentId) {

	var updateResult;
	var obj_Insert = {
		"intIndentId" : indentId
	};
	console.log("INDENT_DATA::::: " + JSON.stringify(obj_Insert));
	var strUrl = ServiceProcreument.INDENT_DATA;
	console.log("INDENT_DATA::::: " + strUrl);
	$.ajax({
		type : "POST",
		url : strUrl,
		dataType : "json",
		data : JSON.stringify(obj_Insert),
		contentType : "application/json",
		async : false,
		crossDomain : true,

		success : function(data) {
			updateResult = data.rtnReponseCount;

		}

	});
	return updateResult;
}

function approvalOnclick() {
	
	indentApproval();
	var indent_ids = $('#reg_no1').val();
	var data = getIndentData(indent_ids);
	$('#data_id').val(data);
}

function indentApproval() {
	var indent_ids = $('#reg_no1').val();
	//var quantity = $('#quanity').val();
		var quantity = $('#description_id' + textBoxIndex + '').val();
		
		if(indent_ids==""||indent_ids==''){
			toastr.error("Please Select indent ");
		return flase;
		}
		else if(quantity==""||quantity==''){
		toastr.error("Please Enter Approved Quantity");
		return flase;
		}
	var drug_id = $('#drug').val();
	var indent_count = indent_ids.split(",");
	var cont = indent_count.length;
	var obj_Insert = {
		"intIndentId" : indent_count[0],
		"quantity" : quantity,
		"count" : cont,
		"userId" : 1,
		"roleId" : 1,
		"moduleId" : 1,
		"drugIds" : drug_id
	};
	var strUrl = ServiceProcreument.UPDATE_INDENT_DETAILS;
	console.log("UPDATE_INDENT_DETAILS::::: " + JSON.stringify(obj_Insert));
	$.ajax({
		type : "POST",
		url : strUrl,
		dataType : "json",
		data : JSON.stringify(obj_Insert),
		contentType : "application/json",
		async : false,
		crossDomain : true,
		success : function(data) {
			if (data.rtnReponseCount == 1) {
				toastr.success('Indent approved successfully');
				getAllIndentDetails();
			}
		},
		error : function(err) {
			console.error('loadPurchagesOrderList error: '+ JSON.stringify(err));
					
		}
	});
}

function rejectApproval() {
	var indent_id = $('#reg_no1').val();
	var remarks_id = $('#remarks_id').val();
	if(indent_id==""||indent_id==''){
		toastr.error("Please Select Indent");
		return flase;
	}
	if(remarks_id==""||remarks_id==''){
		toastr.error("Please enter remarks for indent rejection");
		return flase;
	}
	var drug_id = $('#drug').val();
	var indent_count = indent_id.split(",");
	var cont = indent_count.length;
	var obj_Insert = {
		"indentid" : indent_id,
		"drugid" : drug_id,
		"userid" : 1,
		"moduleid" : 1,
		"roleid" : 1,
		"size" : cont,
		"remarks" : remarks_id
	};
	var strUrl = ServiceProcreument.REJECT_INDENT;
	console.log("REJECT_INDENT::::: " + JSON.stringify(obj_Insert));
	$.ajax({
		type : "POST",
		url : strUrl,
		dataType : "json",
		data : JSON.stringify(obj_Insert),
		contentType : "application/json",
		async : false,
		crossDomain : true,
		success : function(data) {
			if (data.rtnReponseCount == 1) {
			 getApprovalItemData(indent_id);
				getAllIndentDetails();
				
			}
		}
	});
}
function resetOnclick(){
$('#remarks_id').val("");

}
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
		position : 'right',
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

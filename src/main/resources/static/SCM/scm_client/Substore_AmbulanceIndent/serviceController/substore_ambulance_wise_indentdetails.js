 var initilizeWithDefaultValue = {
	  "abulance_id":0,
      "sub_store_id":0,
      "drugId":0
 };

$(document).ready(function(){
	$('#hide_zone').hide();
	$('#hide_base_location_id').hide();
	$('#hide_ambulance_id').hide();
	$('#hide_sub_store_id').hide();
	$('#hide_emp_code_id').hide();
	
	  });
 
 
 function RaiseIndent(){
	 
	// console.log('RaiseIndent');
	  var vehicleId;
	  
	  var subStoreId = $('#sub_store_id').val();
	  var ambId = $('#abulance_id').val();
	  if(subStoreId==0||subStoreId=='0'){
		  vehicleId =ambId;
	  }
	  else{
		  vehicleId = subStoreId;
	  }
	  
	  
	 var empCode = $('#employee_code_id').val();
	 if(empCode==""||empCode==''){
		 toastr.warning('Please enter employee short code');
		 return false;
	 }
	 
	var indentQty = $("#indent_quantity").val();
	console.log('indentQtyindentQty::'+indentQty);
	 if( indentQty==""||indentQty==''|| indentQty==undefined ||indentQty == 'undefined'){
		 toastr.warning('Please enter indent quantity');
		 return false;
	 }
	 
	 
	    var  userId = localStorage.getItem('userID');
		var roleId = localStorage.getItem("scmRoleId");
		var moduleId = localStorage.getItem("scmModuleId");

	 
	 
	 var indentRised = {
			 "count":"1",
				"drugIds":initilizeWithDefaultValue.drugId,
				"empcode":empCode,
				"indentQty":indentQty,
				"indentStrips":"0",
				"moduleId":moduleId,
				"roleId":roleId,
				"userId":userId,
				"vehicleId":vehicleId
			 
	 }
	//var strUrl ="http://localhost:2000/scmservice/salesIndentRaisedController/save_vehicle_indent_details";
	var strUrl = subStoreAmbulance.save_vehicle_indent_details;
	$.ajax({
		type : "POST",
		url : strUrl,
		dataType : "json",
		data : JSON.stringify(indentRised),
		contentType : "application/json",
		async : false,
		crossDomain : true,
		success : function(data) {
			if(data.responseCode ==200 || data.responseCode =='200'){
				$('#indent_quantity').val('');
				$('#indent_code_id').val(data.rtnReponseCount);
				toastr.info('Indent Rised successfully');
				$("#save_disable").attr("disabled", true);
				$("#view").attr("disabled", false);
			}
		},
		error : function(err) {
			console.log('--------------------->::'+JSON.stringify(err));
			//toastr.error('Something went wrong::'+JSON.stringify(err));
			//console.log("@@@@@@@@@@@@@@@@@@@@@@@" + JSON.stringify(err));
			console.error('loadDistrict  error: ' + JSON.stringify(err));
		}
	});
}
 

 
 

 
 
 
 
 
 /*{
		"count":"1",
		"drugIds":initilizeWithDefaultValue.drugId,
		"empcode":empCode,
		"indentQty":indent_quantity_id,
		"indentStrips":"0",
		"moduleId":"51",
		"roleId":"167",
		"userId":"268",
		"vehicleId":vehicleId
		
	}*/ 
 
 $("input[name='numbers']").change(function(){
	 var card_type = $("input[type='radio'].radioBtnClass:checked").val();
	    console.log(card_type);
	    if(card_type=="sub_store"){
	    	$('#hide_zone').hide();
	    	$('#hide_base_location_id').hide();
	    	$('#hide_ambulance_id').hide();
	    	$('#hide_sub_store_id').show();
	    	$('#hide_emp_code_id').show();
	    	initilizeWithDefaultValue.abulance_id=0;
	    	loadSubStore();
	     }
	    else{
	    	$('#hide_zone').show();
	    	$('#hide_base_location_id').show();
	    	$('#hide_ambulance_id').show();
	    	$('#hide_sub_store_id').hide();
	    	$('#hide_emp_code_id').show();
	    	initilizeWithDefaultValue.sub_store_id=0;
	    	load_zones();
	    }
});
 
 
 
 //http://localhost:2000/scmservice/expiryDrugsController/loadSubStore
 
 //{"supStoreTypeId":"102"} 
 // http://localhost:2000/scmservice/expiryDrugsController/load_zones
 
 
 function load_zones(){
	 console.log("load_zonesload_zonesload_zones");
	 //var strUrl = "http://localhost:2000/scmservice/expiryDrugsController/load_zones";
	 var strUrl = subStoreAmbulance.load_zones;
	 $('#zone_id').empty();
	 $.ajax({
			type : 'GET',
					url : strUrl,
					dataType : 'json',
					async : false,
			success : function(data) {
				var responsecode = data.responseCode;
				if (200 !== responsecode) {
				} else {
					var jsonArray = data.objControllerDto;
					var selectfirst = "<option value='0'>"+dropdownConstantobj.drop_down+"</option>";
					$('#zone_id').append(selectfirst);
					$.each(jsonArray, function(i, resData) {
						var substore = "<option value=" + resData.locationId + ">"
								+ resData.locationName + "</option>";
						$(substore).appendTo('#zone_id');
					});
				}
			},
			error : function(err) {
				console.log("@@@@@@@@@@@@@@@@@@@@@@@" + JSON.stringify(err));
				console.error('loadDistrict  error: ' + JSON.stringify(err));
			}
		});
		$('#zone_id').trigger("chosen:updated");
		$('#zone_id').chosen();
	 
 }
 
 
 
 
 // http://localhost:2000/scmservice/expiryDrugsController/load_baselocations
 
 
 function load_baselocations(){
	 $("#base_location_id").empty();
	 var zone_id = $('#zone_id').val();
	//	var strUrl = "http://localhost:2000/scmservice/expiryDrugsController/load_baselocations";
		
       var strUrl = subStoreAmbulance.load_baselocations;
		
		$.ajax({
			type : "POST",
			url : strUrl,
			dataType : "json",
			data : JSON.stringify(
				{"zoneId":zone_id}  
			),
			contentType : "application/json",
			async : false,
			crossDomain : true,
			success : function(data) {
				var responsecode = data.responseCode;
				if (200 !== responsecode) {
				} else {
					var jsonArray = data.objControllerDto;
					var selectfirst = "<option value='0'>"+dropdownConstantobj.drop_down+"</option>";
					$('#base_location_id').append(selectfirst);
					$.each(jsonArray, function(i, resData) {
						var substore = "<option value=" + resData.baseLocationId + ">"
								+ resData.baseLocationName+ "</option>";
						$(substore).appendTo('#base_location_id');
					});
				}
			},
			error : function(err) {
				console.log("@@@@@@@@@@@@@@@@@@@@@@@" + JSON.stringify(err));
				console.error('loadDistrict  error: ' + JSON.stringify(err));
			}
		});
		$('#base_location_id').trigger("chosen:updated");
		$('#base_location_id').chosen();
		
		//store_item_details();
 }
 
 
 
 
 // http://localhost:2000/scmservice/expiryDrugsController/load_vehicles
 
 function load_vehicles(){
	 
	 $("#abulance_id").empty();
	 var base_location_id = $('#base_location_id').val();
	 var zone_id = $('#zone_id').val();
		//var strUrl = "http://localhost:2000/scmservice/expiryDrugsController/load_vehicles";
		
		var strUrl = subStoreAmbulance.load_vehicles;
		$.ajax({
			type : "POST",
			url : strUrl,
			dataType : "json",
			data : JSON.stringify(
					{"baselocation":zone_id}
			),
			contentType : "application/json",
			async : false,
			crossDomain : true,
			success : function(data) {
				var responsecode = data.responseCode;
				if (200 !== responsecode) {
				} else {
					var jsonArray = data.objControllerDto;
					var selectfirst = "<option value='0'>"+dropdownConstantobj.drop_down+"</option>";
					$('#abulance_id').append(selectfirst);
					$.each(jsonArray, function(i, resData) {
						var substore = "<option value=" + resData.vehicleId + ">"
								+ resData.permanentRegNo+ "</option>";
						$(substore).appendTo('#abulance_id');
					});
				}
			},
			error : function(err) {
				console.log("@@@@@@@@@@@@@@@@@@@@@@@" + JSON.stringify(err));
				console.error('loadDistrict  error: ' + JSON.stringify(err));
			}
		});
		$('#abulance_id').trigger("chosen:updated");
		$('#abulance_id').chosen();
		
	 
	 
	 
 }
 
 
 function loadSubStore(){
	 $("#sub_store_id").empty();
	// SELECT * FROM sp_select_pms_counter_registration_ref(102)
		//var strUrl = "http://localhost:2000/scmservice/expiryDrugsController/loadSubStore";
		var strUrl = ServiceProcreument.LOAD_SUBSTORE;
		console.log('strUrl::--->'+strUrl);
		$.ajax({
			type : "POST",
			url : strUrl,
			dataType : "json",
			data : JSON.stringify(
				{"supStoreTypeId":"102"} 
			),
			contentType : "application/json",
			async : false,
			crossDomain : true,
			success : function(data) {
				var responsecode = data.responseCode;
				if (200 !== responsecode) {
				} else {
					var jsonArray = data.objControllerDto;
					var selectfirst = "<option value='0'>"+dropdownConstantobj.drop_down+"</option>";
					$('#sub_store_id').append(selectfirst);
					$.each(jsonArray, function(i, resData) {
						var substore = "<option value=" + resData.countryId + ">"
								+ resData.countryName + "</option>";
						$(substore).appendTo('#sub_store_id');
					});
				}
			},
			error : function(err) {
				console.log("@@@@@@@@@@@@@@@@@@@@@@@" + JSON.stringify(err));
				console.error('loadDistrict  error: ' + JSON.stringify(err));
			}
		});
		$('#sub_store_id').trigger("chosen:updated");
		$('#sub_store_id').chosen();
		
		//store_item_details();
 }
 

 
 function store_item_details(){
	$('#AppendIntoTable').empty();
	var counterTypeId = $('#sub_store_id').val();
	var counterType_and_amb_id;
	 var ambulanceId = $('#abulance_id').val();
	 if(ambulanceId==0||ambulanceId=='0'||ambulanceId=="0"){
		
		 counterType_and_amb_id = counterTypeId;
		 initilizeWithDefaultValue.sub_store_id=counterTypeId;
	 }
	 else{
		
		 counterType_and_amb_id = ambulanceId;
		 initilizeWithDefaultValue.abulance_id=ambulanceId;
	 }
	 
	// var strUrl = "http://localhost:2000/scmservice/salesIndentRaisedController/store_item_details";
	 var strUrl = subStoreAmbulance.store_item_details;
	 $.ajax({
			type : "POST",
			url : strUrl,
			dataType : "json",
			data : JSON.stringify(
					{"storeTypeId":counterType_and_amb_id}
			),
			contentType : "application/json",
			async : false,
			crossDomain : true,
			success : function(data) {
				localStorage.setItem("counterTypeId", counterTypeId);
				var responsecode = data.responseCode;
				if (200 !== responsecode) {
				} else {
					var jsonArray = data.objControllerDto;
					appendSubStoreDataIntoDOm(jsonArray);
					loadDataTable();
					
				}
			},
			error : function(err) {
				console.error('loadDistrict  error: ' + JSON.stringify(err));
			}
 });
 }

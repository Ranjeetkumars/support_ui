/**
 * 
 */

/**
 * @Desc: This javascript file contains registration as well as update of
 *        equipment
 * @Scince:02/04/2020
 * @author:Ranjeet kr.
 * 
 */

function dressRegistration() {
	console.log('dressRegistration function is executed');
	var rtnJsonObj = validationOfEquipmentRegistration();
	if(rtnJsonObj==false||rtnJsonObj=="false"||rtnJsonObj=='false'||rtnJsonObj==undefined||rtnJsonObj=='undefined')
		return
	var strUrl = Service.INSERT_DRUG_DETAILS;
	console.log('==== strUrl' + strUrl);
	$.ajax({
		type : "POST",
		url : strUrl,
		dataType : "json",
		data : JSON.stringify(rtnJsonObj),
		contentType : "application/json",
		async : false,
		crossDomain : true,
		success : function(data) {
			if (data.rtnReponseCount === 0 || data.rtnReponseCount === "0"
					|| data.rtnReponseCount === '0') {
				resetItemSearch();
				toastr.warning('Item Already Exist!');
			}
			if (data.rtnReponseCount === 1 || data.rtnReponseCount === "1"
					|| data.rtnReponseCount === '1') {
				toastr.success('Drug Registered Successfully!');
				resetItemSearch();

				//aftre save approval button should enable 
				$('#btnSubmit_approval').removeAttr("disabled");
				
			}
		},
		error : function(err) {
			console.log("Error log::"+err)
			toastr.error('something went wrong!');
		}
	});

}

function updateEquipmentDetails() {
	console.log("updateEquipmentDetails function is executed");

}




 function validationOfEquipmentRegistration(){
	console.log("validationOfEquipmentRegistration function is executed");
	var name_regex = /^[a-zA-Z]+$/;
	var genericId = $("#reg_drug_genericNameId").val();
    var itemName = $("#scmitemname").val();
    
    console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@::>"+itemName);
    var reg_drug_manufactureId = $("#reg_drug_manufactureId").val();
    var reg_drug_shortCodeId = $("#reg_drug_shortCodeId").val();
    var reg_drug_inventorygroupId = $("#reg_drug_inventorygroupId").val();
    var reg_drug_inventoryItemFormId = $("#reg_drug_inventoryItemFormId").val();
    var reg_drug_packingId = $("#reg_drug_packingId").val();
    var scmitemQuantity = $("#scmitemQuantity").val();
    var itemcentralstoreminqty = $("#scmitemcentralstoreminqty").val();
    var scmitemcentralstorereorderqty = $("#scmitemcentralstorereorderqty").val();
    var scmitemdescription = $("#scmitemdescription").val();
    var reg_drug_barcodeId = $("#reg_drug_barcodeId").val();
    
    if(genericId=='0'||genericId=='undefined'||genericId==0){
    	toastr.warning('Please select Generic Name!');
    	return false
    }
   else if (!itemName.match(name_regex) || itemName.length == 0) {
    	toastr.warning('Please enter valid Item Name!'); // This Segment Displays The Validation Rule For Name
    	return false
    }
    /*else if(reg_drug_manufactureId==0||reg_drug_manufactureId=='0'||reg_drug_manufactureId=='undefined'){
    	alert("reg_drug_manufactureIdreg_drug_manufactureId:::"+reg_drug_manufactureId);
    	toastr.warning('Please select manufacture!');
	return
    }
    */
    else if(reg_drug_shortCodeId==''||reg_drug_shortCodeId==null||reg_drug_shortCodeId=='undefined'){
    	toastr.warning('shortCode should not be empty!');
    	return false
    }
    else if(reg_drug_inventoryItemFormId=='0'||reg_drug_inventoryItemFormId==0||reg_drug_inventoryItemFormId=='undefined'){
    	toastr.warning('Please select Inventory Item From !');
    	return false
    }
    
    else if(reg_drug_inventoryItemFormId=='0'||reg_drug_inventoryItemFormId==0||reg_drug_inventoryItemFormId=='undefined'){
    	toastr.warning('Please select Inventory Item From !');
    	return false
    }
    else if(reg_drug_packingId=='0'||reg_drug_packingId==0||reg_drug_packingId=='undefined'){
    	toastr.warning('Please select packing !');
    	return false
    }
    
    else if(scmitemQuantity==''||scmitemQuantity==null||scmitemQuantity=='undefined'){
    	toastr.warning('Please Eneter Quantity !');
    	return false
    }
    
    else if(itemcentralstoreminqty==''||itemcentralstoreminqty==null||itemcentralstoreminqty=='undefined'){
    	toastr.warning('Please central store min Qty !');
    	return false
    }
    
    else if(scmitemcentralstorereorderqty==''||scmitemcentralstorereorderqty==null||scmitemcentralstorereorderqty=='undefined'){
    	toastr.warning('Please central Re-order  Qty !');
    	return false
    }
    
    else if(scmitemdescription==''||scmitemdescription==null||scmitemdescription=='undefined'){
    	toastr.warning('Please Enter Description !');
    	return false
    }
    
    else if(reg_drug_barcodeId==''||reg_drug_barcodeId==null||reg_drug_barcodeId=='undefined'){
    	toastr.warning('Barcode should not be empty');
    	return false
    }
    else{
    //select * from sp_insert_drug_reg_ref('asdf',1,10 ,2,10,5,'DR-57','0' ,268,167,51,'NA', 1 ,1,1,17,4,1,1,3,12,0,'QLX-DR-57',1,1,'description')//26	
    	
    	var userId = localStorage.getItem('userID');
 		var	roleId = localStorage.getItem("scmRoleId");
 		var	moduleId = localStorage.getItem("scmModuleId");
 	
    	
    	
    	var obj_Insert = {
    	        drugName: itemName,
    	        brand_id: 1,
    	        manufaturer_id: reg_drug_manufactureId,
    	        form_id: 1,
    	        minmum_level_qty: itemcentralstoreminqty,
    	        maximum_lel_qty: scmitemcentralstorereorderqty,
    	        short_unic_code: reg_drug_shortCodeId,
    	        expire_alert: 0,
    	        createdbyid: userId,
    	        createdbyroleid: roleId,
    	        createdbymoduleid: moduleId,
    	        strength_type: 'NA',
    	        system_id: 1,
    	        barcode: reg_drug_barcodeId,
    	        subStoreMinLevelQty: 1,
    	        subStoreMaxLevelQty: 1,
    	        description: scmitemdescription,
    	        genric_group_id: 1,
    	        genric_molecules_id: 1,
    	        packId: reg_drug_packingId[0],
    	        scheduleid: 1,
    	        vehicleReorderqty: 1,
    	        vehicleMinqty: 1,
    	        materialGroupformid: 1,
    	        genericid: genericId,
    	        minsaleqty: 0,
    	        
    	       };
    	return obj_Insert;
    }
  }



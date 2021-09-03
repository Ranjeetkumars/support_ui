/**
 *@desc:This js file contains validation of scm
 *@author: Ranjeet kr. 
 */



/* $( "#options" ).change(function() {
      var packingValue =   $("#reg_drug_packingId").val();
      alert("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@::"+packingValue);
    });*/

 
 
function getPackingValue(){
	var getpackingValueWithId = $("#reg_drug_packingId").val();
	var value =getpackingValueWithId.split(",");
	var split_x = value[1].split("X");
	var calculatevalue =split_x[0]*split_x[1]; 
	$("#scmitemQuantity").val(calculatevalue);
}

function validationOfEquipmentRegistration(){
	alert("validationOfEquipmentRegistration function is executed");
	
	var name_regex = /^[a-zA-Z]+$/;
	var sNumber = $("#serialNumber").val();
    var itemName = $("#scmitemname").val();
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
    
    if(sNumber==''||sNumber=='undefined'||sNumber==null){
    	toastr.warning('Please enter serial number!');
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
    	 var concat = sNumber+'-'+itemName; 
    	var obj_Insert = {
    	        drugName: concat,
    	        brand_id: 1,
    	        manufaturer_id: reg_drug_manufactureId,
    	        form_id: 1,
    	        minmum_level_qty: itemcentralstoreminqty,
    	        maximum_lel_qty: scmitemcentralstorereorderqty,
    	        short_unic_code: reg_drug_shortCodeId,
    	        expire_alert: 0,
    	        createdbyid: 1,
    	        createdbyroleid: 1,
    	        createdbymoduleid: 1,
    	        strength_type: 'NA',
    	        system_id: 1,
    	        genric_group_id: 1,
    	        genric_molecules_id: 1,
    	        packId: reg_drug_packingId[0],
    	        scheduleid: 1,
    	        vehicleReorderqty: 1,
    	        vehicleMinqty: 1,
    	        materialGroupformid: 1,
    	        genericid: 1,
    	        minsaleqty: 1,
    	        barcode: reg_drug_barcodeId,
    	        subStoreMinLevelQty: 1,
    	        subStoreMaxLevelQty: 1,
    	        description: scmitemdescription
    	       };
    	return obj_Insert;
    }
  }



/**
 * @Desc: This js file is writen for to register and update consumable,
 * @author: Ranjeet kumar
 */





function registerConsumable(){
	
	var genericId = $("#reg_drug_genericNameId").val();
	var itemName = $("#strItmName").val();
	var brandName = $('#reg_drug_brandnameid').val();
	var schedule = $('#reg_drug_scheduleId').val();
	var manufacture = $('#manufactureId').val();
	var shortcode = $('#reg_drug_shortCodeId').val();
	var inventoryGroup = $('#reg_drug_inventorygroupId').val();
	var inventoryItemFormId = $('#reg_drug_inventoryItemFormId').val();
	var packingId = $('#reg_drug_packingId').val();
	var quantity = $('#itemQuantity').val();
	var centralStoreMinQty = $('#itemcentralstoreminqty').val();
	var centralStoreRedorderQty = $('#itemcentralstorereorderqty').val();
	var substoreMinQty = $('#itemsubstoreminqty').val();
	var substoreReorderQty = $('#itemsubstorereorderqty').val();
	var ambMinQty = $('#scmitemambulanceminqty').val();
	var ambReOrderQty = $('#scmitemambulancereorderqty').val();
	var description = $('#scmitemdescription').val();
	var barcode = $('#reg_drug_barcodeId').val();
	
	console.log('genericId::'+genericId);
	console.log('itemName::'+itemName);
	console.log('brandName::'+brandName);
	console.log('schedule::'+schedule);//
	console.log('manufacture::'+manufacture);
	console.log('shortcode::'+shortcode);
	console.log('inventoryGroup::'+inventoryGroup);
	console.log('inventoryItemFormId::'+inventoryItemFormId);
	console.log('packingId::'+packingId);
	console.log('quantity::'+quantity);
	console.log('centralStoreMinQty::'+centralStoreMinQty);
	console.log('centralStoreRedorderQty::'+centralStoreRedorderQty);
	console.log('substoreMinQty::'+substoreMinQty);
	console.log('substoreReorderQty::'+substoreReorderQty);
	console.log('ambMinQty::'+ambMinQty);
	console.log('ambReOrderQty::'+ambReOrderQty);
	console.log('description::'+description);
	console.log('barcode::'+barcode);
	
	
	
	
	    var	userId = localStorage.getItem('userID');
		var	roleId = localStorage.getItem("scmRoleId");
		var	moduleId = localStorage.getItem("scmModuleId");
	
	
	var obj_Insert = {
	        drugName: itemName,
	        brand_id: brandName,
	        manufaturer_id: manufacture,
	        form_id: inventoryItemFormId,
	        minmum_level_qty: 1,
	        maximum_lel_qty: 1,
	        short_unic_code: shortcode,
	        expire_alert: 1,
	        createdbyid: userId,
	        createdbyroleid: roleId,
	        createdbymoduleid: moduleId,
	        strength_type: 1,
	        system_id: 1,
	        genric_group_id: 1,
	        genric_molecules_id: 1,
	        packId: packingId,
	        scheduleid: schedule,
	        vehicleReorderqty: ambReOrderQty,
	        vehicleMinqty: 1,
	        materialGroupformid: 1,
	        genericid: genericId,
	        minsaleqty: 1,
	        barcode: barcode,
	        subStoreMinLevelQty: substoreMinQty,
	        subStoreMaxLevelQty: 1,
	        description: description
 };
	console.log('==== Obj_Insert' + JSON.stringify(obj_Insert));
	    var strUrl = Service.INSERT_DRUG_DETAILS;
	    console.log('==== strUrl' + strUrl);
	    $.ajax({
	        type: "POST",
	        url: strUrl,
	        dataType: "json",
	        data: JSON.stringify(obj_Insert),
	        contentType: "application/json",
	        async: false,
	        crossDomain: true,
	        success: function(data) {
	        	console.log('@@@@@@@@@@@@@@@@@@@@@:------------data'+JSON.stringify(data));
	            if (data.rtnReponseCount === 0 || data.rtnReponseCount === "0" || data.rtnReponseCount === '0') {
	                showNotificationError("Item Already Exist", "reg_drug_itemnameId", "error");
	            }
	            if (data.rtnReponseCount === 1 || data.rtnReponseCount === "1" || data.rtnReponseCount === '1') {
	                showNotificationError("Drug Registered Successfully", "insertDrugDetailsid", "success");
	                $('#registration').modal('toggle');
	            }
	        },
	        error: function() {
	        	console.log('something went wrong');
	            console.log("Error In insertDrugDetails");
	        }
	    });
}




function resetDialog(){
	console.log('resetDialog function is executed');
	$('form')[0].reset();
	
	
       /* var dropDown = document.getElementById("reg_drug_genericNameId");
        dropDown.selectedIndex = 0;
        var dropDown1 = document.getElementById("reg_drug_brandnameid");
        dropDown1.selectedIndex = 0;*/
	
        
        $('#reg_drug_genericNameId').empty();
        $('#reg_drug_brandnameid').empty();
        $('#manufactureId').empty();
        $('#reg_drug_inventorygroupId').empty();
        
        
        /*$('#reg_drug_genericNameId').val('').trigger('chosen:updated');
        $('#reg_drug_brandnameid').val('').trigger('chosen:updated');
        $('#manufactureId').val('').trigger('chosen:updated');
        $('#reg_drug_inventorygroupId').val('').trigger('chosen:updated');
       */
   /*     $("#reg_drug_genericNameId").trigger("chosen:updated");
        $("#reg_drug_brandnameid").trigger("chosen:updated");
        $("#manufactureId").trigger("chosen:updated");
        $("#reg_drug_inventorygroupId").trigger("chosen:updated");*/
        
        
        var form = $('form');
        form.get(0).reset();
        form.find('#reg_drug_genericNameId').trigger('chosen:updated');
        form.find('#reg_drug_brandnameid').trigger('chosen:updated');
        form.find('#manufactureId').trigger('chosen:updated');
        form.find('#reg_drug_inventorygroupId').trigger('chosen:updated');
        
        
        
        
        
        
        
/*	$("#reg_drug_genericNameId")[0].selectedIndex = 0;
	$("#reg_drug_brandnameid")[0].selectedIndex = 0;
	$("#manufactureId")[0].selectedIndex = 0;
	$("#reg_drug_inventorygroupId")[0].selectedIndex = 0;
	$("#reg_drug_inventoryItemFormId")[0].selectedIndex = 0;
	$("#reg_drug_packingId")[0].selectedIndex = 0;
	$("#reg_drug_scheduleId")[0].selectedIndex = 0;
	$("#manufactureId")[0].selectedIndex = 0;*/
	
	
	
}






function test(){
	console.log('filterConsumable javascript function is executed');
	
	
	
	
	
}
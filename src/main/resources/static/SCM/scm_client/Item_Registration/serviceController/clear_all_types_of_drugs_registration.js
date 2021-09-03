function clearDrugRegistration() {
	
	console.log('clearDrugRegistration javascript function  executed');
	
	$("#manufactureId").val('').trigger("chosen:updated");
	$("#load_from_inventory_id").val('').trigger("chosen:updated");
	$("#brandNameId").val('').trigger("chosen:updated");
	$('#short_codeId').val('');
	$('#item_name_for_filter').val('');
	$("#reg_drug_genericNameId").val('').trigger("chosen:updated");
	$("#reg_drug_brandnameid").val('').trigger("chosen:updated");
	$("#reg_drug_scheduleId").val('').trigger("chosen:updated");
	$("#reg_drug_manufactureId").val('').trigger("chosen:updated");
	$("#reg_drug_inventorygroupId").val('').trigger("chosen:updated");
	$("#reg_drug_inventoryItemFormId").val('').trigger("chosen:updated");
	$("#reg_drug_packingId").val('').trigger("chosen:updated");
	$("#reg_drug_genericNameId").val();
	$("#reg_drug_itemnameId").val('');
	$('#reg_drug_shortCodeId').val('');
	$('#reg_drug_strengthId').val('');
	$("#reg_drug_dispensableId").val('');
    $("#scmitemQuantity").val('');
	$("#reg_drug_centralMinQtyId").val('');
	$("#reg_drug_centralMaxQtyId").val('');
	$("#reg_drug_substoreMinQtyId").val('');
	$("#reg_drug_substoreMaxQtyId").val('');
	$("#reg_drug_ambMinQtyId").val('');
	$("#reg_drug_ambMaxQtyId").val('');
	$("#reg_drug_descId").val('');
	$("#reg_drug_barcodeId").val('');
	$("#reg_drup_expiryalertId").val('');
}
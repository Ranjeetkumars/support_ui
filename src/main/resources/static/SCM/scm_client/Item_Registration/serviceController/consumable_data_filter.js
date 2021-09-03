function editItemDetails(serialId) {
	$('#registration').modal('show');
	$('#btnSubmit_save').attr("disabled", true);
    $('#btnSubmit_approval').attr("disabled", true);
    $('#btnSubmit_update').attr("disabled", false);
    $('#btnSubmit_reset').attr("disabled", true);
    var strUrl = itemRegistration.getMedicinesDetailsBasedOnSerialId;
     var objSerailId={
    	"serialId":serialId	
    };
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(objSerailId),
        contentType: "application/json",
        async: false,
        crossDomain: true,
        success: function(data) {
        	console.log("json data is comming::"+JSON.stringify(data));
        	var jsonArray = data.objControllerDto;
            console.log("jsonArray"+jsonArray[0].genericName);
            
             $('#reg_drug_barcodeId').val(jsonArray[0].barCode);
             $('#reg_drug_shortCodeId').val(jsonArray[0].shortUnicCode);
             $('#serialNumber').val(jsonArray[0].serialId);
             $('#scmitemdescription').val(jsonArray[0].description);
             
             
             $("#scmitemname").val(jsonArray[0].drugName);
             $("#scmitemname").val(jsonArray[0].drugName);
             $("#scmitemQuantity").val(jsonArray[0].packingType);
             
            },
        error: function(err) {
        	console.log("@@@@@@@@@@@@@@@@@@@@@@@"+err);
            console.error('itemSearch  error: ' + JSON.stringify(err));
        }
    });

}














/*"serialId": "317",
"shortUnicCode": "D-3",
"drugBrandLang_1": "Others",
"companyName": "NA",
"packingType": "1X1",
"groupName": "Consumables",
"formType": "Equipment",
"strengthType": "NA",
"systemTypeLang_1": "Others",
"dgGroupFunctionTypeLang_1": "Other",
"dgmGroupMoleculesTypeLang_1": "Other",
"drugName": "anuj",
"schduleType": "C",
"dr_MinmunLevelQty": "1",
"dr_MaximunLevelQty": "1",
"dr_ExpireAlert": "0",
"vehminQty": "1",
"vehmaxQty": "1",
"dr_MinSalesQty": "0",
"subStoreMinQty": "1",
"subStoreMaxQty": "1",
"barCode": "FLK-D-3",*/


















function loadDataTable() {
	console.log('loadDataTable is executed');
    $('.dataTables-example').DataTable(
            {
                "aLengthMenu": [[5, 10, 15, 25, 50, 75, -1],
                    [5, 10, 15, 25, 50, 75, "All"]],
                "iDisplayLength": 5,
                responsive: true,
                dom: '<"html5buttons"B>lTfgitp',
                buttons: [
//                    {
//                        extend: 'copy'
//                    },
//                    {
//                        extend: 'csv'
//                    },
//                    {
//                        extend: 'excel',
//                        title: 'Item Data'
//                    },
//                    {
//                        extend: 'pdf',
//                        title: 'Item Data'
//                    },
                    {
                       // extend: 'print',
                        customize: function(win) {
                            $(win.document.body).addClass('white-bg');
                            $(win.document.body).css('font-size', '10px');

                            $(win.document.body).find('table').addClass(
                                    'compact').css('font-size', 'inherit');
                        }
                    }]
            });
}




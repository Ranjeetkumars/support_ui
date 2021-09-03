var userId;
var roleId;
var moduleId;

$(document).ready(function() {
	userId = localStorage.getItem('userID');
	roleId = localStorage.getItem("scmRoleId");
	moduleId = localStorage.getItem("scmModuleId");
	
    loadVendorName();
});

$("#mapped_id").click(function() {
    console.log("mapped");
    loadMappedDrugs();

});

$("#un_mapped_id").click(function() {
    console.log("un----mapped");
    loadUnMappedDrugNames();
});

$("#vendor_name_id").change(function() {
    var vendor_id = $("#vendor_name_id").val();
    console.log('loadMappedDrugs java script function is executed::' + vendor_id);
    loadMappedDrugs();
    loadUnMappedDrugNames();
});

/*
 * function loadMappedDrugs(){
 * 
 * //confussion var vendor_id = $("#vendor_name_id").val();
 * console.log('loadMappedDrugs java script function is executed::'+vendor_id); }
 */

function loadUnMappedDrugNames() {

    $('#mapped_and_unmapped').empty();
    var vendor_id = $("#vendor_name_id").val();
    if (vendor_id == 0 || vendor_id == "0") {
        toastr.error('Please select vendor name.');
        return false;
    }
    var strUrl = vendorManagement.loadDrugNames;
    console.log('url::' + strUrl);
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify({
            "supplierId": vendor_id
        }),
        contentType: "application/json",
        async: false,
        crossDomain: true,
        success: function(data) {
            unmappedDrugs(data.objDrugVehicleTypeMappingControllerDTO);
            loadDataTable();
        },
        error: function(err) {
            toastr
                .info('Something went wrong! try again' +
                    JSON.stringify(err));
        }
    });

}

function loadMappedDrugs() {

    var vendor_id = $("#vendor_name_id").val();
    console.log('loadMappedDrugs drugs executed');
    if (vendor_id == 0 || vendor_id == "0") {
        toastr.error('Please select vendor name.');
        return false;
    }
    var strUrl = vendorManagement.loadMappedDrugs;
    console.log('url::' + strUrl);
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify({
            "supplierId": vendor_id
        }),
        contentType: "application/json",
        async: false,
        crossDomain: true,
        success: function(data) {
            if (data.responseCode == 200 || data.responseCode == "200") {
                mappedDrugs(data.drugAndSupplierMappingControllerDto);
                loadDataTable();
            }
        },
        error: function(err) {
            toastr
                .info('Something went wrong! try again' +
                    JSON.stringify(err));
        }
    });

}

function loadVendorName() {
    console.log('loadVendorName function is executed');
    try {
        $('#vendor_name_id').empty();
        var strUrl = vendorManagement.listloadSuppliers;
        console.log("loadVendorName Url is:" + strUrl);
        $.ajax({
            type: 'GET',
            url: strUrl,
            dataType: 'json',
            async: false,
            success: function(data) {
                var responsecode = data.responseCode;
                if (200 !== responsecode) {

                } else {
                    var jsonArray = data.drugAndSupplierMappingControllerDto;
                    var selectfirst = "<option value='0'>" +
                        dropdownConstantobj.drop_down + "</option>";
                    $('#vendor_name_id').append(selectfirst);
                    $.each(jsonArray, function(i, resData) {
                        var vendor = "<option value=" + resData.supplierId +
                            ">" + resData.supplierName + "</option>";
                        $(vendor).appendTo('#vendor_name_id');
                    });
                }
            },
            error: function(err) {
                console.error("Error in loadVendorName" + JSON.stringify(err));
            }
        });
    } catch (err) {
        console.error('Error in  loadVendorName() ' + err);
    }
    $('#vendor_name_id ').trigger("chosen:updated");
    $('#vendor_name_id').chosen();
}
var drugid;

function updateDrugSupplierMapping(drugId, shorCode, brandName, ItemName) {
    drugid = drugId;
    $("#item_name_id").val(ItemName);
    $("#short_code_id").val(shorCode);
    $("#brand_name_id").val(brandName);

    $('#registration').modal('show');

}

function mappedWithVendor() {
    var isStatus = validateFields();
    if (isStatus == false || isStatus == 'false') {
        return false;
        // appendIntoTable();

    }
    var iteName = $('#item_name_id').val();
    var shortCode = $('#short_code_id').val();
    var brandName = $('#brand_name_id').val();
    var purchasePrice = $('#purchase_price_id').val();
    var purchase_unit_price = $('#purchase_unit_price_id').val();
    var mrp = $('#mrp_id').val();
    var unit_price = $('#unit_price_id').val();
    var vat = $('#vat_id').val();
    var discount = $('#discount_id').val();
    // var strtDate = $('#strtDate').val();
    var vendor_id = $("#vendor_name_id").val();
    var strtDate = $("#delevryDate").val();

    var strUrl = " http://localhost:2000/scmservice/drugAndSupplierMappingController/updateDrugSupplierMapping";
    $
        .ajax({
            type: "POST",
            url: strUrl,
            dataType: "json",
            data: JSON.stringify({
                "supplierId": vendor_id,
                "drugId": drugid,
                "purchageprice": purchasePrice,
                "purchageunitcost": purchase_unit_price,
                "mrp": mrp,
                "unitcost": unit_price,
                "vatpercentag": vat,
                "discount": discount,
                "startdate": strtDate,
                "createdById": userId,
                "createdByModuleId": moduleId,
                "createdByRoleId": roleId,
                "rowCountSize": "1"
            }),
            contentType: "application/json",
            async: false,
            crossDomain: true,
            success: function(data) {
                if (data.rtnReponseCount == 1 ||
                    data.rtnReponseCount == '1') {
                    toastr
                        .success('Vendor is Mapped with Drugs Details successfully');
                    clearVendorMapedFilds();
                } else {
                    toastr.error('Something went wrong! try again');
                }
            },
            error: function(err) {
                toastr.info('Something went wrong! try again' +
                    JSON.stringify(err));
            }
        });

}

function unmapppe(drugID) {
    var vendor_id = $("#vendor_name_id").val();
    var strUrl = "http://localhost:2000/scmservice/drugAndSupplierMappingController/updateMappedDrugToUnMap";

    console.log('@@@@@@@@@@@@@Drug Id::' + drugID);
    console.log('@@@@@@@@@@@@@vendor_id Id::' + vendor_id);
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify({
            "supplierId": vendor_id,
            "drugId": drugID
        }),
        contentType: "application/json",
        async: false,
        crossDomain: true,
        success: function(data) {
            console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@::' +
                JSON.stringify(data));
            loadMappedDrugs();
        },
        error: function(err) {
            toastr
                .info('Something went wrong! try again' +
                    JSON.stringify(err));
        }
    });

}

function validateFields() {

    console.log('validateFields function is executed');
    var iteName = $('#item_name_id').val();
    var shortCode = $('#short_code_id').val();
    var brandName = $('#brand_name_id').val();

    var purchasePrice = $('#purchase_price_id').val();
    var purchase_unit_price = $('#purchase_unit_price_id').val();
    var mrp = $('#mrp_id').val();
    var unit_price = $('#unit_price_id').val();
    var vat = $('#vat_id').val();
    var discount = $('#discount_id').val();
    var strtDate = $('#strtDate').val();

    if (purchasePrice == "" || purchasePrice == '') {
        toastr.error("Please enter purchase price");
        return false;
    }

    if (parseInt(purchasePrice) <= 0) {
        toastr.error("Don't enter purchase price as zero");
        return false;
    }
    if (purchase_unit_price == "" || purchase_unit_price == '') {
        toastr.error("Please enter purchase unit price");
        return false;
    }
    if (parseInt(unit_price) <= 0) {
        toastr.error("Don't enter purchase unit price as zero");
        return false;
    }
    if (mrp == "" || mrp == '') {
        toastr.error("Please enter mrp");
        return false;
    }
    if (parseInt(mrp) <= 0) {
        toastr.error("Don't enter mrp as zero");
        return false;
    }
    if (parseInt(mrp) <= parseInt(purchasePrice)) {
        toastr.error("MRP not less than/not equal purchase price");
        return false;
    }
    if (unit_price == "" || unit_price == '') {
        toastr.error("Please enter unit price");
        return false;
    }
    if (parseInt(purchase_unit_price) <= 0) {
        toastr.error("Don't enter unit price as zero");

        return false;
    }
    if (vat == "" || vat == '') {
        toastr.error("Please enter VAT");
        return false;
    }

    if (parseInt(vat) > 100) {
        toastr.error("Please enter correct VAT");
        return false;
    }
    if (discount == "" || discount == '') {
        toastr.error("Please enter disscount");
        return false;
    }

    if (parseInt(discount) > 100) {
        toastr.error("Please enter correct disscount");
        return false;
    }
    /*
     * if (strtDate == null) { console.log("Please enter start date"); return false; }
     */
    /*
     * if (parseInt(purchase_unit_price)>parseInt(purchasePrice)) {
     * console.log("Purchase unit price not more than purchase price"); return false; }
     * if (parseInt(purchase_unit_price) >parseInt(mrp)) { console.log( " Unit price
     * not more than the mrp"); return false; }
     */
    return true;
}

function appendIntoTable() {
    console.log('appendIntoTable function is executed');

    var iteName = $('#item_name_id').val();
    var shortCode = $('#short_code_id').val();
    var brandName = $('#brand_name_id').val();
    var purchasePrice = $('#purchase_price_id').val();
    var purchase_unit_price = $('#purchase_unit_price_id').val();
    var mrp = $('#mrp_id').val();
    var unit_price = $('#unit_price_id').val();
    var vat = $('#vat_id').val();
    var discount = $('#discount_id').val();
    var strtDate = $('#strtDate').val();
    var vendor_id = $("#vendor_name_id").val();

    // $('#equipmentTableId').empty();
    console.log('equipment_DOM function is executed');
    // For Div Tag
    try {
        var objDivTag = document.createElement('div');
        $(objDivTag).addClass("table-responsive");

        // For table
        var ObjTableTag = document.createElement("table");
        $(ObjTableTag)
            .addClass(
                "table table-striped table-bordered table-hover dataTables-example");
        $(objDivTag).append(ObjTableTag);
        // For table head
        var objTHead = document.createElement("thead");
        $(ObjTableTag).append(objTHead);

        // For table row
        var objTr = document.createElement("tr");
        $(objTHead).append(objTr);

        var objTHead1 = document.createElement("th");
        $(objTHead1).html('Brand Name');
        $(objTr).append(objTHead1);
        // For table Heading1

        // For table Heading2
        var objTHead2 = document.createElement('th');
        $(objTHead2).html('Item Name');
        $(objTr).append(objTHead2);

        // For table Heading3
        var objTHead3 = document.createElement('th');
        $(objTHead3).html('Purchase price');
        $(objTr).append(objTHead3);

        var objTHead4 = document.createElement('th');
        $(objTHead4).html('Purchase unit price');
        $(objTr).append(objTHead4);
        // For table Heading4
        var objTHead5 = document.createElement('th');
        $(objTHead5).html('Mrp');
        $(objTr).append(objTHead5);

        // For table Heading5
        var objTHead6 = document.createElement('th');
        $(objTHead6).html('Unit price');
        $(objTr).append(objTHead6);

        var objTHead7 = document.createElement('th');
        $(objTHead7).html('Vat(%)');
        $(objTr).append(objTHead7);

        var objTHead8 = document.createElement('th');
        $(objTHead8).html('Discount(%)');
        $(objTr).append(objTHead8);

        var objTHead9 = document.createElement('th');
        $(objTHead9).html('start Date');
        $(objTr).append(objTHead9);

        var objTHead10 = document.createElement('th');
        $(objTHead10).html('Save/Update');
        $(objTr).append(objTHead10);

        var objTBody = document.createElement("tbody");
        $(objTBody).attr("id", "tbodyData");
        $(ObjTableTag).append(objTBody);

        var tbleRow = document.createElement("tr");

        var tablcol1 = document.createElement("td");
        $(tablcol1).addClass('text-center');
        // $(tablcol1).html('<label class="check "><input type="checkbox"
        // id="myCheck12" class="case" value=' + strData[i].equipmentId + '
        // name="case" )" ><span class="checkmark"> </label>');
        $(tablcol1).html(brandName);
        $(tbleRow).append(tablcol1);
        // $(tablcol1).attr('onclick', 'onclickCheckbox()');

        var tablcol2 = document.createElement("td");
        $(tablcol2).addClass('text-center');
        $(tablcol2).html(iteName);
        $(tbleRow).append(tablcol2);

        var tablcol3 = document.createElement("td");
        $(tablcol3).addClass('text-center');
        $(tablcol3).html(purchasePrice);
        $(tbleRow).append(tablcol3);

        var tablcol4 = document.createElement("td");
        $(tablcol4).addClass('text-center');
        $(tablcol4).html(purchase_unit_price);
        $(tbleRow).append(tablcol4);

        var tablcol5 = document.createElement("td");
        $(tablcol5).addClass('text-center');
        $(tablcol5).html(mrp);
        $(tbleRow).append(tablcol5);

        /*
         * var tablcol9 = document.createElement("td");
         * $(tablcol9).addClass('text-center');
         * $(tablcol9).html(strData[i].companyName);
         * $(tbleRow).append(tablcol9);
         */

        /*
         * var tablcol6 = document.createElement("td");
         * $(tablcol6).addClass('text-center'); $(tablcol6).append('<a
         * href="#"><i class="fa fa-edit" data-toggle="modal"
         * data-target="#update"></i><i></a> '); $(tablcol6).attr('onclick',
         * 'get_RowData("' + strData[i].equipmentId + '","' +
         * strData[i].equipmentName + '","' + strData[i].equipmentDesc + '","' +
         * strData[i].equipmentType + '")');
         */

        var tablcol6 = document.createElement("td");
        $(tablcol6).addClass('text-center');
        $(tablcol6).html(unit_price);
        $(tbleRow).append(tablcol6);

        /*
         * var tablcol7 = document.createElement("td");
         * $(tablcol7).addClass('text-center'); $(tablcol7) .append( '<a
         * href="#">Click Here<i class="fa fa-trash"></i><i></a> ');
         * $(tablcol7).attr('onclick', 'updateDrugSupplierMapping("' + iteName +
         * '","' + iteName+ '","' + iteName + '","' + iteName + '")');
         * $(tablcol7).css('height', '5px');
         */

        var tablcol7 = document.createElement("td");
        $(tablcol7).addClass('text-center');
        $(tablcol7).html(vat);
        $(tbleRow).append(tablcol7);

        var tablcol8 = document.createElement("td");
        $(tablcol8).addClass('text-center');
        $(tablcol8).html(discount);
        $(tbleRow).append(tablcol8);

        var tablcol9 = document.createElement("td");
        $(tablcol9).addClass('text-center');
        $(tablcol9).html("27/04/2020");
        $(tbleRow).append(tablcol9);

        var tablcol10 = document.createElement("td");
        $(tablcol10).addClass('text-center');
        // $(tablcol10).html("27/04/2020");
        $(tbleRow).append(
            '<a href="#">Click Here<i class="fa fa-trash"></i><i></a> ');
        $(tablcol7).attr(
            'onclick',
            'updateDrugSupplierMapping("' + iteName + '","' + iteName +
            '","' + iteName + '","' + iteName + '")');
        $(tablcol7).css('height', '5px');

        $(tbleRow).append(tablcol9);
        $(tbleRow).append(tablcol10);
        $(objTBody).append(tbleRow);

        $("#appendInTable").append(objDivTag);

    } catch (err) {
        console.log("equipmentTableId" + err);
    }

}

function clearVendorMapedFilds() {
    $('#item_name_id').val('');
    $('#short_code_id').val('');
    $('#brand_name_id').val('');
    $('#purchase_price_id').val('');
    $('#purchase_unit_price_id').val('');
    $('#mrp_id').val('');
    $('#unit_price_id').val('');
    $('#vat_id').val('');
    $('#discount_id').val('');
    $('#strtDate').val('');
    $("#vendor_name_id").val('');
}
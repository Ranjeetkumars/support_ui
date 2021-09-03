/**
 * 
 */




function active_inactive_dom(strData) {
	
	try {
        var objDivTag = document.createElement('div');
        $(objDivTag).addClass("table-responsive");


        var ObjTableTag = document.createElement("table");
        $(ObjTableTag).addClass("table table-striped table-bordered table-hover dataTables-example");
        $(objDivTag).append(ObjTableTag);

        var objTHead = document.createElement("thead");
        $(ObjTableTag).append(objTHead);


        var objTr = document.createElement("tr");
        $(objTHead).append(objTr);

        var objTHead1 = document.createElement("th");

        //$(objTHead1).html('<label class="check "><span style=" color: white;margin-left: -31px;">Select </span> <input type="checkbox" id="selectall" onclick="multipleCheckBox()">  <span class="checkmark"></span>');
        $(objTHead1).html('Select');
        $(objTr).append(objTHead1);

        var objTHead2 = document.createElement('th');
        $(objTHead2).html('Item Name');
        $(objTr).append(objTHead2);


//For table Heading3
        var objTHead3 = document.createElement('th');
        $(objTHead3).html('Brand Name');
        $(objTr).append(objTHead3);


        var objTHead4 = document.createElement('th');
        $(objTHead4).html('Manufacture');
        $(objTr).append(objTHead4);

        var objTHead5 = document.createElement('th');
        $(objTHead5).html('Matrial From');
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
            $(tablcol1).html('<label class="check "><input type="checkbox" id="myCheck12"  class="case"  value=' + strData[i].equipmentId + ' name="case"  )" ><span class="checkmark"> </label>');
            $(tbleRow).append(tablcol1);

            $(tablcol1).attr('onclick', 'onclickCheckbox('+strData[i].serialId+')');

            var tablcol2 = document.createElement("td");
            $(tablcol2).addClass('text-center');
            $(tablcol2).html(strData[i].drugName);
            $(tbleRow).append(tablcol2);

            var tablcol3 = document.createElement("td");
            $(tablcol3).addClass('text-center');
            $(tablcol3).html(strData[i].drugBrandLang1);
            $(tbleRow).append(tablcol3);

            var tablcol4 = document.createElement("td");
            $(tablcol4).addClass('text-center');
            $(tablcol4).html(strData[i].companyName);
            $(tbleRow).append(tablcol4);

            var tablcol5 = document.createElement("td");
            $(tablcol5).addClass('text-center');
            $(tablcol5).html(strData[i].formType);
            $(tbleRow).append(tablcol5);
            $(objTBody).append(tbleRow);
        }
        $("#serviceRemainder").append(objDivTag);
	} catch (err) {
        console.log("active_inactive_dom" + err);
    }
}

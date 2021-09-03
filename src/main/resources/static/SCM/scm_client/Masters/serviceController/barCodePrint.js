var userId;
var roleId;
var moduleId;

$(document).ready(function() {
	userId = localStorage.getItem('userID');
	roleId = localStorage.getItem("scmRoleId");
	moduleId = localStorage.getItem("scmModuleId");
	
	printBarCode();
	
});


function printBarCode() {
	
	
	var strUrl = MASTER_END_POINT.printBarCode;
	console.log('get list of print bar code ::'+strUrl);
	$.ajax({
		type : 'GET',
		url : strUrl,
		dataType : 'json',
		async : false,
		success : function(data) {

			listOfData(data.objBrandDetailsControllerDTO);
			masterDataTable();
		},
		error : function(err) {
			console.error("Error in loadload_store_idStores"
					+ JSON.stringify(err));
		}
	});

}

var gArrData;
function listOfData(arrData) {
	gArrData = arrData;
	destorTableBeforeLoad();
	var index = 0;
	for (var i = 0; i < arrData.length; i++) {
		index++;
		$('#list_of_barcode_master_data_id')
				.append(
						'<tr>'
								+ '<td>'
								+ arrData[i].shortUnicCode
								+ '</td>'
								+ '<td>'
								+ arrData[i].drugName
								+ '</td>'
								+ '<td>'
								+ arrData[i].barCode
								+ '</td></tr>');
							
	}

}


function masterDataTable() {

	$('#masterTable_id').DataTable(
			{
				"aLengthMenu" : [ [ 5, 10, 15, 25, 50, 75, -1 ],
						[ 5, 10, 15, 25, 50, 75, "All" ] ],
				"iDisplayLength" : 5,
				responsive : true,
				// "scrollY":"400px",
				dom : '<"html5buttons"B>lTfgitp',
				buttons : [
//						{
//							extend : 'copy'
//						},
//						{
//							extend : 'csv'
//						},
//						{
//							extend : 'excel',
//							title : 'TyreLifeData'
//						},
//						{
//							extend : 'pdf',
//							title : 'TyreLifeData'
//						},
						{
							//extend : 'print',
							customize : function(win) {
								$(win.document.body).addClass('white-bg');
								$(win.document.body).css('font-size', '10px');

								$(win.document.body).find('table').addClass(
										'compact').css('font-size', 'inherit');
							}
						} ]
			});
}

function destorTableBeforeLoad() {

	$('#masterTable_id').dataTable().fnClearTable();
	$('#masterTable_id').dataTable().fnDestroy();

}
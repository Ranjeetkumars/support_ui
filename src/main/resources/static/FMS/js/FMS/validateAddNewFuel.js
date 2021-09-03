/**
 * Created By Ranjeet kr. Sinha
 */

function validateAddNewFuels(objJson){
	if(objJson.vehicleId=='0'||objJson.vehicleId=="0"||objJson.vehicleId==0){
		toastr.warning('Please Select Vehicle Type!');
		return false
	}
	if(objJson.fillingDate==''||objJson.fillingDate==""||objJson.fillingDate=='undefined'){
		toastr.warning('Please Select Date and Time!');
		return false
	}
	if(objJson.startOdo==''||objJson.startOdo==""||objJson.startOdo=='undefined'){
		toastr.warning('Last updated: 56,491 mi (11 hours ago)');
		return false
	}
	
	if(objJson.fuelPricePerLiter==''||objJson.fuelPricePerLiter==""||objJson.fuelPricePerLiter=='undefined'){
		toastr.warning('Please proper odo meter!');
		return false
	}
	if(objJson.fuelType==''||objJson.fuelType==""||objJson.fuelType=='undefined'){
		toastr.warning('Please select  fuel Type!');
		return false
	}
	if(objJson.otherStationDetails==''||objJson.otherStationDetails==""||objJson.otherStationDetails=='undefined'){
		toastr.warning('Please select  vendor Type!');
		return false
	}
	if(objJson.paymenTypeId==''||objJson.paymenTypeId==""||objJson.paymenTypeId=='undefined'){
		toastr.warning('Please enter  reference !');
		return false
	}
	if(objJson.remarks==''||objJson.remarks==""||objJson.remarks=='undefined'){
		toastr.warning('Please enter comment !');
		return false
	}
	return true
}


function validateFuelFilling(jObject){
	console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@::"+jObject.pilotId);
	if(jObject.vehicleId==0 || jObject.vehicleId=='0'||jObject.vehicleId=='undefined' || jObject.vehicleId==undefined){
		toastr.warning('Please Select Vehicle Type!');
		return false
	}
	if(jObject.stationId==0 || jObject.stationId=='0'||jObject.stationId=='undefined' || jObject.stationId==undefined){
		toastr.warning('Please select fuel station Type!');
		return false
	}
	if(jObject.endOdo=="" || jObject.endOdo==''){
		toastr.warning('Please enter end odo meter!');
		return false
	}
	if(jObject.fillingDate==""||jObject.fillingDate==''){
		toastr.warning('Please enter fuel filling date!');
		return false
	}
	if(jObject.fuelQty==""||jObject.fuelQty==''||jObject.fuelQty=='undefined'||jObject.fuelQty==undefined){
		toastr.warning('Please enter fuel quantity!');
		return false
	}
	if(jObject.fuelPricePerLiter==""||jObject.fuelPricePerLiter==''||jObject.fuelQty=='undefined'||jObject.fuelQty==undefined){
		toastr.warning('Please enter fuel price per unit!');
		return false
	}
	if(jObject.paymenTypeId==0 || jObject.paymenTypeId=='0'||jObject.paymenTypeId=='undefined' || jObject.paymenTypeId==undefined){
		toastr.warning('Please select payment mode Type!');
		return false
	}
	
	if(jObject.paymenTypeId==0 || jObject.paymenTypeId=='0'||jObject.paymenTypeId=='undefined' || jObject.paymenTypeId==undefined){
		toastr.warning('Please select payment mode Type!');
		return false
	}
	
	return true;
}





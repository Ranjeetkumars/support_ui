
/**
 * Created By Bhuneshwar
 * @Date: 03/8/2019
 * @type String
 */

var SYSTEM_IP3="localhost:1700"


 Service = {
 //all mmu service
     saveServicePointDetails: 'http://' + SYSTEM_IP3 + '/ServicePointRegistrationControler/insertServicePointRegistration',
     getDistrictDropDown: 'http://' + SYSTEM_IP3 + '/ServicePointRegistrationControler/getDistrictDetails',
     getMandalDropDown: 'http://' + SYSTEM_IP3 + '/ServicePointRegistrationControler/getManadl',
     getCityDropDown: 'http://' + SYSTEM_IP3 + '/ServicePointRegistrationControler/getCity',
     getServicePointRegistationDetails: 'http://' + SYSTEM_IP3 + '/ServicePointRegistrationControler/getServicePointRegistationDetails',
     deleteServicePointRegistationData: 'http://' + SYSTEM_IP3 + '/ServicePointRegistrationControler/deleteServicePointRegistationDetails',
     
     //vehicleToDistrict service
     districtToVehicleNotMapping: 'http://' + SYSTEM_IP3 + '/vehicleToDistrictMappingController/getVehicleNotMappingToDistrict',
     insertVehicleToDistrictMapping:'http://' + SYSTEM_IP3 + '/vehicleToDistrictMappingController/insertVehicleToDistrictMapping',
     districtToVehicleMapping:'http://' + SYSTEM_IP3 + '/vehicleToDistrictMappingController/getVehicleToDistrcitMapping',
     getAssignedVehicleList:'http://' + SYSTEM_IP3 + '/vehicleToDistrictMappingController/getAssignedVehicleList',
     getdistrictList:'http://' + SYSTEM_IP3 + '/ServicePointRegistrationControler/getDistrictDetails',
     getVehicleBasedOnDistrictForSearch:'http://' + SYSTEM_IP3 + '/ServicePointRegistrationControler/getAssignedVehicleBasedOnDistrict',
     getVehicleBasedOnDistrict:'http://' + SYSTEM_IP3 + '/ServicePointRegistrationControler/getVehicleBasedOnDistrict',
     getVehicleBasedOnDistrictForUpdate:'http://' + SYSTEM_IP3 + '/ServicePointRegistrationControler/getVehicleBasedOnDistrictForUpdate',
     getServicePointName:'http://' + SYSTEM_IP3 + '/ServicePointRegistrationControler/getServicePoint',
     getServicePointNameForUpdate:'http://' + SYSTEM_IP3 + '/ServicePointRegistrationControler/getServicePoint',
     insertServicePointSchdule:'http://' + SYSTEM_IP3 + '/vehicleToDistrictMappingController/insertMMUSchedule',
     updateServicePointSchdule:'http://' + SYSTEM_IP3 + '/vehicleToDistrictMappingController/insertMMUSchedule',
     searchSchduleData:'http://' + SYSTEM_IP3 + '/vehicleToDistrictMappingController/getServicepointSchduling',
     getSchduleDetails:'http://' + SYSTEM_IP3 + '/vehicleToDistrictMappingController/getServicepointSchdulingForSearch',
     searchSchduleData1:'http://' + SYSTEM_IP3 + '/vehicleToDistrictMappingController/getServicepointSchduling',
     getServicepointSchdulingFilter:'http://'+SYSTEM_IP3+'/vehicleToDistrictMappingController/getServicepointSchdulingFilter',
     deAssignVehicle:'http://'+SYSTEM_IP3+'/vehicleToDistrictMappingController/deAssignVehicle',
     
     
    
         
};

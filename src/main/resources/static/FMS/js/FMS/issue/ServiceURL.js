
/**
 * Created By Deepak
 * @Date: 03/8/2019
 * @type String
 */


var SYSTEM_IP = "10.110.4.152:9161";
var SYSTEM_IP1 = "10.110.4.152:9161/FleetManagement";
var SYSTEM_IP2="10.110.4.152:9161";
var SYSTEM="10.110.4.152:9161";



 Service = {
    serviceType: 'http://' + SYSTEM_IP + '/FleetManagement/supervisor_cls_level/getServiceType',
    loadVehicleTypes: 'http://' + SYSTEM_IP + '/FleetManagement/supervisor_cls_level/loadVehicleType',
    loadVehicleStatus: 'http://' + SYSTEM_IP + '/FleetManagement/supervisor_cls_level/loadStatus',
    loadVehicleOwnership: 'http://' + SYSTEM_IP + '/FleetManagement/supervisor_cls_level/loadOwnership',
    loadBodyType: 'http://' + SYSTEM_IP + '/FleetManagement/supervisor_cls_level/loadBodyType',
    loadSubBodyType: 'http://' + SYSTEM_IP + '/FleetManagement/supervisor_cls_level/loadSubBodyType',
    loadAspirationTypes: 'http://' + SYSTEM_IP + '/FleetManagement/supervisor_cls_level/loadAspirationTypes',
    loadEngineBlockType: 'http://' + SYSTEM_IP + '/FleetManagement/supervisor_cls_level/loadEngineBlockType',
    loadEngineCamType: 'http://' + SYSTEM_IP + '/FleetManagement/supervisor_cls_level/loadEngineCampType',
    loadFuelInduction: 'http://'+ SYSTEM_IP + '/FleetManagement/supervisor_cls_level/loadFuelInduction',
    loadWheelDrive: 'http://'+ SYSTEM_IP +'/FleetManagement/supervisor_cls_level/loadWheelDrive',
    loadBrakes: 'http://' + SYSTEM_IP + '/FleetManagement/supervisor_cls_level/loadBrakes',
    loadFuelTypes: 'http://' + SYSTEM_IP + '/FleetManagement/supervisor_cls_level/loadFuelType',
    loadMeterUnit: 'http://' + SYSTEM_IP + '/FleetManagement/supervisor_cls_level/loadMeterUnit',
    loadMeasurementUnit: 'http://'+ SYSTEM_IP + '/FleetManagement/supervisor_cls_level/loadVehicleMeasurementUnit',
    loadFuelTypeUnit: 'http://'+ SYSTEM_IP + '/FleetManagement/supervisor_cls_level/loadFuelTypeUnit',
    loadOperator: 'http://' + SYSTEM_IP + '/FleetManagement/supervisor_cls_level/loadOperators',
   
    saveAdditionalDetails:'http://'+ SYSTEM_IP + '/FleetManagement/supervisor_cls_level/saveorUpdateAdditionalDetails',
    
    loadStates:'http://'+ SYSTEM_IP + '/FleetManagement/supervisor_cls_level/loadStates',
    
    loadBaselocaion:'http://' + SYSTEM_IP + '/FleetManagement/CommonDataController/getBaselocationsList',
    //reminder
    vehicle_LIST: 'http://' + SYSTEM_IP1 + '/CommonDataController/getvehiclesBasedOnBaselocId',
    remainder_LIST: 'http://' + SYSTEM_IP1 + '/RemindersController/reminderTypeBasedOnreminderTypeId',
    insertAddReminderDetails: 'http://' + SYSTEM_IP1 + '/RemindersController/insertServiceReminderDetails',
    
     GETVEHICLES_DROPDOWN: 'http://' + SYSTEM_IP1 + '/CommonDataController/getAvailableVehicles',
    ZONES_LIST: 'http://' + SYSTEM_IP1 + '/CommonDataController/getZonesList',
    DISTRICTS_LIST: 'http://' + SYSTEM_IP1 + '/CommonDataController/getdistrictsList',
    BASELOCATIONS_LIST: 'http://' + SYSTEM_IP1 + '/CommonDataController/getBaselocationsList',
    ASSIGN_VEHICLE_TO_BASELOCATION: 'http://' + SYSTEM_IP1 + '/VehicleAssignDeAssignController/insertVehicleAssignDeAssignDetails',
    GET_ASSIGN_VEHICLE_DETAILS: 'http://' + SYSTEM_IP1 + '/VehicleAssignDeAssignController/getVehicleAssignDeassignDetails',
    GET_VIEW_DETAILS: 'http://' + SYSTEM_IP1 + '/VehicleAssignDeAssignController/getVehicleAssignDeassignDetailsBasedonVehicleId',
    GET_VEHICLES_BASED_ON_BASELOCID: 'http://' + SYSTEM_IP1 + '/CommonDataController/getvehiclesBasedOnBaselocId',
    GET_USERS_LIST_BASED_ON_MODULEID: 'http://' + SYSTEM_IP1 + '/CommonDataController/getUserNamesBasedOnModuleId',
    ASSIGN_DEASSIGN_EMT_PILOT: 'http://' + SYSTEM_IP1 + '/EmtPilotAssignDeAssignController/assignDeassignEmtPilotToVehicle',
    GET_EMT_PILOT_ASSIGN_DETAILS: 'http://' + SYSTEM_IP1 + '/EmtPilotAssignDeAssignController/getEmtPilotAssignDeassignDetails',
    GET_EMT_PILOT_ASSIGN_DETAILS_BASEDON_VEHICLEID: 'http://' + SYSTEM_IP1 + '/EmtPilotAssignDeAssignController/getEmtPilotAssignDeassignDetailsBasedOnVehicleId',
    GET_EMT_PILOT_ASSIGN_DETAILS_FOR_DEASSIGN: 'http://' + SYSTEM_IP1 + '/EmtPilotAssignDeAssignController/getEmtPilotAssignDeassignDetailsForDeassign',
    //Login 
    isUserExist: 'http://' + SYSTEM_IP1 + '/login/isUserExist',
    checkForModule: 'http://' + SYSTEM_IP1 + '/login/checkForModule',
    getRoles: 'http://' + SYSTEM_IP1 + '/login/getRoles',
    getPrevillages: 'http://' + SYSTEM_IP1 + '/login/getPrevillages',
    loginUrl: 'http://' + SYSTEM_IP1 + '/login/login',
    logout: 'http://' + SYSTEM_IP1 + '/login/logout',
    //Fuel
    FUEL_GETVEHICLES_DROPDOWN: 'http://' + SYSTEM_IP1 + '/CommonDataController/getAvailableVehicles',
    
  //  loadFuelTypes: 'http://' + SYSTEM_IP_1 + '/supervisor_cls_level/loadFuelType',
    
    //Bhuvi Added
    getState: 'http://'+SYSTEM_IP2+'/FleetManagement/CommonDataController/getState',
    getDistricts:'http://'+SYSTEM_IP2+'/FleetManagement/CommonDataController/getDistrict',
    getMandal:'http://'+SYSTEM_IP2+'/FleetManagement/CommonDataController/getMandal',
    getCity:'http://'+SYSTEM_IP2+'/FleetManagement/CommonDataController/getCity',
    getCountry:'http://'+SYSTEM_IP2+'/FleetManagement/CommonDataController/getCountry',
    getContactList:'http://'+SYSTEM_IP2+'/FleetManagement/contactUsersController/searchContactDetails',
    getAssignedRolesByUserIdandModuleId: 'http://'+SYSTEM+'/ams/AMSController/getAssignedRolesByUserIdandModuleId',
    getUserUnAssignModuleId:'http://192.168.1.191:8675/ams/AMSController/getUserUnAssignedModule',
    deleteContact:'http://'+SYSTEM_IP2+'/FleetManagement/contactUsersController/deleteContact',
    geEmployeeType:'http://'+SYSTEM_IP2+'/FleetManagement/contactUsersController/getEmployeeType',
    multipledeleteContactList:'http://'+SYSTEM_IP2+'/FleetManagement/contactUsersController/multipledeleteContactList',
    insertAndupdateContact:'http://'+SYSTEM_IP2+'/FleetManagement/contactUsersController/insertAndUpdateContactuser',
    insertAndupdateAndDeleteVendorVendor:'http://'+SYSTEM_IP2+'/FleetManagement/contactUsersController/addAndUpdateVendor',
    vendorType:'http://'+SYSTEM_IP2+'/FleetManagement/contactUsersController/getVendorType',
    
    //Issues
    getUserName:'http://'+SYSTEM_IP2+'/FleetManagement/issuesController/getUserName',
    getVehicleName:'http://'+SYSTEM_IP2+'/FleetManagement/issuesController/getVehicleName',
    issuesType:'http://'+SYSTEM_IP2+'/FleetManagement/issuesController/getIssueType'
    
    
};


/**
 * Created By priyadarshini
 * @Date: 03/8/2019
 * @type String
 */

var SYSTEM_IP = "localhost:2000";
var SYSTEM_IP1 = "localhost:2000/FleetManagement";


 Service = {
     //user
		  geEmployeeType:'http://'+SYSTEM_IP+'/FleetManagement/contactUsersController/getEmployeeType',
     //Vehile Mapping with Baselocation and Employee Mapping with Vehicle  ---> Added by Habiboon Patan
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
    GET_ASSIGNED_VEHICLES: 'http://' + SYSTEM_IP1 + '/CommonDataController/getAssignVehicles',
    TRANSFER_VEHICLE_TO_ANOTHER_BASELOCATION: 'http://' + SYSTEM_IP1 + '/VehicleAssignDeAssignController/transferVehicletoAnotherBaselocation',
    UPDATE_VEHICLES_OF_BASELOCATION: 'http://' + SYSTEM_IP1 + '/VehicleAssignDeAssignController/updateBaselocationOfVehicle',
    ASSIGNED_EMPLOYEESLIST: 'http://' + SYSTEM_IP1 + '/CommonDataController/getAssignedEmployees',
    UPDATE_EMPLOYEE_OF_VEHICLE: 'http://' + SYSTEM_IP1 + '/EmtPilotAssignDeAssignController/updateEmployeeForVehicle',
    TRANSFER_EMPLOYEE_TO_ANOTHER_VEHICLE: 'http://' + SYSTEM_IP1 + '/EmtPilotAssignDeAssignController/transferEmployeetoAnotherVehicle',
    GET_ADDED_BASELOCATIONDROPDOWNLIST:  'http://' + SYSTEM_IP1 + '/EmtPilotAssignDeAssignController/getAddedBaselocations',
    GET_BASELOCATIONDROPDOWNLIST_FOR_EMPLOYEE:  'http://' + SYSTEM_IP1 + '/EmtPilotAssignDeAssignController/getBaselocatinDropdownForEmployee',
    
    
     
     
     
    //Baselocation Registration added by Habiboon Patan
    DISTRICT_DROPDOWN: 'http://' + SYSTEM_IP1 + '/GislayeRegistrationController/getDistrictsBasedOnStateId',
    MANDAL_REGISTRATION: 'http://' + SYSTEM_IP1 + '/BaselocationRegistrationController/MandalRegistration',
    MANDAL_DROPDOWN_BASED_ON_DISTRICTID: 'http://' + SYSTEM_IP1 + '/GislayeRegistrationController/getMandalsBasedOnDistrictId',
    CITY_VILLAGE_REGISTRATION: 'http://' + SYSTEM_IP1 + '/BaselocationRegistrationController/CityRegistration',
    CITY_DROPDOWN: 'http://' + SYSTEM_IP1 + '/GislayeRegistrationController/getCitiesBasedOnMandalId',
    LOCALITY_REGISTRATION: 'http://' + SYSTEM_IP1 + '/BaselocationRegistrationController/LocalityRegistration',
    LOCALITY_DROPDOWN_BASEDON_CITYID: 'http://' + SYSTEM_IP1 + '/GislayeRegistrationController/getlocalitiesBasedOnCityId',
    LANDMARK_REGISTRATION: 'http://' + SYSTEM_IP1 + '/BaselocationRegistrationController/LandMarkRegistration',
    LANDMARK_DROPDOWN_BASEDON_LOCALITYID: 'http://' + SYSTEM_IP1 + '/GislayeRegistrationController/getlandmarkBasedOnLocalityId',
    BASELOCATION_REGISTRATION: 'http://' + SYSTEM_IP1 + '/BaselocationRegistrationController/baselocationRegistration',
    BASELOCATION_DROPDWON: 'http://' + SYSTEM_IP1 + '/BaselocationRegistrationController/getBaselocationDropdown',
    SEARCH_BASELOCATIONDATA: 'http://' + SYSTEM_IP1 + '/BaselocationRegistrationController/getBaselocationData',
    BASELOCATION_UPDATE: 'http://' + SYSTEM_IP1 + '/BaselocationRegistrationController/baselocationUpdate',
    BASELOCATION_DELETE: 'http://' + SYSTEM_IP1 + '/BaselocationRegistrationController/deleteBaselocation',
    
     //inspection
    saveDriverVehicleInspectionReport: 'http://' + SYSTEM_IP1 + '/InspectionController/saveDriverVehicleInspectionReport',
    getFuelLevel: 'http://' + SYSTEM_IP1 + '/InspectionController/getFuelLevel',
     getVehicleCondition: 'http://' + SYSTEM_IP1 + '/InspectionController/getVehicleCondition',
     
     
     //addservice
     
     allServiceTasksDetails: 'http://' + SYSTEM_IP1 + '/ServiceRegistationController/allServiceTasksDetails',
     
     addServiceTasksDetails: 'http://' + SYSTEM_IP1 + '/ServiceRegistationController/saveVehicleServiceTasksDetails',
     serviceTaskDeletion: 'http://' + SYSTEM_IP1 + '/ServiceRegistationController/DeleteVehicleServiceTasksDetails',
     
     //subTask
     allServiceSubTaskDetails: 'http://' + SYSTEM_IP1 + '/ServiceRegistationController/getVehicleServiceSubtasksDetails',
     subTaskRegistration: 'http://' + SYSTEM_IP1 + '/ServiceRegistationController/saveVehicleServiceSubtasksDetails',
     
     serviceSubTaskDeletion: 'http://' + SYSTEM_IP1 + '/ServiceRegistationController/DeleteVehicleServiceSubtasksStatus',
     SaveServiceTasksDetails: 'http://' + SYSTEM_IP1 + '/ServiceRegistationController/saveservicetasksDetails',
     
     
     allRegisterService: 'http://' + SYSTEM_IP1 + '/ServiceRegistationController/getServiceTasksSubtask',
     allserviceTaskDeletion: 'http://' + SYSTEM_IP1 + '/ServiceRegistationController/DeleteServicetasksDetails',
     
     
     
     
     
     
     
     
     
     
     
     GetRegisterNo:'http://' + SYSTEM_IP + '/FleetManagement/supervisor_cls_level/getRegisterNo',
     deleteVehicle:'http://' + SYSTEM_IP + '/FleetManagement/supervisor_cls_level/deleteVehicle',
     get_vehicleList:'http://' + SYSTEM_IP + '/FleetManagement/supervisor_cls_level/getVehicleDetailsList',
     Baseloc_LIST:'http://' + SYSTEM_IP + '/FleetManagement/CommonDataController/getBaselocationsList',
      DISTRICTS_LIST:'http://' + SYSTEM_IP + '/FleetManagement/CommonDataController/getdistrictsList',
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
    
    
    
    //service reminder
    getReminderTypes:'http://' + SYSTEM_IP + '/FleetManagement/RemindersController/reminderType',
    getVehicle:'http://' + SYSTEM_IP + '/FleetManagement/RemindersController/getVehicle',
    getServcieTasks:'http://' + SYSTEM_IP + '/FleetManagement/RemindersController/reminders_ref_dropdown',
    getReminderStatus:'http://' + SYSTEM_IP + '/FleetManagement/RemindersController/getReminderStatus',
    insertServiceReminderDetails: 'http://' + SYSTEM_IP + '/FleetManagement/RemindersController/insertServiceReminderDetails',
    searchServiceReminderDetails: 'http://' + SYSTEM_IP + '/FleetManagement/RemindersController/getServiceReminderDetalis',
    
    getReminderList: 'http://' + SYSTEM_IP + '/FleetManagement/RemindersController/getServiceReminderDetalis',
    deleteServiceReminder: 'http://' + SYSTEM_IP + '/FleetManagement/RemindersController/deleteServiceReminder',
    
    //RENEWAL REMINDER
    getRenewaLType: 'http://' + SYSTEM_IP + '/FleetManagement/RemindersController/getRenewalType',
    saveRenewalReminder: 'http://' + SYSTEM_IP + '/FleetManagement/RemindersController/save_vehicle_renewal_reminder',
    getRenewalRemindersList: 'http://' + SYSTEM_IP + '/FleetManagement/RemindersController/getVehicleRenewalReminderDetalis',
    deleteRenewalReminder: 'http://' + SYSTEM_IP + '/FleetManagement/RemindersController/deleteRenewalReminder',
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    loadStates:'http://'+ SYSTEM_IP + '/FleetManagement/supervisor_cls_level/loadStates',
    
    loadBaselocaion:'http://' + SYSTEM_IP + '/FleetManagement/CommonDataController/getBaselocationsList',
    //reminder
    vehicle_LIST: 'http://' + SYSTEM_IP1 + '/CommonDataController/getvehiclesBasedOnBaselocId',
    remainder_LIST: 'http://' + SYSTEM_IP1 + '/RemindersController/reminderTypeBasedOnreminderTypeId',
    
     GETVEHICLES_DROPDOWN: 'http://' + SYSTEM_IP1 + '/CommonDataController/getAvailableVehicles',
    ZONES_LIST: 'http://' + SYSTEM_IP1 + '/CommonDataController/getZonesList',
   
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
 
};

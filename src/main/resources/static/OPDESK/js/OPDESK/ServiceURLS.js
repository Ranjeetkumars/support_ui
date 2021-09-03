/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var SYSTEM_IP = "192.168.1.191:2000/opdesk";

Service = {
    //BreakDown
    issueTypebasedOnId: 'http://' + SYSTEM_IP + '/patientHandoverIssueController/patientHandoverIssueTypesBasedOnId/',
    paymentType: 'http://' + SYSTEM_IP + '/paymentType/getPaymentType',
    get_Ditsrict_Name: 'http://' + SYSTEM_IP + '/commondata/getDistrctName/',
    getBaseLocationName: 'http://' + SYSTEM_IP + '/commondata/baseLocName/',
    get_Districts: 'http://' + SYSTEM_IP + '/commondata/districts/',
    getAmublace: 'http://' + SYSTEM_IP + '/commondata/ambulance/',
    get_shiftTypes: 'http://' + SYSTEM_IP + '/commondata/shiftType',
    getTicketId: 'http://' + SYSTEM_IP + '/tyrelifecontroller/getTicketId',
    getBaseLocation: 'http://' + SYSTEM_IP + '/commondata/baselocations',
    getWorkShopDetails: 'http://' + SYSTEM_IP + '/breakDownMainatnce/getWorkShopDetails/',
    
    //MasterData
    DistrictsMaster: 'http://' + SYSTEM_IP + '/commondata/districts/1',
    BaselocsMaster: 'http://' + SYSTEM_IP + '/commondata/baselocations',
    AmbulanceMaster: 'http://' + SYSTEM_IP + '/commondata/ambulance',
    ShiftTypeMaster: 'http://' + SYSTEM_IP + '/commondata/shiftType',
    OdometerMaster: 'http://' + SYSTEM_IP + '/commondata/odometer',
    districtsName: 'http://' + SYSTEM_IP + '/commondata/districtName/',
    listOfBaseLocation: 'http://' + SYSTEM_IP + '/commondata/baseLocName/',
    // SupervisorType: 'http://' + SYSTEM_IP + '/breakDownMainatnce/getAdminDetails/',

    insertPreventiveMaintainceDetails: 'http://' + SYSTEM_IP + '/preventiveMaintainceController/insertPreventiveMaintainceDetails',
    getSinglePreventRecordBasedOnId: 'http://' + SYSTEM_IP + '/preventiveMaintainceController/getPreventiveMaintainceDetailsBasedOnId/',
    updatePreventiveDetails: 'http://' + SYSTEM_IP + '/preventiveMaintainceController/updatePreventiveMaintainceDetails',
    shiftNameBasedOnId: 'http://' + SYSTEM_IP + '/commondata/shiftTypeName/',
    
    //for Ambulance off Road
    insertAmbulanceOffRoadDetails: 'http://' + SYSTEM_IP + '/ambulanceOffRoadController/insertAmbulanceOffRoadDetails',
    searchAmbulanceOffRoad: 'http://' + SYSTEM_IP + '/ambulanceOffRoadController/searchAmbulanceOffRoadDetails',
    updateAmbulanceOffRoadDetails: 'http://' + SYSTEM_IP + '/ambulanceOffRoadController/updateAmbulanceOffRoadDetails',
    getAmbulanceOffRoadTypes:'http://' + SYSTEM_IP + '/ambulanceOffRoadController/getAmbulanceOffRoadTypes',
    
    //Demotraing
    saveDemoRegistationDetails: 'http://' + SYSTEM_IP + '/DemoTraining/insertDemoTrainingDetails',
    get_demo_training_Search: 'http://' + SYSTEM_IP + '/DemoTraining/searchDemoTraining',
    //getDetailsOfDemoTraining:'http://'+SYSTEM_IP+'/DemoTraining/getDetailsOfDemoTraining/',
    demoReportPrepared: 'http://' + SYSTEM_IP + '/DemoTraining/getDemReportPrepared',
    updateDemoTraining: 'http://' + SYSTEM_IP + '/DemoTraining/updateDemoTrainingDetails',
    
    //Fuel Filling
    getFuelStation: 'http://' + SYSTEM_IP + '/FuelFilling/station',
    getFuelStationDetails: 'http://' + SYSTEM_IP + '/FuelFilling/fuelStationDetails',
    getPaymentMode: 'http://' + SYSTEM_IP + '/FuelFilling/FleetCardNo',
    saveRegistationDetails: 'http://' + SYSTEM_IP + '/FuelFilling/insertFuelFillingDetaills',
    get_Fuel_Filling_Search: 'http://' + SYSTEM_IP + '/FuelFilling/searchFuelFilling',
    getFuelCardNoBasedOnAmbulanceId:'http://' + SYSTEM_IP + '/FuelFilling/getFuelCardNoBasedOnAmbulanceId',
    getSwiping:'http://' + SYSTEM_IP + '/FuelFilling/getSwiping',
    
    //Tyre Life
    getBaseLocations: 'http://' + SYSTEM_IP + '/commondata/baselocations/',
    get_tyres: 'http://' + SYSTEM_IP + '/TyreLife/getTyreType',
    getSearchForTypeOfTyre: ' http://' + SYSTEM_IP + '/TyreLife/getSearchDetails',
    insertTyreManagementANDInfoDetails: 'http://' + SYSTEM_IP + '/TyreLife/insertTyreInfoDetails',
    updateTyreInfo: 'http://' + SYSTEM_IP + '/TyreLife/updateTyreInfoDetails',
    SupervisorType: 'http://' + SYSTEM_IP + '/breakDownMainatnce/getAdminDetails',
    getTyreInfoDetails: 'http://' + SYSTEM_IP + '/TyreLife/getTyreInfoDetails/',
    getTyreManagementDetails: 'http://' + SYSTEM_IP + '/TyreLife/getTyreManagementDetails/',
    getDistrictName: 'http://' + SYSTEM_IP + '/commondata/districtName/',
    //OxygenFilling
    
    getOxygenstations: 'http://' + SYSTEM_IP + '/OxygenFiling/getOxygenStations',
    getCylinders: 'http://' + SYSTEM_IP + '/OxygenFiling/getCylinderType',
    getStationAddress: 'http://' + SYSTEM_IP + '/OxygenFiling/getOxyStationAddress',
    addcylinder: 'http://' + SYSTEM_IP + '/OxygenFiling/insertOxygenFillingInfoDetails',
    getinsertedcylinderdetails: 'http://' + SYSTEM_IP + '/OxygenFiling/getOxygenFillingInfoDetails/',
    getCylinderNamesBasedOnId: 'http://' + SYSTEM_IP + '/OxygenFiling/getCylinderTypeNames/',
    insertforRegistration: 'http://' + SYSTEM_IP + '/OxygenFiling/insertOxygenFilingTransdetails',
    getoxySearchDetails: 'http://' + SYSTEM_IP + '/OxygenFiling/getOxygenFillingSearchList',
    search_Break_Down_Mainatances: 'http://' + SYSTEM_IP + '/breakDownMainatnce/getSearchForBreakDownMaintaince',
    insert_BreakDown_Mainatnce: 'http://' + SYSTEM_IP + '/breakDownMainatnce/insertBreakDownMainatance',
    update_BreakDown_Mainatnce: 'http://' + SYSTEM_IP + '/breakDownMainatnce/updateBreakDownMainatance',
    get_BreakDownSeverity: 'http://' + SYSTEM_IP + '/breakDownMainatnce/getBreakDownSeverity/',
    getOdoMeter: 'http://' + SYSTEM_IP + '/commondata/odometer/',
    getPaymentDetails: 'http://' + SYSTEM_IP + '/breakDownMainatnce/getPaymentDetails/',
    getBreakDownTypeDetails: 'http://' + SYSTEM_IP + '/breakDownMainatnce/getBreakDownTypeDetails/',
    //Patient Handover issue
    
    getHospitalDetails: 'http://' + SYSTEM_IP + '/patientHandoverIssueController/getHospitalDetails/',
    issueType: 'http://' + SYSTEM_IP + '/patientHandoverIssueController/getPatientIssueTypes',
    searchPatientHandoverIssue: 'http://' + SYSTEM_IP + '/patientHandoverIssueController/searchPatientHandoverIssue',
    getPatientHandoverIssueReportToDm: 'http://' + SYSTEM_IP + '/patientHandoverIssueController/getPatientHandoverIssueReportToDm/1',
    updatePatientHandOverissue: 'http://' + SYSTEM_IP + '/patientHandoverIssueController/updatePatientHandoverIssue',
    insertPatientHandoverIssue: 'http://' + SYSTEM_IP + '/patientHandoverIssueController/insertPatientHandoverIssue',
    //Vehicle Movement
    
    searchVehicleLocMovement: 'http://' + SYSTEM_IP + '/vehicleLocationMovementController/searchVehicleLocationMovement',
    insertVehicleLocMovement: 'http://' + SYSTEM_IP + '/vehicleLocationMovementController/insertVehicleLocationMovement',
    updateVehicleLocationMovement: 'http://' + SYSTEM_IP + '/vehicleLocationMovementController/updateVehicleLocationMovement',
    //VisitUpdate
    
    visitedregistration: 'http://' + SYSTEM_IP + '/VisitorUpdate/insertVisitor_Update_trans',
    getVisitSearchList: 'http://' + SYSTEM_IP + '/VisitorUpdate/getVisitoSearchDetails',
    //StatutoryComliance
    updateCompliancedetails: 'http://' + SYSTEM_IP + '/StatutoryCompliance/updateComplianceDetails',
    complianceSearchList: 'http://' + SYSTEM_IP + '/StatutoryCompliance/getSearchdetails',
    getcomliance: 'http://' + SYSTEM_IP + '/StatutoryCompliance/getmasterInforefDetails',
    getcomplianceType: 'http://' + SYSTEM_IP + '/StatutoryCompliance/getcomplianceType',
    getequipmentNames: 'http://' + SYSTEM_IP + '/StatutoryCompliance/getEquipementNames',
    insertComplianceDetails: 'http://' + SYSTEM_IP + '/StatutoryCompliance/saveComplianceDetails',
    getcomplianceDetails: 'http://' + SYSTEM_IP + '/StatutoryCompliance/getCompalianceDetails',
    getcomplianceDetailsbasedonTKTID: 'http://' + SYSTEM_IP + '/StatutoryCompliance/getCompalianceDetailsb',
    //preventive Maintaince
    
    masterScheduleService: 'http://' + SYSTEM_IP + '/commondata/getScheduleService',
    masterWorkshopName: 'http://' + SYSTEM_IP + '/commondata/getWorkshopName',
    searchPreventMaintaince:'http://' + SYSTEM_IP + '/preventiveMaintainceController/searchPreventivemaintaince',
    //sceneChallenges
    
    incidentType: 'http://' + SYSTEM_IP + '/SceneChallenge/getIncidentType',
    actionTaken: 'http://' + SYSTEM_IP + '/SceneChallenge/getActionType',
    saveSceneChallengesRegistationDetails: 'http://' + SYSTEM_IP + '/SceneChallenge/insertSceneChallengeDetails',
    get_scene_challenges_Search: 'http://' + SYSTEM_IP + '/SceneChallenge/searchSceneChallenges',
    updateScene: 'http://' + SYSTEM_IP + '/SceneChallenge/updateSceneChallengesBasedOnSerialId',
    //suggestion
    
    suggestionType: 'http://' + SYSTEM_IP + '/Suggestions/getSuggestionType',
    saveSuggestionsDetails: 'http://' + SYSTEM_IP + '/Suggestions/insertSuggestionsDetails',
    get_suggestion_Search: 'http://' + SYSTEM_IP + '/Suggestions/getSuggestionDetails',
    updateSuggestion: 'http://' + SYSTEM_IP + '/Suggestions/updateSuggestionsBasedOnSerialId',
    //equipment breakdown
    
    equipmentName: 'http://' + SYSTEM_IP + '/EquipmentBreakDown/getEqipementNames',
    equipmentCondition: 'http://' + SYSTEM_IP + '/EquipmentBreakDown/getEuipmentCondition',
    addequipment: 'http://' + SYSTEM_IP + '/EquipmentBreakDown/addEquipmentDetails',
    saveEquipmentDetails: 'http://' + SYSTEM_IP + '/EquipmentBreakDown/insertEquipmentDeatilsForRegistration',
    getBreakDownEquipment: 'http://' + SYSTEM_IP + '/EquipmentBreakDown/getAddedEquipementDetails',
    updateEquipment: 'http://' + SYSTEM_IP + '/EquipmentBreakDown/updateEquipmentDetails',
    get_equipment_Search: 'http://' + SYSTEM_IP + '/EquipmentBreakDown/searchEquipmentBreakdown',
    complainStatus: 'http://' + SYSTEM_IP + '/EquipmentBreakDown/selectComplaintStatus',
    //AccidentalMaintenance
    
    getWorkShop: 'http://' + SYSTEM_IP + '/commondata/getWorkshopName',
    saveAccidentDetails: 'http://' + SYSTEM_IP + '/accidentController/insertAccidentMaintenanceDetails',
    get_AccidentMaintenance_Search: 'http://' + SYSTEM_IP + '/accidentController/searchAccidentMaintenance',
    updateAccident_Maintenance: 'http://' + SYSTEM_IP + '/accidentController/updateAccidentMaintenanceDetails',
    //paymentType:'http://192.168.1.149:8086/paymentType/getPaymentType',
     getAccidentType: 'http://' + SYSTEM_IP + '/accidentController/selectAccidentMaintainceType',
    getAccidentSeverity: 'http://' + SYSTEM_IP + '/breakDownMainatnce/getBreakDownSeverity',
    //specialIndent
    seacrh_Special_Indent:'http://' + SYSTEM_IP + '/specialindent/getSearchSpecialIndentDetails',
    get_Medicines_Details:'http://' + SYSTEM_IP + '/specialindent/getMedicineDropDownDetails',
    inserting_GetMedicine_Dteails:'http://' + SYSTEM_IP + '/specialindent/insertMedicineDetails',
    getConsumblesDetails:'http://' + SYSTEM_IP + '/specialindent/get_Consumbles_Details/',
    getConsumblesDropDownDetails:'http://' + SYSTEM_IP + '/specialindent/getConsumblesDropDownDetails',
    inserting_Consumbles_Dteails:'http://' + SYSTEM_IP + '/specialindent/insertConsmbulesDetails',
    getConsumbles_Details:'http://' + SYSTEM_IP + '/specialindent/get_Consumbles_Details/',
    insert_Special_Indent:'http://' + SYSTEM_IP + '/specialindent/insertSpecialIndentDetails',
    updating_SpecialIndent_Dteails:'http://' + SYSTEM_IP + '/specialindent/updateSpecialIndentDetails',
       //Grievance

     getCallerProfile:'http://' + SYSTEM_IP + '/GrievanceController/getProfile',
     getGrievancesType:'http://' + SYSTEM_IP + '/GrievanceController/getgrievanceType',
     getStandardRemarks:'http://' + SYSTEM_IP + '/GrievanceController/getgrievanceRemarks',
     getGrievancesIssueType:'http://' + SYSTEM_IP + '/GrievanceController/getgrievanceIssueType',
     insertGrievancesDetails:'http://' + SYSTEM_IP + '/GrievanceController/insertGrievance',
     updateGrievanceDetails:'http://' + SYSTEM_IP + '/GrievanceController/grievance_update_trans',
     searchGrievances:'http://' + SYSTEM_IP + '/GrievanceController/getgrievance',
     getClosedGrievances:'http://' + SYSTEM_IP + '/GrievanceController/getClosedGrievance',
     getDesignation:'http://' + SYSTEM_IP + '/GrievanceController/getDesignation',//
     getgrievanceSearchDetails:'http://' + SYSTEM_IP + '/GrievanceController/getgrievanceSearchDetails',
     
     //Sms And Mail 
     get_ohd_mail_directory:'http://' + SYSTEM_IP + '/mailAndSmsController/getSmsMailDirectory',
     insertHmSmsOutboxTreans:'http://' + SYSTEM_IP + '/mailAndSmsController/insertSmsOutBoxTrans',
     insertHmEmailOutboxTreans:'http://' + SYSTEM_IP + '/mailAndSmsController/insertEmailOutBoxTrans',
     insertHmEmailOutboxTreansPrev:'http://' + SYSTEM_IP + '/mailAndSmsController/insertEmailOutBoxTransForPrev'
     

    
    
};

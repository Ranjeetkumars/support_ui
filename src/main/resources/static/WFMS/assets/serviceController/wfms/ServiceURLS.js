


//var SYSTEM_IP = "104.211.220.120:9168";
//var SYSTEM_IP = "104.211.220.120:9168";
//var SYSTEM_IP = "10.110.4.154:9168";
var SYSTEM_IP = "192.168.1.49:9048";

Service = {
//  ----------------  MY-PROFILES RELATED URLS ---------------- //

    My_Sheduled_Details: 'http://' + SYSTEM_IP + '/wfms/MyProfileController/mySheduledDetails',
    Get_UserName: 'http://' + SYSTEM_IP + '/wfms/MyProfileController/getUserName',
    Get_ManagerName: 'http://' + SYSTEM_IP + '/wfms/MyProfileController/getMangerDetails',
    Get_Phone_Number: 'http://' + SYSTEM_IP + '/wfms/MyProfileController/getuserphonenumber',
    Sick_Leave_Count: 'http://' + SYSTEM_IP + '/wfms/MyProfileController/getSickLeaveTypeDetails',
    Earned_Leave_Count: 'http://' + SYSTEM_IP + '/wfms/MyProfileController/getEarnedLeaveTypeDetails',
    Compassionate_Leave_Count: 'http://' + SYSTEM_IP + '/wfms/MyProfileController/getCompassionateLeaveTypeDetails',
    Casual_Leave_Count: 'http://' + SYSTEM_IP + '/wfms/MyProfileController/getCasulaLeaveTypeDetails',
    Leave_Type_DropDown: 'http://' + SYSTEM_IP + '/wfms/MyProfileController/get_Leave_Type_Details',
    Leave_Status_DropDown: 'http://' + SYSTEM_IP + '/wfms/MyProfileController/getLeaveStatusDetails',
    Selected_Year_DropDown: 'http://' + SYSTEM_IP + '/wfms/MyProfileController/getSelectedYear',
    Insert_Leave_Details: 'http://' + SYSTEM_IP + '/wfms/MyProfileController/insertLeaveApplyDetails',
    Update_Leave_Details: 'http://' + SYSTEM_IP + '/wfms/MyProfileController/update_Leave_ApplyDetails',
    MyLeave_History_Details: 'http://' + SYSTEM_IP + '/wfms/MyProfileController/get_Leave_History_Details ',
    Leave_Cancel_Details: 'http://' + SYSTEM_IP + '/wfms/MyProfileController/get_UserLeave_Cancel_Details ',
    Leave_Status_Details: 'http://' + SYSTEM_IP + '/wfms/MyProfileController/getLeaveDetailsBasedOnId ',
    Update_Leave_SheduledAllocated_Details: 'http://' + SYSTEM_IP + '/wfms/MyProfileController/update_wfscheduleallocated_Details ',
    Update_Leave__UserCancel_Details: 'http://' + SYSTEM_IP + '/wfms/MyProfileController/updateLeaveCancellation ',
    Update_Leave__Approval_Details: 'http://' + SYSTEM_IP + '/wfms/MyProfileController/updateLeaveApprovalUserCancellation ',
    Inserting_Email_Details: 'http://' + SYSTEM_IP + '/wfms/MyProfileController/insertingMail ',
    Inserting_Sms_Details: 'http://' + SYSTEM_IP + '/wfms/MyProfileController/insertingSms ',
    Get_UserLast_Leave_Details: 'http://' + SYSTEM_IP + '/wfms/MyProfileController/getUserLastLeaveDetails',
    //  ---------------- MANAGE RESOURCE  RELATED URLS ---------------- //

    Days_DropDown_Details: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/getShiftTypeDropDown',
    Get_ShiftPatterns_Erc_Details: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/get_shift_Erc_TypeDetails',
    Get_ShiftPatterns_Operators_Details: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/get_ShiftType_Opertors_Details',
    Get_ShiftPattern_Count: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/getShiftPatternsCount',
    Insert_ShiftPatterns_Erc_Details: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/insertingShiftPatterns',
    GetUserShiftTypeDetails: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/getUserShiftTypeDetails',
    Get_Employee_LeaveHistory_Details: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/getEmployeeLeaveHistoryDetails',
    Get_Employee_LeaveHistory_Basedon_Conditions_Details: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/getEmployeeLeaveHistoryDetailsBasedOnCondition',
    Get_Department_DropDown: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/getModulesDropDown',
    Get_Employee_DropDown: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/getEmplyeDetailsDropDown_Basedon_Id',
    Get_UserDetails_Active: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/getUserDetailsIsActive',
    Get_Modules_DropDown: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/getModuleDropDownBasedOnIds',
    Get_Zones_DropDown: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/getZonesDropDowns',
    Get_BaseLocation_DropDown: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/getBaseLocationsDropDown',
    Get_Vehicles_DropDown: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/getVehiclesDropDown',
    Get_Employee_Availbility_Operators2: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/getEmployeeAvailbilityOperators2',
    Get_Employee_Availbility_Operators: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/getEmployeeAvailbilityOperators',
    Get_Department_Details_DropDown: 'http://' + SYSTEM_IP + '/wfms/SearchController/get_Department_Details_DropDown',
    Get_EmployeeDetails_AvailbilityDetails: 'http://' + SYSTEM_IP + '/wfms/SearchController/getEmployeeDetailsAvailbilityDetails',
    Get_Leave_Approval_Reject_Details: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/get_Leave_Approval_Reject_Details',
    Get_Selected_Sheduled_Details: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/getSelectedSheduledDetails ',
    Update_Sheduled_Details_BasedOn_SheduledId: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/updateSheduledDetailsBasedOnSheduledId',
    //  ---------------- SHEDULE_ERC RELATED URLS ---------------- //

    Get_ShiftType_Pattern_DropDown: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/get_All_ShiftTypeDetails',
    Get_Modules_DropDown_For_Shedule: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/getModulesDetails',
    Get_Module_Details1: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/get_Module_Details',
    Get_Employee_Details: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/get_Employee_Details',
    Get_ShiftType_Patterns_BasedOn_ShifType_Ids: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/get_ShiftType_Patterns_BasedOn_ShifType_Ids',
    Get_User_Details: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/getting_User_Details ',
    Get_ExistsPatternsCount: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/getExistsPatternsCount ',
    Get_Allocated_Sheduled_Details: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/get_Allocated_Sheduled_Details ',
    Get_Sheduled_Details: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/get_Sheduled_Details  ',
    Update_WfSheduleAllocated_Details: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/update_Shedule_Details  ',
    Update_WfShedule_Details: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/update_WfShedule_Details  ',
    Get_Shedule_Details_Counts: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/get_Shedule_Details_Counts   ',
    Inserting_wfShedule_Details: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/inserting_WfShedule_Details   ',
    Get_shift_Pattern_Details: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/get_shift_Pattern_Details    ',
    Insert_Wfschedule_Details: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/insert_Wfschedule_Details    ',
    Update_Wfschedule_Shifttimings: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/update_Wfschedule_Shifttimings ',
    Inserting_WfsSheduled_Allocated_Details: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/inserting_WfsSheduled_Allocated_Details ',
    Get_Sheduled_Count: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/get_Sheduled_Count ',
    Update_WfsSheduled_Allocated_UnAssign_Details: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/update_UnAssign_Details ',
    Get_Holiday_Count: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/get_Holiday_Count ',
    Get_Sheduled_Allocated_Details: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/get_Sheduled_Allocated_Details  ',
    Update_Leaves_Balance_Details: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/update_Leaves_Balance_Details  ',
    Get_Leave_Balance_AllDetails: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/get_Leave_Balance_AllDetails  ',
    Get_Leaves_Balance_Count: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/get_Leaves_Balance_Count  ',
    Update_LeaveDetails: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/updateLeaveDetails1  ',
    Get_Leave_Balance_count: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/get_Leave_Balance_count  ',
    Inserting_User_Leave_Details: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/inserting_User_Leave_Details  ',
    Getting_User_Details: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/getting_User_Details   ',
    Get_ExistingSchedule_Details: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/get_ExistingSchedule_Details   ',
    Get_Legends_ShiftType_Details: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/getLegendsShiftTypeDetails2   ',
    //  ---------------- ZONE   RELATED URLS ---------------- //

    // ---------------------- Add Zone -------------------------------//

    GET_COUNTRIES: 'http://' + SYSTEM_IP + '/wfms/ZoneController/getCountries',
    GET_STATES: 'http://' + SYSTEM_IP + '/wfms/ZoneController/getStates',
    GET_DISTRICTS: 'http://' + SYSTEM_IP + '/wfms/ZoneController/getDistricts',
    GET_MANDALS: 'http://' + SYSTEM_IP + '/wfms/ZoneController/getMandals',
    GET_CITIES: 'http://' + SYSTEM_IP + '/wfms/ZoneController/getCities',
    GET_LOCALITIES: 'http://' + SYSTEM_IP + '/wfms/ZoneController/getLocalities',
    INSERT_ZONE_DETAILS: 'http://' + SYSTEM_IP + '/wfms/ZoneController/insertWFMSZones',
    GET_ZONE_DETAILS: 'http://' + SYSTEM_IP + '/wfms/ZoneController/getZoneDetails',
    GET_SINGLE_ZONE_DETAILS_FOR_UPDATE: 'http://' + SYSTEM_IP + '/wfms/ZoneController/getLocationDetails',
    UPDATE_ZONE_DETAILS: 'http://' + SYSTEM_IP + '/wfms/ZoneController/UpdateWFMSZonesWithoutNames',
    DELETE_ZONE: 'http://' + SYSTEM_IP + '/wfms/ZoneController/updateDeletedZones',
    // ------------------------- Add Baselocation ----------------------//
    
    GETZONES: 'http://' + SYSTEM_IP + '/wfms/ZoneController/getLocation',
    GET_LOCATION_INFO: 'http://' + SYSTEM_IP + '/wfms/ZoneController/getLocationInfo',
    GET_BASE_LOCATION_DETAILS: 'http://' + SYSTEM_IP + '/wfms/ZoneController/getBaselocationsDetails',
    GET_LANDMARK_BASEDON_LOCALITYID: 'http://' + SYSTEM_IP + '/wfms/ZoneController/getlanmarkbasedonlocalityid',
    INSERT_BASE_LOCATION: 'http://' + SYSTEM_IP + '/wfms/ZoneController/insertingBaselocationsDetails',
    UPDATE_BASE_LOCATION_WITHOUT_NAME: 'http://' + SYSTEM_IP + '/wfms/ZoneController/updatingBaselocationDetailswithoutname',
    UPDATE_BASE_LOCATION_WITH_NAME: 'http://' + SYSTEM_IP + '/wfms/ZoneController/updatingBaselocationDetailswithname',
    DELETE_BASE_LOCATION: 'http://' + SYSTEM_IP + '/wfms/ZoneController/deleteBaselocation',
    
    // ------------------------- Add District To Manager ----------------------//
    Get_Zone_Details: 'http://' + SYSTEM_IP + '/wfms/ZoneController/get_Zone_Details',
    Get_Basedon_ZoneId_Districts: 'http://' + SYSTEM_IP + '/wfms/ZoneController/get_Basedon_ZoneId_Districts',
    Get_Manager_To_District_UnAssigned_Details: 'http://' + SYSTEM_IP + '/wfms/ZoneController/get_Manager_To_District_UnAssigned_Details',
    Get_Manager_To_District_Assigned_Details: 'http://' + SYSTEM_IP + '/wfms/ZoneController/get_Manager_To_District_Assigned_Details',
    Insert_District_Manager_Details: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/insert_District_Manager_Details',
    Update_District_Manager_Details: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/update_District_Manager_Details',
    Get_Distrcit_Details: 'http://' + SYSTEM_IP + '/wfms/ZoneController/get_Zone_Details',

    
    
    
    // ------------------------- DRIVER TO ZONE----------------------//
    Get_UnAssigned_Driver_Details: 'http://' + SYSTEM_IP + '/wfms/AssignController/get_UnAssigned_Driver_Details',
    Get_Assigned_Driver_Details: 'http://' + SYSTEM_IP + '/wfms/AssignController/get_DriverDetails_BasedOnZoneId',
   // Get_Assigned_Driver_Details: 'http://' + SYSTEM_IP + '/wfms/AssignController/get_AssginedDriver_Details',
    Insert_Wfms_Assgindriver_Details: 'http://' + SYSTEM_IP + '/wfms/AssignController/insert_Wfms_Assgindriver_Details',
    Get_Wfscheduletrans_Assginvalue1_Count: 'http://' + SYSTEM_IP + '/wfms/AssignController/get_Wfscheduletrans_Assginvalue1_Count',
    Update_Wfms_Deassigndriver_Details: 'http://' + SYSTEM_IP + '/wfms/AssignController/update_Wfms_Deassigndriver_Details',
    Get_Baselocation_Name: 'http://' + SYSTEM_IP + '/wfms/AssignController/get_Baselocation_Name',
    GetUser_Details: 'http://' + SYSTEM_IP + '/wfms/AssignController/get_User_Details',
    // ------------------------- DRIVER TO VEHICLE----------------------//
    Get_AssginDriverToVehicle_Details: 'http://' + SYSTEM_IP + '/wfms/AssignController/get_AssginDriverToVehicle_Details',
    Get_UnAssginDriverToVehicle_Details: 'http://' + SYSTEM_IP + '/wfms/AssignController/get_UnAssginDriverToVehicle_Details',
    Insert_Wfms_Vehicledriverid_Details: 'http://' + SYSTEM_IP + '/wfms/AssignController/insert_Wfms_Vehicledriverid_Details',
    Update_Wfms_DriverToVehicle_Details: 'http://' + SYSTEM_IP + '/wfms/AssignController/update_Wfms_DriverToVehicle_Details',
    Update_WfscheduleAllocated_Trans: 'http://' + SYSTEM_IP + '/wfms/AssignController/update_WfscheduleAllocated_Trans',
    // ------------------------- EMT TO ZONE----------------------//
    Get_UnAssigned_EMT_Details: 'http://' + SYSTEM_IP + '/wfms/AssignController/get_UnAssigned_EMT_Details',
    Get_Assigned_EMT_Details: 'http://' + SYSTEM_IP + '/wfms/AssignController/get_Assigned_EMT_Details',
    Insert_Locationemp_Emt_Details: 'http://' + SYSTEM_IP + '/wfms/AssignController/insert_Locationemp_Emt_Details',
    Update_DeAssign_Emt_Details: 'http://' + SYSTEM_IP + '/wfms/AssignController/update_DeAssign_Emt_Details',
    // -------------------------  EMT To Vehicle ----------------------//
    Get_UnAssginVehicleEMTs_Details: 'http://' + SYSTEM_IP + '/wfms/AssignController/get_UnAssginVehicleEMTs_Details',
    Get_AssginVehicleEMTs_Details: 'http://' + SYSTEM_IP + '/wfms/AssignController/get_AssginVehicleEMTs_Details',
    Insert_Wfms_VehicleEmtLoc_Details: 'http://' + SYSTEM_IP + '/wfms/AssignController/insert_Wfms_VehicleEmtLoc_Details',
    Update_Wfms_VehicleEmts_Details: 'http://' + SYSTEM_IP + '/wfms/AssignController/update_Wfms_VehicleEmts_Details',
    // -------------------------  Vehicle To BaseLocation  ----------------------//
    Get_UnAssigned_VehicleToBase_Details: 'http://' + SYSTEM_IP + '/wfms/AssignController/get_UnAssigned_VehicleToBase_Details',
    Get_Assigned_VehicleToBase_Details: 'http://' + SYSTEM_IP + '/wfms/AssignController/get_Assigned_VehicleToBase_Details',
    Insert_Wfms_LocationToVehicle_Details: 'http://' + SYSTEM_IP + '/wfms/AssignController/insert_Wfms_LocationToVehicle_Details',
    Update_Wfms_VehicleToBaseloc_Details: 'http://' + SYSTEM_IP + '/wfms/AssignController/update_Wfms_VehicleToBaseloc_Details',
    // -------------------------  Holiday  ----------------------//
    Verifying_HolidayCount: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/getMonthly_Department_Wise_ForCasting_Count',
    Get_Holiday_Details: 'http://' + SYSTEM_IP + '/wfms/HolidayController/get_Holiday_Details',
    Get_Holidays_Count: 'http://' + SYSTEM_IP + '/wfms/HolidayController/get_Holidays_Count',
    Inserting_Holidays: 'http://' + SYSTEM_IP + '/wfms/HolidayController/inserting_Holidays',
    Get_HolidayList_Details: 'http://' + SYSTEM_IP + '/wfms/HolidayController/get_HolidayList_Details',
    Update_Holidays: 'http://' + SYSTEM_IP + '/wfms/HolidayController/update_Holidays',
    // -------------------------  Allowances  ----------------------//
    getDepartments: 'http://' + SYSTEM_IP + '/wfms/AllowanceController/getDepartments',
    getAllowanceDetails: 'http://' + SYSTEM_IP + '/wfms/AllowanceController/getAllowanceDetails',
    saveAllowanceDetails: 'http://' + SYSTEM_IP + '/wfms/AllowanceController/saveAllowanceDetails',
    gettingAllowanceCount: 'http://' + SYSTEM_IP + '/wfms/AllowanceController/gettingAllowanceCount',
    gettingAllowanceMaximumCount: 'http://' + SYSTEM_IP + '/wfms/AllowanceController/gettingAllowanceMaximumCount',
    updateAllowancesDetails: 'http://' + SYSTEM_IP + '/wfms/AllowanceController/updateAllowanceDetails',
    // -------------------------  Serach  ----------------------//
    get_ShitTypes_DropDown: 'http://' + SYSTEM_IP + '/wfms/SearchController/get_ShitTypes_DropDown',
    get_Vehicles_Details_DropDown: 'http://' + SYSTEM_IP + '/wfms/SearchController/get_Vehicles_Details_DropDown',
    get_Vehicles_Type_DropDown: 'http://' + SYSTEM_IP + '/wfms/SearchController/get_Vehicles_Type_DropDown',
    get_search_records_with_all_parameters: 'http://' + SYSTEM_IP + '/wfms/SearchController/get_search_records_with_all_parameters',
    // =======================   ScheduleofFieldOperators ================================== ///
    getDepartment: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/getDepartment',
    //Employee Availity Operators
    getEmployeeAvailbilityOperators: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/getEmployeeAvailbilityOperators',
    getVehiclesDropDown: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/getVehiclesDropDown',
    //   http://localhost:9160/wfms/ManageResourceController/inserting_Shedule_Details_Allocated

    getEmployeeDetails: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/get_Employee_Details',
    updatePatteren: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/updateShiftPatterns',
    getShiftPatteren: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/getShiftPatteren',
    getting_User_Details: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/getting_User_Details',
    getExistsPatternsCount: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/getExistsPatternsCount',
    get_Allocated_Sheduled_Details: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/get_Allocated_Sheduled_Details',
    update_Shedule_Details: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/update_Shedule_Details',
    get_Sheduled_Details: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/get_Sheduled_Details',
    update_WfShedule_Details: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/update_WfShedule_Details',
    inserting_WfShedule_Details: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/inserting_WfShedule_Details',
    inserting_Shedule_Details_Allocated: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/inserting_Shedule_Details_Allocated',
    get_Holiday_Count: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/get_Holiday_Count',
    get_Sheduled_Allocated_Details: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/get_Sheduled_Allocated_Details',
    update_Leaves_Balance_Details: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/update_Leaves_Balance_Details',
    get_Leave_Balance_AllDetails: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/get_Leave_Balance_AllDetails',
    updateLeaveDetails1: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/updateLeaveDetails1',
    get_Leave_Balance_count: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/get_Leave_Balance_count',
    inserting_Leave_Balance_Details: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/inserting_Leave_Balance_Details',
    get_Sheduled_Allocated_Modules_Locations_OrderBy: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/get_Sheduled_Allocated_Modules_Locations_OrderBy',
    getLegendsShiftTypeDetails1: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/getLegendsShiftTypeDetails1',
    insertingMail: 'http://' + SYSTEM_IP + '/wfms/MyProfileController/insertingMail',
    insertingSms: 'http://' + SYSTEM_IP + '/wfms/MyProfileController/insertingSms',
    GetZones_DropDown: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/getusersZonesDropDowns',
    // ================ ERC - Employee(s) Availability  =======================//
    Get_ERC_Employees_Availability_Details: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/get_ERC_Employees_Availability_Details',
    Get_Actual_Day_Shift_Count: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/get_Actual_Day_Shift_Count',
    Get_Actual_Night_Shift_Count: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/get_Actual_Night_Shift_Count',
    Get_Actual_General_Shift_Count: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/get_Actual_General_Shift_Count',
    Get_Actual_Total_Count: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/get_Actual_Total_Count',
    Get_Recommended_Morning_Shift_Count: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/getMorningShiftCount',
    Get_Recommended_Total_Calls_Sum_Count: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/get_Total_Calls_Sum_Count',
    Get_Recommended_Total_Calls_Count: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/get_Total_Calls_Count',
    Get_Effective_Call_Details: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/get_Effective_Call_Details',
    GetMonthly_Shift_Wise_Employee_Night_Count: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/getMonthly_Shift_Wise_Employee_Night_Count',
    GetMonthly_Shift_Wise_Employee_Evening_Count: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/getMonthly_Shift_Wise_Employee_Evening_Count',
    Get_Required_General_Shift_Count: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/get_Required_General_Shift_Count',
    Get_Employee_Sheduled_Allocated_Details: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/getEmployeySheduledAllocatedDetails ',
    Get_All_Employee_Sheduled_Allocated_Details: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/getUnEmployeeSheduledAllocatedDetails ',
    GetEmployee_Sheduled_Allocated_Details: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/getAllEmployeeSheduledAllocatedDetails ',
    Get_Earned_Leave_Count: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/get_Earned_Leave_Count',
    Get_Sick_Leave_Count: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/get_Sick_Leave_Count',
    Get_Casual_Leave_Count: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/get_Casual_Leave_Count',
    Get_Compensatory_Leave_Count: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/get_Compensatory_Leave_Count',
    Get_Casual_Month_Leave_Count: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/get_Casual_Month_Leave_Count',
    Get_Earned_Month_Leave_Count: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/get_Earned_Month_Leave_Count',
    Get_Sick_Month_Leave_Count: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/get_Sick_Month_Leave_Count',
    Get_Compensatoryoff_Month_Leave_Count: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/get_Compensatoryoff_Month_Leave_Count',
    GettingUserName: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/gettingUserName ',
    Get_ShiftType_Details: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/get_Shift_Type_Details ',
    Get_Wfleaveapply_Trans_Leave_Count: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/get_Wfleaveapply_Trans_Leave_Count ',
    Insert_Wfleaveapply_trans_Details: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/insert_Wfleaveapply_trans_Details ',
    Update_Wfleaveapply_trans_Details: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/update_Wfleaveapply_trans_Details ',
    Get_ErsShiftType_Details: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/get_ErsShiftType_Details ',
    Get_Wfleave_Cobalance_Trans_Count: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/get_Wfleave_Cobalance_Trans_Count ',
    Update_Leave_Co_Balance_Trans_Details: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/update_Leave_Co_Balance_Trans_Details ',
    Get_User_Leave_Id: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/get_User_Leave_Id ',
    Update_User_Leave_Details: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/update_User_Leave_Details ',
    Get_Leave_ApplyId: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/get_Leave_ApplyId ',
    Inserting_WfSheduleAlocated_Details: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/inserting_WfSheduleAlocated_Details ',
    Get_Leave_ApplyId1: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/get_Leave_ApplyId1 ',
    Update_Wfleaveapply_Details: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/update_Wfleaveapply_Details ',
    Get_Adjust_Users_WithScheduleId: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/get_Adjust_Users_WithScheduleId ',
    Get_Users_Mail_Details: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/get_Users_Mail_Details ',
    Get_Users_Shift_Details: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/get_Users_Shift_Details ',
    Update_WfScheduleAllocated_Details: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/update_WfScheduleAllocated_Details ',
    GetPatterenDetailsBasedOnPatterenid: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/getPatterenDetailsBasedOnPatterenid ',
    
    get_Sheduled_Details:'http://' + SYSTEM_IP + '/wfms/ManageResourceController/get_Sheduled_Details',
    inserting_WfShedule_Details:'http://' + SYSTEM_IP + '/wfms/ManageResourceController/inserting_WfShedule_Details',
    get_Zone:'http://' + SYSTEM_IP + '/wfms/ManageResourceController/getusersZonesDropDowns',
    get_Department:'http://' + SYSTEM_IP + '/wfms/ManageResourceController/getDepartment',
    getPatterenDetailsBasedOnPatterenid:'http://' + SYSTEM_IP + '/wfms/ManageResourceController/getPatterenDetailsBasedOnPatterenid',
    
    //MMU Team mapping with vehicle
    getVehicle:'http://'+SYSTEM_IP+'/wfms/mmuController/getVehicleBasedOnDistrict',
    getDistrict:'http://'+SYSTEM_IP+'/wfms/mmuController/getDistrict',
    getVehicleTeamMappingData:'http://'+SYSTEM_IP+'/wfms/mmuController/getVehicleTeamMappingData',
    getUserNameBasedOnDesignation:'http://'+SYSTEM_IP+'/wfms/mmuController/getUserNameBasedOnDesignation',
   updateVehicleTeam:'http://'+SYSTEM_IP+'/wfms/mmuController/updateVehicleTeam',
   getUserNameBasedOnDesignation:'http://'+SYSTEM_IP+'/wfms/mmuController/getUserNameBasedOnDesignation',
   mappingVehicleToTeam:'http://'+SYSTEM_IP+'/wfms/mmuController/mappingVehicleToTeam',
    
   // ============================ Newly Added 10-07-2020=====================
    Get_Leave_Types_DropDown: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/get_Leave_Types_DropDown   ',
    Get_Employee_Details_DropDown: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/getEmplyeDetailsDropDown ',
    Get_EmployeeDetails_DropDownBasedOnIsNotNull: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/getEmplyeDetailsDropDownBasedOnIsNotNull ',
    get_Leave_History_Details: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/get_Employee_Details_DropDown ',
  Update_LeaveApproval_Reasons: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/updateLeaveApprovalReasons ',


  // ============================Report Related Services =====================

  // ============================ My Work Report Related Services =====================

  Get_User_Details: 'http://' + SYSTEM_IP + '/wfms/ReportsController/get_User_Details ',
  Get_Shedule_Details: 'http://' + SYSTEM_IP + '/wfms/ReportsController/get_Shedule_Details ',
 Get_Leave_Days_Count: 'http://' + SYSTEM_IP + '/wfms/ReportsController/get_Leave_Days_Count ',

 // ============================ Summary Report Related Services =====================
Get_Module_Details: 'http://' + SYSTEM_IP + '/wfms/ReportsController/get_Module_Details ',
Get_UsersShifts_Start_End_Timings: 'http://' + SYSTEM_IP + '/wfms/ReportsController/get_UsersShifts_Start_End_Timings ',
Get_Users_Leave_Days: 'http://' + SYSTEM_IP + '/wfms/ReportsController/get_Users_Leave_Days ',
Get_Desigination_Details: 'http://' + SYSTEM_IP + '/wfms/ReportsController/get_Desigination_Details ',
Get_User_Module_Location_Vehicle_Data: 'http://' + SYSTEM_IP + '/wfms/ReportsController/get_User_Module_Location_Vehicle_Data ',






// ============================ Department Wise Related Services =====================
Get_Scheduleallocated_All_Data: 'http://' + SYSTEM_IP + '/wfms/ReportsController/get_Scheduleallocated_All_Data ',

Get_Scheduleallocated_All_Data_WithInputs: 'http://' + SYSTEM_IP + '/wfms/ReportsController/get_Scheduleallocated_All_Data_WithInputs ',

//============================ Shift Wise Related Services =====================
Get_BasedOn_ZoneId_BaseLocations: 'http://' + SYSTEM_IP + '/wfms/ReportsController/get_BasedOn_ZoneId_BaseLocations ',
Get_BasedOn_BaseLocId_VehicleNumbers: 'http://' + SYSTEM_IP + '/wfms/ReportsController/get_BasedOn_BaseLocId_VehicleNumbers ',
Get_Zone_Wise_Reports_Details: 'http://' + SYSTEM_IP + '/wfms/ReportsController/get_Zone_Wise_Reports_Details ',


//============================ Shift Wise Related Services =====================
Get_Ers_Shift_Type_Details: 'http://' + SYSTEM_IP + '/wfms/ReportsController/get_Ers_Shift_Type_Details ',
Get_Shift_Wise_Report_Data_WithInputs: 'http://' + SYSTEM_IP + '/wfms/ReportsController/get_Shift_Wise_Report_Data_WithInputs ',

//============================ Roster Related Services =====================
Get_Roster_Report_Data_WithInputs: 'http://' + SYSTEM_IP + '/wfms/ReportsController/get_Roster_Report_Data_Details ',

//============================ Training Wise Related Services =====================
Get_Training_Report_Details: 'http://' + SYSTEM_IP + '/wfms/ReportsController/get_Training_Report_Details ',

//============================ Extra Allowance  Related Services =====================

Get_Module_Details_EM_EMT: 'http://' + SYSTEM_IP + '/wfms/ReportsController/get_Module_Details_EM_EMT ',

Get_User_Details_Baseon_ModuleId: 'http://' + SYSTEM_IP + '/wfms/ReportsController/get_User_Manager_Details_Baseon_ModuleId ',

Get_User_Allowance_Details: 'http://' + SYSTEM_IP + '/wfms/ReportsController/get_User_Allowance_Details ',


//============================ Master Mapping  Related Services =====================
Get_Desgnition_Details: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/get_Desgnition_Details ',
Get_BasedonDesginationId_Manager_Details: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/get_BasedonDesginationId_Manager_Details ',
Get_Ams_UnMapped_User_Details: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/get_Ams_UnMapped_User_Details ',
Get_Assigned_Employee_Manager_Details: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/get_Assigned_Employee_Manager_Details ',
Insert_Manager_Employeetrans_Details: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/insert_Manager_Employeetrans_Details ',
Update_Manager_Employeetrans_Details: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/update_Manager_Employeetrans_Details ',
Get_Unassigned_User_Details: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/get_Unassigned_User_Details ',
Get_Assigned_User_Details: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/get_Assigned_User_Details ',

GetLocationsDropDowns: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/getLocationsDropDowns ',



};
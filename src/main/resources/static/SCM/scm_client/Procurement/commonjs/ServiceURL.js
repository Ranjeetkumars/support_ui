
var SYSTEM_IP1 = "192.168.1.215:8081/FleetManagement";
var SYSTEM_IP = "localhost:2000/scmservice";
Service = {
    //Login 
    isUserExist: 'http://' + SYSTEM_IP1 + '/login/isUserExist',
    checkForModule: 'http://' + SYSTEM_IP1 + '/login/checkForModule',
    getRoles: 'http://' + SYSTEM_IP1 + '/login/getRoles',
    getPrevillages: 'http://' + SYSTEM_IP1 + '/login/getPrevillages',
    loginUrl: 'http://' + SYSTEM_IP1 + '/login/login',
    logout: 'http://' + SYSTEM_IP1 + '/login/logout',
    //--------------------Brand Name Registration --------------------//

    INSERT_DRUG_DROPDOWN: 'http://' + SYSTEM_IP + '/BrandRegistrationController/saveDrugDetails',
    GET_DRUG_BRANDNAMES_DROPDOWN: 'http://' + SYSTEM_IP + '/BrandRegistrationController/loadBrandDetails',
    UPDATE_DRUG_BANDNAMES_DROPDOWN: 'http://' + SYSTEM_IP + '/BrandRegistrationController/UpdateDrugDetails',
    //---------------- Inventory Group Registration ---------------//

    INSERT_UPDATE_INVENTORY_GROUP_DROPDOWN: 'http://' + SYSTEM_IP + '/MaterialGroupController/saveorUpdateMaterialUnit',
    GET_INVENTORYGROUP_DATA: 'http://' + SYSTEM_IP + '/MaterialGroupController/loadMaterialGroup',
    // -------------- Item Registration--- DRUG-------------------//

    GET_GENERICNAME_DROPDOWN: 'http://' + SYSTEM_IP + '/drugRegisteringService/loadGenericNames',
    
    //GET_BRANDNAME_DROPDOWN: 'http://' + SYSTEM_IP + '/drugRegisteringService/loadBrand',
    GET_BRANDNAME_DROPDOWN: 'http://' + SYSTEM_IP + '/BrandRegistrationController/loadBrandDetails',
    GET_SCHEDULE_CODE_DROPDOWN: 'http://' + SYSTEM_IP + '/drugRegisteringService/loadSchedule',
    GET_MANUFACTURE_DROPDOWN: 'http://' + SYSTEM_IP + '/addNewDrugController/loadManufacturer',
    
   
    
    GET_INVENTORY_GROUP_DROPDOWN: 'http://' + SYSTEM_IP + '/drugRegisteringService/loadMaterialGroup',
    GET_INVENTORYITEMFORM_DROPDOWN: 'http://' + SYSTEM_IP + '/drugRegisteringService/loadMaterialForm',
    GETBARCODE: 'http://' + SYSTEM_IP + '/drugRegisteringService/generate_new_drug_barcode',
    PACKING_DROPDOWN: 'http://' + SYSTEM_IP + '/drugRegisteringService/loadPackingType',
    INSERT_DRUG_DETAILS: 'http://' + SYSTEM_IP + '/drugRegisteringService/saveDrugDetails',
    GET_INVENTORY_FORMITEM_WITHOUT_INPUT_DROPDOWN: 'http://' + SYSTEM_IP + '/drugRegisteringService/loadPackingType',
    /*SEARCH_ITEM_DETAILS: 'http://' + SYSTEM_IP + '/drugRegisteringService/getDrugDetails'*/
    SEARCH_ITEM_DETAILS: 'http://' + SYSTEM_IP + '/salesIndentRaisedController/getMedicines',
    ITEM_APPROVAL:'http://' + SYSTEM_IP + '/itemApproval/getListOfActiveDrugs'
    
};

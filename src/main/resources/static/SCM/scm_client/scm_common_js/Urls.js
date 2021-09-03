
var production_server_ip_and_port = "104.211.220.120:2000";
var testing_server_ip_and_port  = "localhost:2000";
var development_server_ip_and_port  = "localhost:2000";
var SUPPORT_SYSTEM_IP="localhost:9034";
SYSTEM_IP
//vendorManagement.loadClassification


var MASTER_END_POINT = {
		"printBarCode":'http://'+development_server_ip_and_port+'/scmservice/masterDataController/printBarCode',
		"getAllMedicines":'http://'+development_server_ip_and_port+'/scmservice/UpdateBatchRatesController/getAllMedicines',
		"updateBatchRates":'http://'+development_server_ip_and_port+'/scmservice/UpdateBatchRatesController/updateBatchRates',
		"loadBrandDetails":'http://'+development_server_ip_and_port+'/scmservice/BrandRegistrationController/loadBrandDetails',
		"saveBrandDetails":'http://'+development_server_ip_and_port+'/scmservice/BrandRegistrationController/saveBrandDetails',
		"UpdateDrugDetails":'http://'+development_server_ip_and_port+'/scmservice/BrandRegistrationController/UpdateDrugDetails',
		"saveGenericNames":'http://'+development_server_ip_and_port+'/scmservice/GenericNameController/saveGenericNames',
		"getdrugsName":'http://'+development_server_ip_and_port+'/scmservice/GenericNameController/getdrugsName',
		"updateGenericName":'http://'+development_server_ip_and_port+'/scmservice/GenericNameController/updateGenericName',
		"loadMaterialGroup":'http://'+development_server_ip_and_port+'/scmservice/MaterialGroupController/loadMaterialGroup',
		"saveMaterialForm":'http://'+development_server_ip_and_port+'/scmservice/MaterialFormController/saveMaterialForm',
		"updateMaterialForm":'http://'+development_server_ip_and_port+'/scmservice/MaterialFormController/updateMaterialForm',
		"loadMaterialForm":'http://'+development_server_ip_and_port+'/scmservice/MaterialFormController/loadMaterialForm',
		"saveorUpdateMaterialUnit":'http://'+development_server_ip_and_port+'/scmservice/MaterialGroupController/saveorUpdateMaterialUnit',
		"saveManufacture":'http://'+development_server_ip_and_port+'/scmservice/MaterialManufactureController/saveManufacture',
		"loadMaterialManufacture":'http://'+development_server_ip_and_port+'/scmservice/MaterialManufactureController/loadMaterialManufacture',
		"updateManufacture":'http://'+development_server_ip_and_port+'/scmservice/MaterialManufactureController/updateManufacture',
		"loadForm":'http://'+development_server_ip_and_port+'/scmservice/addNewDrugController/loadForm',
		"loadStores":'http://'+development_server_ip_and_port+'/scmservice/expiryDrugsController/loadStores',
		"loadStoreTypes":'http://'+development_server_ip_and_port+'/scmservice/PharmacyStoreController/loadStoreType',
		"loadUnits":'http://'+development_server_ip_and_port+'/scmservice/MaterialUnitController/loadUnits',
		"loadRackDetails":'http://'+development_server_ip_and_port+'/scmservice/RackDetailsController/loadRackDetails',
		"UpdateRackDetails":'http://'+development_server_ip_and_port+'/scmservice/RackDetailsController/UpdateRackDetails',
		"updateStoreDetails":'http://'+development_server_ip_and_port+'/scmservice/PharmacyStoreController/UpdateStores',
		"saveRackDetails":'http://'+development_server_ip_and_port+'/scmservice/RackDetailsController/saveRackDetails',
		"saveStoreDeatils":'http://'+development_server_ip_and_port+'/scmservice/PharmacyStoreController/addStores',
		"saveRackShelveDetails":'http://'+development_server_ip_and_port+'/scmservice/RackShleveController/saveRackShelveDetails',
		"loadRackByStores":'http://'+development_server_ip_and_port+'/scmservice/ItemShelveController/loadRackByStores',
		"loadRackShelveDetails":'http://'+development_server_ip_and_port+'/scmservice/RackShleveController/loadRackShelveDetails',
		"updateRackShelveDetails":'http://'+development_server_ip_and_port+'/scmservice/RackShleveController/updateRackShelveDetails',
		"loadSchedule":'http://'+development_server_ip_and_port+'/scmservice/ScheduleController/loadSchedule',	
		"updateScheduleStores":'http://'+development_server_ip_and_port+'/scmservice/ScheduleController/updateScheduleStores',
		"saveSupplier":'http://'+development_server_ip_and_port+'/scmservice/ScheduleController/saveSupplier',
		"saveorUpdatePackingVolume":'http://'+development_server_ip_and_port+'/scmservice/PackingVolumeRegistration/saveorUpdatePackingVolume'
}




var SYSTEM_IP1;
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
    UPDATE_DRUG_DETAILS:'http://' + SYSTEM_IP + '/drugRegisteringService/updateDrugDetails',
    GET_INVENTORY_FORMITEM_WITHOUT_INPUT_DROPDOWN: 'http://' + SYSTEM_IP + '/drugRegisteringService/loadPackingType',
    /*SEARCH_ITEM_DETAILS: 'http://' + SYSTEM_IP + '/drugRegisteringService/getDrugDetails'*/
    SEARCH_ITEM_DETAILS: 'http://' + SYSTEM_IP + '/salesIndentRaisedController/getMedicines',
    ITEM_APPROVAL:'http://' + SYSTEM_IP + '/itemApproval/getListOfActiveDrugs',
    LOAD_FORM:'http://' + SYSTEM_IP + '/addNewDrugController/loadForm',
    ALL_ACTIVE_IN_ACTIVE_COUNT:'http://' + SYSTEM_IP + '/drugRegisteringService/getAllActiveInactiveCount',
    
    loadShelvesRack:'http://' + SYSTEM_IP + '/ItemShelveController/loadShelvesRack', 
    store:'http://' + SYSTEM_IP + '/ItemShelveController/store',
    loadRackByStores:'http://' + SYSTEM_IP + '/ItemShelveController/loadRackByStores',
    loadItems:'http://' + SYSTEM_IP + '/ItemShelveController/loadItems',
    loadShelves:'http://' + SYSTEM_IP + '/ItemShelveController/loadShelves',
    saveItemShelveDetails:'http://' + SYSTEM_IP + '/ItemShelveController/saveItemShelveDetails',
    updateShelveItems:'http://' + SYSTEM_IP + '/ItemShelveController/updateShelveItems',
    
   
    


};




var vendorManagement = {
			"saveorupdateSupplierClass":'http://' + SYSTEM_IP + '/itemApproval/saveorupdateSupplierClass',
			"loadSupplierClassification":'http://' + SYSTEM_IP + '/SupplierClassificationController/loadSupplierClassification',
			"loadSupplierClassificationBasedId":'http://' + SYSTEM_IP + '/itemApproval/loadSupplierClassificationBasedId',
			"loadClassification":'http://' + SYSTEM_IP + '/SupplierController/loadClassification',
		    "loadCountry":'http://' + SYSTEM_IP + '/SupplierController/loadCountry',
		    "loadState":'http://' + SYSTEM_IP + '/SupplierController/loadState',
		    "loadDistrict":'http://' + SYSTEM_IP + '/SupplierController/loadDistrict',
		    "loadCity":'http://' + SYSTEM_IP + '/SupplierController/loadCity',
		    "loadZipCode":'http://' + SYSTEM_IP + '/SupplierController/loadZipCode',
		    "loadLocality":'http://' + SYSTEM_IP + '/SupplierController/loadLocality',
		    "loadLandmark":'http://' + SYSTEM_IP + '/SupplierController/loadLandmark',
		    "loadSuppliers":'http://' + SYSTEM_IP + '/expiryDrugsController/loadSuppliers',
		    "saveSupplier":'http://' + SYSTEM_IP + '/SupplierController/saveSupplier',
		    "getSupplier":'http://' + SYSTEM_IP + '/SupplierController/getSupplier',
		    "listloadSuppliers":'http://' + SYSTEM_IP + '/drugAndSupplierMappingController/listloadSuppliers',
		    "loadMappedDrugs":'http://' + SYSTEM_IP + '/drugAndSupplierMappingController/loadMappedDrugs',
		    "loadDrugNames":'http://' + SYSTEM_IP + '/DrugVehicleTypeMappingController/loadDrugNames'

};

var AmbulanceTypeWiseMapping = {
		"ambulanceType":'http://' + SYSTEM_IP + '/DrugVehicleTypeMappingController/ambulanceType',
		"loadVehicleTypeWiseDrugDetails":'http://' + SYSTEM_IP + '/DrugVehicleTypeMappingController/loadVehicleTypeWiseDrugDetails',
		"saveMapDrugToVehicle":'http://' + SYSTEM_IP + '/DrugVehicleTypeMappingController/saveMapDrugToVehicle',
		
	
}

var subStoreAmbulance = {

	"saveVehicleSubStoreMapping":'http://' + SYSTEM_IP + '/VehicleSubStoreMappingController/saveVehicleSubStoreMapping',	
	"getStatusVehicleCount":'http://' + SYSTEM_IP + '/VehicleSubStoreMappingController/getStatusVehicleCount',
	"updateVehicleSubStoreMapping":'http://' + SYSTEM_IP + '/VehicleSubStoreMappingController/updateVehicleSubStoreMapping',
    "load_zones":'http://' + SYSTEM_IP + '/expiryDrugsController/load_zones',
    "load_baselocations":'http://' + SYSTEM_IP + '/expiryDrugsController/load_baselocations',
    "load_vehicles":'http://' + SYSTEM_IP + '/expiryDrugsController/load_vehicles',
    "loadVehicleItems":'http://' + SYSTEM_IP + '/ambToAmbController/loadVehicleItems',
    "loadVehicleReqAmbItems":'http://' + SYSTEM_IP + '/ambToAmbController/loadVehicleReqAmbItems',
    "getVehicleAlsBls":'http://' + SYSTEM_IP + '/addNewDrugController/getVehicleAlsBls',
    "getVehicleDrugStatus":'http://' + SYSTEM_IP + '/addNewDrugController/getVehicleDrugStatus',
    "loadIndentStatus":'http://' + SYSTEM_IP + '/indentItemListController/loadIndentStatus',
    "loadStores":'http://' + SYSTEM_IP + '/expiryDrugsController/loadStores',
    "loadVehicleTransferItems":'http://' + SYSTEM_IP + '/expiryDrugsController/loadVehicleTransferItems',
    "load_to_store":'http://' + SYSTEM_IP + '/indentViewController/load_to_store',
    "loadIndentRaisedSearch":'http://' + SYSTEM_IP + '/indentItemListController/loadIndentRaisedSearch',
    "save_vehicle_indent_details":'http://' + SYSTEM_IP + '/salesIndentRaisedController/save_vehicle_indent_details',
    "load_zones":'http://' + SYSTEM_IP + '/expiryDrugsController/load_zones',
    "load_baselocations":'http://' + SYSTEM_IP + '/expiryDrugsController/load_baselocations',
    "load_vehicles":'http://' + SYSTEM_IP + '/expiryDrugsController/load_vehicles',
    "store_item_details":'http://' + SYSTEM_IP + '/salesIndentRaisedController/store_item_details',
    "loadIndentStatus":'http://' + SYSTEM_IP + '/indentItemListController/loadIndentStatus',
    "loadIndentRaisedSearch":'http://' + SYSTEM_IP + '/indentItemListController/loadIndentRaisedSearch',
    "updateIndentStatus":'http://' + SYSTEM_IP + '/indentViewController/updateIndentStatus',
    "loadIndentRaisedItems":'http://' + SYSTEM_IP + '/indentItemListController/loadIndentRaisedItems',
    "insertAndUpdateIndentRaiseds":'' + SYSTEM_IP + '/indentItemListController/insertAndUpdateIndentRaiseds',
    "loadAvailableQty":'http://' + SYSTEM_IP + '/indentItemListController/loadAvailableQty',
    
    "loadVehicleSubStoreMapping":'http://' + SYSTEM_IP + '/VehicleSubStoreMappingController/loadVehicleSubStoreMapping',
};

ServiceProcreument = {
		GET_PURCHASE_ORDER_LIST: 'http://' + SYSTEM_IP + '/PlacingOrdersForPurchaseController/getAllPurchaseOrderList',
        GET_GENERATE_INDENT_NUMBER: 'http://' + SYSTEM_IP + '/PlacingOrdersForPurchaseController/getGenerateIndentNumber',

        SAVE_INDENT_ITEM_DETAILS:'http://' + SYSTEM_IP + '/PlacingOrdersForPurchaseController/saveIndentItemDetails',
        SAVE_PURCHASE_ORDER_ITEM_QUANTITY: 'http://' + SYSTEM_IP + '/PlacingOrdersForPurchaseController/savePurchaseOrderItemQuantity',

        GET_BRAND_NAMES: 'http://' + SYSTEM_IP + '/PlacingOrdersForPurchaseController/loadBrandNames',
        GET_MANUFACTURE_FORM: 'http://' + SYSTEM_IP + '/PlacingOrdersForPurchaseController/loadManufactureForm',
        GET_MANUFACTURE_COMPANY: 'http://' + SYSTEM_IP + '/PlacingOrdersForPurchaseController/loadManufactureCompnayNames',

        GET_PUCHASED_ORDER_DRUGS: 'http://' + SYSTEM_IP + '/PlacingOrdersForPurchaseController/getAllPurchaseOrderDrugCount',
        getAllPurchaseOrderDrugCountWIthEightParam: 'http://' + SYSTEM_IP + '/PlacingOrdersForPurchaseController/getAllPurchaseOrderDrugCountWIthEightParam',
        GET_ALL_INDENT_DETAILS: 'http://' + SYSTEM_IP + '/drugRegisteringService/getAllIndentDetails',
        UPDATE_INDENT_REJECTION: 'http://' + SYSTEM_IP + '/drugRegisteringService/updateIndentReject',
        APPROVAL_ITEM_LIST: 'http://' + SYSTEM_IP + '/drugRegisteringService/allApprovalItemList',
        INDENT_DATA: 'http://' + SYSTEM_IP + '/drugRegisteringService/strIndentDetails',
        UPDATE_INDENT_DETAILS: 'http://' + SYSTEM_IP + '/drugRegisteringService/updateIndentDetails',
        
        
        LOAD_INDENTS: 'http://' + SYSTEM_IP + '/PlacingOrdersForPurchaseController/loadIndents',
        INDENT_DETAILS: 'http://' + SYSTEM_IP + '/PlacingOrdersForPurchaseController/getIndentDetails',
        LOAD_SUPPLIER: 'http://' + SYSTEM_IP + '/PlacingOrdersForPurchaseController/loadSupplier',
        SAVE_PURCHASE_ORDER: 'http://' + SYSTEM_IP + '/PlacingOrdersForPurchaseController/savePoId',
        GENERATE_PO_NUMBER: 'http://' + SYSTEM_IP + '/PlacingOrdersForPurchaseController/generatePoNumber',
        SAVE_PURCHASE_ORDER_ITEM_DETAILS: 'http://' + SYSTEM_IP + '/PlacingOrdersForPurchaseController/savePurchaseOrderItemDetails',
        
        CENTRAL_CLOSE: 'http://' + SYSTEM_IP + '/PlacingOrdersForPurchaseController/centralClose',
        
        GET_ALL_RECEIVED_GOODS: 'http://' + SYSTEM_IP + '/ReceivedGoodsController/getAllReceivedGoodsSearch',
        GET_TERMS_CONDITIONS: 'http://' + SYSTEM_IP + '/ReceivedGoodsController/getTermsConditions',
        GET_ALL_RECEIVED_GOODS_BY_INDENT_ID: 'http://' + SYSTEM_IP + '/ReceivedGoodsController/getAllReceivedGoodsByIndentId',
        SAVE_RECEIVED_GOODS: 'http://' + SYSTEM_IP + '/PurchaseOrderController/saveReceivedGoodsDetails',
        UPDATE_PO_ITEMS: 'http://' + SYSTEM_IP + '/PurchaseOrderController/updatePoitemns',
        UPDATE_STATUS: 'http://' + SYSTEM_IP + '/ReceivedGoodsController/updateStatus',
        
        
        ADJUSTMENT_TYPE: 'http://' + SYSTEM_IP + '/expiryDrugsController/loadAdjustmentType',
        LOAD_BRABDS_DROPDOWN: 'http://' + SYSTEM_IP + '/addNewDrugController/loadBrand',
        LOAD_FORM_DROPDOWN: 'http://' + SYSTEM_IP + '/addNewDrugController/loadForm',
        LOAD_MANUFACTURE_COMPANIES_DROPDOWN: 'http://' + SYSTEM_IP + '/addNewDrugController/loadManufacturer',
        LOAD_STORE_DROPDOWN: 'http://' + SYSTEM_IP + '/expiryDrugsController/loadStores',
        LOAD_USERS: 'http://' + SYSTEM_IP + '/expiryDrugsController/loadUsers',
        STOCK_ADJUSTMENT_SEARCH: 'http://' + SYSTEM_IP + '/expiryDrugsController/adjustmentSearch',
        SAVE_ADJUSTED_STOCK_DATA: 'http://' + SYSTEM_IP + '/AdjustmentStockController/saveAdjustedStockDetails',
        UPDATE_STOCK_QUANTITY: 'http://' + SYSTEM_IP + '/AdjustmentStockController/updateStockQuantity',
 	   
 	    LOAD_RETURN_DRUGS: 'http://' + SYSTEM_IP + '/expiryDrugsController/LoadReturnDrugs',
        LOAD_SUPPLIERS: 'http://' + SYSTEM_IP + '/AdjustmentStockController/loadEmployees',
        LOAD_ZONES: 'http://' + SYSTEM_IP + '/expiryDrugsController/load_zones',
        LOAD_BASELOCATIONS: 'http://' + SYSTEM_IP + '/expiryDrugsController/load_baselocations',
        LOAD_VEHICLES: 'http://' + SYSTEM_IP + '/expiryDrugsController/load_vehicles',
        
        LOAD_SUBSTORE: 'http://' + SYSTEM_IP + '/expiryDrugsController/loadSubStore',
        SAVE_RETURN_DRUGS: 'http://' + SYSTEM_IP + '/expiryDrugsController/api/version_1/saveReturnDrugs',
        ProcessNewInventoryByIds:'http://' + SYSTEM_IP + '/salesIndentRaisedController/processNewInventoryByIds',
        processNewInventory:'http://'+SYSTEM_IP +'/salesIndentRaisedController/processNewInventory',
           GET_VendorMailId:'http://'+SYSTEM_IP +'/PlacingOrdersForPurchaseController/getEmpMailId',
               Send_Mail:'http://'+SYSTEM_IP +'/PlacingOrdersForPurchaseController/insertMails',
        "IndentRequestHtml":'http://' + SUPPORT_SYSTEM_IP + '/SCM/scm_client/Procurement/pages/IndentRequest.html'
//        http://localhost:2000/scmservice/expiryDrugsController/getVehicleMappingStatus
//        http://localhost:2000/scmservice/expiryDrugsController/LoadReturnDrugs
//        http://localhost:2000/scmservice/expiryDrugsController/saveReturnDrugs
        
        
};

var itemRegistration = {
	"listLoadActiveInactive":'http://localhost:2000/scmservice/salesIndentRaisedController/listLoadActiveInactive',
	"getDrugDetailsForApproval":'http://localhost:2000/scmservice/salesIndentRaisedController/getDrugDetailsForApproval',
	"updateActiveDrugForApproval":'http://localhost:2000/scmservice/salesIndentRaisedController/updateActiveDrugForApproval',
	"getAllActiveInactiveCount":'http://localhost:2000/scmservice/drugRegisteringService/getAllActiveInactiveCount',
	"getAllActiveInactive":'http://localhost:2000/scmservice/drugRegisteringService/getAllActiveInactive',
	"saveInActiveDrugs":'http://localhost:2000/scmservice/salesIndentRaisedController/saveInActiveDrugs',
	"getMedicinesDetailsBasedOnSerialId":'http://localhost:2000/scmservice/salesIndentRaisedController/getMedicinesDetailsBasedOnSerialId',
	"getMedicines":'http://localhost:2000/scmservice/salesIndentRaisedController/getMedicines',
	"updateDrugDetails":'http://localhost:2000/scmservice/drugRegisteringService/updateDrugDetails',
	"updateDrugDetails":'http://localhost:2000/scmservice/drugRegisteringService/updateDrugDetails',
	"getListOfActiveDrugs":'http://localhost:2000/scmservice/itemApproval/getListOfActiveDrugs',
	"getListOfDrugsDetailsBasedOnDrugId":'http://localhost:2000/scmservice/itemApproval/getListOfDrugsDetailsBasedOnDrugId',
	"updateActiveDrugForApproval":'http://localhost:2000/scmservice/salesIndentRaisedController/updateActiveDrugForApproval',
	"updateActiveDrugForRejectApproval":'http://localhost:2000/scmservice/drugRegisteringService/updateActiveDrugForRejectApproval',
};



//todo/info 
// - inherits -> ClientSideStateData 
// - temp and permanent userdata -> future db 
// - updatedForDisplaySet is used to update the big cards

class UserAndSession{
    constructor(){
        this.tempMbfoodConsumedSoFar = {};
        this.tempMbfoodTotal = {};
        this.tempAllFoodObj = {};
        this.userSearch = "";
        this.dType = undefined;
        this.searchResponseObj = {};
        this.userSearchFDCID = undefined;
        this.liValue = undefined;
        this.searchListResponseObj = undefined;
        this.updatedForDisplaySet = null
        this.previousState = "";
        this.searchInMb = false;
        this.stateToSet = "";
        this.undo = false;

        this.userDailyLog = undefined;
        this.mealBuilderNameAndSave = false;
        this.fullMealObj = undefined;

        this.prop = Object.assign({
            tempMbfoodConsumedSoFar: this.tempMbfoodConsumedSoFar,
            tempMbfoodTotal: this.tempMbfoodTotal,
            tempAllFoodObj:this.tempAllFoodObj,
            userSearch: this.userSearch,
            dType: this.dType,
            searchResponseObj: this.searchResponseObj,
            userSearchFDCID: this.userSearchFDCID,
            liValue: this.liValue,
            searchListResponseObj: this.searchListResponseObj,
            updatedForDisplaySet : this.updatedForDisplaySet,
            previousState: this.previousState,
            searchInMb: this.searchInMb,
            stateToSet : this.stateToSet,
            undo : this.undo,

            userDailyLog: this.userDailyLog,
            mealBuilderNameAndSave: this.mealBuilderNameAndSave,
            fullMealObj: this.fullMealObj
        });
    }
}


/* UNUSED - kept for future reference
// - composition - use() is a method wrapper
use(originalClassCalled, functionToCall, ...args){
    switch(originalClassCalled){
        case "uiFuncs":
            this.uiFuncs[functionToCall](...args);
            break;
        
        case "beHandler":
            console.log(originalClassCalled, functionToCall, ...args)
            this.beHandler[functionToCall](...args);
            console.log(this.searchResponseObj);
            break;

        default:
            console.error(`class name'${originalClassCalled}'or func '${functionToCall} wrong`);
    }
}*/




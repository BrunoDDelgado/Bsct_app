//todo/info
// - handles sorting, parsing and searching logic
// - userSearchObject()/getFdcId() were needed for api
// -> replaced to save requests (limited) with api key
// - in postUserSearch -> later add page more detail - once
// the matching backend func is built -> add results to searches  

class GeneralFunctions{
    parseSearchResults(searchResultObject){
        // calls the following functions if true - affect the same data

        let foodInfoObj = {};

        for(let foodInfo in searchResultObject.foods){
            let searchedFoodInfo = searchResultObject.foods[foodInfo];              
            foodInfoObj[foodInfo] = searchedFoodInfo;
        }

        return foodInfoObj;  
    }

    sortSearchResults(foodInfoObj){                                  
        let sortedInfo = {};
        let responseKeys= ['description', 'brandName', 'brandOwner', 'fdcId'];	
    
        for (let resObjProp in foodInfoObj) {
        let sortingObj = foodInfoObj[resObjProp];

        let parsedKey;
        let parsedValue;

        let parsingObj = {};
        
            for(let item in sortingObj){
                let objKey = item;
                let objValue = sortingObj[item];

                if (responseKeys.includes(objKey)){
                parsedKey = objKey;
                parsedValue = objValue;
                parsingObj[item] = objValue;

                }

                sortedInfo[resObjProp] = parsingObj;
            }
        }

        return sortedInfo;
    }

    listedItemsSorter(sortedInfo){
        
        let listedItems = Object.entries(sortedInfo);
    
        return listedItems;
    }

    userSearchObject(uSearch, dType = "Branded", pNumber = 1, pSize = 10){
        // unused for now
        let uSearchObject = {
            'uSearch' : uSearch,
            'dType' : dType,
            'pNumber' : pNumber,
            'pSize' : pSize
        }
        
        return uSearchObject;
    }

    getFdcId(value, object) {
        // unused 
        specificFdcId = object[value].fdcId;

        return String(specificFdcId);   
    } 
}
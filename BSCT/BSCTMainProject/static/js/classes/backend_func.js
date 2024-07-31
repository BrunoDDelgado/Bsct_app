//todo/info
// using XHMLHttp requests (old way) -> update to fetch - this/then
// helped learning ajax/promisses/response/async/await + detail 

class BackendHandler{

    postUserSearch(uSearch, dType = 1){            
        return new Promise((resolve, reject) => {           

            let url = '/search';                                        
            let searchRequest = new XMLHttpRequest();

            searchRequest.open("POST", url, true);
            searchRequest.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
            searchRequest.onreadystatechange = function () 
            {
                if (searchRequest.readyState === 4)
                {                                                               
                    if(searchRequest.status === 200)                            
                    {                                                           
                        let postResponse = (JSON.parse(searchRequest.responseText));
                        resolve(postResponse);                                  
                    }

                    else
                    {
                        reject("Unable to fetch response");
                    }
                }             
            };

            let uSearchObject = {
                'uSearch' : uSearch,
                'dType' : dType
            }

            let uSearchJsonString = JSON.stringify(uSearchObject);   
            searchRequest.send(uSearchJsonString);   
        });
    }

    postUserFcid(fDCID) {
        return new Promise((resolve, reject) => {

        let url = '/search_fdcid';
        let fdcidPostRequest = new XMLHttpRequest();

        fdcidPostRequest.open("POST", url, true);
        fdcidPostRequest.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
        fdcidPostRequest.onreadystatechange = function ()
        {
            if(fdcidPostRequest.readyState === 4){
                if(fdcidPostRequest.status === 200){
                    let postUserFcidResponse = (JSON.parse(fdcidPostRequest.responseText));
                    resolve(postUserFcidResponse);
                }
                else{
                    reject("Could search this food's Fdc Id!");
                }
            }
            
        };
        
        let fDCIDObject = {
            'fDCID' : fDCID
        }

        let fDCIDJsonString = JSON.stringify(fDCIDObject);
        fdcidPostRequest.send(fDCIDJsonString);

    });

    }

    postMealToSave(mealListAndTotalObj){
        return new Promise((resolve, reject) =>{

            let url = '/save_meal';
            let saveMeal = new XMLHttpRequest();

            saveMeal.open('POST', url, true);
            saveMeal.setRequestHeader("Content-Type", "application/json; charset=UTF-8");

            saveMeal.onreadystatechange = function (){
                if(saveMeal.readyState === 4){
                    if(saveMeal.status === 200){
                        let saveMealRes = (JSON.parse(saveMeal.responseText));
                        resolve(saveMealRes);
                    }

                    else{
                        reject("Couldn't save meal obj");
                    }
                }
            };

            let mealListAndTotalObjJsonify = JSON.stringify(mealListAndTotalObj);
            saveMeal.send(mealListAndTotalObjJsonify);
        })
    }

    postFoodCalc(inputAmt){
        return new Promise((resolve, reject) => {

            let url = '/meal_builder_consumed_amt';
            let foodCalc = new XMLHttpRequest();

            foodCalc.open("POST", url, true);
            foodCalc.setRequestHeader("Content-Type", "application/json; charset=UTF-8");

            foodCalc.onreadystatechange = function (){
                if(foodCalc.readyState === 4){
                    if(foodCalc.status === 200){
                        let foodCalcRes = (JSON.parse(foodCalc.responseText));
                        resolve(foodCalcRes);
                    }
                    else{
                        reject("Couldn't Calculate food Nutrients");
                    }
                }
                
            };

            let foodCalcAmt = {
                'inputAmt': inputAmt
            }

            let foodObjAmtString = JSON.stringify(foodCalcAmt);
            foodCalc.send(foodObjAmtString);

        });
    }

    getSavedMealsUpdate(){
        return new Promise((resolve, reject) =>{

            let url = '/daily_meal_log';
            let savedMealsUpdate = new XMLHttpRequest();

            savedMealsUpdate.open("GET", url, true)
            
            savedMealsUpdate.onreadystatechange = function (){
                if(savedMealsUpdate.readyState === 4){
                    if(savedMealsUpdate.status === 200){
                        let getMealUpdateResponse = (JSON.parse(savedMealsUpdate.responseText));

                        resolve(getMealUpdateResponse);
                        console.log("Meal log updated")
                    }
                    else{
                        reject("Couldn't update meal log");
                    }
                }
            };

            savedMealsUpdate.send();
        });
    }

    foodConsumedCurrMealUpdate(){
        return new Promise((resolve, reject) => {

            let url = '/consumed_food_update';
            let updateConsumedFood = new XMLHttpRequest();

            updateConsumedFood.open('GET', url, true);

            updateConsumedFood.onreadystatechange = function (){
                if(updateConsumedFood.readyState === 4){
                    if(updateConsumedFood.status === 200){
                        let updateResponse = (JSON.parse(updateConsumedFood.responseText));

                        resolve(updateResponse);
                    }
                    else{
                        reject("Couldn't update");
                    }
                }
            };

            updateConsumedFood.send();
        });
    }

    tempDeletePost(deleteValue){
        // until full editing is built
        return new Promise((resolve, reject) => {

            let url = '/temp_meal_delete_edit';
            let deleteEdit = new XMLHttpRequest();

            deleteEdit.open("POST", url, true);
            deleteEdit.setRequestHeader("Content-Type", "application/json; charset=UTF-8");

            deleteEdit.onreadystatechange = function (){
                if(deleteEdit.readyState === 4){
                    if(deleteEdit.status === 200){
                        let delResp = (JSON.parse(deleteEdit.responseText));
                        console.log(delResp)
                        resolve(this.tempRefreshGet);
                    }
                    else{
                        reject("Couldn't use temp delete meal");
                    }
                }
                
            };

            let postValue = {
                'optionDeleteValue': deleteValue
            }

            let postValueString = JSON.stringify(postValue);
            deleteEdit.send(postValueString);

        });
    };

    tempRefreshGet(){
        return new Promise((resolve, reject) =>{

            let url = '/temp_refresh';
            let refreshPageRequest = new XMLHttpRequest();

            refreshPageRequest.open("GET", url, true)
            
            refreshPageRequest.onreadystatechange = function (){
                if(refreshPageRequest.readyState === 4){
                    if(refreshPageRequest.status === 200){
                        let refreshData = (JSON.parse(refreshPageRequest.responseText));
                        resolve(refreshData);
                    }
                    else{
                        reject("Couldn't refresh");
                    }
                }
            };

            refreshPageRequest.send();
        });
    }
}
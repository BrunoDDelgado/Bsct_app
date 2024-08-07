class StateMealBuilder{
    constructor(user){
        this.user = user;

        this.ui = new UiElements();
        this.uiFuncs = new UiDynamicBehaviour();
        this.geFuncs = new GeneralFunctions();
        this.beHandler = new BackendHandler();
    }

    async renderState(){
        if(this.user.undo == false){
            let foodUpdate;
            if(this.user.previousState == 'inputAmt'){
                foodUpdate = await this.getFoodUpdateObj();

                this.user.tempAllFoodObj = foodUpdate;
            }
            this.uiRender(foodUpdate);
        }
        else{
            this.user.undo = false;
            this.ui.overlay.style.display = "none";
            this.uiRender(this.user.tempAllFoodObj);
        }
        
        return "mealBuilder";
    };

    uiRender(allFood = {}){
        this.ui.searchBar.value = "";
        this.ui.builderSearchBar.value = "";
        this.ui.nameMealForm.value = "";
        this.ui.mbAmmountForm.value = "";
        this.ui.mbAmmountOverlay.style.display = "none";
        this.ui.builderSearchBar.focus();

        let check = Object.keys(allFood).length;

        if(check == 0){
            let mealListInstance = this.ui.mealBuilderOverlay.querySelector("#meal-list");
            mealListInstance.innerHTML = "";

            let newLi = document.createElement('li');
            let liContent = "a food <br><label>a quantity (g or serving)</label>";

            mealListInstance.appendChild(newLi)
            mealListInstance.querySelector('li').innerHTML = liContent;
        }
        else{
            this.uiFuncs.updateEatenMbList(this.ui.mbMealList, allFood);
            this.uiFuncs.updateMbCards(this.ui.mbCardsUpdateLabel, allFood);
        }
        
        this.ui.mealBuilderOverlay.style.display = "flex";
        this.ui.mutableDisplayHeader.innerHTML = "Search for foods above:";
    };

    async getFoodUpdateObj(){
        let tempObj = await this.beHandler.foodConsumedCurrMealUpdate();
        return tempObj;
    }

    savedMealSelectedToShow(mealName){
        // soon it will allow to edit the meal
        let tempObjForDisplay = this.user.tempAllFoodObj[mealName]
        this.uiFuncs.updateEatenMbList(this.ui.mbMealList, tempObjForDisplay);
        this.uiFuncs.updateMbCards(this.ui.mbCardsUpdateLabel, tempObjForDisplay);
        this.ui.mealBuilderOverlay.style.display = "flex";  

        return "mealBuilder";
    }
}
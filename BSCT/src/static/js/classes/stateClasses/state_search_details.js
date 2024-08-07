class ListedSearchDetails{
    constructor(user){
        this.user = user;

        this.ui = new UiElements();
        this.uiFuncs = new UiDynamicBehaviour();
        this.geFuncs = new GeneralFunctions();
        this.beHandler = new BackendHandler();
    }

    async renderState(){
        if(this.user.undo == false){
            this.user.searchListResponseObj = this.geFuncs.parseSearchResults(this.user.searchListResponseObj)
            this.user.userSearchFDCID = this.user.searchListResponseObj[this.user.liValue].fdcId
            this.user.searchListResponseObj = String(this.user.userSearchFDCID);
            
            try{
                this.user.searchListResponseObj = await this.beHandler.postUserFcid(this.user.searchListResponseObj)
            }
            catch(error){
                console.log("cant post fdcid")
            }

            this.uiRender(this.user.searchListResponseObj, this.user.searchInMb)
        }
        else{
            this.user.undo = false;
            this.ui.overlay.style.display = "flex";
            this.uiRender(this.user.searchListResponseObj, this.user.searchInMb)
        }

        return "listSearchState"
    }

    uiRender(listObj, inMbBool){
        this.uiFuncs.listSearchedFoodDetails(listObj, this.ui.modalResultsLi, 
            this.ui.modalInfoSearch, this.ui.searchNameDescription, this.ui.searchInfoList); 
        
        this.ui.mealBuilderBotBtn.style.display = "flex";
        this.ui.addToMealBuilder.style.display = "none";

        if(inMbBool == true){
            this.ui.addToMealBuilder.style.display = "flex";
        };
    }
}
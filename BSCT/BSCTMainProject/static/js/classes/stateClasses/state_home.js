class Home{
    constructor(user){
        this.user = user;

        this.ui = new UiElements();
        this.uiFuncs = new UiDynamicBehaviour();
        this.geFuncs = new GeneralFunctions();
        this.beHandler = new BackendHandler();
    };

    async renderState(){
        let userDailyLog = await this.sortRefreshObj();
        this.uiRender(userDailyLog);

        return "home"
    }

    uiRender(refreshObjBe){
        this.ui.overlay.style.display = "none";
        this.ui.nameSaveOverlay.style.display = "none";
        this.ui.mealBuilderOverlay.style.display = "none";

        if(refreshObjBe != undefined){
            this.uiFuncs.updateCalsBigCards(this.ui.bigTotalCardsUpdateLabelCals, refreshObjBe[2]);
            this.uiFuncs.updateGramsBigCards(this.ui.bigTotalCardsUpdateLabelGrams, refreshObjBe[2]);
            this.uiFuncs.mealTrackerUpdaterAndDisplay(refreshObjBe[0], refreshObjBe[1],
            this.ui.mealTrackerSecondaryContainer, this.ui.clonableMealTracker); 
        }
    }

    async sortRefreshObj(){
        let refreshObj;
        try{
            refreshObj = await this.beHandler.tempRefreshGet();
        }
        catch{
            refreshObj = undefined;
        }
        
        if(refreshObj != null || refreshObj != undefined){
            refreshObj = this.uiFuncs.sortAndUpdateMealTrackerDisplay(refreshObj);
        }
         
        return refreshObj;
    }
}
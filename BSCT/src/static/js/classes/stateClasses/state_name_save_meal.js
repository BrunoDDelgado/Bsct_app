class NameSaveMeal{
    constructor(user){
        this.user = user;

        this.ui = new UiElements();
        this.uiFuncs = new UiDynamicBehaviour();
        this.geFuncs = new GeneralFunctions();
        this.beHandler = new BackendHandler();
    }

    renderState(){
        this.uiRender();
        return "nameSaveMeal"
    };

    uiRender(){
        this.ui.mealBuilderOverlay.style.display = "none";
        this.ui.nameSaveOverlay.style.display = "flex";
    };
}
class InputAmt{
    constructor(user){
        this.user = user;

        this.ui = new UiElements();
        this.uiFuncs = new UiDynamicBehaviour();
        this.geFuncs = new GeneralFunctions();
        this.beHandler = new BackendHandler();
    }

    renderState(){
        if(this.user.undo == false){
            this.uiRender();
            this.user.liValue = undefined;
            return "inputAmt";
        }
        else{
            //later add editing ability
            return "mealBuilder";
        }
    }

    uiRender(){
        this.ui.modalInfoSearch.style.display = "none";
        this.ui.overlay.style.display = "none";
        this.ui.mealBuilderOverlay.style.display = "flex";

        this.ui.mbAmmountOverlay.style.display = "flex";
        this.ui.mutableDisplayHeader.innerHTML = "Foods Added:";
        this.ui.mbAmmountInput.focus();
    }
}
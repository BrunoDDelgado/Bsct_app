// handles necessary ui events
class UiEvents{
    constructor(){
        this.ui = new UiElements();
        this.beHandler = new BackendHandler();

        this.handleAmtSubmit = this.handleAmtSubmit.bind(this);
        document.addEventListener('handleAmt', this.handleAmtSubmit);
    }

    triggerHandleAmt() {
        let event = new CustomEvent('handleAmt');
        document.dispatchEvent(event);
    }
    
    async handleAmtSubmit(event){
        let amt = this.ui.mbAmmountInput.value;
        await this.beHandler.postFoodCalc(amt);
        

        this.setMealBuilderState();
    }

    setMealBuilderState(){
        this.ui.addToMeal.dispatchEvent(new Event('click'));
    }
}


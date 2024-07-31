//todo/info
// - handles state -> with stack = improves/manages ui behaviour
// - improves ux -> allows undo/nav history

class ClientSStateStack{
    constructor(){
        this.appStateStack = [];
        this.appState = "";
        this.userState = undefined;
        
        this.user = new UserAndSession();
        this.user = this.user.prop;


        this.homeState = new Home(this.user); 
        this.searchState = new SearchState(this.user);
        this.listSearchState = new ListedSearchDetails(this.user);
        this.mealBuilderState = new StateMealBuilder(this.user);
        this.inputState = new InputAmt(this.user);
        this.nameSaveState = new NameSaveMeal(this.user);

        this.uiEvents = new UiEvents();
        this.beHandler = new BackendHandler();
    }
    async setState(stateNameAsString){
        this.setNewState(stateNameAsString);
        
        if(this.appStateStack != []){
            this.getHandleCurrStateStack();
        }
    }

    async setNewState(stateNameAsString){
        switch(stateNameAsString){
            case "homeState":
                this.appState = await this.homeState.renderState();
                this.userState = [this.appState, this.user]
                this.pushToStack(this.userState);
                break; 

            case "searchState":
                this.appState = await this.searchState.renderState();
                this.userState = [this.appState, this.user]
                this.pushToStack(this.userState);
                break; 

            case "listSearchState":
                this.appState = await this.listSearchState.renderState();
                this.userState = [this.appState, this.user]
                this.pushToStack(this.userState);
                break;
            
            case "mealBuilder":
                this.appState = await this.mealBuilderState.renderState();
                this.userState = [this.appState, this.user]
                this.pushToStack(this.userState);
                break; 
    
            case "inputAmt":
                this.appState = this.inputState.renderState();
                this.userState = [this.appState, this.user]
                this.pushToStack(this.userState);
                break;
            
            case "nameSaveMeal":
                this.appState = this.nameSaveState.renderState();
                this.userState = [this.appState, this.user]
                this.pushToStack(this.userState);
                break; 

            default:
                this.appState = this.homeState.renderState();
                this.userState = [this.appState, this.user]
                this.pushToStack(this.userState);
                break;
        }
    }

    pushToStack(userStateArray){
        let appState = userStateArray[0];
        let currUserObj = userStateArray[1];
        currUserObj = this.sortUserObjAtCurrTime(currUserObj);

        let stateArr = [appState, currUserObj];

        if(this.appStateStack != []){
            this.user.previousState = appState;
        }

        this.appStateStack.push(stateArr);
    }

    sortUserObjAtCurrTime(currUser){
        let userAtState = {};
        userAtState = JSON.parse(JSON.stringify(currUser));
        // clones obj -> instead of loop

        return userAtState
    }

    getHandleCurrStateStack(){
        if (this.appStateStack.length > 50){
            this.appStateStack.shift();
        }
    }

    undoState(){
        let sortAppStack = JSON.parse(JSON.stringify(this.appStateStack));
        let appStateUndo = sortAppStack[sortAppStack.length -2];
        let appState = appStateUndo[0];
        let currUser = appStateUndo[1];

        sortAppStack.pop(sortAppStack[length -1]);
        sortAppStack.pop(sortAppStack[length -1]);

        return [sortAppStack, appState, currUser];
    }

    async saveMeal(mealName, foodConsumedSoFar, foodTotal){ 
        let updatedObject = {}
            if(mealName.trim() != ""){
                let fullMealObject = {
                    meal_name : mealName,
                    food_consumed_in_meal : foodConsumedSoFar,
                    meal_total_calculated : foodTotal
                };

                let response = await this.beHandler.postMealToSave(fullMealObject);
                updatedObject = await this.getUserDailyLog();

                return updatedObject;
            }
            else{
                this.ui.nameMealInput.placeholder = "name this meal!";
            }
    };
    
    async getUserDailyLog(){
        let userLogUpdate 
            try{
                userLogUpdate = await this.beHandler.getSavedMealsUpdate();
            } catch{
                userLogUpdate = undefined;
            } 
        return userLogUpdate;
    };

    goHome(dailyLog){
        if(dailyLog != undefined){
            this.user.userDailyLog = dailyLog;
            this.setState("homeState");
        }
    };
}

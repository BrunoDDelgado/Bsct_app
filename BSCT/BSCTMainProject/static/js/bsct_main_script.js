//todo/info
// - add back button and matching func
// - fix remaining button events 
// - main script = event driven -> sets/get states

document.addEventListener("DOMContentLoaded", function(){
    let ui = new UiElements();
    let uStack = new ClientSStateStack();
    let uiEvents = new UiEvents();
    let handleRefresh = new CustomEvent('handleRefresh');

    ui.searchbarForm.addEventListener("click", ()=>{
        uStack.user.previousState = "home";
        uStack.user.searchInMb = false;
    });

    ui.searchbarForm.addEventListener("submit", async (e)=> {         
        e.preventDefault();
        uStack.setState("searchState");
    });

    ui.searchResultsListElement.addEventListener("click", async (e) =>{
        if (e.target.tagName == "LI") {     
            // li is case sensitive
            if(uStack.user.liVal == undefined){
                let liVal = e.target.getAttribute("value")
                uStack.user.liValue = liVal;
            }
            uStack.setState("listSearchState");
        }
    });
    
    ui.addToMeal.addEventListener("click", async() =>{
        uStack.setState("mealBuilder");
    });

    ui.mbBuilderSearchBarForm.addEventListener("submit", async (e) =>{
        e.preventDefault();
        if (ui.searchbarForm.requestSubmit) {
            ui.searchbarForm.requestSubmit();
        } else {
            ui.searchbarForm.submit();
        }
    });

    ui.addToMealBuilder.addEventListener('click', (e) =>{
        e.preventDefault();
        uStack.setState("inputAmt");
    });

    ui.addFoodBtn.addEventListener('click', function(event){
        event.preventDefault();
        if (ui.mbAmmountForm.requestSubmit) {
            ui.mbAmmountForm.requestSubmit();
        } else {
            ui.mbAmmountForm.submit();
        }
    });

    ui.mbAmmountForm.addEventListener('submit', async function(event){
        event.preventDefault();
        uiEvents.triggerHandleAmt();
    });

    ui.nameSaveBtn.addEventListener('click', () =>{
        uStack.setState("nameSaveMeal");
    });

    ui.nameMealForm.addEventListener("submit", async function(event){
        event.preventDefault(); 
        let mealName = ui.nameMealInput.value;
        let foodSoFar = uStack.user.tempAllFoodObj.foodConsumedSoFar
        let foodTotal = uStack.user.tempAllFoodObj.foodTotal
        uStack.user.userDailyLog = await uStack.saveMeal(mealName, foodSoFar, foodTotal);
        uStack.goHome(uStack.user.userDailyLog)
    });

    ui.saveMeal.addEventListener('click', () =>{
        ui.nameMealForm.dispatchEvent(new Event('submit'));
        if (ui.nameMealForm.requestSubmit) {
            ui.nameMealForm.requestSubmit();
        } else {
            ui.nameMealForm.submit();
        }
    });

    ui.addNewMealBtn.addEventListener("click",  function(event){
        let tempBuilder = ui.clonableMealTracker;
        tempBuilder.style.display = "flex";
        ui.clonableMealTracker.remove();
        ui.mealTrackerSecondaryContainer.appendChild(tempBuilder);
    });
    
    document.addEventListener('change', async(event)=>{
        // handles search -> different type of data in api
        if (event.target.classList.contains("result-type-selector")){
            let dataTypeSelectorOptions = {
                'Foundation' : 2,
                'Branded' : 1,
                'SR Legacy' : 0
            }
            
            let selectedTypeOption = event.target.options[event.target.selectedIndex];
            selectedTypeOption = selectedTypeOption.value;
            uStack.user.dType  = dataTypeSelectorOptions[selectedTypeOption]

            ui.searchBar.value = uStack.user.userSearch;
            ui.builderSearchBar.value = uStack.user.userSearch;
            //-> re post -> clear after save meal
            
            uStack.setState("searchState");
        }
    });

    window.addEventListener('beforeunload', ()=>{
        let reloadAllData = {
            user : JSON.stringify(uStack.user),
            appState : JSON.stringify(uStack.appStateStack),
        };

        window.sessionStorage.setItem('reloadAllData', JSON.stringify(reloadAllData));
    });

    window.addEventListener('load', ()=>{
        if('reloadAllData' in window.sessionStorage){
            let allData = JSON.parse(window.sessionStorage.getItem('reloadAllData'));
            
            let user = JSON.parse(allData.user);
            Object.assign(uStack.user , user);

            let appStateStack = JSON.parse(allData.appState);
            Object.assign(uStack.appStateStack , appStateStack);
    
            window.dispatchEvent(handleRefresh);
        }
        else{
            uStack.setState("home");
        }
    });

    window.addEventListener('keydown', function(event){
        if (event.key == "Escape" && uStack.appStateStack.length > 1){
            let stateToSet = uStack.undoState();

            uStack.appStateStack = stateToSet[0];
            uStack.user = stateToSet[2];
            uStack.user.undo = true;
            uStack.user.stateToSet = stateToSet[1];
       
            location.reload();
        }
    });

    window.addEventListener('handleRefresh', ()=>{
        if(uStack.user.stateToSet != undefined){
            uStack.setState(uStack.user.stateToSet);
            uStack.user.stateToSet = undefined;
        }
        else{
            uStack.setState(uStack.user.previousState);
        };
    });

    window.addEventListener('click', function(event){
        let cancelButtonIds = [
            "cancel-btn",
            "cancel-btn-amt",
            "mb-cancel-btn-amt",
            "cancel-btn-save"
        ];
    
        let id = event.target.parentElement.id;
        
        if (cancelButtonIds.includes(id)) {
            console.log("cancelled");
            window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
        }
    });
});
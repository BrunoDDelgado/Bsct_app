//todo/info
// - listSearchResultsUpdate() -> to add to the list of results
// needs matching backend -> renderState -> same query but
// post += request more results -> maybe scrollable after
// - ui logic in UiDynamicBehaviour (namespace)

class SearchState{
    constructor(user){
        this.user = user;

        this.ui = new UiElements();
        this.uiFuncs = new UiDynamicBehaviour();
        this.geFuncs = new GeneralFunctions();
        this.beHandler = new BackendHandler();
    }

    async renderState(){
        if(this.user.undo == false){
            this.user.searchResponseObj = await this.getResObj();
            this.user.searchListResponseObj = this.user.searchResponseObj;
            // for -> fdcid post]
            
            this.sortRespObj(this.user.searchResponseObj);
            this.uiRender(this.user.searchResponseObj);
        }
        else{
            this.user.undo = false;
            this.ui.overlay.style.display = "flex";
            this.uiRender(this.user.searchResponseObj);
        }

        return "searchState";
    }

    async getResObj(){
        let searchObj;

        if(this.user.previousState != 'mealBuilder'){
            this.user.userSearch = this.ui.searchBar.value;
        }
        else if(this.user.previousState == 'mealBuilder'){
            this.user.userSearch = this.ui.builderSearchBar.value;
        }

        searchObj = await this.beHandler.postUserSearch(
            this.user.userSearch, this.user.dType); 
        
        return searchObj;
    }

    sortRespObj(){
        this.user.searchResponseObj = this.geFuncs.parseSearchResults(this.user.searchResponseObj);
        this.user.searchResponseObj = this.geFuncs.sortSearchResults(this.user.searchResponseObj);
        this.user.searchResponseObj = this.geFuncs.listedItemsSorter(this.user.searchResponseObj);
    };

    uiRender(sortedObj){
        this.ui.searchInfoList.innerHTML = "";

        let numberOfResults = sortedObj.length;

        if(this.user.previousState == 'mealBuilder'){
            this.user.searchInMb = true;
            this.ui.mealBuilderOverlay.style.display = "none";
        }

        this.uiFuncs.listSearchResults(sortedObj, numberOfResults, 
            this.ui.overlay, this.ui.modalResultsLi, this.ui.searchResultsListElement);
    }
}
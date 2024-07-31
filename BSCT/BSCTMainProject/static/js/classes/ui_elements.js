//todo/info
// - overlays/modals etc naming needs to be improved

class UiElements{
    constructor() {
        // general elements
        this.body = document.body; 
        this.searchResultsListElement = document.getElementById("search-results-list");
        this.modalResultsLi = document.querySelector(".modal-results-card-li-items-display");  
        this.modalInfoSearch = document.querySelector(".modal-results-card-specific-external-search");                 
        this.searchInfoList = document.getElementById("info-list"); 
        this.searchNameDescription = document.getElementById("full-name-description");
        this.addToMeal = document.getElementById("add-to-meal");
        this.builderSearchBar = document.getElementById("builder-searchbar");
        this.mutableDisplayHeader = document.getElementById("mutable-display-header");
        this.mbMealList = document.getElementById("meal-list");
        this.nameMealInput = document.getElementById("name-meal-input");

        // meal tracker display
        this.mealTrackerContainer = document.getElementById("meal-tracker-container");
        this.mealTrackerSecondaryContainer = document.getElementById("meal-tracker-secondary-container");
        this.clonableMealTracker = document.getElementById("repeatable-meal-builder");

        // array for mb cards
        this.caloriesMbVal = document.getElementById("mb-calories-val");
        this.fatsMbVal = document.getElementById("mb-fats-val");
        this.carbsMbVal = document.getElementById("mb-carbs-val");
        this.proteinMbVal = document.getElementById("mb-protein-val");
        
        // array big cards - large value
        this.caloriesTotal = document.getElementById("calories-total-val");
        this.fatsTotalGram = document.getElementById("fats-totals-val-g");
        this.fatsTotalCals = document.getElementById("fats-totals-val-cals");
        this.carbsTotalGram = document.getElementById("carbs-totals-val-g");
        this.carbsTotalCals = document.getElementById("carbs-totals-val-cals");
        this.proteinTotalGram = document.getElementById("protein-totals-val-g");
        this.proteinTotalCals = document.getElementById("protein-totals-val-cals");

        // forms
        this.searchbarForm = document.getElementById("searchbar-form");
        this.mbBuilderSearchBarForm = document.getElementById("mb-builder-searchbar-form"); //spelling wrong
        this.mbAmmountForm = document.getElementById("mb-ammount-form");
        this.nameMealForm = document.getElementById("name-meal-form");
        this.addNewMealBtn = document.getElementById("add-new-meal-btn");

        // inputs
        this.searchBar = document.getElementById("searchbar");
        this.mbAmmountInput = document.getElementById("mb-ammount-input");

        // buttons
        this.mealBuilderBotBtn = document.getElementById("mb-search-bottom-buttons");
        this.addToMealBuilder = document.getElementById("mb-add-btn");
        this.addFoodBtn = document.getElementById("add-btn");
        this.saveMeal = document.getElementById("save-btn");
        this.searchBtn = document.getElementById("search-btn");
        this.modalCloseBtn = document.getElementById("close-btn");
        this.nameSaveBtn = document.getElementById("name-save-btn");
        this.mbSearchBtn = document.getElementById("mb-search-btn");
        this.mealOptionBtn = document.getElementById("option-button");
        this.cancelBtn = document.getElementById("cancel-btn");
        this.mbCancelBtn = document.getElementById("mb-cancel-btn-amt");
        this.amtCancelBtn = document.getElementById("cancel-btn-amt");
        this.saveCancelBtn = document.getElementById("cancel-btn-save");

        // overlays
        this.overlay = document.getElementById("overlay");                           
        this.mealBuilderOverlay = document.getElementById("meal-builder-overlay");
        this.mbAmmountOverlay = document.getElementById("mb-ammount-overlay");
        this.nameSaveOverlay = document.getElementById("modal-name-save-overlay");

        // sets for cards
        this.mbCardsUpdateLabel = [this.caloriesMbVal, this.fatsMbVal, this.carbsMbVal, this.proteinMbVal];
        this.bigTotalCardsUpdateLabelGrams = [this.fatsTotalGram, this.carbsTotalGram, this.proteinTotalGram];
        this.bigTotalCardsUpdateLabelCals = [this.caloriesTotal, this.fatsTotalCals, this.carbsTotalCals, this.proteinTotalCals];
    }

}
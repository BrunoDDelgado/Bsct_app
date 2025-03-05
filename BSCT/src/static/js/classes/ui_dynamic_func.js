//todo/info
// - namespace -> handling ui behaviour 
// - in the future -> remove/separate styling where possible
// - all of these are called based on state and events
// - overlays/modals etc naming needs to be improved
// - !fix variables declared inside loops!

class UiDynamicBehaviour{
    repeatableStringFormatter(string){
        // avoid bad formatting common in fdc db
        string = string.toLowerCase();

        if (string.charAt(0) == ',') {
        string = string.substring(1);
        }

        if(string.charAt(0) == ' ') {
        string = string.substring(1);
        }

        string = string.charAt(0).toUpperCase() + string.slice(1);

        return string
    };

    // for search
    listSearchResults(sortedListedItems, numberOfResults, overlay, modalResultsLi, searchResultsListElement){
        searchResultsListElement.innerHTML = "";

        overlay.style.display = "flex";
        modalResultsLi.style.display = "flex";

        for (let i = 0; i < numberOfResults; i++ ){
            let parsedItemList = this.listedItemsStringParser(sortedListedItems, i);

            let listItem = document.createElement("li");

            listItem.setAttribute("value", i);                         
            listItem.appendChild(document.createTextNode(parsedItemList));      
            listItem.style.marginBottom = "0.8rem"; // temp style

            searchResultsListElement.append(listItem);
        }
    };

    listSearchedFoodDetails(infoDictObj,  modalResultsLi, modalInfoSearch, searchNameDescription, searchInfoList){
        // later more units - serving size - oz - etc

        let infoFoodName = this.repeatableStringFormatter(infoDictObj.FoodName);
        let numberOfInfo = Object.keys(infoDictObj).length
        

        modalResultsLi.style.display = "none";
        modalInfoSearch.style.display = "flex";
        searchNameDescription.innerHTML = infoFoodName;

        for (let i = 1; i < numberOfInfo; i++ ){
            let name = Object.keys(infoDictObj)[i];
            let amt = Object.values(infoDictObj)[i];

            let sortedItem = name + ': ' + amt;

            let infoItem = document.createElement("li");
            infoItem.appendChild(document.createTextNode(sortedItem));
            infoItem.style.marginBottom = "0.8rem"; // temp style
            searchInfoList.append(infoItem);
        }
    };

    listedItemsStringParser(listedItemString, numOfIteration){
        let finalLiString = "";

        let currListedItem = listedItemString[numOfIteration][1];
        //fdcId != added to ui
        if (currListedItem.hasOwnProperty('fdcId')) {
            delete currListedItem.fdcId;
        } 

        let valuesCurrItem = Object.values(currListedItem); 
        
        for(let i = 0; i < valuesCurrItem.length;  i++){
            let item = valuesCurrItem[i].toString().toLowerCase();
            let firstLetterToUpperItem = item.charAt(0).toUpperCase() + item.slice(1);              
            finalLiString += firstLetterToUpperItem + ", ";
            // change logic to repeatableStringFormatter() call here - simpler
        } 
    
        return finalLiString;
    };

    // display updates
    // TODO - IN PROJECT NOTES
    updateEatenMbList(listElement, foodMbObj){
        listElement.innerHTML = "";
        let updatedObj = foodMbObj.foodConsumedSoFar;

        let unitOfFood = " grams consumed"; 
        // temp \\ later will add other optUiDynamicBehaviourions - serving - oz- etc
        
        updatedObj.forEach(consumedFoodItemEntry => {
            let foodName = consumedFoodItemEntry.FoodName;
            let amtOfFood = consumedFoodItemEntry.CurrAmtConsumed + unitOfFood;

            let liUpdate = document.createElement('li');
            let labelUpdate = document.createElement('label');
            let lineBreak = document.createElement('br');

            foodName = this.repeatableStringFormatter(foodName);

            liUpdate.innerText = foodName;
            labelUpdate.innerText = amtOfFood;

            listElement.append(liUpdate);
            liUpdate.append(lineBreak);
            liUpdate.append(labelUpdate);
        });
    };

    updateMbCards(cardsMbUpdateLabel, foodMbObj){ 
        let infoTotalObj = foodMbObj.foodTotal;

        let calories = cardsMbUpdateLabel[0];
        let fats = cardsMbUpdateLabel[1];
        let carbs = cardsMbUpdateLabel[2];
        let protein = cardsMbUpdateLabel[3];

        try{
            let caloriesUpdated = infoTotalObj['calories_total_failsafe'];
            calories.innerText = `${caloriesUpdated} kcals`;
        } catch (error){
            console.log("no calorie value found")
            calories.innerText = 'N/A';
        }

        try {
            let fatsUpdated = infoTotalObj['Total lipid (fat)'];
            fats.innerText = fatsUpdated;
        } catch (error) {
            console.log("no fat value found");
            fats.innerText = 'N/A';
        }
        
        try {
            let carbsUpdated = infoTotalObj['Carbohydrate, by difference'];
            carbs.innerText = carbsUpdated;
        } catch (error) {
            console.log("no carbs value found");
            carbs.innerText = 'N/A';
        }
        
        try {
            let proteinUpdated = infoTotalObj['Protein'];
            protein.innerText = proteinUpdated;
        } catch (error) {
            console.log("no protein value found");
            protein.innerText = 'N/A';
        }

        // could refactor as loops - later 
    };

    updateCalsBigCards(bigTotalCardsUpdateLabelCals, foodTotalObj){
        // could refactor as loops aswell - later

        let calories = bigTotalCardsUpdateLabelCals[0]; 
        let fats = bigTotalCardsUpdateLabelCals[1];
        let carbs = bigTotalCardsUpdateLabelCals[2];
        let protein = bigTotalCardsUpdateLabelCals[3];

        try{
            let caloriesUpdated = foodTotalObj['calories_total_failsafe'];
            caloriesUpdated = Math.round(caloriesUpdated);
            calories.innerText = caloriesUpdated;
        }
        catch(error){
            calories.innerText = "N/A";
        }

        try{
            let fatsUpdated = foodTotalObj['Total lipid (fat)'];
            fatsUpdated = fatsUpdated.slice(0, -2);
            fatsUpdated = parseFloat(fatsUpdated) * 9;
            fatsUpdated = Math.round(fatsUpdated);
            fats.innerText = "";
            fats.innerText = fatsUpdated;
        }
        catch(error){
            fats.innerText = "N/A";
        }

        try{
            let carbsUpdated = foodTotalObj['Carbohydrate, by difference'];
            carbsUpdated = carbsUpdated.slice(0, -2);
            carbsUpdated = parseFloat(carbsUpdated) * 4;
            carbsUpdated = Math.round(carbsUpdated);
            carbs.innerText = "";
            carbs.innerText = carbsUpdated;
        }
        catch(error){
            carbs.innerText = "N/A";
        }

        try{
            let proteinUpdated = foodTotalObj['Protein'];
            proteinUpdated = proteinUpdated.slice(0, -2);
            proteinUpdated = parseFloat(proteinUpdated) * 4;
            proteinUpdated = Math.round(proteinUpdated);
            protein.innerText = "";
            protein.innerText = proteinUpdated;
        }
        catch(error){
            protein.innerText = "N/A";
        }
    };

    updateGramsBigCards(bigTotalCardsUpdateLabelGrams, foodTotalObj){
        try{
            let fats = bigTotalCardsUpdateLabelGrams[0];
            let carbs = bigTotalCardsUpdateLabelGrams[1];
            let protein = bigTotalCardsUpdateLabelGrams[2];

            let fatsUpdated = foodTotalObj['Total lipid (fat)'];
            fatsUpdated = fatsUpdated.slice(0, -2);
            fatsUpdated = Math.round(fatsUpdated);
            fats.innerText = "";
            fats.innerText = fatsUpdated;
            
            let carbsUpdated = foodTotalObj['Carbohydrate, by difference'];
            carbsUpdated = carbsUpdated.slice(0, -2);
            carbsUpdated = Math.round(carbsUpdated);
            carbs.innerText = "";
            carbs.innerText = carbsUpdated;

            let proteinUpdated = foodTotalObj['Protein'];
            proteinUpdated = proteinUpdated.slice(0, -2);
            proteinUpdated = Math.round(proteinUpdated);
            protein.innerText = "";
            protein.innerText = proteinUpdated;
        }
        catch(error){
            console.log("no log");
        }

    };

    // main page meal tracker display updates - first one will sort and nest the related ones for simplicity
    sortAndUpdateMealTrackerDisplay(dailyLogObj){     
        // GET obj keys -> loop over obj with keys -> sort each food/meal info to seperate vars
        // Nested funcs will -> loop sort -> display food and amt -> display meal total -> clone base element with meal name as value or similiar
        let dailyMealLog = dailyLogObj[0];
        let dailyTotalLog = dailyLogObj[1]; // for big cards
        let dailyMealLogKeys = Object.keys(dailyMealLog);

        let sortedFoodAndAmtdObjForDisplay = this.sortFoodNameAndAmtEaten(dailyMealLog, dailyMealLogKeys)
        let sortedMealTotalsObjForDisplay = this.sortEachMealTotals(dailyMealLog, dailyMealLogKeys);

        // nested for less mains script confusion

        let sortedAndUpdatedDisplaySet = [sortedFoodAndAmtdObjForDisplay, sortedMealTotalsObjForDisplay, dailyTotalLog]

        return sortedAndUpdatedDisplaySet
    };

    sortFoodNameAndAmtEaten(mealLogObj, mealKeys){
        // .map would make code simpler - in project notes
        let nameFoodNameAmtDispObj = {};

        let foodName;
        let foodAmt;
        let foodAndAmt = [];
        let fullFoodAmtArr = [];

        for(mealKeys in mealLogObj){
            let tempObj = mealLogObj[mealKeys]['consumed_foods'];
                for(let i = 0; i < tempObj.length; i++){
                foodName = tempObj[i]['FoodName'];
                foodAmt = tempObj[i]['CurrAmtConsumed'];	
                foodAndAmt = [foodName, foodAmt];
                fullFoodAmtArr.push(foodAndAmt);
                foodAndAmt = [];
            }

        nameFoodNameAmtDispObj[mealKeys] = fullFoodAmtArr;
        fullFoodAmtArr = [];
        }

        return nameFoodNameAmtDispObj; 
    };

    sortEachMealTotals(dTotalLog, dMealLogKeys){
        let mealTotalsDispObj = {};
        let macroList = [];
        
        for(dMealLogKeys in dTotalLog){
            let tempObj = dTotalLog[dMealLogKeys]['food_totals'];
            let macroKeys = ['calories_total_failsafe', 'Total lipid (fat)', 'Carbohydrate, by difference', 'Protein'];
            
            // macroKeys.forEach =>{...} would also work
            for(let key in macroKeys){
                if (Object.keys(tempObj).includes(macroKeys[key])) {
                    macroList.push(tempObj[macroKeys[key]]);
                } else {
                    macroList.push("N/A");
                }
            };

            mealTotalsDispObj[dMealLogKeys] = macroList;
            macroList = [];
        };

        return mealTotalsDispObj;
    };

    mealTrackerUpdaterAndDisplay(sortedMealFoodAmtObj, sortedMealTotalObj, secondaryTrackerContainer, clonableMealTrackerBuilder){
        // take these arrays -> loop both -> create mealTracker div -> while assign value = to array position || meal name key 
        // assigns -> food name to list + amt eatean each -> totals foreach meal 

        let sortedMealArr = Object.entries(sortedMealFoodAmtObj);
        let sortedTotalArr = Object.entries(sortedMealTotalObj); // "slave" follows the first one

        let cloneValue = 0; // serves to track the second array and atribbute a value to the cloned element 

        let secondaryTrackerContainerCollection = secondaryTrackerContainer.getElementsByTagName("div");

        if(clonableMealTrackerBuilder.style.display != 'none'){
            clonableMealTrackerBuilder.style.display = 'none';
        }
        
        for (let i = 0; i < secondaryTrackerContainerCollection.length; i++) {
            let mealEntry = secondaryTrackerContainerCollection[i];
            if (mealEntry.getAttribute('id') != 'repeatable-meal-builder') {
                mealEntry.remove();
            }
        }

        sortedMealArr.forEach(foodAndAmtArr =>{
            let clonedBuilder = clonableMealTrackerBuilder.cloneNode(true);

            let mealName = this.repeatableStringFormatter(foodAndAmtArr[0])

            clonedBuilder.setAttribute('id', mealName);
            clonedBuilder.setAttribute('value', cloneValue);

            let mealNameElement = clonedBuilder.querySelector("#meal-name");
            let foodListElement = clonedBuilder.querySelector("#food-list");
            let optionBtn = clonedBuilder.querySelector("#option-button");
            
            mealNameElement.innerHTML = `${mealName}:`;
            foodListElement.innerHTML = "";

            optionBtn.value = foodAndAmtArr[0];

            // maybe change to clone entire el - maybe be simpler
            
            foodAndAmtArr[1].forEach(eachFoodAmt =>{
                let foodName = this.repeatableStringFormatter(eachFoodAmt[0]);
                let foodAmt = eachFoodAmt[1]

                let liForFoodListElement = document.createElement('li');
                liForFoodListElement.setAttribute('id', 'food-list-item');

                let labelForFood = document.createElement('label');
                labelForFood.setAttribute('class', 'listed-food');
                labelForFood.innerHTML = foodName;

                let labelForAmt = document.createElement('label');
                labelForAmt.setAttribute('class', 'listed-amt');
                labelForAmt.innerHTML = foodAmt;

                liForFoodListElement.appendChild(labelForFood);
                liForFoodListElement.appendChild(labelForAmt);

                foodListElement.appendChild(liForFoodListElement);
            });

            let innerValArr = sortedTotalArr[cloneValue][1];
            let [cals, fat, carb, protein] = [innerValArr[0], innerValArr[1], innerValArr[2], innerValArr[3]];
            
            let calsCard = clonedBuilder.querySelector("#meal-total-calories");
            calsCard.innerHTML = `${cals} kcals`;

            let cardsSpan = clonedBuilder.querySelector("#current-meal-macros");
            let cardsSpanEl = cardsSpan.children;
            cardsSpanEl[0].innerHTML = fat + " f";
            cardsSpanEl[1].innerHTML = carb + " c";
            cardsSpanEl[2].innerHTML = protein + " p";
            
            cloneValue += 1;

            clonedBuilder.style.display = "flex";
            optionBtn.addEventListener("click", function(){
                this.tempEditDelete(optionBtn.value, clonedBuilder);
            }.bind(this));

            secondaryTrackerContainer.appendChild(clonedBuilder);
        });
    }; 

    tempEditDelete(selectedValue, builder){
        let tempEditDeleteBtn = document.createElement('label');
        let builderTop = builder.querySelector('.meal-builder-top');

        builderTop.appendChild(tempEditDeleteBtn);

        tempEditDeleteBtn.innerText = "Delete Meal";

        // temp style
        tempEditDeleteBtn.style.fontSize = "0.8rem";
        tempEditDeleteBtn.style.fontWeight = "700";
        tempEditDeleteBtn.style.position = "absolute";
        tempEditDeleteBtn.style.top = "2.4rem";
        tempEditDeleteBtn.style.right = "8%";
        tempEditDeleteBtn.style.backgroundColor = "#E3F5FF";
        tempEditDeleteBtn.style.paddingInline = "25px";
        tempEditDeleteBtn.style.borderRadius = "1.2rem";
        tempEditDeleteBtn.style.borderRadius = "1.2rem";

        tempEditDeleteBtn.addEventListener("mouseenter", function() {
            tempEditDeleteBtn.style.backgroundColor = "#fc1e1e";

        });

        tempEditDeleteBtn.addEventListener("mouseleave", function() {
            tempEditDeleteBtn.style.backgroundColor = "#E3F5FF";
        });
        /////////////

        tempEditDeleteBtn.addEventListener('click', async function(){
            let tempBackendPost = new BackendHandler();
            await tempBackendPost.tempDeletePost(selectedValue);
            await tempBackendPost.getSavedMealsUpdate();
            tempEditDeleteBtn.remove();
            location.reload();
        });

        //ugly change later!!
    };
};

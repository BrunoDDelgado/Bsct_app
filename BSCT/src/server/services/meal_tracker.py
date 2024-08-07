# todo/info
# - add serving size unit option -> external_fdcid_object_to_parsed_nutrient_dict
# - split into smaller func - hard do read/less clean
# - search_dict["foodNutrients"]: -> redundant but might need it later for micronutrient info
# - user_list_of_foods_consumed - session data = [] array/list of meal dictionaries = food_consumed 


def external_fdcid_object_to_parsed_nutrient_dict (search_dict):

    food_name = get_food_name_and_description(search_dict)
    # defined below

    food_nutrient_dict = {}
    food_nutrient_dict.update({"FoodName":food_name})

    for food_nutrients in search_dict["foodNutrients"]: 
        n_name = food_nutrients["nutrient"]["name"]
        n_value = ""
        n_value_unit = ""

        try:
            n_value = food_nutrients["value"]
        except:
            for key in food_nutrients:
                if key == "value":
                    n_value = food_nutrients[key]

        n_unit = food_nutrients["nutrient"]["nutrientUnit"]["name"]
        #skip the ones that are empty
        if(n_value != ""):
            n_value_unit =  f"{n_value} {n_unit}"
            food_nutrient_dict.update({n_name:n_value_unit})
        else:
            n_value_unit = "N/A"
            food_nutrient_dict.update({n_name:n_value_unit})

    return food_nutrient_dict 


def get_food_name_and_description(search_obj):
    spc = ", "
    food_name_key = ["description", "brandName", "brandOwner"]
    sort_to_values = ["food_name_brand", "food_name_description", "food_name_owner"]
    sorted_food_name_dict = {}
    food_name_string = ""

    for info_index in range(len(food_name_key)):
        try:
            incoming_name = search_obj[food_name_key[info_index]]
        except:
            incoming_name = ""

        sorted_food_name_dict[sort_to_values[info_index]] = incoming_name
        
        if sorted_food_name_dict[sort_to_values[info_index]] != "":
            #avoids empty space in the name
            food_name_string += sorted_food_name_dict[sort_to_values[info_index]] + spc

    if food_name_string[-2] == ",":
        #avoids comma at the end
        food_name_string = food_name_string[:-2]

    return food_name_string

def current_meal_builder(food_consumed, ammount_consumed, user_list_of_foods_consumed):
    #iterates the food data retrieved - calculates based on user input
    not_applicable = "N/A"    

    for nKey, nVal in food_consumed.items():
        if nKey != 'FoodName' and nKey != 'fdcidSearch' and nVal != not_applicable:
            # example -> protein: 20 g -> split nval is 20
            split_nval = float(nVal.split(' ')[0])
            nval_calc = (split_nval * float(ammount_consumed))*0.01
            nval_calc_round = round(nval_calc, 1)
            calc_str = str(nval_calc_round)

            # same logic for units
            unit_nval = nVal.split(' ')[1]
            final_string = f'{calc_str} {unit_nval}'
            
            food_consumed[nKey] = final_string

    ammount_consumed_to_str = str(ammount_consumed) 
    food_consumed['CurrAmtConsumed'] = ammount_consumed_to_str
    user_list_of_foods_consumed.append(food_consumed)

    return food_consumed 


# todo/info
# - for users total data related to food consumed
# - overall keys are the allways the same == .update()
# - this allows simpler loops
# - list_food_consumed == LIST of DICTS
# - find cleaner solution for de nested loops
# - calc_meal_total -> calculates as best as possible given the db info
# - calorie_failsafe_func -> to handle the missing data - nested 

def calc_meal_total(list_food_consumed):
    total_dict = {}

    for meal_dict in list_food_consumed:
        # iterates dicts in list
        for food_item in meal_dict:
            # inner loop == updates itself based on users daily total
            key = food_item
            value = meal_dict[food_item]

            if food_item == 'CurrAmtConsumed':
                continue

            elif food_item != 'FoodName' and food_item not in total_dict:
                item = {key:value}
                total_dict.update(item)

            elif food_item in total_dict:
                value_pair = total_dict[food_item]
                split_value_pair = value_pair.split(' ')[0]

                try:
                    split_value_unit = value_pair.split(' ')[1]
                except:
                    print("Can't get unit")
                    continue

                split_value = value.split(' ')[0]
                add_value = float(split_value_pair) + float(split_value)
                add_value = round(add_value, 1)

                value_pair = f'{add_value} {split_value_unit}'
                total_dict[food_item] = value_pair
    
    calories_failsafe_calc = failsafe_calories(total_dict)
    total_dict['calories_total_failsafe'] = calories_failsafe_calc
    
    return total_dict

def failsafe_calories(total_dict):
    # database does not allways contain energy/calorie values
    # calculated with different values - macros != calorie content

    try:
        carbs = float(total_dict['Carbohydrate, by difference'].split(' ')[0]) * 4  
    except: 
        print('carbs value not calculated')
        carbs = float(0)

    try:
        protein = float(total_dict['Protein'].split(' ')[0]) * 4  
    except: 
        print('protein value not calculated')
        protein = float(0)

    try:
        fats = float(total_dict['Total lipid (fat)'].split(' ')[0]) * 9  
    except: 
        print('fats value not calculated')
        fats = float(0)

    try:
        alcohol = float(total_dict['Alcohol, ethyl'].split(' ')[0]) * 7  
    except: 
        print('alcohol value not calculated')
        alcohol = float(0)

    energy_calories_failsafe_calc = carbs + protein + fats + alcohol
    energy_calories_failsafe_calc = round(energy_calories_failsafe_calc, 1)
    
    return energy_calories_failsafe_calc

def save_to_all_meals_in_day_list(meal_to_save, all_saved_meals):
    meal_name = meal_to_save['meal_name']
    consumed = meal_to_save['food_consumed_in_meal']
    totals_food = meal_to_save['meal_total_calculated']
    
    log = {
        'consumed_foods': consumed,
        'food_totals' : totals_food
    }
    
    all_saved_meals[meal_name] = log

    return all_saved_meals

def save_each_meal_total(all_meals):
    # similiar to func above - also called to edit/delete
    total_calc = {}

    for meal_entry in all_meals:
        meal_info = all_meals[meal_entry]
        total_values = meal_info['food_totals']

        for item in total_values:
            key = item
            value = total_values[item]

            if item == 'calories_total_failsafe' and item not in total_calc:
                item = {key:value}
                total_calc.update(item)

            elif item  == 'calories_total_failsafe' and item in total_calc:
                calorie = total_calc[item] + float(value)
                calorie = round(calorie, 1)
                total_calc[item] = calorie

            elif item not in total_calc:
                item = {key:value}
                total_calc.update(item)

            elif item in total_calc:
                value_pair = total_calc[item]
                split_value_pair = value_pair.split(' ')[0]

                try:
                    split_value_unit = value_pair.split(' ')[1]
                except:
                    print("Can't get unit")
                    continue

                split_value = value.split(' ')[0]
                add_value = float(split_value_pair) + float(split_value)
                add_value = round(add_value, 1)

                value_pair = f'{add_value} {split_value_unit}'
                total_calc[item] = value_pair

    return total_calc

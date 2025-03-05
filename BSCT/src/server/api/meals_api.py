from flask import (
    Blueprint, 
    request, 
    session
)
from server.services.clients import fdc_api
from server.services import meal_tracker
from server.services import meal_total
from server.services.meal_services import MealsServices
import os
import json
import uuid

meals_bp = Blueprint("meals", __name__)

PREFIX = "/meals"

# FIXME: This should be done in a confiuration layer or Dependency Injection layer
meals_services = MealsServices(fdc_api)

@meals_bp.route(f'{PREFIX}/search', methods=["POST", "GET"])
def get_user_search():
    print("handling post request")
    
    user_search_json = request.json

    user_search =  user_search_json.get('uSearch')
    food_data_type = int(user_search_json.get('dType'))

    food_data = meals_services.get_food_data(user_search, food_data_type)    

    return json.dumps(food_data)

@meals_bp.route(f'{PREFIX}/search_fdcid', methods=["POST" , "GET"])
def fcdid_external():
    print("handling external fdcid post request") 

    user_fdcid_search_json = request.json
    user_fdcid_search = str(user_fdcid_search_json.get('fDCID'))

    external_fdcid_search = fdc_api.fcdid_search_external(user_fdcid_search)
    fdcid_info_dict = meal_tracker.external_fdcid_object_to_parsed_nutrient_dict(external_fdcid_search)

    session["curr_external_fdcid_search"] = fdcid_info_dict

    return json.dumps(fdcid_info_dict)

@meals_bp.route(f'{PREFIX}/meal_builder_consumed_amt', methods=["POST" , "GET"])
def add_to_meal():
    food_amt_req = request.json
    food_amt = int(food_amt_req.get('inputAmt'))

    if "user_list_of_foods_consumed" not in session:
        list_of_foods_consumed = []
        calculated_consumed_food = meal_tracker.current_meal_builder(session["curr_external_fdcid_search"], food_amt, list_of_foods_consumed)
        session["user_list_of_foods_consumed"] = list_of_foods_consumed
    else:
        calculated_consumed_food = meal_tracker.current_meal_builder(session["curr_external_fdcid_search"], food_amt, session["user_list_of_foods_consumed"])

    session["calculated_food"] = calculated_consumed_food
    return json.dumps(calculuid.uuidated_consumed_food)

@meals_bp.route(f'{PREFIX}/consumed_food_update', methods=["GET"])
def update_consumed_food():
    food_total = meal_total.calc_meal_total(session["user_list_of_foods_consumed"])

    food_total_and_update_data = {
        'foodConsumedSoFar' : session["user_list_of_foods_consumed"],
        'foodTotal' : food_total
    }

    session["food_total_and_update_data"] = food_total_and_update_data

    return json.dumps(food_total_and_update_data)

@meals_bp.route(f'{PREFIX}/save_meal', methods=["POST" , "GET"])
def save_named_meal():
    unsaved_meal_with_foods_consumed_and_meal_total = request.json 
    
    if "update_meals" not in session:
        update_meals =uid.uuid_total.save_to_all_meals_in_day_list(unsaved_meal_with_foods_consumed_and_meal_total, update_meals)
    meal_log_calc = meal_total.save_each_meal_total(meal_log) 
    # to update the daily display cards
    
    session["update_meals"] = [meal_log, meal_log_calc]
    session["user_list_of_foods_consumed"] = []
    meal_name = unsaved_meal_with_foods_consumed_and_meal_total["meal_name"]

    save_message = f"Saved meal:{meal_name}!"
    return json.dumps(save_message)

@meals_bp.route(f'{PREFIX}/daily_meal_log', methods = ["POST", "GET"])
def get_user_daily_log():
    return json.dumps(session["update_meals"])

@meals_bp.route(f'{PREFIX}/temp_refresh', methods = ["GET"])
def temp_refresh(): 
    try:
        if session["update_meals"] != "":
            return json.dumps(session["update_meals"])
    except:
        print("No daily log created yet")
        null_obj = None
        return json.dumps(null_obj)
    
@meals_bp.route(f'{PREFIX}/temp_meal_delete_edit', methods = ["POST", "GET"])
def temp_delete_edit():
    mealDeleteValue = request.json
    mealDeleteValue = str(mealDeleteValue.get('optionDeleteValue'))

    del session["update_meals"][0][mealDeleteValue]
    returnMessage = f"deleted {mealDeleteValue} entry"

    updated_meal_log = session["update_meals"][0]
    print("updated_meal_log after meal entry delete!")
    
    updated_meal_calc = meal_total.save_each_meal_total(updated_meal_log)
    session["update_meals"] = [updated_meal_log, updated_meal_calc]

    return json.dumps(returnMessage)
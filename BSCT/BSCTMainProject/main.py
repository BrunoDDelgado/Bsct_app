from flask import Flask, render_template, request, session
from pprint import pprint
import uuid
from waitress import serve
import os
import json
import fdc_api
import meal_tracker
import meal_total

#todo/info
# later handle session in user class
# when db is built will add user class
# build class for route funcs

app = Flask(__name__)
app.secret_key = os.urandom(24)

@app.route('/')
def index():
    if 'curr_user' not in session:
        session["curr_user"] = str(uuid.uuid4())
    return render_template("calorie_tracker_home.html")

@app.route('/search', methods=["POST", "GET"])
def get_user_search():
    print("handling post request")
    
    user_search_json = request.json

    user_search =  str(user_search_json.get('uSearch'))
    food_data_type = int(user_search_json.get('dType'))

    search_params = fdc_api.set_search_parameters(user_search, 1, 50, food_data_type)
    food_data = fdc_api.get_food_data(search_params)
    
    return json.dumps(food_data)

@app.route('/search_fdcid', methods=["POST" , "GET"])
def fcdid_external():
    print("handling external fdcid post request") 

    user_fdcid_search_json = request.json
    user_fdcid_search = str(user_fdcid_search_json.get('fDCID'))

    external_fdcid_search = fdc_api.fcdid_search_external(user_fdcid_search)
    fdcid_info_dict = meal_tracker.external_fdcid_object_to_parsed_nutrient_dict(external_fdcid_search)

    session["curr_external_fdcid_search"] = fdcid_info_dict

    return json.dumps(fdcid_info_dict)

@app.route('/meal_builder_consumed_amt', methods=["POST" , "GET"])
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
    return json.dumps(calculated_consumed_food)

@app.route('/consumed_food_update', methods=["GET"])
def update_consumed_food():
    food_total = meal_total.calc_meal_total(session["user_list_of_foods_consumed"])

    food_total_and_update_data = {
        'foodConsumedSoFar' : session["user_list_of_foods_consumed"],
        'foodTotal' : food_total
    }

    session["food_total_and_update_data"] = food_total_and_update_data

    return json.dumps(food_total_and_update_data)

@app.route('/save_meal', methods=["POST" , "GET"])
def save_named_meal():
    unsaved_meal_with_foods_consumed_and_meal_total = request.json 
    
    if "update_meals" not in session:
        update_meals = {}
    else:
        update_meals = session["update_meals"][0]
     
    meal_log = meal_total.save_to_all_meals_in_day_list(unsaved_meal_with_foods_consumed_and_meal_total, update_meals)
    meal_log_calc = meal_total.save_each_meal_total(meal_log) 
    # to update the daily display cards
    
    session["update_meals"] = [meal_log, meal_log_calc]
    session["user_list_of_foods_consumed"] = []
    meal_name = unsaved_meal_with_foods_consumed_and_meal_total["meal_name"]

    save_message = f"Saved meal:{meal_name}!"
    return json.dumps(save_message)

@app.route('/daily_meal_log', methods = ["POST", "GET"])
def get_user_daily_log():
    return json.dumps(session["update_meals"])

@app.route('/temp_refresh', methods = ["GET"])
def temp_refresh(): 
    try:
        if session["update_meals"] != "":
            return json.dumps(session["update_meals"])
    except:
        print("No daily log created yet")
        null_obj = None
        return json.dumps(null_obj)
    
@app.route('/temp_meal_delete_edit', methods = ["POST", "GET"])
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
    
if __name__ == '__main__':
    serve(app, host='0.0.0.0', port=8000)
    
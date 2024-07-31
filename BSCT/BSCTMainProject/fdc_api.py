import requests
import json

# todo/info
# fdc_api_key = "##" 
#
# *** set of useful links/endpoints
# fdc_api = f"https://api.nal.usda.gov/fdc/v1/foods/list?api_key={fdc_api_key}"
# fdc_search = f"https://api.nal.usda.gov/fdc/v1/foods/search?api_key={fdc_api_key}"
# fdcid_search = f"https://fdc.nal.usda.gov/portal-data/external/{id_search}" unused for testing
# https://app.swaggerhub.com/apis/fdcnal/food-data_central_api/1.0.1#/FDC/postFoodsSearch api documentation
# *** for convenience
#
# - set search parameters needs to be improved - allowing for more detailed requests
# - some of its args are placeholders for now
# - api keys for different food types: 
# ["Branded", "Foundation", "Survey (FNDDS)", "SR Legacy"]
# - build scroll/page func - allowing more results to be searched as neeeded


def set_search_parameters(user_search, page_number, page_size, food_data_type):
    # for general/meal_builder search
    # fe - reversed
    data_type_in_order = [               
        "Foundation",
        "Branded",
        "SR Legacy"
    ]
    
    search_parameters = {
        "query": user_search,
        "generalSearchInput": user_search,
        "dataType": [data_type_in_order[food_data_type]],
        "pageNumber": page_number,
        "pageSize": page_size,
    }

    return search_parameters 

def get_food_data(search_parameters):
    # stores the id, name, brand and descritpion information for searched foods
    search_parameters_json = json.dumps(search_parameters)

    fdc_api_key = "##"
    fdc_search = f"https://api.nal.usda.gov/fdc/v1/foods/search?api_key={fdc_api_key}"
    
    header = {'Content-Type': 'application/json'}

    response = requests.post(fdc_search, data=search_parameters_json, headers=header)
    food_data = response.json()

    return food_data

def list_food_info(food_data):
    # unused - for testing
    food_info = []
    food_id = food_data['foods']

    for food in food_id:
        food_key_description = None
        food_key_brand_owner = None
        food_key_brand_name = None

        try:
            food_key_id = food['fdcId']
        except KeyError:
            food_key_id = None

        try:
            food_key_description = food['description']
        except KeyError:
            food_key_description = None

        try:
            food_key_brand_owner = food['brandOwner']
        except KeyError:
            food_key_brand_owner = None

        try:
            food_key_brand_name = food['brandName']
        except KeyError:
            food_key_brand_name = None

        food_info.append((food_key_id, food_key_description, food_key_brand_owner, food_key_brand_name))

    return food_info 


def fdcid_search(fdc_id):
# unused - search food data using fdcid -> saves requests 

    fdcid_search = "https://fdc.nal.usda.gov/portal-data/external/"
    fdc_json_get = fdcid_search + fdc_id
    fdc_json_response = requests.get(fdc_json_get)

    food_nutrient_data = fdc_json_response.json()

    nutrient_list = [] 


    for nutrients in food_nutrient_data['foodNutrients']:
        
        try:
            if nutrients['nutrient']['name'] == "Total lipid (fat)":
                food_fat = nutrients['value']
                nutrient_list.append(food_fat)
        except:
            pass

    for nutrients in food_nutrient_data['foodNutrients']:

        try:
            if nutrients['nutrient']['name'] == "Carbohydrate, by difference":
                food_carbs = nutrients['value']
                nutrient_list.append(food_carbs)
        except:
            pass

    for nutrients in food_nutrient_data['foodNutrients']:

        try:
            if nutrients['nutrient']['name'] == "Protein":
                food_protein = nutrients['value']
                nutrient_list.append(food_protein)
        except:
            pass


    return nutrient_list

def fcdid_search_external(fdc_id):
# similiar to previous func -> simpler 
# also reduces requests to api - currently the main search method

    fdcid_search = "https://fdc.nal.usda.gov/portal-data/external/"
    fdc_json_post = fdcid_search + fdc_id
    fdc_json_response = requests.get(fdc_json_post)
    food_nutrient_data = fdc_json_response.json()
    food_nutrient_data['fdcidSearch'] = fdc_json_post

    return food_nutrient_data





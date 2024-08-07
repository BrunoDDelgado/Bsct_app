
class MealsServices:

    def __init__(self, client):
        # FIXME: This should come as an external dependency and not be instanciated here.
        self.repository = MealRepository()
        self.client = client

    def get_food_data(self, user_search, food_data_type):
        food = self.repository.getByName(user_search.meal_name)

        if not food:
            # FIXME: This is a client detail, the service should not know about this.
            search_params = self.client.set_search_parameters(user_search, 1, 50, food_data_type)
            # FIXME: This meal data should be modeled as a Meal list and not as fdc data structure
            food = self.client.get_food_data(search_params)

            self.repository.save(food)

        return food


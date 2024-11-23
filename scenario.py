from api_client import *
class Scenario:
    def __init__(self, id):
        self.id = id
        self.scenario = get_scenario_by_id(self.id)
        self.vehicles = self.scenario["vehicles"]
        self.customers = self.scenario["customers"]
        self.total_cars = len(self.vehicles)
        self.total_customers = len(self.customers)
        self.traveling_customers = set()

    def update(self):
        self.scenario = get_scenario_by_id(self.id)
        self.vehicles = self.scenario["vehicles"]
        self.customers = self.scenario["customers"]

    def get_all_vehicles(self):
        return self.vehicles

    def get_active_vehicles(self):
        return [vehicle for vehicle in self.vehicles if vehicle["isAvailable"]]

    def get_all_customers(self):
        return self.customers

    def get_number_remaining_services(self):
        return len([customer for customer in self.customers if customer["awaitingService"] and customer["id"] in self.traveling_customers])

    def get_active_customers(self):
        return [customer for customer in self.customers if customer["awaitingService"] and customer["id"] not in self.traveling_customers]



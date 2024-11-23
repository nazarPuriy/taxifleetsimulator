from scenario import Scenario
from api_client import *
import matplotlib.pyplot as plt
class Admin:

    def __init__(self, scenario_id):
        self.scenario = Scenario(scenario_id)

    def change_scenario(self, scenario_id):
        self.scenario = Scenario(scenario_id)
        # TODO restart all variables

    def plot(self):
        plt.ion()
        plt.clf()

        # Plot customers in red
        for customer in self.scenario.get_all_customers():
            plt.scatter(customer["coordX"], customer["coordY"], color='red', label='Customer', s=50)

        # Plot vehicles in blue
        for vehicle in self.scenario.get_all_vehicles():
            plt.scatter(vehicle["coordX"], vehicle["coordY"], color='blue', label='Vehicle', s=50)

        # Redraw the plot
        plt.draw()

    def assign_taxis(self, data=None):
        # TODO: Dummy, now receiving data from outside
        fo
        update_scenario(self.scenario.id, data)


if __name__ == "__main__":
    # Pick a random scenario TODO: not random.
    scenarios = get_all_scenarios()
    scenario = scenarios[0]
    id_scenario = scenario["id"]

    admin = Admin(id_scenario)
    customer = admin.scenario.get_all_customers()[2]
    vehicle = admin.scenario.get_all_vehicles()[2]

    d = {
        "vehicles": [
            {
                "id": vehicle["id"],
                "customerId": customer["id"]
            }
        ]
    }

    admin.plot()
    #admin.assign_taxis(d)
    plt.show()
    print(admin.scenario.get_all_vehicles()[2])

    while(True):
        admin.scenario.update()
        admin.plot()


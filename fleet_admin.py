from scenario import Scenario
from api_client import *
from distances import *
import matplotlib.pyplot as plt
import pandas as pd
import time

verbose = True
class Admin:

    def __init__(self, scenario_id):
        self.scenario = Scenario(scenario_id)

    def change_scenario(self, scenario_id):
        self.scenario = Scenario(scenario_id)
        # TODO restart all variables

    def greedy_assign_vehicles_to_customers(self, distances_vehicle_to_customers):
        matrix = distances_vehicle_to_customers.copy()
        vehicle_to_customer = []
        for v in range(matrix.shape[0]):
            min_index = np.argmin(matrix[v, :])
            matrix[:, min_index] = np.inf
            vehicle_to_customer.append((v, min_index))
        return vehicle_to_customer

    def assign_taxis(self, data=None):

        self.scenario.update() # Update scenario values
        # Get coordinated of active members, sleep times are set to have them corretly updated.
        vehicles = pd.DataFrame(self.scenario.get_active_vehicles())
        customers = pd.DataFrame(self.scenario.get_active_customers())

        if len(vehicles) > 0:

            # TODO: Change dummy implementation

            vehicle_coords = vehicles[['coordX', 'coordY']].to_numpy()
            customer_coords = customers[['coordX', 'coordY']].to_numpy()
            destination_coords = customers[['destinationX', 'destinationY']].to_numpy()

            # Distances for active members
            distances_vehicle_to_customers = calculate_distance_matrix(vehicle_coords, customer_coords)
            # distances_customers_to_dest = calculate_distance_vector(customer_coords, destination_coords)
            # distances_dest_to_customers = calculate_distance_matrix(destination_coords, customer_coords)

            assignations = self.greedy_assign_vehicles_to_customers(distances_vehicle_to_customers)

            v = []
            for assignation in assignations:
                item = (vehicles["id"][assignation[0]], customers["id"][assignation[1]])
                v.append({"id": str(item[0]),"customerId": str(item[1])})
                self.scenario.traveling_customers.add(item[1])
            d = {"vehicles": v}

            update_scenario(scenario_id=self.scenario.id, data=d)
            self.scenario.update()
            return len(v) > 0  # Indicates more waiting time to update taxi status

        return False


if __name__ == "__main__":
    scenarios = get_all_scenarios()

    for i in range(len(scenarios)):
        start_time = time.time()
        scenario = scenarios[i]
        scenario_id = scenario["id"]

        # Start simulation of the scenario
        initialize_scenario(scenario)
        launch_scenario(scenario_id)

        admin = Admin(scenario_id)

        if verbose: print(f"Simulating scenario {scenario_id}. Number of vehicles {admin.scenario.total_cars} and number of customers {len(admin.scenario.get_all_customers())}")

        # Check if there are still customers to be served.
        remaining_customers = len(admin.scenario.get_active_customers())

        while remaining_customers > 0:
            if verbose: print(f"\rStill {remaining_customers}/{admin.scenario.total_customers} to serve", end="", flush=True)
            if admin.assign_taxis(): time.sleep(4)  # Have to wait so the taxis set up correctly
            time.sleep(1) # TODO change to wait the necessary time calculated from the remainingtraveltime.
            remaining_customers = len(admin.scenario.get_active_customers())

        # Wait cars to return before finish
        if verbose: print("\nWaiting vehicles to finish routes")
        remaining_services = admin.scenario.get_number_remaining_services()

        while remaining_services > 0:
            if verbose: print(f"\rRemaining {remaining_services} services to finish", end="", flush=True)
            admin.scenario.update()  # Important to reload the information
            time.sleep(1)
            remaining_services = admin.scenario.get_number_remaining_services()

        if verbose: print("\nExecution finished in", str(time.time()-start_time),"seconds")







import numpy as np
from api_client import *
from load_data import load_data
from distances import calculate_distance_vector, calculate_distance_matrix

def assign_vehicles_to_customers(distances_vehicle_to_customers, verbose=False):
    return greedy_assign_vehicles_to_customers(distances_vehicle_to_customers, verbose)

def greedy_assign_vehicles_to_customers(distances_vehicle_to_customers,verbose):
    matrix = distances_vehicle_to_customers.copy()
    vehicle_to_customer = []
    for v in range(matrix.shape[0]):
        min_index = np.argmin(matrix[v, :])
        min = matrix[v, min_index]
        if verbose:
            print(f"row {v}")
            print(matrix[v, :])
            print(min_index)
            print(min)
        matrix [:, min_index] = np.inf
        vehicle_to_customer.append((v, min_index))
    return vehicle_to_customer

def send_vehicles_to_customers(vehicle_to_customer, scenario_id):
    vehicles_indexes = [v for v, c in  vehicle_to_customer]
    customer_indexes = [c for c, v in vehicle_to_customer]
    vehicle_ids = vehicles["id"][vehicles_indexes]
    customer_ids = customers["id"][customer_indexes]
    
    payload = {
        "vehicles": []
    }
    for i in range(len(vehicle_ids)):
        payload["vehicles"].append({"id": vehicle_ids[i], "customerId": customer_ids[i]})
    update_scenario(scenario_id=scenario_id, data=payload)

if __name__ == "__main__":
    scenario = get_all_scenarios()[0]
    initialize_scenario(scenario)
    launch_scenario(scenario["id"])
    vehicles, customers = load_data(scenario)
    
    vehicle_coords = vehicles[['coordX', 'coordY']].to_numpy()
    customer_coords = customers[['coordX', 'coordY']].to_numpy()
    destination_coords = customers[['destinationX', 'destinationY']].to_numpy()
    
    distances_vehicle_to_customers = calculate_distance_matrix(vehicle_coords, customer_coords)
    distances_customers_to_dest = calculate_distance_vector(customer_coords, destination_coords)
    distances_dest_to_customers = calculate_distance_matrix(destination_coords,  customer_coords)
    
    send_vehicles_to_customers(assign_vehicles_to_customers(distances_vehicle_to_customers), scenario["id"])
    
    
    

    
    
        
    
    
    
    
    
    
    



    
    
    
import numpy as np
from api_client import *
from load_data import load_data
from distances import calculate_distance_vector, calculate_distance_matrix
from ortools.linear_solver import pywraplp

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

def assign_taxis_to_clients(cost_matrix):
    """
    Solve the taxi-client assignment problem using Google's OR-Tools.

    Parameters:
        cost_matrix (list of list of int/float): 
            A 2D matrix where cost_matrix[i][j] is the cost of assigning taxi i to client j.

    Returns:
        dict: A dictionary where keys are taxi indices and values are client indices.
    """
    num_taxis = len(cost_matrix)
    num_clients = len(cost_matrix[0])
    print(len(cost_matrix))
    print(len(cost_matrix[0]))

    # Create the solver
    solver = pywraplp.Solver.CreateSolver('SCIP')

    # Create variables
    x = {}
    for i in range(num_taxis):
        for j in range(num_clients):
            x[i, j] = solver.BoolVar(f'x[{i},{j}]')

    # Each taxi is assigned to exactly one client
    for i in range(num_taxis):
        solver.Add(solver.Sum(x[i, j] for j in range(num_clients)) <= 1)

    # Each client is assigned to at most one taxi
    for j in range(num_clients):
        solver.Add(solver.Sum(x[i, j] for i in range(num_taxis)) <= 1)

    # Objective function: minimize the total cost
    solver.Minimize(
        solver.Sum(cost_matrix[i][j] * x[i, j] for i in range(num_taxis) for j in range(num_clients))
    )

    # Solve the problem
    status = solver.Solve()
    print("Solver status:", status)
    if status != pywraplp.Solver.OPTIMAL:
        print("Solver could not find an optimal solution.")
        print("Solver status explanation:")
        print("1: Feasible but not optimal, 2: Infeasible, 3: Unbounded")

    if status == pywraplp.Solver.OPTIMAL:
        result = {}
        for i in range(num_taxis):
            for j in range(num_clients):
                if x[i, j].solution_value() > 0.5:  # Check if the variable is selected
                    result[i] = j
        return result
    else:
        raise Exception("No optimal solution found!")

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
    
    
    

    
    
        
    
    
    
    
    
    
    



    
    
    
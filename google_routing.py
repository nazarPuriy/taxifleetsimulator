import numpy as np
from load_data import load_data
from api_client import *
from ortools.constraint_solver import routing_enums_pb2
from ortools.constraint_solver import pywrapcp


def compute_distance_matrix(coordinates):
    """
    Calcula la matriz de distancias usando distancia euclidiana.

    Parameters:
        coordinates (list of tuple): Lista de coordenadas (x, y).

    Returns:
        list of list: Matriz de distancias.
    """
    num_points = len(coordinates)
    distance_matrix = np.zeros((num_points, num_points))
    
    for i in range(1, num_points):
        for j in range(i):
            dist = np.linalg.norm(np.array(coordinates[i]) - np.array(coordinates[j]))
            distance_matrix[i][j] = dist
            distance_matrix[j][i] = dist
    return distance_matrix

def compute_route(scenario):
    vehicles, customers = load_data(scenario)
    
    vehicle_coords = vehicles[['coordX', 'coordY']].to_numpy()
    customer_coords = customers[['coordX', 'coordY']].to_numpy()
    destination_coords = customers[['destinationX', 'destinationY']].to_numpy()
    
    coordinates = np.concatenate((vehicle_coords, customer_coords, destination_coords), axis=0)
    print(coordinates.shape)
    vehicle_indexes = (0, len(vehicle_coords) - 1)
    customer_indexes = (vehicle_indexes[1] + 1, vehicle_indexes[1] + len(customer_coords) - 1)
    destination_indexes = (customer_indexes[1] + 1, len(coordinates)-1)
    
    """ tener en cuenta que nunca vamos a querer ir de un taxi a otro taxi, de un cust a otro cust o de un dest a otro dest
    solo querremos ir de taxi a cust, de cust a dest y de dest a cust
    """
    
    data = {}
    data["distance_matrix"] = compute_distance_matrix(coordinates)
    data["pickups_deliveries"] = [[i, i + len(customer_coords)] for i in range(customer_indexes[0], customer_indexes[1])]
    data["num_vehicles"] = len(vehicles)
    data["starts"] = [i for i in range(vehicle_indexes[0], vehicle_indexes[1] + 1)]
    data["ends"] = [] # segun chat gpt no hay que ponerlo
    print(type(data["starts"]))
    print(data["starts"])
    print(data["num_vehicles"])
    print(len(data["distance_matrix"]),
        data["num_vehicles"],
        data["starts"],)
    
    
    manager = pywrapcp.RoutingIndexManager(
        len(data["distance_matrix"]),
        data["num_vehicles"],
        data["starts"],
        data["starts"],
    )
    
    routing = pywrapcp.RoutingModel(manager)
    
    # Define cost of each arc.
    def distance_callback(from_index, to_index):
        """Returns the distance between the two nodes."""
        from_node = manager.IndexToNode(from_index)
        to_node = manager.IndexToNode(to_index)
        return data["distance_matrix"][from_node][to_node]
    transit_callback_index = routing.RegisterTransitCallback(distance_callback)
    routing.SetArcCostEvaluatorOfAllVehicles(transit_callback_index)
    
    dimension_name = "Distance"
    distance_dimension = routing.GetDimensionOrDie(dimension_name)
    distance_dimension.SetGlobalSpanCostCoefficient(100)
    
    
    # Define Transportation Requests.
    for request in data["pickups_deliveries"]:
        pickup_index = manager.NodeToIndex(request[0])
        delivery_index = manager.NodeToIndex(request[1])
        routing.AddPickupAndDelivery(pickup_index, delivery_index)
        routing.solver().Add(
            routing.VehicleVar(pickup_index) == routing.VehicleVar(delivery_index)
        )
        routing.solver().Add(
            distance_dimension.CumulVar(pickup_index)
            <= distance_dimension.CumulVar(delivery_index)
        )
    
    # Setting first solution heuristic.
    search_parameters = pywrapcp.DefaultRoutingSearchParameters()
    search_parameters.first_solution_strategy = (
        routing_enums_pb2.FirstSolutionStrategy.PARALLEL_CHEAPEST_INSERTION
    )
    
    # Solve the problem.
    solution = routing.SolveWithParameters(search_parameters)
    
    # Print solution on console.
    if solution:
        print_solution(data, manager, routing, solution)
        
def print_solution(data, manager, routing, solution):
    """Prints solution on console."""
    print(f"Objective: {solution.ObjectiveValue()}")
    total_distance = 0
    for vehicle_id in range(data["num_vehicles"]):
        index = routing.Start(vehicle_id)
        plan_output = f"Route for vehicle {vehicle_id}:\n"
        route_distance = 0
        while not routing.IsEnd(index):
            plan_output += f" {manager.IndexToNode(index)} -> "
            previous_index = index
            index = solution.Value(routing.NextVar(index))
            route_distance += routing.GetArcCostForVehicle(
                previous_index, index, vehicle_id
            )
        plan_output += f"{manager.IndexToNode(index)}\n"
        plan_output += f"Distance of the route: {route_distance}m\n"
        print(plan_output)
        total_distance += route_distance
    print(f"Total Distance of all routes: {total_distance}m")
    
    
    
    
    
    
    
    
    
    
if __name__ == "__main__":
    scenario = get_all_scenarios()[0]
    #initialize_scenario(scenario)
    #launch_scenario(scenario["id"])
    #vehicles, customers = load_data(scenario)
    compute_route(scenario)
    
import requests

# Base URL for the services
BASE_URL = "http://localhost:8080"  # Assuming the scenario runner API is on port 8080

# Customers API Functions
def get_customers_by_scenario(scenario_id):
    """Fetch customers for a specific scenario."""
    url = f"{BASE_URL}/scenarios/{scenario_id}/customers"
    try:
        response = requests.get(url)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Error fetching customers for scenario {scenario_id}: {e}")
        return None


def get_customer(customer_id):
    """Fetch a specific customer by ID."""
    url = f"{BASE_URL}/customers/{customer_id}"
    try:
        response = requests.get(url)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Error fetching customer {customer_id}: {e}")
        return None


# Scenarios API Functions
def get_scenario_metadata(scenario_id):
    """Fetch metadata for a specific scenario."""
    url = f"{BASE_URL}/scenario/{scenario_id}/metadata"
    try:
        response = requests.get(url)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Error fetching metadata for scenario {scenario_id}: {e}")
        return None


def create_scenario(data):
    """Create a new scenario (POST request)."""
    url = f"{BASE_URL}/scenario/create"
    try:
        response = requests.post(url, json=data)
        response.raise_for_status()
        return response.json()  # Assuming it returns the created scenario data
    except requests.exceptions.RequestException as e:
        print(f"Error creating scenario: {e}")
        return None


def get_all_scenarios():
    """Fetch all scenarios."""
    url = f"{BASE_URL}/scenarios"
    try:
        response = requests.get(url)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Error fetching all scenarios: {e}")
        return None


def delete_scenario(scenario_id):
    """Delete a specific scenario."""
    url = f"{BASE_URL}/scenarios/{scenario_id}"
    try:
        response = requests.delete(url)
        response.raise_for_status()
        return response.json()  # Assuming the API confirms the deletion
    except requests.exceptions.RequestException as e:
        print(f"Error deleting scenario {scenario_id}: {e}")
        return None


def get_scenario(scenario_id):
    """Fetch a specific scenario by ID."""
    url = f"{BASE_URL}/scenarios/{scenario_id}"
    try:
        response = requests.get(url)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Error fetching scenario {scenario_id}: {e}")
        return None


# Vehicles API Functions
def get_vehicles_by_scenario(scenario_id):
    """Fetch vehicles for a specific scenario."""
    url = f"{BASE_URL}/scenarios/{scenario_id}/vehicles"
    try:
        response = requests.get(url)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Error fetching vehicles for scenario {scenario_id}: {e}")
        return None


def get_vehicle(vehicle_id):
    """Fetch a specific vehicle by ID."""
    url = f"{BASE_URL}/vehicles/{vehicle_id}"
    try:
        response = requests.get(url)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Error fetching vehicle {vehicle_id}: {e}")
        return None

############################## RUNNER

BASE_URL_RUNNER = "http://localhost:8090"  # Assuming the scenario runner API is on port 8090

def get_scenario_by_id(scenario_id):
    """Fetch a specific scenario by ID."""
    url = f"{BASE_URL_RUNNER}/Scenarios/get_scenario/{scenario_id}"
    try:
        response = requests.get(url)
        response.raise_for_status()  # Raise exception for 4xx/5xx responses
        return response.json()  # Convert the response to JSON
    except requests.exceptions.RequestException as e:
        print(f"Error fetching scenario {scenario_id}: {e}")
        return None

def initialize_scenario(data):
    """Initialize a scenario (POST request)."""
    url = f"{BASE_URL_RUNNER}/Scenarios/initialize_scenario"
    try:
        response = requests.post(url, json=data)
        response.raise_for_status()
        return response.json()  # Assuming it returns the initialized scenario data
    except requests.exceptions.RequestException as e:
        print(f"Error initializing scenario: {e}")
        return None

def update_scenario(scenario_id, data):
    """Update a specific scenario (PUT request)."""
    url = f"{BASE_URL_RUNNER}/Scenarios/update_scenario/{scenario_id}"
    try:
        response = requests.put(url, json=data)
        response.raise_for_status()
        return response.json()  # Assuming it returns the updated scenario data
    except requests.exceptions.RequestException as e:
        print(f"Error updating scenario {scenario_id}: {e}")
        return None

def launch_scenario(scenario_id):
    """Launch a scenario (POST request)."""
    url = f"{BASE_URL_RUNNER}/Runner/launch_scenario/{scenario_id}"
    try:
        response = requests.post(url)
        response.raise_for_status()
        return response.json()  # Assuming it returns the launched scenario data or status
    except requests.exceptions.RequestException as e:
        print(f"Error launching scenario {scenario_id}: {e}")
        return None

if __name__ == "__main__":
    scenarios = get_all_scenarios()
    scenario0 = scenarios[0]
    id = scenario0["id"]
    # print(initialize_scenario(scenario0))
    print(launch_scenario(id))
    print(get_scenario_by_id(id))

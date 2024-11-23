import pandas as pd
def load_data(data):
    vehicles = pd.DataFrame(data["vehicles"])
    customers = pd.DataFrame(data["customers"])
    return (vehicles, customers)
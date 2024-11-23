import numpy as np
import pandas as pd
import numpy as np

def calculate_distance_vector(points_1, points_2):
    """
    Calculate the distance vector from a reference point to a list of points.

    Parameters:
        points (np.ndarray): A 2D array of shape (n_points, n_dimensions) containing the coordinates of the points.
        reference_point (np.ndarray): A 1D array of shape (n_dimensions,) representing the coordinates of the reference point.

    Returns:
        np.ndarray: A 1D array of shape (n_points,) containing the distances from the reference point to each point.
    """
    return np.sqrt(np.sum((points_1 - points_2) ** 2, axis=1))

def calculate_distance_matrix(points_1, points_2):
    """
    Calculate the distance matrix between two sets of points.

    Parameters:
        points_1 (np.ndarray): A 2D array of shape (n_points_1, n_dimensions) containing the coordinates of the first set of points.
        points_2 (np.ndarray): A 2D array of shape (n_points_2, n_dimensions) containing the coordinates of the second set of points.

    Returns:
        np.ndarray: A 2D array of shape (n_points_1, n_points_2) containing the pairwise distances between points_1 and points_2.
    """
    return np.sqrt(np.sum((points_1[:, np.newaxis, :] - points_2) ** 2, axis=2))

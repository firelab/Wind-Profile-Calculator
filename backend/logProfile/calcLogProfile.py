import numpy as np  # Ensure you have numpy imported

kappa = 0.41


def calc_ustar(kappa, u_ref, z_ref, z0):
    """
    Calculate friction velocity (u*) based on the logarithmic wind profile.
    
    Parameters:
    - kappa: von Karman constant
    - u_ref: wind speed at reference height (m/s)
    - z_ref: reference height (m)
    - z0: roughness length (m)
    
    Returns:
    - ustar: friction velocity (m/s)
    """
    ustar = kappa * u_ref / np.log(z_ref / z0)
    return ustar


def calc_u(z, ustar, kappa, z0):
    """
    Calculate wind speed (u) at height z based on the friction velocity and roughness length z0.
    
    Parameters:
    - z: height at which wind speed is calculated (m)
    - ustar: friction velocity (m/s)
    - kappa: von Karman constant
    - z0: roughness length (m)
    
    Returns:
    - Wind speed at height z (m/s) or NaN if z < z0
    """
    if z >= z0:
        u = ustar / kappa * np.log(z / z0)
    else:
        u = float("nan")  # NaN for heights lower than z0
    return u


def compute_log_profile(z0_val, original_u_ref, original_z_ref, desired_z_ref):
    """
    Compute the wind speed at a range of heights from z0 to desired_z_ref using the logarithmic wind profile.
    
    Parameters:
    - z0_val: roughness length (m)
    - original_u_ref: wind speed at the reference height (m/s)
    - original_z_ref: reference height (m)
    - desired_z_ref: desired height for wind speed calculation (m)
    
    Returns:
    - heights: List of heights for which wind speeds are calculated (excluding NaNs)
    - wind_speeds: List of wind speeds corresponding to each height (excluding NaNs)
    - expected_u_ref: Wind speed at the desired output height
    """
    # Calculate friction velocity u*
    current_ustar = calc_ustar(kappa, original_u_ref, original_z_ref, z0_val)

    # Define heights for which we want to compute wind speed
    heights = np.linspace(0.0, 20.0, 101)

    # Calculate wind speed for each height and filter out NaN values
    wind_speeds = [calc_u(z, current_ustar, kappa, z0_val) for z in heights]
    
    # Create filtered lists to exclude NaN values
    filtered_heights = []
    filtered_wind_speeds = []

    for z, u in zip(heights, wind_speeds):
        if not np.isnan(u):  # Check if wind speed is not NaN
            filtered_heights.append(z)
            filtered_wind_speeds.append(u)

    # Calculate wind speed at the desired output height
    expected_u_ref = calc_u(desired_z_ref, current_ustar, kappa, z0_val)

    return filtered_heights, filtered_wind_speeds, expected_u_ref
import numpy as np  # Ensure you have numpy imported

kappa = 0.41

def calc_ustar(kappa, u_ref, z_ref, z0):

    ustar = kappa * u_ref / np.log(z_ref / z0)
    return ustar


def calc_u(z, ustar, kappa, z0):

    if z >= z0:
        u = ustar / kappa * np.log(z / z0)
    else:
        u = float("nan") 
    return u


def compute_log_profile(z0_val, original_u_ref, original_z_ref, desired_z_ref):

    current_ustar = calc_ustar(kappa, original_u_ref, original_z_ref, z0_val)

    heights = np.linspace(0.0, 20.0, 101)

    wind_speeds = [calc_u(z, current_ustar, kappa, z0_val) for z in heights]
    
    filtered_heights = []
    filtered_wind_speeds = []

    for z, u in zip(heights, wind_speeds):
        if not np.isnan(u): 
            filtered_heights.append(z)
            filtered_wind_speeds.append(u)

    expected_u_ref = calc_u(desired_z_ref, current_ustar, kappa, z0_val)

    return filtered_heights, filtered_wind_speeds, expected_u_ref
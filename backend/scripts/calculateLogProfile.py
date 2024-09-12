from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np

app = Flask(__name__)
CORS(app)  

ft_to_meters = 0.3048
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

@app.route('/calculate_wind_profile', methods=['POST'])
def calculate_log_profile():
    data = request.get_json()

    # Extract the input values from the request
    z0_val = float(data.get('z0'))
    original__u_ref = float(data.get('input_wind_speed'))
    original__z_ref = float(data.get('input_reference_height'))
    desired__z_ref = float(data.get('desired_output_height'))

    # Calculate the values
    current_ustar = calc_ustar(kappa, original__u_ref, original__z_ref, z0_val)
    expected__u_ref = calc_u(desired__z_ref, current_ustar, kappa, z0_val)

    # Calculate the full profile values
    current_zVals = np.linspace(0.0, 20.0, 101)
    current_vals = np.zeros(len(current_zVals))
    for zIdx in range(len(current_zVals)):
        current_z = current_zVals[zIdx]
        current_u = calc_u(current_z, current_ustar, kappa, z0_val)
        current_vals[zIdx] = current_u

    # Remove NaN values
    valid_indices = ~np.isnan(current_vals)
    filtered_zVals = current_zVals[valid_indices].tolist()
    filtered_vals = current_vals[valid_indices].tolist()

    response_data = {
        "z0": z0_val,
        "input_wind_speed": original__u_ref,
        "input_reference_height": original__z_ref,
        "desired_output_height": desired__z_ref,
        "output_wind_speed": expected__u_ref,
        "full_profile": {
            "heights": filtered_zVals,
            "wind_speeds": filtered_vals
        }
    }
    
    # Print the response to Flask logs
    print('Response data: %s', response_data)
    
    return jsonify(response_data)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
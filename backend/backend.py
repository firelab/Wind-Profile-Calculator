## Gotta set up flask and communication with front end

## First, create a switch statement that will run each distribution calculator

## test and make sure that is working before moving on

## get the log profile calculator to work again 

## once that is working, refactor the graph to be more general and do the same with the other distributions

## should maybe graph the uniform distribution in python to double check everything too 

import sys
import os

# Add the directory containing _canopyFlowSwig.so to the Python path
sys.path.append(os.path.dirname(os.path.abspath("canopyFlowSwig/_canopyFlowSwig.so")))
sys.path.append(os.path.dirname(os.path.abspath("logProfile/calcLogProfile.py")))
# Import the module
import canopyFlowSwig
import calcLogProfile
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  

@app.route('/calculate_wind_profile', methods=['POST'])
def calculate():
    
    # Get the distribution type from the POST request (instead of input, as we're in a Flask app)
    data = request.get_json()
    dist = data.get('distribution')

    if dist == 'log':
        # Compute the log profile using calcLogProfile module
        heights, wind, z = calcLogProfile.compute_log_profile(0.43, 4, 10, 6.096)
        
        # Prepare the data to return as a JSON response
        response_data = {
            "heights": heights,
            "wind_speeds": wind,
            "z": z
        }
        
        # Return the response as JSON
        return jsonify(response_data), 200
    elif dist == 'unfi':
        # Handle 'unfi' distribution logic here
        pass
    elif dist == 'asy':
        # Handle 'asy' distribution logic here
        pass
    elif dist == 'norm':
        wind_speed = canopyFlowSwig.DoubleVector()
        z = canopyFlowSwig.DoubleVector()
        input_speed = 10.0
        input_height = 3.0 + 6.096
        z0g = 0.0075
        num_nodes = 10001

        height_max_foliage_dist = 0.5
        std_dev_foliage_dist = 0.3
        leaf_area_index = 1.0
        canopy_height = 3.0
        drag_coef_ath = 0.2
        canopyFlowSwig.normalDistribution(height_max_foliage_dist, std_dev_foliage_dist, leaf_area_index, canopy_height, drag_coef_ath, z0g, num_nodes, input_speed, input_height, wind_speed, z)

        pass
    elif dist == 'tri':
        # Handle 'tri' distribution logic here
        pass
    elif dist == 'mass':
        # Handle 'mass' distribution logic here
        pass
    else:
        print(f"Unknown distribution: {dist}")

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
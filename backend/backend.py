import sys
import os
from flask import Flask, request, jsonify
from flask_cors import CORS

# Add the directory containing _canopyFlowSwig.so to the Python path
sys.path.append(os.path.dirname(os.path.abspath("canopyFlowSwig/_canopyFlowSwig.so")))
sys.path.append(os.path.dirname(os.path.abspath("logProfile/calcLogProfile.py")))

# Import the module
import canopyFlowSwig
import calcLogProfile

app = Flask(__name__)
CORS(app)  

@app.route('/calculate_wind_profile', methods=['POST'])
def calculate():
    data = request.json  # Get the JSON data from the request
    dist = data.get('distribution')  # Extract the distribution type

    heights = canopyFlowSwig.DoubleVector()
    windSpeeds = canopyFlowSwig.DoubleVector()

    # Process based on distribution type
    if dist == 'log':
        # Handle 'log' distribution logic here
        print("Processing Log distribution")

        # compute_log_profile(z0_val, original_u_ref, original_z_ref, desired_z_ref)
        heights, windSpeeds, expectedOutput = calcLogProfile.compute_log_profile(float(data.get('z0')), float(data.get('inputWindSpeed')), float(data.get('inputReferenceHeight')), float(data.get('desiredOutputHeight')))

        responseData = {
            "heights": list(heights),
            "windSpeeds": list(windSpeeds)
        }
    
    elif dist == 'uni':
        # Handle 'unfi' distribution logic here
        print("Processing Uniform distribution")

        canopyFlowSwig.uniformDistribution(
            float(data.get('crownRatio')),
            float(data.get('leafAreaIndex')),
            float(data.get('canopyHeight')),
            float(data.get('dragCoefAth')),
            float(data.get('z0g')),
            float(data.get('numNodes')),
            float(data.get('inputSpeed')),
            float(data.get('inputHeight')),  # Note this change
            windSpeeds,                       # Separate argument
            heights                            # Separate argument
        )

    elif dist == 'asy':
        # Handle 'asy' distribution logic here
        print("Processing Asymmetric distribution")        

        canopyFlowSwig.asymmetricGaussianDistribution(
            float(data.get('heightMaxFoliageDist')),
            float(data.get('standardDevFoliageUpper')),
            float(data.get('standardDevFoliageLower')),
            float(data.get('leafAreaIndex')),
            float(data.get('canopyHeight')),
            float(data.get('dragCoefAth')),
            float(data.get('z0g')),
            float(data.get('numNodes')),
            float(data.get('inputSpeed')),
            float(data.get('inputHeight')),  # Note this change
            windSpeeds,                       # Separate argument
            heights                            # Separate argument
        )

        
    elif dist == 'norm':
        # Handle 'norm' distribution logic here
        print("Processing Normal distribution")
        canopyFlowSwig.normalDistribution(
            float(data.get('heightMaxFoliageDist')),
            float(data.get('standardDevFoliageDist')),
            float(data.get('leafAreaIndex')),
            float(data.get('canopyHeight')),
            float(data.get('dragCoefAth')),
            float(data.get('z0g')),
            float(data.get('numNodes')),
            float(data.get('inputSpeed')),
            float(data.get('inputHeight')),  # Note this change
            windSpeeds,                       # Separate argument
            heights                            # Separate argument
        )

    elif dist == 'tri':
        # Handle 'tri' distribution logic here
        print("Processing Triangle distribution")
        canopyFlowSwig.triangleDistribution(
            float(data.get('A1')),
            float(data.get('Ax')),
            float(data.get('Ab')),
            float(data.get('zmax')),
            float(data.get('zbot')),
            float(data.get('leafAreaIndex')),
            float(data.get('canopyHeight')),
            float(data.get('dragCoefAth')),
            float(data.get('z0g')),
            float(data.get('numNodes')),
            float(data.get('inputSpeed')),
            float(data.get('inputHeight')),  # Note this change
            windSpeeds,                       # Separate argument
            heights                            # Separate argument
        )
        
    elif dist == 'mass':
        # Handle 'mass' distribution logic here
        print("Processing Massman distribution")
        canopyFlowSwig.massmanDistribution(
            float(data.get('A1')),
            float(data.get('A2')),
            float(data.get('A3')),
            float(data.get('zmax')),
            float(data.get('leafAreaIndex')),
            float(data.get('canopyHeight')),
            float(data.get('dragCoefAth')),
            float(data.get('z0g')),
            float(data.get('numNodes')),
            float(data.get('inputSpeed')),
            float(data.get('inputHeight')),  # Note this change
            windSpeeds,                       # Separate argument
            heights                            # Separate argument
        )    

    else:
        print(f"Unknown distribution: {dist}")

    responseData = {
        "heights": list(heights),
        "windSpeeds": list(windSpeeds)
    }

    return jsonify(responseData) 

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
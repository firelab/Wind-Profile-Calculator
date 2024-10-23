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
    
    # Process based on distribution type
    if dist == 'log':
        # Handle 'log' distribution logic here
        print("Processing Log distribution")
        print(f"Log distribution data: {data}")
    elif dist == 'unfi':
        # Handle 'unfi' distribution logic here
        print("Processing Uniform distribution")
        print(f"Uniform distribution data: {data}")
    elif dist == 'asy':
        # Handle 'asy' distribution logic here
        print("Processing Asymmetric distribution")
        print(f"Asymmetric distribution data: {data}")
    elif dist == 'norm':
        # Handle 'norm' distribution logic here
        print("Processing Normal distribution")
        print(f"Normal distribution data: {data}")
    elif dist == 'tri':
        # Handle 'tri' distribution logic here
        print("Processing Triangle distribution")
        print(f"Triangle distribution data: {data}")
    elif dist == 'mass':
        # Handle 'mass' distribution logic here
        print("Processing Massman distribution")
        print(f"Massman distribution data: {data}")
    else:
        print(f"Unknown distribution: {dist}")

    return jsonify({"message": "Data received", "data": data})  # Return a response

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
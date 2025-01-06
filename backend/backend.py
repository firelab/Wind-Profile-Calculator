import sys
import os
from flask import Flask, request, jsonify
from flask_cors import CORS

sys.path.append(os.path.dirname(os.path.abspath("canopyFlowSwig/_canopyFlowSwig.so")))
sys.path.append(os.path.dirname(os.path.abspath("logProfile/calcLogProfile.py")))

import canopyFlowSwig
import calcLogProfile

app = Flask(__name__)
CORS(app)  

@app.route('/windprofilecalculator/api/calculate', methods=['POST'])
def calculate():
    
    data = request.json  
    dist = data.get('distribution')  

    inputHeightIndex = None
    desiredOutputHeightIndex = None

    heights = canopyFlowSwig.DoubleVector()
    windSpeeds = canopyFlowSwig.DoubleVector()

    if dist == 'log':
        print("Processing Log distribution")

        # compute_log_profile(z0_val, original_u_ref, original_z_ref, desired_z_ref)
        heights, windSpeeds, desiredOutputHeight = calcLogProfile.compute_log_profile(float(data.get('z0')), float(data.get('inputWindSpeed')), float(data.get('inputReferenceHeight')), float(data.get('desiredOutputHeight')))

        responseData = {
            "heights": list(heights),
            "windSpeeds": list(windSpeeds)
        }
    
    elif dist == 'uni':
        print("Processing Uniform distribution")

        canopyFlowSwig.uniformDistribution(
            float(data.get('crownRatio')),
            float(data.get('leafAreaIndex')),
            float(data.get('canopyHeight')),
            float(data.get('dragCoefAth')),
            float(data.get('z0g')),
            float(data.get('numNodes')),
            float(data.get('inputSpeed')),
            float(data.get('inputHeight')),  
            windSpeeds,                       
            heights                            
        )

    elif dist == 'asy':
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
            float(data.get('inputHeight')),  
            windSpeeds,                       
            heights                            
        )

        
    elif dist == 'norm':
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
            float(data.get('inputHeight')), 
            windSpeeds,                       
            heights                            
        )

    elif dist == 'tri':
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
            float(data.get('inputHeight')),  
            windSpeeds,                      
            heights                            
        )
        
    elif dist == 'mass':
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
            float(data.get('inputHeight')),  
            windSpeeds,                       
            heights                            
        )    

    else:
        print(f"Error")

    responseData = {
        "heights": list(heights),
        "windSpeeds": list(windSpeeds),
        "inputHeightIndex": inputHeightIndex,
        "desiredOutputHeightIndex": desiredOutputHeightIndex,
    }

    return jsonify(responseData) 

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5002)
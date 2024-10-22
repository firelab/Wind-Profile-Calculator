import sys
import os

# Add the directory containing _canopyFlowSwig.so to the Python path
sys.path.append(os.path.dirname(os.path.abspath("canopyFlowSwig/_canopyFlowSwig.so")))

# Import the module
import canopyFlowSwig

# Function to print limited results (first 5 values)
def print_results(wind_speed, z):
    wind_speed_list = [wind_speed[i] for i in range(wind_speed.size())]
    z_list = [z[i] for i in range(z.size())]
    
    # Print only first 5 values
    print("Wind Speed (first 5):", wind_speed_list)
    print("Z Values (first 5):", z_list)

# Initialize vectors using SWIG-defined vectors
wind_speed = canopyFlowSwig.DoubleVector()
z = canopyFlowSwig.DoubleVector()

# Shared input parameters
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
print_results(wind_speed, z)


# g++ -shared -fPIC -I/usr/include/python3.8 -o _canopyFlowSwig.so canopyFlowSwig_wrap.cxx canopyFlowSwig.cpp ../src/canopy_uniform_distribution.cpp ../src/canopy_asymmetric_gaussian_distribution.cpp ../src/canopy_normal_distribution.cpp ../src/canopy_triangle_distribution.cpp ../src/massman_distribution.cpp ../src/canopy.cpp ../src/measured_distribution.cpp -lpython3.8
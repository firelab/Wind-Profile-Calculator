# Wind Profile Calculator

The Firelab has developed a model that can calculatate the wind profile based on different canopy distributions. This web application allows users to interact with the model and displays a visual representation of the wind profile and canopy. It can be found [here](https://ninjastorm.firelab.org).

## Table of Contents

1. [Technologies Used](#technologies-used)
2. [Frontend Overview](#frontend-overview)
3. [Backend Overview](#backend-overview)
4. [Deployment](#deployment)

## Technologies Used

1. **Frontend**
   - Dependencies: Reactjs, Nodejs, typescript, html, css, MaterialUI
   - Reasoning: React and MaterialUI were chosen as they are responsive and used within other Fire Lab projects
2. **Backend**
   - Dependecies: Python, Flask, C++ Swig Bindings
   - Reasoing: Code for calculations was either already written in python, or could be used through C++ SWIG Bindings. 

---

## Frontend Overview

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install the necessary dependencies:
   ```bash
   npm install
   ```
4. Host the frontend locally:
   ```bash
   npm start
   ```
   - The application should be accessible at [http://localhost:3000](http://localhost:3000). Note: Component's handleSubmit functions request destinations may need changed. 

---

## Backend Overview

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Set up a virtual environment for Python dependencies:
   ```bash
   python3 -m venv venv
   source venv/bin/activate 
   ```
4. Run the backend server locally:
   ```bash
   python3 backend.py
   ```
---

### Computation Code

The calculations for the wind profiles is handled by these files:
- **Canopy Flow**: Handles wind profile calculations with canopies, located at (Canopy Flow)[https://github.com/firelab/canopy-flow] repo. 
- **Log Profile Calculator**:  Handled wind profile calculations without canopies, located at 

---

## Deployment

This is handled automatically through Github Actions using the build_and_deploy.yml script. Deployment information can be found at [NinjaStorm](https://github.com/firelab/NinjaStorm). 




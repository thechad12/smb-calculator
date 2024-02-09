# SMB Calculations

The purpose of this project is to run comparisons, risk analysis, and financing options for small to medium sized businesses anyone is considering purchasing. 

## Backend
The backend supports a local postgres database supported through docker. This will persist data added on businesses, business metrics, deal analysis against desires, and risk tolerance. The backend runs multiple containers through docker compose to support the main application, the database, and a jobs container to handle background jobs in the future.

## Frontend
The frontend is run as a React application on a node server through docker compose. This is where users can interact by creating new businesses, business metrics, risk analysis, and deal analysis against desires.
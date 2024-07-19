# Project Overview

The project uses a PostgreSQL database to manage operations and their suboperations. The backend is built with Laravel and the frontend with React and Redux.

## How to Run the Project

**Step 1: Clone the Repository**
Clone the repository to your local machine:
```
git clone https://github.com/Vsechp/rest-api-operation
```
**Step 2: Set Up Environment Variables**
Navigate to the backend directory and copy the example environment file:
```
cd rest-api-operation/backend
cp .env.example .env
```
**Step 3: Build and Start Docker Containers**
Navigate to the backend directory and start the Docker containers:
```
cd rest-api-operation/backend
docker-compose up --build -d
```
This command will build and start the following containers:

*db: A PostgreSQL database container.*

*app: The Laravel application container.*

*nginx: A container running Nginx as the web server.*



**Step 4: Install Frontend Dependencies**
Navigate to the frontend directory and install the Node.js dependencies using npm:

```
cd ../frontend
npm install
```

**Step 5: Start the Frontend Development Server**
Start the React development server:

```
npm start
```
The frontend application will be available at http://localhost:3000 and will proxy API requests to the backend server running at http://localhost:8080.

## Using the Application

**Step 1. Generating Operations and Suboperations**
To generate a large set of operations and suboperations, use the following command:

```
docker exec backend-app-1 php artisan data:generate
```

**Step 2. Deleting All Operations and Suboperations**
To delete all operations and suboperations, use the following command:

```
docker exec backend-app-1 php artisan data:destroy
```


**Step 3. Processing Operations and Suboperations**
To process the operations and suboperations as described, use the following command:

```
docker exec backend-app-1 php artisan data:process
```

## Additional Commands

**Stopping the Containers**
To stop the running containers, use:

```
docker-compose down
```


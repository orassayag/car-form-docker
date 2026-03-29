# Instructions

## Setup Instructions

### Quick Start with Docker (Recommended)

1. Clone the repository:
   ```bash
   git clone https://github.com/orassayag/car-form-docker.git
   cd car-form-docker
   ```

2. Start all services with Docker Compose:
   ```bash
   docker-compose up --build
   ```

3. Access the application:
   - Open your browser and navigate to: `http://localhost:3050`
   - The application will be ready to use

### Local Development Setup (Without Docker)

#### Prerequisites
- Node.js (v8.11.3 or higher recommended)
- MongoDB installed and running locally
- npm or yarn package manager

#### Client Setup

1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```
   The client will run on `http://localhost:3000`

#### Server Setup

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Update MongoDB connection (if needed):
   - Edit `server/index.js`
   - Change the `db` variable to your local MongoDB connection string
   - Default: `mongodb://localhost:27017/cars`

4. Start the server:
   ```bash
   npm start
   ```
   The server will run on `http://localhost:5000`

## Architecture Overview

The application consists of 4 main services:

### 1. MongoDB (Database)
- Stores car records
- Runs on default MongoDB port (27017)
- Database name: `cars`
- Collection: `cars`

### 2. API Server (Node.js/Express)
- Handles business logic
- Exposes REST API endpoints
- Connects to MongoDB
- Port: 5000

### 3. Client (React.js)
- User interface for car management
- Communicates with API server
- Built with React, Bootstrap, and Axios
- Port: 3000 (development)

### 4. Nginx (Reverse Proxy)
- Routes requests between client and API
- Serves static files in production
- Port: 3050 (when using Docker)

## API Endpoints

### POST `/addCar`
Adds a new car to the database.

**Request Body:**
```json
{
  "vehicleNumber": "12-345-67",
  "carType": "Sedan",
  "carModel": "Toyota Camry"
}
```

**Response:**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "vehicleNumber": "12-345-67",
  "carType": "Sedan",
  "carModel": "Toyota Camry"
}
```

### GET `/getAllCars`
Retrieves all cars from the database.

**Response:**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "vehicleNumber": "12-345-67",
    "carType": "Sedan",
    "carModel": "Toyota Camry"
  }
]
```

## Available Car Types

The application supports the following car types:
- Hatchback
- Sedan
- MPV
- SUV
- Crossover
- Coupe
- Convertible

## Configuration

### Docker Configuration

#### docker-compose.yml
Main orchestration file for all services. Modify ports or volumes here.

#### Environment Variables
The application uses the following default configurations:
- MongoDB: `mongodb://mongodb:27017/cars` (Docker)
- API Port: `5000`
- Client Port: `3000`
- Nginx Port: `3050`

### Client Configuration

Client settings are located in:
- `client/src/settings/settings.development.json` - Development settings
- `client/src/settings/settings.production.json` - Production settings

### Server Configuration

Server configuration is in `server/index.js`:
- Database connection string
- Port configuration
- CORS settings

## Building for Production

### With Docker
```bash
docker-compose up --build
```
This builds optimized production images for all services.

### Without Docker

#### Build Client
```bash
cd client
npm run build
```
This creates an optimized production build in the `client/build` directory.

#### Run Server
```bash
cd server
npm start
```

## Troubleshooting

### Docker Issues

**Problem:** Containers won't start
```bash
# Check container status
docker-compose ps

# View logs
docker-compose logs

# Rebuild containers
docker-compose down
docker-compose up --build
```

**Problem:** Port already in use
- Change the port in `docker-compose.yml` under the nginx service
- Or stop the process using the port: `lsof -ti:3050 | xargs kill`

### Database Issues

**Problem:** Cannot connect to MongoDB
- Ensure MongoDB container is running: `docker-compose ps`
- Check MongoDB logs: `docker-compose logs mongodb`
- Verify connection string in `server/index.js`

### Client Issues

**Problem:** API requests fail
- Verify server is running on port 5000
- Check CORS configuration in `server/index.js`
- Ensure Nginx is properly routing requests (in Docker setup)

## Development Workflow

1. Make changes to source code
2. For Docker setup, rebuild containers:
   ```bash
   docker-compose down
   docker-compose up --build
   ```
3. For local setup, restart relevant service (client or server)
4. Test changes in browser
5. Commit and push changes

## Testing

### Client Tests
```bash
cd client
npm test
```

### Manual Testing
1. Start the application
2. Navigate to the form
3. Fill in car details:
   - Vehicle Number: Any text (e.g., "12-345-67")
   - Type: Select from dropdown
   - Model: Any text (e.g., "Toyota Camry")
4. Click "Save Changes"
5. Verify success message appears
6. Verify car appears in "Previous cars" list
7. Refresh page and verify data persists

## File Structure

```
car-form-docker/
├── client/                          # React frontend application
│   ├── config/                      # Webpack and Jest configuration
│   ├── public/                      # Static assets
│   ├── scripts/                     # Build and development scripts
│   ├── src/
│   │   ├── api/                     # API client
│   │   │   └── routes/              # API route definitions
│   │   ├── components/              # Reusable UI components
│   │   │   └── UI/                  # UI-specific components
│   │   ├── containers/              # Page containers
│   │   ├── hoc/                     # Higher-order components
│   │   ├── settings/                # Environment settings
│   │   └── utils/                   # Utility functions
│   ├── Dockerfile                   # Client container definition
│   └── package.json                 # Client dependencies
├── server/                          # Node.js backend
│   ├── models/                      # Mongoose models
│   ├── index.js                     # Server entry point
│   ├── Dockerfile                   # Server container definition
│   └── package.json                 # Server dependencies
├── nginx/                           # Nginx reverse proxy
│   ├── default.conf                 # Nginx configuration
│   └── Dockerfile                   # Nginx container definition
└── docker-compose.yml               # Docker orchestration
```

## Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [React Documentation](https://reactjs.org/)
- [Express Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Nginx Documentation](https://nginx.org/en/docs/)

## Author

* **Or Assayag** - *Initial work* - [orassayag](https://github.com/orassayag)
* Or Assayag <orassayag@gmail.com>
* GitHub: https://github.com/orassayag
* StackOverflow: https://stackoverflow.com/users/4442606/or-assayag?tab=profile
* LinkedIn: https://linkedin.com/in/orassayag

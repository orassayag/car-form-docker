# Setup and Usage Instructions

## Table of Contents

1. [System Requirements](#system-requirements)
2. [Initial Setup](#initial-setup)
3. [Install Dependencies](#install-dependencies)
4. [Architecture Overview](#architecture-overview)
5. [API Endpoints](#api-endpoints)
6. [Available Car Types](#available-car-types)
7. [Configuration](#configuration)
8. [Building for Production](#building-for-production)
9. [Available Commands](#available-commands)
10. [Development Commands](#development-commands)
11. [Running Scripts](#running-scripts)
12. [Development Workflow](#development-workflow)
13. [Testing](#testing)
14. [Troubleshooting](#troubleshooting)
15. [File Structure](#file-structure)
16. [Best Practices](#best-practices)
17. [Extending the Application](#extending-the-application)
18. [External Resources](#external-resources)
19. [Author](#author)
20. [Version](#version)
21. [Last Updated](#last-updated)

## System Requirements

- **Docker**: v20.x or higher
- **Docker Compose**: v3.x or higher
- **For Local Development (without Docker)**:
  - Node.js (v8.11.3 or higher)
  - npm or yarn
  - MongoDB installed and running locally
- **Operating System**: Windows, macOS, or Linux
- **Memory**: 2GB RAM minimum
- **Disk Space**: 1GB for application and Docker images

## Initial Setup

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

## Install Dependencies

### Docker Setup

No additional installation needed - Docker handles all dependencies!

### Local Setup

#### Client Dependencies

```bash
cd client
npm install
```

#### Server Dependencies

```bash
cd server
npm install
```

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

### POST `/api/addCar`

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

### GET `/api/getAllCars`

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

## Available Commands

### Docker Commands

```bash
# Start all services
docker-compose up

# Rebuild and start
docker-compose up --build

# Stop all services
docker-compose down

# View logs for all services
docker-compose logs

# View logs for a specific service
docker-compose logs <service-name>

# List running containers
docker-compose ps

# Restart a specific service
docker-compose restart <service-name>
```

### Client Commands (Local Development)

```bash
cd client

# Start development server
npm start

# Create production build
npm run build

# Run tests
npm test

# Lint code
npm run lint
```

### Server Commands (Local Development)

```bash
cd server

# Start API server
npm start
```

## Development Commands

### Docker Development

```bash
# Start with rebuild
docker-compose up --build

# View real-time logs
docker-compose logs -f

# Stop and remove containers
docker-compose down

# Stop containers but keep data
docker-compose stop
```

### Local Development

#### Client

```bash
cd client
npm start  # Starts with hot reload
```

#### Server

```bash
cd server
npm start  # Starts API server
```

## Running Scripts

### Docker Workflow

1. Make changes to code
2. Rebuild containers:
   ```bash
   docker-compose down
   docker-compose up --build
   ```
3. Test changes in browser at `http://localhost:3050`

### Local Workflow

1. Make changes to client code - browser reloads automatically
2. Make changes to server code - restart server manually
3. Test changes at `http://localhost:3000` (client) or `http://localhost:5000` (API)

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
- Or stop the process using the port: `lsof -ti:3050 | xargs kill` (macOS/Linux) or use Task Manager on Windows

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

## Best Practices

### Development

1. **Use Docker for Development**: Ensures consistent environment across all machines
2. **Test Changes Locally**: Verify changes work before committing
3. **Keep Dependencies Updated**: Regularly update npm packages in client and server
4. **Follow Code Style**: Use the provided ESLint and Prettier configurations
5. **Write Tests**: Add tests for new features and bug fixes

### Production

1. **Use Multi-Stage Builds**: Already configured in Dockerfiles for optimized images
2. **Set Environment Variables**: Configure production settings in `client/src/settings/settings.production.json`
3. **Backup Database**: Regularly backup MongoDB data
4. **Monitor Logs**: Keep an eye on application logs for errors
5. **Use HTTPS**: Configure SSL certificates for production deployment

### Security

1. **Never Commit Secrets**: Keep API keys and credentials out of version control
2. **Restrict Database Access**: MongoDB should only be accessible from the API server
3. **Validate Inputs**: Always validate user input on the server
4. **Use CORS Wisely**: Restrict CORS origins in production

### Git & Version Control

1. **Write Clear Commit Messages**: Explain what and why changes were made
2. **Branch Strategically**: Use feature branches for new development
3. **Review Changes**: Before committing, review what changes you're making

## Extending the Application

### Adding New API Endpoints

1. Open `server/index.js`
2. Add new Express route:
   ```javascript
   app.get('/api/new-endpoint', (req, res) => {
     // Your logic here
     res.json({ message: 'Success!' });
   });
   ```

### Adding New Client Components

1. Create new component in `client/src/components/`
2. Import and use it in your containers

### Adding New Car Types

1. Open `client/src/containers/Home/Home.jsx`
2. Update the `carTypes` array with new types

### Modifying Database Schema

1. Open `server/models/car.js`
2. Update the Mongoose schema as needed

## External Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [React Documentation](https://reactjs.org/)
- [Express Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [Nginx Documentation](https://nginx.org/en/docs/)
- [Bootstrap Documentation](https://getbootstrap.com/)

## Author

- **Or Assayag** - _Initial work_ - [orassayag](https://github.com/orassayag)
- Or Assayag <orassayag@gmail.com>
- GitHub: https://github.com/orassayag
- StackOverflow: https://stackoverflow.com/users/4442606/or-assayag?tab=profile
- LinkedIn: https://linkedin.com/in/orassayag

## Version

- **Current Version**: 1.0.0
- **Versioning**: Semantic Versioning (SemVer)

## Last Updated

- **Date**: June 2026

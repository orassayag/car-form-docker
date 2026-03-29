# Contributing

Contributions to this project are [released](https://help.github.com/articles/github-terms-of-service/#6-contributions-under-repository-license) to the public under the [project's open source license](LICENSE).

Everyone is welcome to contribute to this project. Contributing doesn't just mean submitting pull requests—there are many different ways for you to get involved, including answering questions, reporting issues, improving documentation, or suggesting new features.

## How to Contribute

### Reporting Issues

If you find a bug or have a feature request:
1. Check if the issue already exists in the [GitHub Issues](https://github.com/orassayag/car-form-docker/issues)
2. If not, create a new issue with:
   - Clear title and description
   - Steps to reproduce (for bugs)
   - Expected vs actual behavior
   - Error logs or screenshots (if applicable)
   - Your environment details (OS, Docker version, Node version)

### Submitting Pull Requests

1. Fork the repository
2. Create a new branch for your feature/fix:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make your changes following the code style guidelines below
4. Test your changes thoroughly (see Testing section)
5. Commit with clear, descriptive messages
6. Push to your fork and submit a pull request

### Code Style Guidelines

This project uses:
- **JavaScript/JSX** (React for frontend)
- **Node.js/Express** (backend API)
- **ESLint** for code quality
- **Docker** for containerization

Before submitting:
```bash
# Test the client
cd client
npm install
npm test

# Test the server
cd server
npm install
npm start

# Test Docker setup
docker-compose up --build
```

### Coding Standards

#### Frontend (React)
1. Use functional components with hooks where possible
2. Follow React best practices for state management
3. Keep components focused and reusable
4. Use PropTypes for type checking
5. Follow Bootstrap grid system for layouts
6. Keep SCSS files modular and scoped

#### Backend (Node.js/Express)
1. Use async/await for asynchronous operations
2. Implement proper error handling with try/catch
3. Validate all user inputs before processing
4. Use Mongoose schemas for data validation
5. Keep routes clean and delegate logic to separate functions
6. Add proper CORS configuration for security

#### Docker
1. Keep Dockerfiles minimal and efficient
2. Use multi-stage builds where appropriate
3. Properly configure volumes for development
4. Document any changes to docker-compose.yml

### Adding New Features

When adding new features:
1. **Frontend**: Create components in `client/src/components/` or containers in `client/src/containers/`
2. **Backend**: Add routes in `server/` and models in `server/models/`
3. **API**: Update API routes in `client/src/api/routes/`
4. **Styling**: Add SCSS in component-specific files
5. Test all changes locally with Docker
6. Update documentation if needed

### Testing

#### Local Development Testing
```bash
# Without Docker
cd client && npm start    # Port 3000
cd server && npm start    # Port 5000

# With Docker
docker-compose up --build  # Port 3050
```

#### Manual Testing Checklist
- [ ] Form accepts valid car data
- [ ] Form shows validation errors for invalid data
- [ ] Previous cars list displays correctly
- [ ] API endpoints respond correctly
- [ ] MongoDB persists data
- [ ] Docker containers start without errors
- [ ] Nginx routes requests properly

### Project Structure

Understanding the structure:
```
car-form-docker/
├── client/              # React frontend
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── containers/  # Page containers
│   │   ├── api/         # API client logic
│   │   └── hoc/         # Higher-order components
│   └── Dockerfile
├── server/              # Node.js backend
│   ├── models/          # Mongoose models
│   └── Dockerfile
├── nginx/               # Nginx configuration
│   └── Dockerfile
└── docker-compose.yml   # Docker orchestration
```

## Questions or Need Help?

Please feel free to contact me with any question, comment, pull-request, issue, or any other thing you have in mind.

* Or Assayag <orassayag@gmail.com>
* GitHub: https://github.com/orassayag
* StackOverflow: https://stackoverflow.com/users/4442606/or-assayag?tab=profile
* LinkedIn: https://linkedin.com/in/orassayag

Thank you for contributing! 🙏

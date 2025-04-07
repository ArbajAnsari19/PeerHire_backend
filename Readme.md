# PeerHire - Setup and Endpoint Testing

## Table of Contents
1. [Introduction](#introduction)
2. [Prerequisites](#prerequisites)
3. [Installation](#installation)
4. [Configuration](#configuration)
5. [Running the Project](#running-the-project)
6. [Testing Endpoints](#testing-endpoints)
7. [Contributing](#contributing)
8. [License](#license)

## Introduction
This project serves as a starting point for testing endpoints and setting up the entire application for PeerHire. It demonstrates how to initialize the project, configure it, and run tests against the API endpoints.

## Prerequisites
- Node.js (v14 or later)
- npm or yarn package manager
- Git

## Installation
1. **Clone the Repository:**
    ```bash
    git clone <repository-url>
    ```
2. **Navigate to the Project Folder:**
    ```bash
    cd PeerHire
    ```
3. **Install Dependencies:**
    ```bash
    npm install
    ```

## Configuration
Create a `.env` file in the root directory with the required environment variables. For example:
```env
PORT=3000
DATABASE_URL=your_database_connection_string
```

## Running the Project
Start the development server using:
```bash
npm start
```
The application will be accessible at [http://localhost:3000](http://localhost:3000).

## Testing Endpoints
### Manual Testing
- **Home Endpoint:**
  ```bash
  curl http://localhost:3000/
  ```
- **Sample API Endpoint:**
  ```bash
  curl http://localhost:3000/api/sample
  ```
  
### Automated Testing
Run all tests with:
```bash
npm run test
```
This command will execute all unit and integration tests, ensuring that endpoints respond as expected.

## Contributing
Contributions are welcome. Please refer to the `CONTRIBUTING.md` file for guidelines on how to submit issues and pull requests.

## License
This project is licensed under the MIT License.

# User-Role-Permission Frontend

This is the frontend of the **User-Role-Permission** management system, built with **React.js**. The application provides a simple interface for users to log in and manage user, role, and permission records. After logging in, users can navigate through different tabs to view and manage data related to users, roles, and permissions.

## Features

- **Login Page**: Allows users to log in using email and password.
- **Navigation**: After logging in, users can navigate between tabs for managing users, roles, and permissions.
- **User Management**: View and manage user records.
- **Role Management**: View and manage roles assigned to users.
- **Permission Management**: View and manage permissions assigned to users and roles.

## Table of Contents

1. [Technologies Used](#technologies-used)
2. [Installation](#installation)
3. [Login Credentials](#login-credentials)
4. [Usage](#usage)
5. [App Flow](#app-flow)

## Technologies Used

- **React.js**: JavaScript library for building user interfaces.
- **Axios**: Promise-based HTTP client for making API requests.
- **React Router**: Routing library for navigating between pages and tabs.
- **Tailwind**: Styling library for components.

## Installation

Follow the steps below to set up the frontend application locally:

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine.

### Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/user-role-permission-frontend.git
   cd user-role-permission-frontend
   ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Set up environment variables**:
Create a .env file in the root directory and add the following:
    ```bash
    VITE_API_URL=http://localhost:5000/api
    ```
    Replace http://localhost:5000/api with the API endpoint for your backend service if it's different.

4. **Run the app**:
    ```bash
    npm run dev
    ```
    This will start the frontend application at http://localhost:5173

## Login Credentials
To log into the application, use the following sample credentials:

- Email: `admin@example.com`
- Password: `password123`

## Usage
Once the app is running, open your browser and go to http://localhost:5173. You should be prompted with a login screen. After logging in, you can navigate through the available tabs to manage users, roles, and permissions.

## App Flow
### Login:
Upon loading, the user is presented with a login form. Enter the provided credentials to authenticate.

### Dashboard:
After successful login, the user is redirected to the main dashboard. From here, users can navigate to different tabs such as Users, Roles, and Permissions to manage the respective records.

### Managing Data:

- Users: View a list of users, create, update, or delete user records.
- Roles: View a list of roles, create, update, or delete roles.
- Permissions: View and manage the permissions assigned to users and roles.

### Logout:
The user can log out from the system using the logout button available in the header.

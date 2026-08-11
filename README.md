# React Authentication & Authorization Dashboard

A React application built to practice and demonstrate **authentication, authorization, JWT-based security, role-based access control, admin user management, API architecture, and reusable frontend patterns**.

The project started as a React authentication practice application and evolved into a small dashboard with user profiles, role-based authorization, and administrative functionality.

---

## 🚀 Features

### 🔐 Authentication

* User registration
* User login
* JWT authentication
* Access token persistence using `localStorage`
* Restore authentication after page refresh
* Logout
* Cross-tab logout synchronization
* Protected routes
* Authentication loading state
* Global authentication error handling

### 🛡️ Authorization

* User roles
* Role-based protected routes
* Admin-only routes
* Permission checks
* `401 Unauthorized` handling
* `403 Forbidden` handling

### 👤 User Profile

* View logged-in user information
* Edit profile information
* Update first name and last name
* Email displayed as read-only
* Persist updated profile information

### 👨‍💼 Admin Dashboard

* Total users statistics
* Admin user count
* Regular user count
* Recent users
* Admin-only dashboard access

### 👥 User Management

Administrators can:

* View all users
* Change user roles
* Delete users

### 🧩 Reusable Frontend Architecture

* Feature-based folder structure
* Reusable Axios API client
* Reusable `useHttp` hook
* Reusable localStorage hook
* Centralized API error handling
* React Context for authentication state
* Protected routing
* Role-based routing

### 🧪 Testing

* Authentication API tests
* Signup validation tests
* Vitest test setup

---

# 🛠️ Tech Stack

### Frontend

* React
* React Router
* Axios
* React Hook Form
* Zod
* Bootstrap
* Vite

### Authentication

* JWT
* `json-server-auth`

### Backend / Mock API

* JSON Server
* JSON Server Auth

### Testing

* Vitest

---

# 🏗️ Project Architecture

The application uses a **feature-based architecture**.

```text
src/
│
├── features/
│   │
│   ├── auth/
│   │   ├── components/
│   │   │   ├── LoginForm.jsx
│   │   │   ├── SignupForm.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── RoleRoute.jsx
│   │   │
│   │   ├── context/
│   │   │   ├── AuthContext.js
│   │   │   ├── AuthProvider.jsx
│   │   │   └── useAuth.js
│   │   │
│   │   ├── pages/
│   │   │   ├── LoginPage.jsx
│   │   │   └── SignupPage.jsx
│   │   │
│   │   ├── services/
│   │   │   ├── authApi.js
│   │   │   └── authApi.test.js
│   │   │
│   │   └── validation/
│   │       ├── loginSchema.js
│   │       ├── signupSchema.js
│   │       └── signupSchema.test.js
│   │
│   ├── dashboard/
│   │   ├── components/
│   │   │   └── DashboardLayout.jsx
│   │   └── pages/
│   │       └── DashboardPage.jsx
│   │
│   ├── profile/
│   │   ├── components/
│   │   │   └── ProfileForm.jsx
│   │   └── pages/
│   │       └── ProfilePage.jsx
│   │
│   └── admin/
│       ├── components/
│       │   ├── StatCard.jsx
│       │   └── UserTable.jsx
│       │
│       ├── pages/
│       │   ├── AdminDashboardPage.jsx
│       │   └── UsersPage.jsx
│       │
│       └── services/
│           └── adminApi.js
│
├── components/
│   ├── FormError.jsx
│   ├── ThemeToggle.jsx
│   ├── Input.jsx
│   └── Button.jsx
│
├── hooks/
│   ├── useLocalStorage.js
│   └── useHttp.js
│
├── services/
│   ├── apiClient.js
│   ├── apiError.js
│   ├── authClient.js
│   ├── productClient.js
│   └── orderClient.js
│
├── App.jsx
├── main.jsx
└── index.css
```

---

# 🔐 Authentication Flow

The application uses JWT-based authentication.

```text
                 ┌───────────────┐
                 │     Login     │
                 └───────┬───────┘
                         │
                         ▼
                 ┌───────────────┐
                 │ Auth Service  │
                 └───────┬───────┘
                         │
                         │ JWT
                         ▼
                 ┌───────────────┐
                 │ AuthProvider  │
                 └───────┬───────┘
                         │
                         ▼
                    localStorage
                         │
                         ▼
                 Protected Routes
                         │
                         ▼
                    Application
```

The stored authentication state contains information similar to:

```js
{
  accessToken: "...",
  user: {
    id: 1,
    firstName: "Varun",
    lastName: "Verma",
    email: "user@example.com",
    role: "user"
  }
}
```

---

# 🛡️ Authorization Flow

Authorization is separated from authentication.

Authentication answers:

> Who is the user?

Authorization answers:

> What is this user allowed to access?

The application uses roles such as:

```text
user
admin
```

Protected admin routes use:

```jsx
<RoleRoute allowedRoles={["admin"]} />
```

The routing flow is:

```text
Request /admin/users
        │
        ▼
ProtectedRoute
        │
        ├── Not authenticated
        │       ↓
        │     /login
        │
        ▼
   RoleRoute
        │
        ├── Not admin
        │       ↓
        │     Access denied
        │
        ▼
    UsersPage
```

---

# 🚦 HTTP Error Handling

API errors are handled centrally.

### 401 Unauthorized

When authentication is no longer valid:

```text
API request
    ↓
401 Unauthorized
    ↓
Clear authentication
    ↓
Redirect to login
```

### 403 Forbidden

When the user is authenticated but doesn't have permission:

```text
API request
    ↓
403 Forbidden
    ↓
API error handler
    ↓
Display authorization error
```

This keeps authentication and authorization error handling consistent across the application.

---

# 💾 Authentication Persistence

Authentication state is stored using a reusable:

```text
useLocalStorage
```

hook.

This allows the application to:

* Restore authentication after page refresh
* Keep the user logged in
* Synchronize logout between browser tabs

Cross-tab synchronization uses the browser's `storage` event.

---

# 👨‍💼 Admin Features

Administrators have access to an additional dashboard.

```text
/admin
```

The dashboard provides:

```text
Total Users
Admin Users
Regular Users
Recent Users
```

Administrators can also access:

```text
/admin/users
```

where they can:

* View users
* Change user roles
* Delete users

---

# 👤 Profile Management

Authenticated users can access:

```text
/profile
```

The profile page displays:

* First name
* Last name
* Email
* User ID
* Role

Users can update their profile information while their email remains read-only.

---

# 🔌 API Architecture

API requests are centralized through Axios.

```text
React Component
       │
       ▼
Feature API
       │
       ▼
apiClient
       │
       ├── Attach JWT
       │
       ├── Handle HTTP errors
       │
       ▼
     API
```

Example:

```js
const response = await apiClient.get("/users");
```

The API client is responsible for common HTTP configuration and authentication behavior.

---

# 🪝 Custom Hooks

The project includes reusable hooks.

### `useLocalStorage`

Used for:

* Persisting authentication state
* Reading stored authentication
* Updating authentication
* Removing authentication
* Cross-tab synchronization

### `useHttp`

Used to simplify HTTP request state management.

It provides:

```js
{
  data,
  isLoading,
  error,
  sendRequest
}
```

This keeps components focused on UI and business logic.

---

# 📝 Form Validation

Forms use:

* React Hook Form
* Zod

Example validation flow:

```text
Form
 ↓
React Hook Form
 ↓
Zod Schema
 ↓
Validation
 ↓
API Request
```

This is used for signup and login validation.

---

# 🧪 Testing

The project uses **Vitest**.

Tests currently cover important validation and authentication functionality.

Run tests with:

```bash
npm run test
```

---

# ⚙️ Running the Project Locally

## 1. Clone the repository

```bash
git clone https://github.com/varunew9/react-auth-authorization-dashboard.git
```

## 2. Enter the project

```bash
cd react-auth-authorization-dashboard
```

## 3. Install dependencies

```bash
npm install
```

## 4. Start the authentication API

The project currently uses `json-server-auth` for the authentication API.

Example:

```bash
npx json-server data/user.json \
  --port 7100 \
  --routes data/routes.json \
  --middlewares ./node_modules/json-server-auth
```

The authentication service runs on:

```text
http://localhost:7100
```

## 5. Start the React application

```bash
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:5173
```

---

# 📁 Main Routes

| Route          | Access        | Description       |
| -------------- | ------------- | ----------------- |
| `/login`       | Public        | User login        |
| `/signup`      | Public        | User registration |
| `/dashboard`   | Authenticated | User dashboard    |
| `/profile`     | Authenticated | User profile      |
| `/admin`       | Admin         | Admin dashboard   |
| `/admin/users` | Admin         | User management   |

---

# 🔒 Security Notes

This project is primarily a **learning and architecture practice project**.

The current authentication implementation uses:

* JWT
* `localStorage`
* `json-server-auth`

For a production application, additional security measures would be appropriate, including:

* Secure backend authentication
* HTTPS
* Secure and HttpOnly cookies where appropriate
* Refresh-token rotation
* Token expiration strategy
* Server-side permission enforcement
* Rate limiting
* Input sanitization
* Production database
* Proper secret management

The frontend role checks improve the user experience, but **authorization must always be enforced by the backend** in a real production system.

---

# 🚧 Current Limitations

The backend currently uses `json-server-auth`, so it is intended primarily for local development and learning.

The following are intentionally not implemented yet:

* Production backend
* Refresh-token rotation
* Advanced session management
* Production database
* Production deployment

---

# 🎯 Learning Goals

This project was created to understand how authentication and authorization work in a React application rather than relying entirely on an authentication library.

The main concepts practiced were:

* Authentication vs authorization
* JWT authentication
* Protected routes
* Role-based access control
* React Context
* Axios interceptors
* API error handling
* LocalStorage persistence
* Cross-tab authentication synchronization
* Custom React hooks
* Feature-based architecture
* Admin CRUD operations
* Form validation
* Unit testing

---

# 🔮 Future Improvements

Planned improvements include:

* Production backend
* Refresh-token authentication
* Improved token/session management
* Product management
* Product details
* Orders
* Order management
* Better dashboard analytics
* More automated tests
* Production deployment

---

# 📸 Screenshots

<img width="3010" height="1300" alt="application" src="https://github.com/user-attachments/assets/63807842-adad-44d1-86a9-03ab8c93af7b" />


### Login

<img width="2998" height="1212" alt="login" src="https://github.com/user-attachments/assets/a93e8647-210a-49c3-9e00-327f4b097f01" /><img width="3010" height="1478" alt="Signup" src="https://github.com/user-attachments/assets/afe55c54-d05f-4a41-ae99-dcfe397d1098" />



### Dashboard

<img width="2998" height="1438" alt="dashboard" src="https://github.com/user-attachments/assets/32c23f2d-be4b-45f9-8867-2750782752de" />


### Profile

<img width="3004" height="1442" alt="profile" src="https://github.com/user-attachments/assets/9951eb0a-9f9a-4053-8805-8f2a4ca2660a" />


### Admin Dashboard

<img width="3010" height="1300" alt="application" src="https://github.com/user-attachments/assets/63807842-adad-44d1-86a9-03ab8c93af7b" />

### User Management

<img width="3010" height="1466" alt="management" src="https://github.com/user-attachments/assets/522c4f57-eeba-4317-a209-1b5a5ddf5669" />

---

# 👨‍💻 Author

**Varun Verma**

This project was built as a hands-on practice project for learning React authentication, authorization, API architecture, and admin functionality.

---

## ⭐ Project Status

**Learning project — actively evolving**

The authentication and authorization foundation is complete. The next stage is expanding the application into product and order functionality.

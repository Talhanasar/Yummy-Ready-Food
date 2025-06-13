# Yummy Ready Food

A full-stack web application for food ordering and delivery management. This project consists of a React frontend and Node.js/Express backend.

## Project Overview

Yummy Ready Food is a comprehensive food ordering platform that allows customers to browse products, place orders, and use coupons. It also includes an admin panel for managing products, orders, and coupons.

## Features

- **Customer Features**
  - Browse food products
  - View product details
  - Add items to cart
  - Apply coupon codes
  - Checkout and place orders
  - Order confirmation

- **Admin Features**
  - Product management (add, edit, delete)
  - Order management and tracking
  - Coupon management
  - Admin authentication

## Tech Stack

### Frontend
- React 18
- React Router
- Axios for API requests
- Tailwind CSS for styling
- Vite as build tool
- React Leaflet for maps
- React Toastify for notifications

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Bcrypt for password hashing
- Telegram Bot API for notifications

## Project Structure

```
├── Frontend/                # React frontend application
│   ├── public/              # Static assets
│   ├── src/                 # Source code
│   │   ├── admin/           # Admin panel components
│   │   ├── components/      # Reusable components
│   │   ├── contexts/        # React contexts
│   │   ├── pages/           # Page components
│   │   ├── utils/           # Utility functions
│   │   ├── App.jsx          # Main application component
│   │   └── main.jsx         # Entry point
│   └── package.json         # Frontend dependencies
│
├── Backend/                 # Node.js backend application
│   ├── config/              # Configuration files
│   ├── middelwares/         # Express middlewares
│   ├── models/              # Mongoose models
│   ├── routes/              # API routes
│   ├── utils/               # Utility functions
│   ├── server.js            # Server entry point
│   └── package.json         # Backend dependencies
│
└── package.json             # Root package.json for scripts
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB

### Installation

1. Clone the repository
   ```
   git clone <repository-url>
   cd <repository-folder>
   ```

2. Install dependencies
   ```
   # Install frontend dependencies
   npm run install:frontend
   
   # Install backend dependencies
   npm run install:backend
   ```

3. Environment Setup
   - Create a `.env` file in the Backend directory with the following variables:
     ```
     PORT=5000
     MONGODB_URI=<your-mongodb-connection-string>
     FRONTEND_URL_1=<your-frontend-url>
     FRONTEND_URL_2=<your-alternative-frontend-url>
     ```

### Running the Application

#### Development Mode

1. Start the backend server
   ```
   npm run dev:backend
   ```

2. Start the frontend development server
   ```
   npm run dev:frontend
   ```

3. Access the application at `http://localhost:5173`

#### Production Mode

1. Build the frontend
   ```
   npm run build:frontend
   ```

2. Build the backend
   ```
   npm run build:backend
   ```

3. Start the application
   ```
   npm start
   ```

## API Endpoints

- `/api/product` - Product management
- `/api/coupon` - Coupon management
- `/api/order` - Order management
- `/api/admin` - Admin authentication and management

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.
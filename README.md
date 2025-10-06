# E-Commerce MERN Application

This is a modern full-stack e-commerce web application built with React, Tailwind CSS, Node.js, Express, and MongoDB. It allows users to browse, search, and order products, with an admin panel for managing products and orders.

## Features

- User-friendly product browsing with search functionality
- Responsive design using Tailwind CSS
- Product details with "Read more" and "Buy Now" linking to detail page
- Admin page to add/edit/delete products and view orders
- RESTful APIs with Node.js and Express
- MongoDB for product and order data storage
- React Router for SPA navigation
- Modular, scalable component structure

## Getting Started

### Prerequisites

- Node.js and npm installed
- MongoDB database (local or MongoDB Atlas)
- Git installed

### Installation

1. Clone the repository:

git clone <your_repo_url>
cd <repo_folder>

text

2. Install dependencies:

- Backend:

cd backend
npm install

text

- Frontend:

cd ../frontend
npm install

text

### Configuration

- Create `.env` file in backend with MongoDB connection string:

MONGO_URI=your_mongodb_connection_string
PORT=5000

text

- Update frontend `.env` or config files if needed for API URLs.

### Running Locally

- Start backend server:

cd backend
npm start

text

- Start frontend development server:

cd ../frontend
npm start

text

Frontend will proxy API requests to backend.

## Deployment

- Build frontend for production:

cd frontend
npm run build

text

- Deploy the backend server (e.g., on Heroku, AWS, Digital Ocean).
- Serve the frontend `build` folder with a static hosting service or configure backend to serve static assets.

## Folder Structure

- `backend/`: Node.js Express server, API routes, MongoDB models
- `frontend/`: React app with components, pages, assets
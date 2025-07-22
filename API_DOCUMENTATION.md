# Jalin API Documentation

## Overview
Jalin is a tailoring service platform that connects users with professional tailors (penjahit). This documentation covers all public APIs, endpoints, and their usage.

## Base URL
- **Development**: `http://localhost:5000/api`
- **Production**: `https://api.jalin.my.id/api`

## Authentication
The API uses JWT (JSON Web Token) for authentication. Include the token in cookies for authenticated requests.

## API Endpoints

### Authentication API (`/api/auth`)

#### Check Authentication Status
- **GET** `/auth/check-auth`
- **Description**: Verify if user is authenticated
- **Authorization**: Required (JWT Token)
- **Response**: User object or 401 Unauthorized

**Example Response:**
```json
{
  "_id": "64f1234567890abcdef12345",
  "name": "John Doe",
  "username": "johndoe",
  "email": "john@example.com",
  "role": "user",
  "profileImg": "https://example.com/profile.jpg",
  "noTelp": "+6281234567890",
  "address": "Jakarta, Indonesia",
  "isVerified": true,
  "lastLogin": "2024-01-15T10:30:00.000Z"
}
```

#### Check Penjahit Authentication
- **GET** `/auth/check-auth-penjahit`
- **Description**: Verify if user is authenticated as a verified tailor
- **Authorization**: Required (JWT Token)
- **Response**: Penjahit object with populated user data

**Example Response:**
```json
{
  "_id": "64f1234567890abcdef12346",
  "user": {
    "name": "Jane Smith",
    "username": "janesmith",
    "email": "jane@example.com",
    "noTelp": "+6281234567891",
    "address": "Bandung, Indonesia",
    "profileImg": "https://example.com/jane.jpg"
  },
  "description": "Professional tailor with 5+ years experience",
  "rentangHarga": "50000-200000",
  "kategori": [
    {"name": "Formal Wear"},
    {"name": "Casual Wear"}
  ],
  "rating": 4.8,
  "isVerified": "diterima",
  "isPremium": true,
  "point": 15000
}
```

#### User Registration
- **POST** `/auth/signup`
- **Description**: Register a new user account
- **Request Body:**
```json
{
  "name": "John Doe",
  "username": "johndoe",
  "email": "john@example.com",
  "password": "securePassword123",
  "noTelp": "+6281234567890",
  "address": "Jakarta, Indonesia",
  "isAgreeTerms": true
}
```
- **Response**: Success message and verification email sent

#### User Login
- **POST** `/auth/login`
- **Description**: Authenticate user and receive JWT token
- **Request Body:**
```json
{
  "username": "johndoe",
  "password": "securePassword123"
}
```
- **Response**: User object with JWT cookie set

#### User Logout
- **POST** `/auth/logout`
- **Description**: Logout user and clear JWT cookie
- **Response**: Success message

#### Email Verification
- **POST** `/auth/verify-email`
- **Description**: Verify user email with verification code
- **Request Body:**
```json
{
  "code": "123456"
}
```
- **Response**: Success message and user verification status

#### Forgot Password
- **POST** `/auth/forgot-password`
- **Description**: Send password reset email
- **Request Body:**
```json
{
  "email": "john@example.com"
}
```
- **Response**: Success message

#### Reset Password
- **POST** `/auth/reset-password/:token`
- **Description**: Reset password using reset token
- **Parameters**: `token` - Password reset token from email
- **Request Body:**
```json
{
  "password": "newSecurePassword123"
}
```
- **Response**: Success message

### User Management API (`/api/user`)

#### Get All Users
- **GET** `/user/`
- **Description**: Retrieve list of all users (admin only)
- **Authorization**: Required (JWT Token)
- **Response**: Array of user objects

#### Get User by ID
- **GET** `/user/:id`
- **Description**: Retrieve specific user by ID
- **Authorization**: Required (JWT Token)
- **Parameters**: `id` - User ID
- **Response**: User object

#### Update User Profile
- **PUT** `/user/update/:id`
- **Description**: Update user profile information
- **Authorization**: Required (JWT Token)
- **Parameters**: `id` - User ID
- **Request Body:**
```json
{
  "name": "John Doe Updated",
  "noTelp": "+6281234567899",
  "address": "Updated Address",
  "profileImg": "base64_image_string"
}
```
- **Response**: Updated user object
### Penjahit (Tailor) API (`/api/penjahit`)

#### Get All Tailors
- **GET** `/penjahit/`
- **Description**: Retrieve list of all verified tailors
- **Query Parameters:**
  - `search` - Search by name or description
  - `category` - Filter by category
  - `priceRange` - Filter by price range
- **Response**: Array of penjahit objects with populated user data

**Example Response:**
```json
[
  {
    "_id": "64f1234567890abcdef12346",
    "user": {
      "name": "Jane Smith",
      "profileImg": "https://example.com/jane.jpg",
      "address": "Bandung, Indonesia"
    },
    "description": "Professional tailor specializing in formal wear",
    "rentangHarga": "100000-500000",
    "kategori": ["Formal Wear", "Wedding Dress"],
    "rating": 4.8,
    "isPremium": true,
    "openToWork": true
  }
]
```

#### Get Premium Tailors
- **GET** `/penjahit/premium`
- **Description**: Retrieve list of premium tailors
- **Response**: Array of premium penjahit objects

#### Get Tailor by ID
- **GET** `/penjahit/:id`
- **Description**: Retrieve specific tailor by ID
- **Parameters**: `id` - Penjahit ID
- **Response**: Detailed penjahit object with portfolio and reviews

#### Get Tailor by User ID
- **GET** `/penjahit/user/:id`
- **Description**: Retrieve tailor profile by user ID
- **Parameters**: `id` - User ID
- **Response**: Penjahit object

#### Register as Tailor
- **POST** `/penjahit/register`
- **Description**: Register user as tailor
- **Authorization**: Required (JWT Token)
- **Request Body:**
```json
{
  "description": "Professional tailor with 5+ years experience",
  "dokKTP": "base64_ktp_image",
  "dokPortofolio": ["base64_portfolio1", "base64_portfolio2"],
  "rentangHarga": "100000-500000",
  "kategori": ["category_id1", "category_id2"],
  "isAgreeTerms": true
}
```
- **Response**: Created penjahit object

#### Update Tailor Profile
- **PUT** `/penjahit/update/:id`
- **Description**: Update tailor profile
- **Authorization**: Required (JWT Token)
- **Parameters**: `id` - Penjahit ID
- **Request Body**: Partial penjahit object with fields to update
- **Response**: Updated penjahit object

#### Update Tailor Work Status
- **PUT** `/penjahit/update/status/:id`
- **Description**: Toggle tailor's availability for work
- **Authorization**: Required (JWT Token)
- **Parameters**: `id` - Penjahit ID
- **Request Body:**
```json
{
  "openToWork": true
}
```
- **Response**: Updated penjahit object

### Transaction API (`/api/transaksi`)

#### Get All Transactions
- **GET** `/transaksi/`
- **Description**: Retrieve all public transactions
- **Query Parameters:**
  - `status` - Filter by transaction status
  - `category` - Filter by category
  - `search` - Search in title and description
- **Response**: Array of transaction objects

#### Get Transaction by ID
- **GET** `/transaksi/:id`
- **Description**: Retrieve specific transaction details
- **Parameters**: `id` - Transaction ID
- **Response**: Detailed transaction object with user and penjahit data

**Example Response:**
```json
{
  "_id": "64f1234567890abcdef12347",
  "user": {
    "name": "John Doe",
    "profileImg": "https://example.com/john.jpg"
  },
  "penjahit": {
    "user": {
      "name": "Jane Smith"
    },
    "rating": 4.8
  },
  "judul": "Wedding Dress Alteration",
  "deskripsi": "Need to alter my wedding dress for perfect fit",
  "image": ["https://example.com/dress1.jpg"],
  "tenggatWaktu": "2024-02-15T00:00:00.000Z",
  "alamat": "Jakarta, Indonesia",
  "status": "Diproses",
  "pengerjaan": "diantar ke penjahit",
  "review": []
}
```

#### Get Tailor's Transactions
- **GET** `/transaksi/penjahit/:id`
- **Description**: Get all transactions for a specific tailor
- **Authorization**: Required (JWT Token)
- **Parameters**: `id` - Penjahit ID
- **Response**: Array of transactions assigned to the tailor

#### Get Tailor's Waiting Transactions
- **GET** `/transaksi/penjahit/:id/waiting`
- **Description**: Get pending transaction requests for tailor
- **Authorization**: Required (JWT Token)
- **Parameters**: `id` - Penjahit ID
- **Response**: Array of waiting transactions

#### Create Transaction
- **POST** `/transaksi/create`
- **Description**: Create new tailoring transaction
- **Authorization**: Required (JWT Token)
- **Request Body:**
```json
{
  "judul": "Custom Suit Tailoring",
  "deskripsi": "Need a custom-fitted business suit",
  "image": ["base64_image1", "base64_image2"],
  "tenggatWaktu": "2024-03-01T00:00:00.000Z",
  "alamat": "Jakarta Selatan, Indonesia",
  "pengerjaan": "diantar ke penjahit"
}
```
- **Response**: Created transaction object

#### Create Transaction to Specific Tailor
- **POST** `/transaksi/create/:id`
- **Description**: Create transaction assigned to specific tailor
- **Authorization**: Required (JWT Token)
- **Parameters**: `id` - Penjahit ID
- **Request Body**: Same as create transaction
- **Response**: Created transaction object

#### Accept Transaction (Tailor)
- **PUT** `/transaksi/accept/:id`
- **Description**: Accept transaction request (tailor only)
- **Authorization**: Required (JWT Token)
- **Parameters**: `id` - Transaction ID
- **Response**: Updated transaction with "Diproses" status

#### Reject Transaction (Tailor)
- **PUT** `/transaksi/reject/:id`
- **Description**: Reject transaction request (tailor only)
- **Authorization**: Required (JWT Token)
- **Parameters**: `id` - Transaction ID
- **Request Body:**
```json
{
  "catatan": "Unable to complete within deadline"
}
```
- **Response**: Updated transaction with "Ditolak" status

#### Finish Transaction (Tailor)
- **PUT** `/transaksi/finish/:id`
- **Description**: Mark transaction as completed (tailor only)
- **Authorization**: Required (JWT Token)
- **Parameters**: `id` - Transaction ID
- **Request Body:**
```json
{
  "imageSelesai": ["base64_result1", "base64_result2"],
  "catatan": "Work completed successfully"
}
```
- **Response**: Updated transaction with "Selesai" status

#### Review Transaction (User)
- **PUT** `/transaksi/review/:id`
- **Description**: Add review and rating to completed transaction
- **Authorization**: Required (JWT Token)
- **Parameters**: `id` - Transaction ID
- **Request Body:**
```json
{
  "rating": 5,
  "content": "Excellent work! Very satisfied with the result."
}
```
- **Response**: Updated transaction with review

### Category API (`/api/categories`)

#### Get All Categories
- **GET** `/categories/`
- **Description**: Retrieve all available categories
- **Response**: Array of category objects

**Example Response:**
```json
[
  {
    "_id": "64f1234567890abcdef12348",
    "name": "Formal Wear",
    "createdAt": "2024-01-01T00:00:00.000Z"
  },
  {
    "_id": "64f1234567890abcdef12349",
    "name": "Casual Wear",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
]
```

#### Create Category (Admin Only)
- **POST** `/categories/register`
- **Description**: Create new category
- **Authorization**: Required (Admin JWT Token)
- **Request Body:**
```json
{
  "name": "Traditional Wear"
}
```
- **Response**: Created category object


### Point Product API (`/api/point-product`)

#### Get All Point Products
- **GET** `/point-product/`
- **Description**: Retrieve all available point products for purchase
- **Response**: Array of point product objects

**Example Response:**
```json
[
  {
    "_id": "64f1234567890abcdef1234a",
    "pointName": "Basic Package",
    "point": 5000,
    "price": 50000,
    "createdAt": "2024-01-01T00:00:00.000Z"
  },
  {
    "_id": "64f1234567890abcdef1234b",
    "pointName": "Premium Package",
    "point": 15000,
    "price": 120000,
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
]
```

#### Get Point Product by ID
- **GET** `/point-product/:id`
- **Description**: Retrieve specific point product
- **Parameters**: `id` - Point Product ID
- **Response**: Point product object

#### Create Point Product (Admin Only)
- **POST** `/point-product/register`
- **Description**: Create new point product
- **Authorization**: Required (Admin JWT Token)
- **Request Body:**
```json
{
  "pointName": "Starter Package",
  "point": 2500,
  "price": 25000
}
```
- **Response**: Created point product object

### Transaction Point API (`/api/transaksi-point`)

#### Get Point Transactions
- **GET** `/transaksi-point/`
- **Description**: Retrieve point purchase transactions
- **Authorization**: Required (JWT Token)
- **Response**: Array of point transaction objects

#### Create Point Transaction
- **POST** `/transaksi-point/create`
- **Description**: Purchase points using Midtrans payment
- **Authorization**: Required (JWT Token)
- **Request Body:**
```json
{
  "pointProductId": "64f1234567890abcdef1234a",
  "quantity": 1
}
```
- **Response**: Payment token and transaction details

### Chat API (`/api/chat`)

#### Get Stream Chat Token
- **GET** `/chat/token`
- **Description**: Get Stream Chat authentication token
- **Authorization**: Required (JWT Token)
- **Response**: Stream Chat token for real-time messaging

#### Register User to Stream
- **POST** `/chat/regis-to-stream`
- **Description**: Register user to Stream Chat service (Admin only)
- **Authorization**: Required (Admin JWT Token)
- **Response**: Success message

### Admin API (`/api/admin`)

#### Admin Authentication
- **GET** `/admin/check-admin` - Check admin authentication
- **POST** `/admin/login` - Admin login
- **POST** `/admin/logout` - Admin logout

#### User Management (Admin)
- **GET** `/admin/user` - Get all users
- **GET** `/admin/user/:id` - Get user by ID
- **PUT** `/admin/user/reset-password` - Reset user password
- **DELETE** `/admin/user/:id` - Delete user

#### Tailor Management (Admin)
- **GET** `/admin/penjahit` - Get all tailors
- **GET** `/admin/penjahit/:id` - Get tailor by ID
- **POST** `/admin/penjahit/verify/:id` - Verify tailor application
- **PUT** `/admin/penjahit/premium/:id` - Set tailor premium status
- **DELETE** `/admin/penjahit/:id` - Delete tailor

#### Transaction Management (Admin)
- **GET** `/admin/transaksi` - Get all transactions
- **GET** `/admin/transaksi/:id` - Get transaction by ID

#### Category Management (Admin)
- **GET** `/admin/category` - Get all categories
- **POST** `/admin/category/register` - Create category
- **DELETE** `/admin/category/:id` - Delete category

#### Point Transaction Management (Admin)
- **GET** `/admin/transaksi-point` - Get all point transactions

## Data Models

### User Model
```javascript
{
  name: String (required),
  username: String (required, unique),
  email: String (required),
  password: String (required),
  profileImg: String (default: ""),
  noTelp: String (required, unique),
  address: String (required),
  role: String (default: "user"),
  lastLogin: Date (default: now),
  isVerified: Boolean (default: false),
  resetPasswordToken: String,
  resetPasswordExpiresAt: Date,
  verificationToken: String,
  verificationTokenExpiresAt: Date,
  isAgreeTerms: Boolean (default: false)
}
```

### Penjahit (Tailor) Model
```javascript
{
  user: ObjectId (ref: "User", required),
  description: String (default: ""),
  dokKTP: String (required),
  dokPortofolio: [String] (default: []),
  rentangHarga: String (required),
  kategori: [ObjectId] (ref: "Category"),
  openToWork: Boolean (default: true),
  rating: Number (1-5, default: 5),
  isVerified: String (enum: ["onreview", "diterima", "ditolak"], default: "onreview"),
  isAgreeTerms: Boolean (default: false),
  isPremium: Boolean (default: false),
  point: Number (default: 5000)
}
```

### Transaction Model
```javascript
{
  user: ObjectId (ref: "User", required),
  penjahit: ObjectId (ref: "Penjahit", default: null),
  judul: String (required),
  deskripsi: String (required),
  image: [String] (default: []),
  tenggatWaktu: Date (required),
  alamat: String (required),
  review: [{
    rating: Number (1-5),
    content: String,
    user: ObjectId (ref: "User"),
    createdAt: Date (default: now)
  }],
  status: String (enum: ["Menunggu", "Diproses", "Selesai", "Dibatalkan", "Dibatalkan Sistem", "Ditolak"], default: "Menunggu"),
  pengerjaan: String (enum: ["diantar ke penjahit", "diambil oleh penjahit"], default: "diantar ke penjahit"),
  catatan: String,
  imageSelesai: [String] (default: [])
}
```

### Category Model
```javascript
{
  name: String (required)
}
```

### Point Product Model
```javascript
{
  pointName: String (required),
  point: Number (required),
  price: Number (required)
}
```

## Error Handling

All API endpoints return appropriate HTTP status codes:

- **200 OK**: Successful request
- **201 Created**: Resource created successfully
- **400 Bad Request**: Invalid request data
- **401 Unauthorized**: Authentication required or failed
- **403 Forbidden**: Access denied
- **404 Not Found**: Resource not found
- **500 Internal Server Error**: Server error

**Error Response Format:**
```json
{
  "message": "Error description",
  "error": "Detailed error information (in development mode)"
}
```

## Rate Limiting

API requests are subject to rate limiting to ensure fair usage and prevent abuse. Contact support if you need higher rate limits.

## Support

For API support and questions, contact the development team or check the project repository for issues and documentation updates.


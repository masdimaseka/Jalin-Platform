# Jalin - Tailoring Service Platform

## Overview

Jalin is a comprehensive tailoring service platform that connects customers with professional tailors. The platform provides a seamless experience for users to find tailors, create tailoring requests, manage transactions, and communicate in real-time.

## 🏗️ Architecture

The platform is built with a modern tech stack:

### Backend (Node.js/Express)
- **Framework**: Express.js with ES6 modules
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT with HTTP-only cookies
- **File Storage**: Cloudinary for image uploads
- **Email Service**: Mailtrap for email notifications
- **Payment**: Midtrans for payment processing
- **Real-time Chat**: Stream Chat for messaging
- **Security**: bcrypt for password hashing, CORS protection

### Frontend (React)
- **Framework**: React 19.0.0 with Vite
- **Routing**: React Router DOM 7.2.0
- **State Management**: TanStack Query for server state
- **Styling**: Tailwind CSS 4.0.9 + DaisyUI
- **HTTP Client**: Axios with interceptors
- **Notifications**: React Hot Toast
- **Chat**: Stream Chat React components
- **Animations**: Framer Motion


## 🚀 Quick Start

### Prerequisites
- Node.js 18 or higher
- MongoDB database
- Cloudinary account
- Mailtrap account
- Stream Chat account
- Midtrans account

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd jalin-platform
   ```

2. **Backend Setup**
   ```bash
   cd server
   npm install
   cp .env.example .env
   # Configure your environment variables
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   cd client
   npm install
   cp .env.example .env
   # Configure your environment variables
   npm run dev
   ```

4. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## 🌟 Key Features

### For Customers
- **User Registration & Authentication**: Secure account creation with email verification
- **Tailor Discovery**: Browse and search tailors by location, specialty, and ratings
- **Transaction Management**: Create tailoring requests with detailed specifications
- **Real-time Communication**: Chat with tailors during the project
- **Order Tracking**: Monitor progress from request to completion
- **Review System**: Rate and review completed work

### For Tailors (Penjahit)
- **Professional Registration**: Submit credentials and portfolio for verification
- **Profile Management**: Showcase skills, experience, and work samples
- **Job Management**: Accept, track, and complete tailoring requests
- **Point System**: Earn and purchase points for platform features
- **Premium Features**: Enhanced visibility and additional tools
- **Communication Tools**: Direct messaging with customers

### For Administrators
- **User Management**: Oversee user accounts and verification
- **Tailor Verification**: Review and approve tailor applications
- **Transaction Oversight**: Monitor and manage platform transactions
- **Content Management**: Manage categories, point products, and system settings
- **Analytics Dashboard**: Track platform performance and usage

## 🔧 API Endpoints Overview

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/check-auth` - Verify authentication
- `POST /api/auth/verify-email` - Email verification

### Users
- `GET /api/user/` - Get all users
- `GET /api/user/:id` - Get user by ID
- `PUT /api/user/update/:id` - Update user profile

### Tailors (Penjahit)
- `GET /api/penjahit/` - Get all tailors
- `POST /api/penjahit/register` - Register as tailor
- `PUT /api/penjahit/update/:id` - Update tailor profile

### Transactions
- `GET /api/transaksi/` - Get all transactions
- `POST /api/transaksi/create` - Create new transaction
- `PUT /api/transaksi/accept/:id` - Accept transaction (tailor)
- `PUT /api/transaksi/finish/:id` - Complete transaction

### Admin
- `GET /api/admin/user` - Admin user management
- `GET /api/admin/penjahit` - Admin tailor management
- `POST /api/admin/penjahit/verify/:id` - Verify tailor


## 🧩 Component Architecture

### Core Components
- **Layout Components**: Consistent page structure and navigation
- **Authentication Components**: Login, registration, and profile management
- **Dashboard Components**: Role-based dashboard experiences
- **Transaction Components**: Job creation, management, and tracking
- **Admin Components**: Administrative tools and interfaces

### State Management
- **TanStack Query**: Server state management with caching
- **React Context**: Authentication state and global UI state
- **Local State**: Component-specific state with useState/useReducer

### Routing Structure
```
/                     # Home page
/login               # User login
/signup              # User registration
/dashboard           # Role-based dashboard
/penjahit            # Tailor listings
/penjahit/:id        # Tailor profile
/jahitan             # Job listings
/jahitan/:id         # Job details
/admin/*             # Admin panel routes
```

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt for secure password storage
- **Input Validation**: Server-side validation for all inputs
- **File Upload Security**: Cloudinary integration with type validation
- **CORS Protection**: Configured cross-origin resource sharing
- **Rate Limiting**: API request throttling (recommended for production)

## 🎨 UI/UX Features

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Dark/Light Mode**: Theme switching capability
- **Accessibility**: WCAG compliant components
- **Loading States**: Skeleton screens and loading indicators
- **Error Handling**: User-friendly error messages
- **Animations**: Smooth transitions with Framer Motion

## 📱 Real-time Features

- **Chat System**: Stream Chat integration for user-tailor communication
- **Live Notifications**: Real-time updates for transaction status
- **Background Sync**: Automatic data synchronization

## 💳 Payment Integration

- **Midtrans Integration**: Secure payment processing for point purchases
- **Point System**: Virtual currency for platform features
- **Transaction History**: Detailed payment and point transaction records

## 🔧 Development

### Project Structure
```
jalin-platform/
├── server/                 # Backend application
│   ├── controllers/       # Route controllers
│   ├── models/           # Database models
│   ├── routes/           # API routes
│   ├── middleware/       # Custom middleware
│   ├── lib/              # Utility libraries
│   └── index.js          # Server entry point
├── client/                # Frontend application
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── pages/        # Page components
│   │   ├── queries/      # TanStack Query hooks
│   │   ├── lib/          # Utility functions
│   │   └── App.jsx       # Main app component
│   └── public/           # Static assets
├── API_DOCUMENTATION.md   # Complete API reference
├── COMPONENT_DOCUMENTATION.md # React components guide
├── USAGE_GUIDE.md        # Implementation examples
└── README.md             # This file
```

### Environment Variables

#### Backend (.env)
```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/jalin
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
MAILTRAP_TOKEN=your_mailtrap_token
STREAM_API_KEY=your_stream_api_key
STREAM_API_SECRET=your_stream_secret
MIDTRANS_SERVER_KEY=your_midtrans_server_key
MIDTRANS_CLIENT_KEY=your_midtrans_client_key
```

#### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
VITE_STREAM_CHAT_API_KEY=your_stream_api_key
VITE_MIDTRANS_CLIENT_KEY=your_midtrans_client_key
```

## 🧪 Testing

The platform includes comprehensive testing strategies:
- **Unit Tests**: Component and utility function testing
- **Integration Tests**: API endpoint testing
- **E2E Tests**: Complete user flow testing
- **Performance Tests**: Load and stress testing

## 🚀 Deployment

### Production Considerations
- **Environment Configuration**: Secure production environment variables
- **Database**: MongoDB Atlas or self-hosted MongoDB
- **File Storage**: Cloudinary for production image storage
- **Email Service**: Production email service configuration
- **SSL/HTTPS**: Secure communication protocols
- **Monitoring**: Application performance monitoring
- **Backup**: Regular database and file backups

### Deployment Options
- **Vercel/Netlify**: Frontend deployment
- **Railway/Render**: Full-stack deployment
- **AWS/GCP**: Cloud infrastructure deployment
- **Docker**: Containerized deployment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support, questions, or feature requests:
- Create an issue in the repository
- Contact the development team
- Check the documentation for detailed guides

## 📈 Roadmap

Future enhancements planned:
- Mobile application (React Native)
- Advanced analytics dashboard
- Multi-language support
- AI-powered tailor matching
- Video consultation features
- Bulk order management
- Integration with shipping providers

---

**Built with ❤️ by the Jalin Development Team**

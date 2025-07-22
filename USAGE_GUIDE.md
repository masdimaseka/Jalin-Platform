# Jalin Platform Usage Guide

## Overview
This comprehensive guide provides detailed instructions and examples for using the Jalin tailoring service platform, including both API usage and frontend component implementation.

## Table of Contents
1. [Getting Started](#getting-started)
2. [API Usage Examples](#api-usage-examples)
3. [Component Usage Examples](#component-usage-examples)
4. [Authentication Flow](#authentication-flow)
5. [Transaction Workflow](#transaction-workflow)
6. [Admin Panel Usage](#admin-panel-usage)
7. [Integration Examples](#integration-examples)
8. [Best Practices](#best-practices)

## Getting Started

### Prerequisites
- Node.js 18+ installed
- MongoDB database
- Cloudinary account for image storage
- Mailtrap account for email services
- Stream Chat account for real-time messaging
- Midtrans account for payment processing

### Installation

#### Backend Setup
```bash
# Clone the repository
git clone <repository-url>
cd server

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Start the server
npm run dev
```

#### Frontend Setup
```bash
# Navigate to client directory
cd client

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Start the development server
npm run dev
```

### Environment Variables

#### Backend (.env)
```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/jalin
JWT_SECRET=your_jwt_secret_here
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
MAILTRAP_TOKEN=your_mailtrap_token
STREAM_API_KEY=your_stream_api_key
STREAM_API_SECRET=your_stream_api_secret
MIDTRANS_SERVER_KEY=your_midtrans_server_key
MIDTRANS_CLIENT_KEY=your_midtrans_client_key
```

#### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
VITE_STREAM_CHAT_API_KEY=your_stream_api_key
```

## API Usage Examples

### Authentication

#### User Registration
```javascript
const registerUser = async (userData) => {
  try {
    const response = await fetch('http://localhost:5000/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: userData.name,
        username: userData.username,
        email: userData.email,
        password: userData.password,
        noTelp: userData.phone,
        address: userData.address,
        isAgreeTerms: true
      })
    });
    
    const data = await response.json();
    if (response.ok) {
      console.log('Registration successful:', data);
      // Redirect to email verification
    } else {
      console.error('Registration failed:', data.message);
    }
  } catch (error) {
    console.error('Network error:', error);
  }
};

// Usage
registerUser({
  name: 'John Doe',
  username: 'johndoe',
  email: 'john@example.com',
  password: 'securePassword123',
  phone: '+6281234567890',
  address: 'Jakarta, Indonesia'
});
```

#### User Login
```javascript
const loginUser = async (credentials) => {
  try {
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Important for cookies
      body: JSON.stringify(credentials)
    });
    
    const data = await response.json();
    if (response.ok) {
      console.log('Login successful:', data);
      // User data is returned, JWT is set in cookie
      return data;
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};

// Usage
loginUser({
  username: 'johndoe',
  password: 'securePassword123'
}).then(user => {
  // Handle successful login
  console.log('Logged in user:', user);
}).catch(error => {
  // Handle login error
  console.error('Login error:', error.message);
});
```

#### Check Authentication Status
```javascript
const checkAuthStatus = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/auth/check-auth', {
      method: 'GET',
      credentials: 'include', // Include cookies
    });
    
    if (response.ok) {
      const user = await response.json();
      return user;
    } else {
      return null; // User not authenticated
    }
  } catch (error) {
    console.error('Auth check failed:', error);
    return null;
  }
};

// Usage
checkAuthStatus().then(user => {
  if (user) {
    console.log('User is authenticated:', user);
  } else {
    console.log('User is not authenticated');
    // Redirect to login
  }
});
```

### Tailor Management

#### Get All Tailors
```javascript
const getTailors = async (filters = {}) => {
  try {
    const params = new URLSearchParams();
    if (filters.search) params.append('search', filters.search);
    if (filters.category) params.append('category', filters.category);
    if (filters.priceRange) params.append('priceRange', filters.priceRange);
    
    const response = await fetch(`http://localhost:5000/api/penjahit?${params}`);
    const tailors = await response.json();
    
    if (response.ok) {
      return tailors;
    } else {
      throw new Error('Failed to fetch tailors');
    }
  } catch (error) {
    console.error('Error fetching tailors:', error);
    throw error;
  }
};

// Usage
getTailors({
  search: 'formal wear',
  category: 'wedding',
  priceRange: '100000-500000'
}).then(tailors => {
  console.log('Found tailors:', tailors);
  tailors.forEach(tailor => {
    console.log(`${tailor.user.name} - Rating: ${tailor.rating}`);
  });
});
```

#### Register as Tailor
```javascript
const registerAsTailor = async (tailorData, authToken) => {
  try {
    const formData = new FormData();
    formData.append('description', tailorData.description);
    formData.append('rentangHarga', tailorData.priceRange);
    formData.append('isAgreeTerms', tailorData.agreeTerms);
    
    // Handle file uploads
    if (tailorData.ktpImage) {
      formData.append('dokKTP', tailorData.ktpImage);
    }
    
    tailorData.portfolioImages.forEach((image, index) => {
      formData.append(`dokPortofolio`, image);
    });
    
    tailorData.categories.forEach(categoryId => {
      formData.append('kategori', categoryId);
    });
    
    const response = await fetch('http://localhost:5000/api/penjahit/register', {
      method: 'POST',
      credentials: 'include',
      body: formData
    });
    
    const result = await response.json();
    if (response.ok) {
      console.log('Tailor registration successful:', result);
      return result;
    } else {
      throw new Error(result.message);
    }
  } catch (error) {
    console.error('Tailor registration failed:', error);
    throw error;
  }
};

// Usage
const tailorData = {
  description: 'Professional tailor with 5+ years experience',
  priceRange: '100000-500000',
  agreeTerms: true,
  ktpImage: ktpFile, // File object
  portfolioImages: [portfolio1, portfolio2], // Array of File objects
  categories: ['categoryId1', 'categoryId2']
};

registerAsTailor(tailorData).then(result => {
  console.log('Registration submitted for review');
}).catch(error => {
  console.error('Registration failed:', error.message);
});
```

### Transaction Management

#### Create Transaction
```javascript
const createTransaction = async (transactionData) => {
  try {
    const formData = new FormData();
    formData.append('judul', transactionData.title);
    formData.append('deskripsi', transactionData.description);
    formData.append('tenggatWaktu', transactionData.deadline);
    formData.append('alamat', transactionData.address);
    formData.append('pengerjaan', transactionData.workType);
    
    // Handle image uploads
    transactionData.images.forEach((image) => {
      formData.append('image', image);
    });
    
    const response = await fetch('http://localhost:5000/api/transaksi/create', {
      method: 'POST',
      credentials: 'include',
      body: formData
    });
    
    const result = await response.json();
    if (response.ok) {
      console.log('Transaction created:', result);
      return result;
    } else {
      throw new Error(result.message);
    }
  } catch (error) {
    console.error('Transaction creation failed:', error);
    throw error;
  }
};

// Usage
const transactionData = {
  title: 'Custom Wedding Dress',
  description: 'Need a custom wedding dress with specific measurements',
  deadline: '2024-03-15T00:00:00.000Z',
  address: 'Jakarta Selatan, Indonesia',
  workType: 'diantar ke penjahit',
  images: [image1, image2] // Array of File objects
};

createTransaction(transactionData).then(transaction => {
  console.log('Transaction created successfully:', transaction._id);
}).catch(error => {
  console.error('Failed to create transaction:', error.message);
});
```

#### Accept Transaction (Tailor)
```javascript
const acceptTransaction = async (transactionId) => {
  try {
    const response = await fetch(`http://localhost:5000/api/transaksi/accept/${transactionId}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    const result = await response.json();
    if (response.ok) {
      console.log('Transaction accepted:', result);
      return result;
    } else {
      throw new Error(result.message);
    }
  } catch (error) {
    console.error('Failed to accept transaction:', error);
    throw error;
  }
};

// Usage
acceptTransaction('64f1234567890abcdef12347').then(transaction => {
  console.log('Transaction status:', transaction.status); // Should be "Diproses"
}).catch(error => {
  console.error('Accept failed:', error.message);
});
```

#### Complete Transaction (Tailor)
```javascript
const completeTransaction = async (transactionId, completionData) => {
  try {
    const formData = new FormData();
    formData.append('catatan', completionData.notes);
    
    // Handle result images
    completionData.resultImages.forEach((image) => {
      formData.append('imageSelesai', image);
    });
    
    const response = await fetch(`http://localhost:5000/api/transaksi/finish/${transactionId}`, {
      method: 'PUT',
      credentials: 'include',
      body: formData
    });
    
    const result = await response.json();
    if (response.ok) {
      console.log('Transaction completed:', result);
      return result;
    } else {
      throw new Error(result.message);
    }
  } catch (error) {
    console.error('Failed to complete transaction:', error);
    throw error;
  }
};

// Usage
const completionData = {
  notes: 'Work completed successfully. Customer can pick up anytime.',
  resultImages: [resultImage1, resultImage2] // Array of File objects
};

completeTransaction('64f1234567890abcdef12347', completionData).then(transaction => {
  console.log('Transaction completed successfully');
}).catch(error => {
  console.error('Completion failed:', error.message);
});
```

#### Add Review (User)
```javascript
const addReview = async (transactionId, reviewData) => {
  try {
    const response = await fetch(`http://localhost:5000/api/transaksi/review/${transactionId}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reviewData)
    });
    
    const result = await response.json();
    if (response.ok) {
      console.log('Review added:', result);
      return result;
    } else {
      throw new Error(result.message);
    }
  } catch (error) {
    console.error('Failed to add review:', error);
    throw error;
  }
};

// Usage
const reviewData = {
  rating: 5,
  content: 'Excellent work! Very professional and timely delivery.'
};

addReview('64f1234567890abcdef12347', reviewData).then(transaction => {
  console.log('Review added successfully');
}).catch(error => {
  console.error('Review failed:', error.message);
});
```

### Point System

#### Get Point Products
```javascript
const getPointProducts = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/point-product');
    const products = await response.json();
    
    if (response.ok) {
      return products;
    } else {
      throw new Error('Failed to fetch point products');
    }
  } catch (error) {
    console.error('Error fetching point products:', error);
    throw error;
  }
};

// Usage
getPointProducts().then(products => {
  console.log('Available point products:');
  products.forEach(product => {
    console.log(`${product.pointName}: ${product.point} points for Rp ${product.price}`);
  });
});
```

#### Purchase Points
```javascript
const purchasePoints = async (productId, quantity = 1) => {
  try {
    const response = await fetch('http://localhost:5000/api/transaksi-point/create', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        pointProductId: productId,
        quantity: quantity
      })
    });
    
    const result = await response.json();
    if (response.ok) {
      console.log('Payment token received:', result);
      // Use the token with Midtrans
      return result;
    } else {
      throw new Error(result.message);
    }
  } catch (error) {
    console.error('Point purchase failed:', error);
    throw error;
  }
};

// Usage
purchasePoints('64f1234567890abcdef1234a', 2).then(paymentData => {
  // Integrate with Midtrans payment
  console.log('Proceed to payment with token:', paymentData.token);
}).catch(error => {
  console.error('Purchase failed:', error.message);
});
```
## Component Usage Examples

### Using Authentication Components

#### Login Form Integration
```jsx
import React from 'react';
import { useLogin } from '../queries/auth/authMutation';
import { toast } from 'react-hot-toast';

const LoginPage = () => {
  const { mutate: login, isPending } = useLogin();
  
  const handleLogin = (formData) => {
    login(formData, {
      onSuccess: (data) => {
        toast.success('Login successful!');
        // Redirect to dashboard
        window.location.href = '/dashboard';
      },
      onError: (error) => {
        toast.error(error.message || 'Login failed');
      }
    });
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6">Login to Jalin</h2>
        <LoginForm onSubmit={handleLogin} isLoading={isPending} />
      </div>
    </div>
  );
};

export default LoginPage;
```

#### Registration Form Usage
```jsx
import React from 'react';
import { useSignUp } from '../queries/auth/authMutation';
import SignUpForm from '../components/auth/SignUpForm';

const SignUpPage = () => {
  const { mutate: signUp, isPending } = useSignUp();
  
  const handleSignUp = (userData) => {
    signUp(userData, {
      onSuccess: () => {
        // Redirect to email verification
        window.location.href = '/verify-email';
      },
      onError: (error) => {
        console.error('Registration failed:', error);
      }
    });
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Create Your Account</h1>
        <SignUpForm onSubmit={handleSignUp} isLoading={isPending} />
      </div>
    </div>
  );
};

export default SignUpPage;
```

### Using Transaction Components

#### Transaction List Implementation
```jsx
import React from 'react';
import { useTransaksi } from '../queries/transaksi/transaksiQuery';
import ListTransaksi from '../components/transaksi/ListTransaksi';
import { useAuthUser } from '../queries/auth/authQuery';

const TransactionListPage = () => {
  const { data: authUser } = useAuthUser();
  const { data: transactions, isLoading, error } = useTransaksi({
    userId: authUser?._id
  });
  
  if (isLoading) return <div className="loading loading-spinner"></div>;
  if (error) return <div className="alert alert-error">{error.message}</div>;
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Transactions</h1>
      <ListTransaksi 
        transactions={transactions}
        loading={isLoading}
        showActions={true}
        userType="user"
      />
    </div>
  );
};

export default TransactionListPage;
```

#### Transaction Creation Form
```jsx
import React, { useState } from 'react';
import { useCreateTransaksi } from '../queries/transaksi/transaksiMutation';
import InputTransaksi from '../components/transaksi/InputTransaksi';
import { toast } from 'react-hot-toast';

const CreateTransactionPage = () => {
  const { mutate: createTransaction, isPending } = useCreateTransaksi();
  
  const handleCreateTransaction = (transactionData) => {
    createTransaction(transactionData, {
      onSuccess: (data) => {
        toast.success('Transaction created successfully!');
        // Redirect to transaction detail
        window.location.href = `/jahitan/${data._id}`;
      },
      onError: (error) => {
        toast.error(error.message || 'Failed to create transaction');
      }
    });
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Create New Transaction</h1>
      <InputTransaksi 
        onSubmit={handleCreateTransaction}
        isLoading={isPending}
      />
    </div>
  );
};

export default CreateTransactionPage;
```

### Using Dashboard Components

#### User Dashboard Implementation
```jsx
import React from 'react';
import { useAuthUser } from '../queries/auth/authQuery';
import { useTransaksi } from '../queries/transaksi/transaksiQuery';
import DashboardUser from '../components/dashboard/DashboardUser';

const UserDashboard = () => {
  const { data: authUser, isLoading: userLoading } = useAuthUser();
  const { data: userTransactions } = useTransaksi({
    userId: authUser?._id,
    limit: 5 // Recent transactions
  });
  
  if (userLoading) return <div className="loading loading-spinner"></div>;
  
  const dashboardData = {
    user: authUser,
    recentTransactions: userTransactions,
    stats: {
      totalTransactions: userTransactions?.length || 0,
      completedTransactions: userTransactions?.filter(t => t.status === 'Selesai').length || 0,
      pendingTransactions: userTransactions?.filter(t => t.status === 'Menunggu').length || 0
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <DashboardUser {...dashboardData} />
    </div>
  );
};

export default UserDashboard;
```

#### Tailor Dashboard Implementation
```jsx
import React from 'react';
import { useAuthPenjahit } from '../queries/auth/authQuery';
import { useTransaksiPenjahit } from '../queries/transaksi/transaksiQuery';
import DashboardPenjahit from '../components/dashboard/DashboardPenjahit';

const TailorDashboard = () => {
  const { data: authPenjahit, isLoading } = useAuthPenjahit();
  const { data: tailorTransactions } = useTransaksiPenjahit(authPenjahit?._id);
  
  if (isLoading) return <div className="loading loading-spinner"></div>;
  
  return (
    <div className="container mx-auto px-4 py-8">
      <DashboardPenjahit 
        penjahit={authPenjahit}
        transactions={tailorTransactions}
      />
    </div>
  );
};

export default TailorDashboard;
```

### Using Query Hooks

#### Custom Hook for Filtered Data
```jsx
import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../lib/axios';

export const useFilteredTailors = (filters) => {
  return useQuery({
    queryKey: ['tailors', filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filters.search) params.append('search', filters.search);
      if (filters.category) params.append('category', filters.category);
      if (filters.priceRange) params.append('priceRange', filters.priceRange);
      
      const response = await axiosInstance.get(`/penjahit?${params}`);
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: !!filters // Only run when filters are provided
  });
};

// Usage in component
const TailorListPage = () => {
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    priceRange: ''
  });
  
  const { data: tailors, isLoading, error } = useFilteredTailors(filters);
  
  return (
    <div>
      <FilterForm onFilterChange={setFilters} />
      {isLoading ? (
        <div className="loading loading-spinner"></div>
      ) : (
        <TailorGrid tailors={tailors} />
      )}
    </div>
  );
};
```

## Authentication Flow

### Complete Authentication Implementation

```jsx
// AuthProvider.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuthUser } from '../queries/auth/authQuery';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { data: user, isLoading, error } = useAuthUser();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    setIsAuthenticated(!!user);
  }, [user]);
  
  const value = {
    user,
    isAuthenticated,
    isLoading,
    error
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

// ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';

const ProtectedRoute = ({ children, requireAuth = true, requireRole = null }) => {
  const { user, isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return <div className="loading loading-spinner"></div>;
  }
  
  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (requireRole && user?.role !== requireRole) {
    return <Navigate to="/unauthorized" replace />;
  }
  
  return children;
};

export default ProtectedRoute;

// Usage in App.jsx
import { AuthProvider } from './components/AuthProvider';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        } />
        
        <Route path="/admin/*" element={
          <ProtectedRoute requireRole="admin">
            <AdminRoutes />
          </ProtectedRoute>
        } />
      </Routes>
    </AuthProvider>
  );
}
```

## Transaction Workflow

### Complete Transaction Lifecycle

```jsx
// TransactionWorkflow.jsx
import React, { useState, useEffect } from 'react';
import { useTransaction } from '../queries/transaksi/transaksiQuery';
import { useUpdateTransaksi } from '../queries/transaksi/transaksiMutation';

const TransactionWorkflow = ({ transactionId, userRole }) => {
  const { data: transaction, isLoading } = useTransaction(transactionId);
  const { mutate: updateTransaction } = useUpdateTransaksi();
  
  const handleStatusUpdate = (newStatus, data = {}) => {
    updateTransaction({
      id: transactionId,
      status: newStatus,
      ...data
    }, {
      onSuccess: () => {
        // Refresh transaction data
        queryClient.invalidateQueries(['transaction', transactionId]);
      }
    });
  };
  
  const renderActions = () => {
    if (!transaction) return null;
    
    const { status } = transaction;
    
    if (userRole === 'penjahit') {
      switch (status) {
        case 'Menunggu':
          return (
            <div className="flex gap-2">
              <button 
                className="btn btn-success"
                onClick={() => handleStatusUpdate('Diproses')}
              >
                Accept
              </button>
              <button 
                className="btn btn-error"
                onClick={() => handleStatusUpdate('Ditolak')}
              >
                Reject
              </button>
            </div>
          );
          
        case 'Diproses':
          return (
            <button 
              className="btn btn-primary"
              onClick={() => handleStatusUpdate('Selesai', {
                completionImages: selectedImages,
                notes: completionNotes
              })}
            >
              Mark Complete
            </button>
          );
          
        default:
          return null;
      }
    }
    
    if (userRole === 'user' && status === 'Selesai') {
      return (
        <button 
          className="btn btn-secondary"
          onClick={() => handleStatusUpdate('Reviewed', {
            rating: userRating,
            review: userReview
          })}
        >
          Add Review
        </button>
      );
    }
    
    return null;
  };
  
  if (isLoading) return <div className="loading loading-spinner"></div>;
  
  return (
    <div className="transaction-workflow">
      <div className="status-indicator">
        <div className={`badge ${getStatusColor(transaction.status)}`}>
          {transaction.status}
        </div>
      </div>
      
      <div className="transaction-details">
        <h3>{transaction.judul}</h3>
        <p>{transaction.deskripsi}</p>
        {transaction.image && (
          <div className="image-gallery">
            {transaction.image.map((img, index) => (
              <img key={index} src={img} alt="Transaction" />
            ))}
          </div>
        )}
      </div>
      
      <div className="actions">
        {renderActions()}
      </div>
    </div>
  );
};

const getStatusColor = (status) => {
  switch (status) {
    case 'Menunggu': return 'badge-warning';
    case 'Diproses': return 'badge-info';
    case 'Selesai': return 'badge-success';
    case 'Ditolak': return 'badge-error';
    default: return 'badge-neutral';
  }
};

export default TransactionWorkflow;
```

## Admin Panel Usage

### Admin Dashboard Implementation

```jsx
// AdminDashboard.jsx
import React from 'react';
import { useAdminStats } from '../queries/admin/adminQuery';
import { 
  useAdminUsers, 
  useAdminPenjahit, 
  useAdminTransaksi 
} from '../queries/admin/adminQuery';

const AdminDashboard = () => {
  const { data: stats } = useAdminStats();
  const { data: users } = useAdminUsers({ limit: 5 });
  const { data: tailors } = useAdminPenjahit({ limit: 5 });
  const { data: transactions } = useAdminTransaksi({ limit: 5 });
  
  return (
    <div className="admin-dashboard">
      <div className="stats shadow mb-8">
        <div className="stat">
          <div className="stat-title">Total Users</div>
          <div className="stat-value">{stats?.totalUsers || 0}</div>
        </div>
        <div className="stat">
          <div className="stat-title">Total Tailors</div>
          <div className="stat-value">{stats?.totalTailors || 0}</div>
        </div>
        <div className="stat">
          <div className="stat-title">Total Transactions</div>
          <div className="stat-value">{stats?.totalTransactions || 0}</div>
        </div>
        <div className="stat">
          <div className="stat-title">Revenue</div>
          <div className="stat-value">Rp {stats?.totalRevenue || 0}</div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Recent Users</h2>
            <div className="overflow-x-auto">
              <table className="table table-compact">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {users?.map(user => (
                    <tr key={user._id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>
                        <div className={`badge ${user.isVerified ? 'badge-success' : 'badge-warning'}`}>
                          {user.isVerified ? 'Verified' : 'Pending'}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Recent Tailors</h2>
            <div className="overflow-x-auto">
              <table className="table table-compact">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Status</th>
                    <th>Rating</th>
                  </tr>
                </thead>
                <tbody>
                  {tailors?.map(tailor => (
                    <tr key={tailor._id}>
                      <td>{tailor.user.name}</td>
                      <td>
                        <div className={`badge ${getVerificationBadge(tailor.isVerified)}`}>
                          {tailor.isVerified}
                        </div>
                      </td>
                      <td>{tailor.rating}/5</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const getVerificationBadge = (status) => {
  switch (status) {
    case 'diterima': return 'badge-success';
    case 'onreview': return 'badge-warning';
    case 'ditolak': return 'badge-error';
    default: return 'badge-neutral';
  }
};

export default AdminDashboard;
```

### Admin CRUD Operations

```jsx
// AdminUserManagement.jsx
import React, { useState } from 'react';
import { 
  useAdminUsers, 
  useDeleteUser, 
  useResetUserPassword 
} from '../queries/admin/adminQuery';

const AdminUserManagement = () => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const { data: users, isLoading } = useAdminUsers();
  const { mutate: deleteUser } = useDeleteUser();
  const { mutate: resetPassword } = useResetUserPassword();
  
  const handleDeleteUser = (userId) => {
    if (confirm('Are you sure you want to delete this user?')) {
      deleteUser(userId, {
        onSuccess: () => {
          toast.success('User deleted successfully');
        }
      });
    }
  };
  
  const handleResetPassword = (userId) => {
    resetPassword(userId, {
      onSuccess: () => {
        toast.success('Password reset email sent');
      }
    });
  };
  
  const handleBulkAction = (action) => {
    if (selectedUsers.length === 0) {
      toast.warning('Please select users first');
      return;
    }
    
    switch (action) {
      case 'delete':
        if (confirm(`Delete ${selectedUsers.length} users?`)) {
          selectedUsers.forEach(userId => deleteUser(userId));
        }
        break;
      case 'reset':
        selectedUsers.forEach(userId => resetPassword(userId));
        break;
    }
    
    setSelectedUsers([]);
  };
  
  if (isLoading) return <div className="loading loading-spinner"></div>;
  
  return (
    <div className="admin-user-management">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">User Management</h1>
        <div className="flex gap-2">
          <button 
            className="btn btn-error btn-sm"
            onClick={() => handleBulkAction('delete')}
            disabled={selectedUsers.length === 0}
          >
            Delete Selected ({selectedUsers.length})
          </button>
          <button 
            className="btn btn-warning btn-sm"
            onClick={() => handleBulkAction('reset')}
            disabled={selectedUsers.length === 0}
          >
            Reset Password Selected
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>
                <input 
                  type="checkbox" 
                  className="checkbox"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedUsers(users.map(u => u._id));
                    } else {
                      setSelectedUsers([]);
                    }
                  }}
                />
              </th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users?.map(user => (
              <tr key={user._id}>
                <td>
                  <input 
                    type="checkbox" 
                    className="checkbox"
                    checked={selectedUsers.includes(user._id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedUsers([...selectedUsers, user._id]);
                      } else {
                        setSelectedUsers(selectedUsers.filter(id => id !== user._id));
                      }
                    }}
                  />
                </td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.noTelp}</td>
                <td>
                  <div className={`badge ${user.isVerified ? 'badge-success' : 'badge-warning'}`}>
                    {user.isVerified ? 'Verified' : 'Unverified'}
                  </div>
                </td>
                <td>
                  <div className="flex gap-2">
                    <button 
                      className="btn btn-sm btn-info"
                      onClick={() => window.location.href = `/admin/user/${user._id}`}
                    >
                      View
                    </button>
                    <button 
                      className="btn btn-sm btn-warning"
                      onClick={() => handleResetPassword(user._id)}
                    >
                      Reset Password
                    </button>
                    <button 
                      className="btn btn-sm btn-error"
                      onClick={() => handleDeleteUser(user._id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUserManagement;
```


## Integration Examples

### Stream Chat Integration

```jsx
// ChatIntegration.jsx
import React, { useEffect, useState } from 'react';
import { StreamChat } from 'stream-chat';
import { Chat, Channel, ChannelHeader, MessageList, MessageInput } from 'stream-chat-react';
import { useAuthUser } from '../queries/auth/authQuery';
import { axiosInstance } from '../lib/axios';

const ChatIntegration = ({ transactionId, participantId }) => {
  const { data: authUser } = useAuthUser();
  const [client, setClient] = useState(null);
  const [channel, setChannel] = useState(null);

  useEffect(() => {
    const initChat = async () => {
      if (!authUser) return;

      try {
        // Get Stream Chat token from backend
        const response = await axiosInstance.get('/chat/token');
        const { token } = response.data;

        // Initialize Stream Chat client
        const chatClient = StreamChat.getInstance(process.env.VITE_STREAM_CHAT_API_KEY);
        
        await chatClient.connectUser(
          {
            id: authUser._id,
            name: authUser.name,
            image: authUser.profileImg
          },
          token
        );

        // Create or get channel
        const channelId = `transaction-${transactionId}`;
        const chatChannel = chatClient.channel('messaging', channelId, {
          name: `Transaction ${transactionId}`,
          members: [authUser._id, participantId]
        });

        await chatChannel.watch();

        setClient(chatClient);
        setChannel(chatChannel);
      } catch (error) {
        console.error('Chat initialization failed:', error);
      }
    };

    initChat();

    return () => {
      if (client) {
        client.disconnectUser();
      }
    };
  }, [authUser, transactionId, participantId]);

  if (!client || !channel) {
    return <div className="loading loading-spinner"></div>;
  }

  return (
    <div className="chat-container h-96">
      <Chat client={client} theme="messaging light">
        <Channel channel={channel}>
          <ChannelHeader />
          <MessageList />
          <MessageInput />
        </Channel>
      </Chat>
    </div>
  );
};

export default ChatIntegration;
```

### Midtrans Payment Integration

```jsx
// PaymentIntegration.jsx
import React, { useEffect } from 'react';

const PaymentIntegration = ({ paymentToken, onSuccess, onError, onPending }) => {
  useEffect(() => {
    // Load Midtrans Snap script
    const script = document.createElement('script');
    script.src = 'https://app.sandbox.midtrans.com/snap/snap.js';
    script.setAttribute('data-client-key', process.env.VITE_MIDTRANS_CLIENT_KEY);
    document.body.appendChild(script);

    script.onload = () => {
      if (paymentToken) {
        window.snap.pay(paymentToken, {
          onSuccess: (result) => {
            console.log('Payment success:', result);
            onSuccess(result);
          },
          onPending: (result) => {
            console.log('Payment pending:', result);
            onPending(result);
          },
          onError: (result) => {
            console.log('Payment error:', result);
            onError(result);
          },
          onClose: () => {
            console.log('Payment popup closed');
          }
        });
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, [paymentToken, onSuccess, onError, onPending]);

  return (
    <div className="payment-integration">
      <button 
        className="btn btn-primary"
        onClick={() => {
          if (window.snap && paymentToken) {
            window.snap.pay(paymentToken);
          }
        }}
      >
        Pay with Midtrans
      </button>
    </div>
  );
};

// Usage in Point Purchase
const PointPurchase = () => {
  const [paymentToken, setPaymentToken] = useState(null);
  const { mutate: createPointTransaction } = useCreatePointTransaction();

  const handlePurchase = (productId) => {
    createPointTransaction({ productId }, {
      onSuccess: (data) => {
        setPaymentToken(data.token);
      }
    });
  };

  const handlePaymentSuccess = (result) => {
    // Update user points
    toast.success('Payment successful! Points added to your account.');
    // Refresh user data
    queryClient.invalidateQueries(['authUser']);
  };

  return (
    <div>
      <PointProductList onPurchase={handlePurchase} />
      {paymentToken && (
        <PaymentIntegration
          paymentToken={paymentToken}
          onSuccess={handlePaymentSuccess}
          onError={() => toast.error('Payment failed')}
          onPending={() => toast.info('Payment pending')}
        />
      )}
    </div>
  );
};

export default PaymentIntegration;
```

### Image Upload with Cloudinary

```jsx
// ImageUpload.jsx
import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const ImageUpload = ({ onUpload, multiple = false, maxFiles = 1 }) => {
  const [uploading, setUploading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);

  const onDrop = useCallback(async (acceptedFiles) => {
    setUploading(true);
    
    try {
      const uploadPromises = acceptedFiles.map(async (file) => {
        const formData = new FormData();
        formData.append('image', file);
        
        const response = await axiosInstance.post('/upload/image', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        
        return response.data.url;
      });

      const urls = await Promise.all(uploadPromises);
      setUploadedImages(prev => [...prev, ...urls]);
      onUpload(multiple ? urls : urls[0]);
    } catch (error) {
      console.error('Upload failed:', error);
      toast.error('Image upload failed');
    } finally {
      setUploading(false);
    }
  }, [onUpload, multiple]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif']
    },
    maxFiles: multiple ? maxFiles : 1,
    multiple
  });

  return (
    <div className="image-upload">
      <div 
        {...getRootProps()} 
        className={`border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-gray-400 ${
          isDragActive ? 'border-blue-500 bg-blue-50' : ''
        }`}
      >
        <input {...getInputProps()} />
        {uploading ? (
          <div className="loading loading-spinner"></div>
        ) : (
          <div>
            <p className="text-gray-500">
              {isDragActive 
                ? 'Drop the images here...' 
                : 'Drag & drop images here, or click to select'
              }
            </p>
            <p className="text-sm text-gray-400 mt-2">
              {multiple ? `Max ${maxFiles} files` : 'Single file only'}
            </p>
          </div>
        )}
      </div>
      
      {uploadedImages.length > 0 && (
        <div className="mt-4 grid grid-cols-3 gap-2">
          {uploadedImages.map((url, index) => (
            <div key={index} className="relative">
              <img 
                src={url} 
                alt={`Upload ${index + 1}`} 
                className="w-full h-20 object-cover rounded"
              />
              <button
                className="absolute top-1 right-1 btn btn-xs btn-circle btn-error"
                onClick={() => {
                  const newImages = uploadedImages.filter((_, i) => i !== index);
                  setUploadedImages(newImages);
                  onUpload(multiple ? newImages : null);
                }}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
```

## Best Practices

### API Integration Best Practices

#### Error Handling
```jsx
// errorHandler.js
export const handleApiError = (error) => {
  if (error.response) {
    // Server responded with error status
    const { status, data } = error.response;
    
    switch (status) {
      case 401:
        // Redirect to login
        window.location.href = '/login';
        break;
      case 403:
        toast.error('Access denied');
        break;
      case 404:
        toast.error('Resource not found');
        break;
      case 500:
        toast.error('Server error. Please try again later.');
        break;
      default:
        toast.error(data.message || 'An error occurred');
    }
  } else if (error.request) {
    // Network error
    toast.error('Network error. Please check your connection.');
  } else {
    toast.error('An unexpected error occurred');
  }
};

// Usage in query hooks
export const useTransaksi = (params) => {
  return useQuery({
    queryKey: ['transaksi', params],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get('/transaksi', { params });
        return response.data;
      } catch (error) {
        handleApiError(error);
        throw error;
      }
    },
    retry: (failureCount, error) => {
      // Don't retry on 4xx errors
      if (error.response?.status >= 400 && error.response?.status < 500) {
        return false;
      }
      return failureCount < 3;
    }
  });
};
```

#### Loading States
```jsx
// LoadingStates.jsx
const TransactionList = () => {
  const { data: transactions, isLoading, error } = useTransaksi();
  
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="card bg-base-100 shadow animate-pulse">
            <div className="card-body">
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              <div className="h-3 bg-gray-300 rounded w-1/2 mt-2"></div>
              <div className="h-20 bg-gray-300 rounded mt-4"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="alert alert-error">
        <div>
          <h3>Error loading transactions</h3>
          <div className="text-xs">{error.message}</div>
          <button 
            className="btn btn-sm btn-outline mt-2"
            onClick={() => queryClient.invalidateQueries(['transaksi'])}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="transaction-list">
      {transactions.map(transaction => (
        <TransactionCard key={transaction._id} transaction={transaction} />
      ))}
    </div>
  );
};
```

#### Form Validation
```jsx
// formValidation.js
export const validateUserRegistration = (data) => {
  const errors = {};
  
  if (!data.name?.trim()) {
    errors.name = 'Name is required';
  }
  
  if (!data.username?.trim()) {
    errors.username = 'Username is required';
  } else if (data.username.length < 3) {
    errors.username = 'Username must be at least 3 characters';
  }
  
  if (!data.email?.trim()) {
    errors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(data.email)) {
    errors.email = 'Email is invalid';
  }
  
  if (!data.password?.trim()) {
    errors.password = 'Password is required';
  } else if (data.password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  }
  
  if (!data.noTelp?.trim()) {
    errors.noTelp = 'Phone number is required';
  } else if (!/^\+?[\d\s-()]+$/.test(data.noTelp)) {
    errors.noTelp = 'Phone number is invalid';
  }
  
  if (!data.address?.trim()) {
    errors.address = 'Address is required';
  }
  
  if (!data.isAgreeTerms) {
    errors.isAgreeTerms = 'You must agree to the terms and conditions';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Usage in form component
const SignUpForm = () => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const validation = validateUserRegistration(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }
    
    setErrors({});
    // Submit form
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-control">
        <label className="label">Name</label>
        <input 
          type="text"
          className={`input input-bordered ${errors.name ? 'input-error' : ''}`}
          value={formData.name || ''}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
        />
        {errors.name && <span className="text-error text-sm">{errors.name}</span>}
      </div>
      {/* Other form fields */}
    </form>
  );
};
```

### Performance Optimization

#### Component Optimization
```jsx
// Memoization
const TransactionCard = React.memo(({ transaction, onAction }) => {
  return (
    <div className="card">
      {/* Card content */}
    </div>
  );
});

// Custom hooks for expensive operations
const useFilteredTransactions = (transactions, filters) => {
  return useMemo(() => {
    if (!transactions) return [];
    
    return transactions.filter(transaction => {
      if (filters.status && transaction.status !== filters.status) return false;
      if (filters.search && !transaction.judul.toLowerCase().includes(filters.search.toLowerCase())) return false;
      return true;
    });
  }, [transactions, filters]);
};

// Virtual scrolling for large lists
import { FixedSizeList as List } from 'react-window';

const VirtualizedTransactionList = ({ transactions }) => {
  const Row = ({ index, style }) => (
    <div style={style}>
      <TransactionCard transaction={transactions[index]} />
    </div>
  );
  
  return (
    <List
      height={600}
      itemCount={transactions.length}
      itemSize={200}
    >
      {Row}
    </List>
  );
};
```

#### Query Optimization
```jsx
// Prefetching
const useTransactionWithPrefetch = (id) => {
  const queryClient = useQueryClient();
  
  const query = useQuery({
    queryKey: ['transaction', id],
    queryFn: () => fetchTransaction(id)
  });
  
  // Prefetch related data
  useEffect(() => {
    if (query.data?.penjahitId) {
      queryClient.prefetchQuery({
        queryKey: ['penjahit', query.data.penjahitId],
        queryFn: () => fetchPenjahit(query.data.penjahitId)
      });
    }
  }, [query.data, queryClient]);
  
  return query;
};

// Background refetching
const useRealtimeTransactions = () => {
  return useQuery({
    queryKey: ['transactions'],
    queryFn: fetchTransactions,
    refetchInterval: 30000, // Refetch every 30 seconds
    refetchIntervalInBackground: true
  });
};
```

### Security Best Practices

#### Input Sanitization
```jsx
// sanitization.js
import DOMPurify from 'dompurify';

export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  
  // Remove potentially dangerous characters
  return DOMPurify.sanitize(input, { 
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: []
  });
};

export const sanitizeFormData = (data) => {
  const sanitized = {};
  
  for (const [key, value] of Object.entries(data)) {
    if (typeof value === 'string') {
      sanitized[key] = sanitizeInput(value);
    } else {
      sanitized[key] = value;
    }
  }
  
  return sanitized;
};
```

#### Authentication Headers
```jsx
// axios interceptor for auth
axiosInstance.interceptors.request.use((config) => {
  // Token is handled by cookies, but add CSRF protection if needed
  const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
  if (csrfToken) {
    config.headers['X-CSRF-TOKEN'] = csrfToken;
  }
  
  return config;
});

// Handle auth errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear local state and redirect to login
      queryClient.clear();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
```

### Testing Best Practices

#### Component Testing
```jsx
// TransactionCard.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import TransactionCard from './TransactionCard';

const createTestQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: { retry: false },
    mutations: { retry: false }
  }
});

const renderWithQueryClient = (component) => {
  const queryClient = createTestQueryClient();
  return render(
    <QueryClientProvider client={queryClient}>
      {component}
    </QueryClientProvider>
  );
};

describe('TransactionCard', () => {
  const mockTransaction = {
    _id: '1',
    judul: 'Test Transaction',
    deskripsi: 'Test Description',
    status: 'Menunggu',
    user: { name: 'John Doe' }
  };
  
  test('renders transaction information', () => {
    renderWithQueryClient(
      <TransactionCard transaction={mockTransaction} />
    );
    
    expect(screen.getByText('Test Transaction')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('Menunggu')).toBeInTheDocument();
  });
  
  test('calls action handler when button clicked', () => {
    const mockAction = jest.fn();
    
    renderWithQueryClient(
      <TransactionCard 
        transaction={mockTransaction} 
        onAction={mockAction}
        showActions={true}
      />
    );
    
    fireEvent.click(screen.getByText('Accept'));
    expect(mockAction).toHaveBeenCalledWith('accept', mockTransaction._id);
  });
});
```

#### API Testing
```jsx
// api.test.js
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useTransaksi } from './transaksiQuery';

const server = setupServer(
  rest.get('/api/transaksi', (req, res, ctx) => {
    return res(ctx.json([
      { _id: '1', judul: 'Transaction 1' },
      { _id: '2', judul: 'Transaction 2' }
    ]));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('useTransaksi returns transaction data', async () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } }
  });
  
  const wrapper = ({ children }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
  
  const { result } = renderHook(() => useTransaksi(), { wrapper });
  
  await waitFor(() => expect(result.current.isSuccess).toBe(true));
  
  expect(result.current.data).toHaveLength(2);
  expect(result.current.data[0].judul).toBe('Transaction 1');
});
```

This comprehensive documentation provides detailed examples and best practices for using the Jalin platform APIs and components. Each section includes practical code examples that can be directly implemented in your projects.


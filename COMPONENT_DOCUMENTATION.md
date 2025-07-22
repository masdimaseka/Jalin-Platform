# Jalin Frontend Component Documentation

## Overview
This documentation covers all React components, hooks, utilities, and frontend functionality in the Jalin tailoring service platform.

## Technology Stack
- **React** 19.0.0 - Main UI framework
- **React Router DOM** 7.2.0 - Client-side routing
- **TanStack Query** 5.66.11 - Server state management
- **Tailwind CSS** 4.0.9 - Styling framework
- **DaisyUI** 5.0.0-beta.9 - UI component library
- **Axios** 1.8.1 - HTTP client
- **React Hot Toast** 2.5.2 - Notification system
- **Stream Chat React** 13.0.4 - Real-time chat functionality
- **Framer Motion** 12.23.3 - Animations
- **Swiper** 11.2.6 - Touch slider component

## Project Structure

```
client/src/
├── components/          # Reusable UI components
│   ├── auth/           # Authentication components
│   ├── dashboard/      # Dashboard components
│   ├── layouts/        # Layout components
│   └── transaksi/      # Transaction components
├── pages/              # Page components
├── queries/            # TanStack Query hooks
├── lib/               # Utility libraries
├── App.jsx            # Main application component
└── main.jsx           # Application entry point
```

## Core Components

### Layout Components

#### Layout.jsx
Main layout wrapper for the application.

**Location**: `./client/src/components/layouts/Layout.jsx`

**Props**: None (uses React Router's Outlet)

**Features**:
- Renders main navigation bar
- Provides consistent page structure
- Handles responsive design
- Includes footer

**Usage**:
```jsx
import Layout from './components/layouts/Layout';

// Used in App.jsx routing
<Route element={<Layout />}>
  <Route path="/" element={<HomePage />} />
  // Other routes...
</Route>
```

#### LayoutAdmin.jsx
Administrative layout for admin panel.

**Location**: `./client/src/components/layouts/LayoutAdmin.jsx`

**Props**: None

**Features**:
- Admin-specific navigation
- Protected admin routes
- Admin dashboard layout

#### Navbar.jsx
Main navigation component for public and authenticated users.

**Location**: `./client/src/components/layouts/Navbar.jsx`

**Props**: None

**Features**:
- Responsive navigation menu
- User authentication status display
- Profile dropdown for authenticated users
- Mobile hamburger menu

#### NavbarAdmin.jsx
Administrative navigation component.

**Location**: `./client/src/components/layouts/NavbarAdmin.jsx`

**Props**: None

**Features**:
- Admin-specific navigation items
- Admin profile management
- Quick access to admin functions

#### Footer.jsx
Application footer component.

**Location**: `./client/src/components/layouts/Footer.jsx`

**Props**: None

**Features**:
- Company information
- Links to important pages
- Contact information

### Authentication Components

#### LoginForm.jsx
User login form component.

**Location**: `./client/src/components/auth/LoginForm.jsx`

**Props**: None

**Features**:
- Username/password login
- Form validation
- Remember me functionality
- Password reset link
- Error handling

**Usage**:
```jsx
import LoginForm from './components/auth/LoginForm';

<LoginForm />
```

#### SignUpForm.jsx
User registration form component.

**Location**: `./client/src/components/auth/SignUpForm.jsx`

**Props**: None

**Features**:
- Complete user registration
- Form validation
- Terms and conditions acceptance
- Email verification trigger
- Error handling

#### EmailVerificationForm.jsx
Email verification component.

**Location**: `./client/src/components/auth/EmailVerificationForm.jsx`

**Props**: None

**Features**:
- 6-digit verification code input
- Resend verification email
- Auto-redirect on success
- Timer for resend button

#### EditProfileForm.jsx
User profile editing form.

**Location**: `./client/src/components/auth/EditProfileForm.jsx`

**Props**: 
- `userId`: String - ID of user to edit

**Features**:
- Profile image upload
- Personal information editing
- Form validation
- Image preview
- Save/cancel actions

### Dashboard Components

#### DashboardUser.jsx
User dashboard component.

**Location**: `./client/src/components/dashboard/DashboardUser.jsx`

**Props**: 
- `user`: Object - Current user data

**Features**:
- User statistics display
- Recent transactions
- Quick action buttons
- Profile completion status

**Usage**:
```jsx
import DashboardUser from './components/dashboard/DashboardUser';

<DashboardUser user={authUser} />
```

#### DashboardPenjahit.jsx
Tailor dashboard component.

**Location**: `./client/src/components/dashboard/DashboardPenjahit.jsx`

**Props**: 
- `penjahit`: Object - Tailor profile data

**Features**:
- Tailor-specific statistics
- Pending transaction requests
- Earnings overview
- Work status toggle
- Portfolio management

**Usage**:
```jsx
import DashboardPenjahit from './components/dashboard/DashboardPenjahit';

<DashboardPenjahit penjahit={penjahitData} />
```

### Transaction Components

#### ListTransaksi.jsx
General transaction list component.

**Location**: `./client/src/components/transaksi/ListTransaksi.jsx`

**Props**:
- `transactions`: Array - List of transactions
- `loading`: Boolean - Loading state
- `showActions`: Boolean - Whether to show action buttons

**Features**:
- Transaction card display
- Status filtering
- Search functionality
- Pagination support

#### ListTransaksiForUser.jsx
User-specific transaction list.

**Location**: `./client/src/components/transaksi/ListTransaksiForUser.jsx`

**Props**:
- `userId`: String - User ID

**Features**:
- User's transaction history
- Status-based filtering
- Transaction details modal
- Review submission

#### ListTransaksiForPenjahit.jsx
Tailor-specific transaction list.

**Location**: `./client/src/components/transaksi/ListTransaksiForPenjahit.jsx`

**Props**:
- `penjahitId`: String - Tailor ID

**Features**:
- Tailor's assigned transactions
- Accept/reject functionality
- Progress tracking
- Completion workflow

#### CardTransaksi.jsx
Individual transaction card component.

**Location**: `./client/src/components/transaksi/CardTransaksi.jsx`

**Props**:
- `transaction`: Object - Transaction data
- `showActions`: Boolean - Whether to show action buttons
- `userType`: String - 'user' or 'penjahit'

**Features**:
- Transaction summary display
- Status indicators
- Action buttons based on user type
- Image gallery
- Price display

**Usage**:
```jsx
import CardTransaksi from './components/transaksi/CardTransaksi';

<CardTransaksi 
  transaction={transactionData} 
  showActions={true}
  userType="user"
/>
```

#### DetailTransaksi.jsx
Detailed transaction view component.

**Location**: `./client/src/components/transaksi/DetailTransaksi.jsx`

**Props**:
- `transactionId`: String - Transaction ID

**Features**:
- Complete transaction information
- Image gallery with zoom
- User and tailor profiles
- Review section
- Status timeline
- Chat integration

#### DetailTransaksiForPenjahit.jsx
Tailor-specific transaction detail view.

**Location**: `./client/src/components/transaksi/DetailTransaksiForPenjahit.jsx`

**Props**:
- `transactionId`: String - Transaction ID
- `penjahitId`: String - Tailor ID

**Features**:
- Tailor workflow actions
- Progress update forms
- Image upload for completed work
- Notes and communication
- Accept/reject functionality

#### InputTransaksi.jsx
Transaction creation form.

**Location**: `./client/src/components/transaksi/InputTransaksi.jsx`

**Props**: None

**Features**:
- Multi-step form
- Image upload
- Category selection
- Price estimation
- Deadline setting
- Address input

#### InputTransaksiToPenjahit.jsx
Direct transaction creation to specific tailor.

**Location**: `./client/src/components/transaksi/InputTransaksiToPenjahit.jsx`

**Props**:
- `penjahitId`: String - Target tailor ID

**Features**:
- Pre-selected tailor
- Streamlined form
- Direct assignment
- Tailor-specific pricing

#### ListPointProduct.jsx
Point products list component.

**Location**: `./client/src/components/transaksi/ListPointProduct.jsx`

**Props**: None

**Features**:
- Available point packages
- Purchase functionality
- Payment integration
- Transaction history

## Query Hooks (TanStack Query)

### Authentication Queries

#### useAuthUser
Hook for checking user authentication status.

**Location**: `./client/src/queries/auth/authQuery.js`

**Returns**: 
- `data`: User object or null
- `isLoading`: Boolean
- `error`: Error object

**Usage**:
```jsx
import { useAuthUser } from './queries/auth/authQuery';

const { data: authUser, isLoading } = useAuthUser();
```

#### useAuthPenjahit
Hook for checking tailor authentication status.

**Location**: `./client/src/queries/auth/authQuery.js`

**Returns**: 
- `data`: Penjahit object or null
- `isLoading`: Boolean
- `error`: Error object

**Usage**:
```jsx
import { useAuthPenjahit } from './queries/auth/authQuery';

const { data: authPenjahit, isLoading } = useAuthPenjahit();
```

### Authentication Mutations

#### useLogin
Hook for user login functionality.

**Location**: `./client/src/queries/auth/authMutation.js`

**Usage**:
```jsx
import { useLogin } from './queries/auth/authMutation';

const { mutate: login, isPending } = useLogin();

const handleLogin = (credentials) => {
  login(credentials, {
    onSuccess: (data) => {
      // Handle success
    },
    onError: (error) => {
      // Handle error
    }
  });
};
```

#### useSignUp
Hook for user registration functionality.

**Location**: `./client/src/queries/auth/authMutation.js`

#### useLogout
Hook for user logout functionality.

**Location**: `./client/src/queries/auth/authMutation.js`

#### useVerifyEmail
Hook for email verification functionality.

**Location**: `./client/src/queries/auth/authMutation.js`

### User Queries and Mutations

#### useUsers
Hook for fetching user list.

**Location**: `./client/src/queries/user/userQuery.js`

#### useUpdateProfile
Hook for updating user profile.

**Location**: `./client/src/queries/user/userMutation.js`

### Penjahit Queries and Mutations

#### usePenjahit
Hook for fetching tailor list.

**Location**: `./client/src/queries/penjahit/penjahitQuery.js`

**Parameters**:
- `search`: String (optional)
- `category`: String (optional)
- `priceRange`: String (optional)

#### useRegisterPenjahit
Hook for tailor registration.

**Location**: `./client/src/queries/penjahit/penjahitMutation.js`

#### useUpdatePenjahit
Hook for updating tailor profile.

**Location**: `./client/src/queries/penjahit/penjahitMutation.js`

### Transaction Queries and Mutations

#### useTransaksi
Hook for fetching transaction list.

**Location**: `./client/src/queries/transaksi/transaksiQuery.js`

#### useCreateTransaksi
Hook for creating new transaction.

**Location**: `./client/src/queries/transaksi/transaksiMutation.js`

#### useUpdateTransaksi
Hook for updating transaction status.

**Location**: `./client/src/queries/transaksi/transaksiMutation.js`

### Admin Queries and Mutations

#### useAuthAdmin
Hook for admin authentication.

**Location**: `./client/src/queries/admin/adminQuery.js`

#### useAdminUsers
Hook for admin user management.

**Location**: `./client/src/queries/admin/adminQuery.js`

#### useAdminPenjahit
Hook for admin tailor management.

**Location**: `./client/src/queries/admin/adminQuery.js`
## Pages

### Authentication Pages

#### LoginPage
User login page with form and additional features.

**Location**: `./client/src/pages/auth/LoginPage.jsx`

**Route**: `/login`

**Features**:
- Login form integration
- Redirect to dashboard on success
- Link to registration page
- Password reset functionality

#### SignUpPage
User registration page.

**Location**: `./client/src/pages/auth/SignUpPage.jsx`

**Route**: `/signup`

**Features**:
- Registration form
- Terms and conditions display
- Email verification trigger
- Auto-redirect after registration

#### EmailVerificationPage
Email verification page.

**Location**: `./client/src/pages/auth/EmailVerificationPage.jsx`

**Route**: `/verify-email`

**Features**:
- Verification code input
- Resend verification email
- Success/error handling

#### EditProfilePage
User profile editing page.

**Location**: `./client/src/pages/auth/EditProfilePage.jsx`

**Route**: `/profile/edit/:id`

**Features**:
- Profile form integration
- Image upload
- Form validation
- Success feedback

### Main Application Pages

#### HomePage
Landing page of the application.

**Location**: `./client/src/pages/HomePage.jsx`

**Route**: `/`

**Features**:
- Hero section
- Featured tailors
- Service overview
- Call-to-action buttons

#### DashboardPage
Main dashboard page (role-based content).

**Location**: `./client/src/pages/DashboardPage.jsx`

**Route**: `/dashboard`

**Features**:
- Role detection (user vs penjahit)
- Conditional component rendering
- Dashboard statistics
- Quick actions

#### AboutPage
About us page.

**Location**: `./client/src/pages/AboutPage.jsx`

**Route**: `/about`

**Features**:
- Company information
- Team details
- Service descriptions

#### StatusPage
Dynamic status page for various application states.

**Location**: `./client/src/pages/StatusPage.jsx`

**Route**: `/status/:status`

**Features**:
- Dynamic content based on status parameter
- Success/error messaging
- Navigation options

### Penjahit (Tailor) Pages

#### ListPenjahitPage
Page displaying list of available tailors.

**Location**: `./client/src/pages/pejahit/ListPenjahitPage.jsx`

**Route**: `/penjahit`

**Features**:
- Tailor grid/list display
- Search and filtering
- Category filtering
- Price range filtering
- Pagination

#### ProfilePenjahitPage
Individual tailor profile page.

**Location**: `./client/src/pages/pejahit/ProfilePenjahitPage.jsx`

**Route**: `/penjahit/:id`

**Features**:
- Detailed tailor information
- Portfolio gallery
- Reviews and ratings
- Contact/hire buttons
- Related tailors

#### RegisterPenjahitPage
Tailor registration page.

**Location**: `./client/src/pages/pejahit/RegisterPenjahitPage.jsx`

**Route**: `/penjahit/register`

**Features**:
- Multi-step registration form
- Document upload
- Portfolio upload
- Category selection
- Terms acceptance

#### EditProfilePenjahitPage
Tailor profile editing page.

**Location**: `./client/src/pages/pejahit/EditProfilePenjahitPage.jsx`

**Route**: `/penjahit/edit/:id`

**Features**:
- Profile information editing
- Portfolio management
- Category updates
- Pricing updates

#### TopupPointPage
Point purchase page for tailors.

**Location**: `./client/src/pages/pejahit/TopupPointPage.jsx`

**Route**: `/topup-point/:id`

**Features**:
- Point package selection
- Payment integration
- Transaction history
- Balance display

### Transaction Pages

#### ListJahitanPage
Page displaying available tailoring jobs.

**Location**: `./client/src/pages/jahitan/ListJahitanPage.jsx`

**Route**: `/jahitan`

**Features**:
- Job listings
- Search and filtering
- Category filtering
- Apply functionality

#### DetailJahitanPage
Detailed view of a specific tailoring job.

**Location**: `./client/src/pages/jahitan/DetailJahitanPage.jsx`

**Route**: `/jahitan/:id`

**Features**:
- Complete job details
- Image gallery
- User profile
- Apply/contact options
- Similar jobs

#### CreateTransaksiPage
Transaction/job creation page.

**Location**: `./client/src/pages/CreateTransaksiPage.jsx`

**Route**: `/jahitan/create`

**Features**:
- Job creation form
- Image upload
- Category selection
- Pricing estimation
- Deadline setting

#### ChatPage
Real-time chat page for transaction communication.

**Location**: `./client/src/pages/jahitan/ChatPage.jsx`

**Route**: `/jahitan/:idTransaksi/chat/:id`

**Features**:
- Stream Chat integration
- Real-time messaging
- File sharing
- Message history

### Admin Pages

#### LoginAdminPage
Admin login page.

**Location**: `./client/src/pages/admin/LoginAdminPage.jsx`

**Route**: `/admin/login`

**Features**:
- Admin authentication
- Role-based access
- Secure login form

#### DashboardAdminPage
Admin dashboard with overview statistics.

**Location**: `./client/src/pages/admin/DashboardAdminPage.jsx`

**Route**: `/admin/dashboard`

**Features**:
- System statistics
- Recent activities
- Quick management actions
- Charts and graphs

#### MenusAdminPage
Admin management menus page.

**Location**: `./client/src/pages/admin/MenusAdminPage.jsx`

**Route**: `/admin/user`, `/admin/penjahit`, `/admin/transaksi`, etc.

**Features**:
- Dynamic content based on route
- CRUD operations
- Data tables
- Bulk actions

#### ProfileUserAdminPage
Admin view of user profiles.

**Location**: `./client/src/pages/admin/ProfileUserAdminPage.jsx`

**Route**: `/admin/user/:id`

**Features**:
- User profile management
- Account status controls
- Transaction history
- Admin actions

#### ProfilePenjahitAdminPage
Admin view of tailor profiles.

**Location**: `./client/src/pages/admin/ProfilePenjahitAdminPage.jsx`

**Route**: `/admin/penjahit/:id`

**Features**:
- Tailor profile management
- Verification controls
- Premium status management
- Document review

#### DetailTransaksiAdminPage
Admin view of transaction details.

**Location**: `./client/src/pages/admin/DetailTransaksiAdminPage.jsx`

**Route**: `/admin/transaksi/:id`

**Features**:
- Transaction oversight
- Status management
- Dispute resolution
- Admin actions

#### ResetPasswordByAdminPage
Admin password reset page.

**Location**: `./client/src/pages/admin/ResetPasswordByAdminPage.jsx`

**Route**: `/admin/user/reset-password`

**Features**:
- User password reset
- Security verification
- Bulk operations

### Error Pages

#### NotFoundPage
404 error page.

**Location**: `./client/src/pages/error/NotFoundPage.jsx`

**Route**: `*` (catch-all)

**Features**:
- User-friendly error message
- Navigation options
- Search functionality

## Utility Libraries

### Axios Configuration

**Location**: `./client/src/lib/axios.js`

**Purpose**: Configured Axios instance for API communication

**Features**:
- Base URL configuration
- Request/response interceptors
- Authentication token handling
- Error handling

**Usage**:
```jsx
import { axiosInstance } from '../lib/axios';

const response = await axiosInstance.get('/api/endpoint');
```

## Styling and UI

### Tailwind CSS Configuration
The project uses Tailwind CSS 4.0.9 with custom configurations for:
- Custom color palette
- Typography scales
- Spacing utilities
- Responsive breakpoints

### DaisyUI Components
The project leverages DaisyUI 5.0.0-beta.9 for pre-built components:
- Buttons and form elements
- Cards and modals
- Navigation components
- Layout utilities

### Custom CSS Classes
Additional custom styles are defined in `./client/src/index.css` for:
- Global styles
- Component-specific styles
- Animation utilities

## State Management

### TanStack Query
Used for server state management with features:
- Caching
- Background refetching
- Optimistic updates
- Error handling
- Loading states

### Local State
React's built-in useState and useReducer for:
- Form state
- UI state
- Component-specific state

## Routing

### React Router DOM
The application uses React Router DOM 7.2.0 for:
- Client-side routing
- Protected routes
- Route parameters
- Nested routing
- Programmatic navigation

### Route Protection
Routes are protected based on:
- Authentication status
- User roles (user, penjahit, admin)
- Verification status

## Real-time Features

### Stream Chat Integration
The application integrates Stream Chat React 13.0.4 for:
- Real-time messaging
- Chat rooms
- File sharing
- Message history
- Typing indicators

## Performance Optimizations

### Code Splitting
- Route-based code splitting
- Component lazy loading
- Dynamic imports

### Image Optimization
- Image compression
- Lazy loading
- Responsive images

### Caching
- TanStack Query caching
- Browser caching
- Service worker caching (if implemented)

## Development Guidelines

### Component Structure
```jsx
// Component template
import React from 'react';
import PropTypes from 'prop-types';

const ComponentName = ({ prop1, prop2 }) => {
  // Hooks
  // Event handlers
  // Render logic
  
  return (
    <div className="component-wrapper">
      {/* JSX content */}
    </div>
  );
};

ComponentName.propTypes = {
  prop1: PropTypes.string.isRequired,
  prop2: PropTypes.number
};

export default ComponentName;
```

### Query Hook Structure
```jsx
// Query hook template
import { useQuery, useMutation } from '@tanstack/react-query';
import { axiosInstance } from '../../lib/axios';

export const useDataFetch = (params) => {
  return useQuery({
    queryKey: ['data', params],
    queryFn: async () => {
      const response = await axiosInstance.get('/api/endpoint', { params });
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useDataMutation = () => {
  return useMutation({
    mutationFn: async (data) => {
      const response = await axiosInstance.post('/api/endpoint', data);
      return response.data;
    },
    onSuccess: () => {
      // Handle success
    },
    onError: (error) => {
      // Handle error
    }
  });
};
```

## Testing

### Testing Strategy
- Unit tests for components
- Integration tests for user flows
- E2E tests for critical paths

### Testing Libraries
- Jest for unit testing
- React Testing Library for component testing
- Cypress for E2E testing (if implemented)

## Deployment

### Build Process
```bash
npm run build
```

### Environment Variables
Required environment variables:
- `VITE_API_URL` - Backend API URL
- `VITE_STREAM_CHAT_API_KEY` - Stream Chat API key

### Production Considerations
- Asset optimization
- Bundle size monitoring
- Performance monitoring
- Error tracking

## Support and Maintenance

### Code Documentation
- JSDoc comments for complex functions
- README files for major features
- API documentation references

### Error Handling
- Global error boundaries
- API error handling
- User-friendly error messages
- Error logging and reporting

### Monitoring
- Performance metrics
- User analytics
- Error tracking
- Usage statistics


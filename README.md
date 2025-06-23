
# The Next Car Doctor

A modern, full-stack web application built with Next.js 15, featuring comprehensive authentication, service booking, and user management capabilities.

## 🚀 Features

### Authentication & Security
- **Multi-provider Authentication**: Email/password, Google, and GitHub OAuth
- **Route Protection**: Middleware-based authentication for all protected routes
- **Role-based Access Control**: Different permissions for users and admins
- **Secure Password Handling**: bcrypt encryption for user passwords
- **Session Management**: JWT-based sessions with NextAuth.js

### User Experience
- **Responsive Design**: Mobile-first approach, works on all devices
- **Modern UI**: Clean, professional interface with Tailwind CSS
- **Real-time Notifications**: Toast notifications for user feedback
- **Loading States**: Smooth loading indicators throughout the app
- **Form Validation**: Client and server-side validation

### Core Functionality
- **Service Management**: Browse and view detailed service information
- **Booking System**: Complete booking workflow with form validation
- **User Dashboard**: Manage bookings and profile information
- **Admin Panel**: Manage users, services, and bookings
- **Blog System**: Content management for automotive tips and guides

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Modern icon library
- **React Hook Form** - Form handling and validation
- **React Hot Toast** - Notification system

### Backend
- **Next.js API Routes** - Server-side API endpoints
- **NextAuth.js** - Authentication library
- **MongoDB** - NoSQL database
- **bcrypt** - Password hashing
- **Server Actions** - Server-side form handling

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript** - Static type checking

## 📋 Prerequisites

Before running this project, make sure you have:

- **Node.js** (v18 or higher)
- **npm** or **yarn** package manager
- **MongoDB** database (local or cloud)
- **Google OAuth** credentials (optional)
- **GitHub OAuth** credentials (optional)

## 🚀 Getting Started

### 1. Clone the Repository

\`\`\`bash
git clone https://github.com/imtiazahmadtanvir/The-Car-Doctor-Limited.git
\`\`\`

### 2. Install Dependencies

\`\`\`bash
pnpm install
# or
npm install
\`\`\`


### 3. Database Setup

The application will automatically create the necessary collections when you first run it. The main collections are:

- \`users\` - User accounts and profiles
- \`services\` - Available services
- \`bookings\` - Service bookings

### 4. Run the Development Server

\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.



## 🔐 Authentication Flow

### Registration Process
1. User fills out registration form
2. Form validation (client & server-side)
3. Password encryption with bcrypt
4. User account creation in database
5. Success notification and redirect to login

### Login Process
1. User enters credentials
2. Server validates against database
3. JWT session creation with NextAuth
4. Redirect to protected dashboard

### Route Protection
- **Middleware**: Protects all routes except public ones
- **Client Components**: Additional protection for sensitive components
- **Role-based**: Different access levels for users and admins

## 🎨 UI Components

### Responsive Design
- **Mobile-first**: Optimized for mobile devices
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Flexible Layouts**: Grid and flexbox for all screen sizes

### Form Components
- **Input Fields**: With icons and validation states
- **Password Toggle**: Show/hide password functionality
- **Loading States**: Prevent double submissions
- **Error Handling**: Clear error messages

## 📊 Database Schema

### Users Collection
\`\`\`javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (default: "user"),
  createdAt: Date,
  updatedAt: Date
}
\`\`\`

### Services Collection
\`\`\`javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  price: Number,
  img: String,
  category: String,
  createdAt: Date
}
\`\`\`

### Bookings Collection
\`\`\`javascript
{
  _id: ObjectId,
  serviceId: ObjectId,
  serviceName: String,
  servicePrice: Number,
  customerName: String,
  customerEmail: String,
  customerPhone: String,
  bookingDate: Date,
  bookingTime: String,
  status: String (pending, confirmed, completed, cancelled),
  specialRequests: String,
  createdAt: Date
}
\`\`\`

## 🔧 API Endpoints

### Authentication
- \`POST /api/auth/signin\` - User login
- \`POST /api/auth/signup\` - User registration
- \`GET /api/auth/session\` - Get current session

### Services
- \`GET /api/services\` - Get all services
- \`GET /api/services/[id]\` - Get service by ID

### Bookings
- \`GET /api/bookings\` - Get user bookings
- \`POST /api/bookings\` - Create new booking
- \`PUT /api/bookings/[id]\` - Update booking
- \`DELETE /api/bookings/[id]\` - Delete booking

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on push

### Environment Variables for Production
\`\`\`env
NEXT_PUBLIC_MONGODB_URI=your-production-mongodb-uri
NEXTAUTH_URL=https://yourdomain.com
NEXTAUTH_SECRET=your-production-secret
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GITHUB_ID=your-github-client-id
GITHUB_SECRET=your-github-client-secret
\`\`\`

## 🧪 Testing

### Running Tests
\`\`\`bash
npm run test
# or
yarn test
\`\`\`

### Test Coverage
- Unit tests for utility functions
- Integration tests for API routes
- Component tests for UI elements


### Development Guidelines
- Follow TypeScript best practices
- Use meaningful commit messages
- Add tests for new features
- Update documentation as needed



## 🙏 Acknowledgments

- **Next.js Team** - For the amazing framework
- **Vercel** - For hosting and deployment platform
- **MongoDB** - For the database solution
- **NextAuth.js** - For authentication handling
- **Tailwind CSS** - For the styling framework

## 📈 Roadmap

### Upcoming Features
- [ ] Email verification system
- [ ] Password reset functionality
- [ ] Advanced booking filters
- [ ] Payment integration
- [ ] Real-time notifications
- [ ] Mobile app development
- [ ] Multi-language support
- [ ] Advanced analytics dashboard

### Performance Improvements
- [ ] Image optimization
- [ ] Caching strategies
- [ ] Database indexing
- [ ] Code splitting optimization

---


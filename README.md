# The Next Car Doctor

A modern, full-stack web application built with Next.js 15, featuring comprehensive authentication, service booking, responsive chatbot, and user management capabilities.

🔗 **Live Demo**: [the-next-js-car-doctor-web.vercel.app](https://the-next-js-car-doctor-web.vercel.app)

---

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
- **💬 AI Chatbot**: Responsive chatbot powered by **Gemini**, assists users with booking, service inquiries, and app navigation

### Core Functionality
- **Service Management**: Browse and view detailed service information
- **Booking System**: Complete booking workflow with form validation
- **User Dashboard**: Manage bookings and profile information
- **Admin Panel**: Manage users, services, and bookings
- **Blog System**: Content management for automotive tips and guides

---

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

### AI Integration
- **Gemini API** - Responsive chatbot integration for smart user assistance

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript** - Static type checking

---

## 📋 Prerequisites

Before running this project, make sure you have:

- **Node.js** (v18 or higher)
- **npm** or **yarn** package manager
- **MongoDB** database (local or cloud)
- **Google OAuth** credentials (optional)
- **GitHub OAuth** credentials (optional)

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/imtiazahmadtanvir/The-Car-Doctor-Limited.git

pnpm install
# or
npm install

npm run dev
# or
yarn dev


Open [http://localhost:3000](http://localhost:3000) in your browser to see the app in action.

---

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

---

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

---

## 💬 Chatbot Assistant (New!)
- **Gemini-powered AI chatbot**
- Assists users with:
  - Service information
  - Booking help
  - Navigational guidance
- **Fully responsive** and optimized for all devices

---

## 📊 Database Schema

### Users Collection

```js
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (default: "user"),
  createdAt: Date,
  updatedAt: Date
}

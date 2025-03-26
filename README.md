# LVN Frontend - Volunteer Management Platform

A modern, responsive web application for connecting volunteers with nonprofit organizations and opportunities. Built with React, Vite, Tailwind CSS, and Shadcn UI components.

## Features

- **Public Pages**: Home, Opportunities, Organizations, About, Contact
- **User Authentication**: Secure login and signup with role-based access
- **Dashboard**: Personalized user experience based on role
- **Volunteer Management**: Browse and register for volunteer opportunities
- **Organization Portal**: Create and manage organizations and volunteer opportunities
- **Admin Dashboard**: Comprehensive system administration tools
- **Responsive Design**: Fully responsive UI that works on mobile and desktop
- **Dark/Light Theme**: Built-in theme toggle for user preference

## Tech Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Routing**: React Router DOM v7
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI (Radix UI primitives)
- **Form Handling**: React Hook Form with Zod validation
- **State Management**: React Query for server state
- **Theming**: Next-themes for dark/light mode
- **Icons**: Lucide React
- **Charts**: Recharts for data visualization
- **Notifications**: Toast notifications with Sonner

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/lvn-frontend.git
   cd lvn-frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn
   ```

3. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to:
   ```bash
   http://localhost:5173
   ```

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview the production build locally

## Project Structure

```
src/
├── assets/       # Static assets like images
├── components/   # Reusable UI components
│   ├── ui/       # Shadcn UI components
│   └── ...       # Custom components (Navbar, Footer, etc.)
├── hooks/        # Custom React hooks
├── lib/          # Utility libraries and configurations
├── pages/        # Application pages/routes
│   ├── admin/    # Admin-specific pages
│   └── ...       # Public and user pages
├── providers/    # Context providers (Auth, Theme)
├── utils/        # Helper functions
├── App.jsx       # Main application component
└── main.jsx      # Application entry point
```

## Contribution

Please read the contribution guidelines before submitting pull requests.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

# Farm Report v4

A modern React application for managing farm reports built with Vite, React 19, TypeScript, and Firebase.

## Features

- 🔐 **Authentication** - Email/password and Google Sign-In
- 📊 **Report Management** - Create, edit, and delete farm reports
- 💰 **Expense Tracking** - Dynamic expense entries with categories
- 🏷️ **Label System** - Track items with quantities
- 📱 **Responsive Design** - Mobile-first approach
- ⚡ **Real-time Updates** - Live data synchronization with Firestore
- 🎨 **Modern UI** - Built with Tailwind CSS

## Tech Stack

- **Frontend**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Server State**: TanStack Query
- **Forms**: React Hook Form + Zod
- **Backend**: Firebase (Auth + Firestore)
- **Testing**: Vitest + Testing Library

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Basic UI components (Button, Input, etc.)
│   └── layout/         # Layout components (Header, Layout)
├── features/           # Feature-based modules
│   ├── auth/           # Authentication feature
│   └── reports/        # Reports feature
├── lib/                # Utilities and configurations
│   ├── firebase/       # Firebase configuration and services
│   └── utils/          # Utility functions
├── pages/              # Page components
├── stores/             # Zustand stores
└── types/              # TypeScript type definitions
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Firebase project

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd farm-report-v4
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up Firebase:
   - Create a new Firebase project
   - Enable Authentication (Email/Password and Google)
   - Create a Firestore database
   - Copy `.env.example` to `.env` and fill in your Firebase config

4. Start the development server:
   ```bash
   npm run dev
   ```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm test` - Run tests
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Environment Variables

Create a `.env` file with the following variables:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## Firebase Setup

### Authentication
Enable these sign-in methods in Firebase Console:
- Email/Password
- Google

### Firestore Rules
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /reports/{document} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && request.auth.uid == request.resource.data.userId;
    }
  }
}
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Run linting and tests
6. Submit a pull request

## License

This project is licensed under the MIT License.
# SocialHub - Social Media Management Dashboard

A comprehensive React dashboard frontend for managing multiple social media platforms with unified feed display, multi-platform posting, and account management.

## Features

### 🔐 Authentication
- User login and registration
- JWT token management with automatic refresh
- OAuth callback handlers for social media platforms

### 📊 Unified Dashboard
- Aggregated feed from all connected platforms
- Real-time updates and infinite scroll
- User profile section
- Connected accounts overview
- Platform performance metrics

### ✍️ Multi-Platform Posting
- Rich text composer for creating posts
- Platform selection (Twitter, Facebook, Instagram, LinkedIn, TikTok)
- Media upload support (images and videos)
- Post preview functionality
- Schedule posts for future publishing
- Draft management

### 🔗 Account Management
- Connect/disconnect social media accounts via OAuth
- View connected platforms and their permissions
- Platform-specific settings
- Account status monitoring

### 📈 Analytics Dashboard
- Post engagement metrics (likes, comments, shares)
- Platform performance comparison
- Follower counts across platforms
- Engagement rate tracking
- Visual statistics and charts

### 🔔 Notifications Center
- Real-time notification system
- Mark notifications as read
- Notification filtering and management

### 🎨 UI/UX Features
- Responsive design (mobile, tablet, desktop)
- Dark mode support
- Modern, polished interface with Tailwind CSS
- Loading states and skeleton screens
- Error handling and user feedback

## Tech Stack

- **React 18+** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router** - Routing
- **Tailwind CSS** - Styling
- **Zustand** - State management
- **React Query** - Data fetching and caching
- **Axios** - HTTP client
- **date-fns** - Date manipulation
- **react-icons** - Icon library

## Project Structure

```
src/
├── components/
│   ├── Auth/              # Authentication components
│   ├── Dashboard/         # Main dashboard layout
│   ├── Feed/              # Unified feed display
│   ├── Composer/          # Post composer
│   ├── AccountManager/    # Account connections
│   ├── Analytics/         # Stats and metrics
│   ├── Navigation/        # Header, sidebar
│   └── Common/            # Reusable components
├── pages/                 # Page-level components
├── services/              # API client for backend
├── hooks/                 # Custom React hooks
├── store/                 # State management (Zustand)
├── types/                 # TypeScript type definitions
├── utils/                 # Helper functions
├── App.tsx               # Main app component
└── main.tsx              # Entry point
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- A running FastAPI backend (configured in `.env`)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd <project-directory>
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env
```

Edit `.env` and set your API base URL:
```
VITE_API_BASE_URL=http://localhost:8000/api
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## API Integration

The frontend connects to a FastAPI backend with the following endpoints:

### Authentication
- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `POST /auth/logout` - User logout
- `POST /auth/refresh` - Refresh access token
- `GET /auth/me` - Get current user

### Social Accounts
- `GET /accounts` - Get connected accounts
- `POST /accounts/connect/{platform}` - Initiate OAuth connection
- `POST /accounts/callback/{platform}` - Handle OAuth callback
- `DELETE /accounts/{id}` - Disconnect account

### Posts
- `GET /feed` - Get unified feed
- `GET /posts` - Get user's posts
- `POST /posts` - Create new post
- `PUT /posts/{id}/schedule` - Schedule post
- `DELETE /posts/{id}` - Delete post
- `GET /posts/{id}/metrics` - Get post metrics

### Media
- `POST /media/upload` - Upload media file

### Analytics
- `GET /analytics/platforms` - Get platform statistics

### Notifications
- `GET /notifications` - Get notifications
- `PUT /notifications/{id}/read` - Mark as read
- `PUT /notifications/read-all` - Mark all as read

## State Management

### Zustand Stores

- **authStore** - User authentication state and tokens
- **uiStore** - UI preferences (dark mode, sidebar state)
- **composerStore** - Post composer state (content, media, platforms)

### React Query

Used for server state management with automatic caching, refetching, and error handling.

## Development

### Code Style

- Follow React best practices
- Use TypeScript for type safety
- Utilize Tailwind CSS utility classes
- Keep components small and focused
- Use custom hooks for reusable logic

### Key Components

- **Button, Input, Card** - Reusable UI components
- **LoadingSpinner** - Loading states
- **Modal** - Modal dialogs
- **ProtectedRoute** - Route guards for authentication
- **FeedList** - Infinite scroll feed
- **PostComposer** - Multi-platform posting interface

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Backend API base URL | `http://localhost:8000/api` |

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

[Your License Here]

## Contributing

[Contribution guidelines if applicable]

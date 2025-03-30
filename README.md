# VolunteerNow Web Platform

A modern web application built with React, TypeScript, and Material-UI that connects volunteers with opportunities to make a difference in their communities. This platform serves as the web interface for the VolunteerNow ecosystem.

## Table of Contents
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Architecture](#architecture)
- [Development Guidelines](#development-guidelines)
- [Component Library](#component-library)
- [State Management](#state-management)
- [API Integration](#api-integration)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)

## Features

### Core Functionality
- **User Authentication**
  - Secure login and registration system
  - JWT-based authentication
  - Protected routes for authenticated users
  - Password reset functionality

- **Opportunity Feed**
  - Real-time feed of volunteer opportunities
  - Advanced filtering and search capabilities
  - Infinite scroll implementation
  - Opportunity card previews

- **Profile Management**
  - User profile creation and editing
  - Profile picture upload
  - Skills and interests management
  - Volunteer history tracking

- **Experience Tracking**
  - Record volunteer experiences
  - Upload images and documentation
  - Track hours and impact
  - Generate experience certificates

- **Application System**
  - Apply for volunteer positions
  - Track application status
  - Communication with organizers
  - Application history

- **Notifications**
  - Real-time updates
  - Application status changes
  - New matching opportunities
  - System announcements

- **Archive System**
  - Access past volunteer experiences
  - View completed opportunities
  - Download certificates
  - Export volunteer history

## Technology Stack

- **Frontend Framework**: React 18
- **Language**: TypeScript 4.x
- **UI Framework**: Material-UI v5
- **State Management**: React Context + Hooks
- **Routing**: React Router v6
- **API Communication**: Axios
- **Form Handling**: React Hook Form
- **Data Validation**: Yup
- **Testing**: Jest + React Testing Library
- **Build Tool**: Create React App
- **Package Manager**: npm
- **Code Quality**: ESLint + Prettier
- **Version Control**: Git
- **CI/CD**: GitHub Actions

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Git

### Installation

1. Clone the repository:
   ```bash
   git clone git@github.com:TRBF/volunteernow-web.git
   cd volunteernow-web
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment files:
   ```bash
   cp .env.example .env.local
   ```

4. Configure environment variables in `.env.local`:
   ```
   REACT_APP_API_URL=your_api_url_here
   REACT_APP_STORAGE_URL=your_storage_url_here
   ```

5. Start the development server:
   ```bash
   npm start
   ```

### Available Scripts

- `npm start` - Run development server
- `npm test` - Run test suite
- `npm run build` - Create production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run deploy` - Deploy to GitHub Pages

## Project Structure

```
volunteernow-web/
├── public/                 # Static files
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── common/       # Shared components
│   │   ├── layout/       # Layout components
│   │   └── forms/        # Form components
│   ├── pages/            # Page components
│   ├── services/         # API services
│   ├── hooks/            # Custom React hooks
│   ├── contexts/         # React contexts
│   ├── utils/            # Utility functions
│   ├── types/            # TypeScript types
│   ├── assets/          # Images and other assets
│   ├── styles/          # Global styles
│   ├── App.tsx          # Root component
│   └── index.tsx        # Entry point
├── tests/                # Test files
└── config/               # Configuration files
```

## Architecture

### Component Architecture

Components follow a hierarchical structure:
1. **Pages**: Top-level components representing routes
2. **Layout Components**: Structure the application's layout
3. **Feature Components**: Implement specific features
4. **Common Components**: Reusable UI elements

### State Management

- Use React Context for global state
- Keep component state local when possible
- Implement custom hooks for complex state logic
- Follow the single responsibility principle

### Data Flow

1. User interactions trigger component events
2. Events call service functions
3. Services make API requests
4. Responses update application state
5. State changes trigger re-renders

## Development Guidelines

### Code Style

- Follow the [Airbnb React/JSX Style Guide](https://github.com/airbnb/javascript/tree/master/react)
- Use TypeScript strict mode
- Write self-documenting code
- Include JSDoc comments for complex functions

### Component Guidelines

1. **Naming**
   - Use PascalCase for component names
   - Suffix containers with 'Container'
   - Prefix hooks with 'use'

2. **Structure**
   - Keep components focused and small
   - Extract reusable logic into hooks
   - Implement error boundaries
   - Use React.memo for optimization

3. **Props**
   - Define prop types explicitly
   - Use interface over type
   - Document required vs optional props
   - Provide default props when appropriate

### Best Practices

1. **Performance**
   - Implement lazy loading
   - Use React.memo wisely
   - Optimize re-renders
   - Profile components regularly

2. **Security**
   - Sanitize user input
   - Implement CSRF protection
   - Use secure HTTP headers
   - Follow OWASP guidelines

3. **Accessibility**
   - Follow WCAG 2.1 guidelines
   - Use semantic HTML
   - Implement keyboard navigation
   - Add ARIA labels

## Component Library

### Core Components

- **BackgroundPattern**: Decorative background element
- **Feed**: Main content display component
- **Header**: Navigation and user controls
- **NotificationsPanel**: Real-time updates display
- **PrivateRoute**: Authentication wrapper

### Form Components

- Input fields
- Select dropdowns
- Date pickers
- File uploaders
- Form validation

### Layout Components

- Grid system
- Containers
- Cards
- Dialogs
- Navigation elements

## API Integration

### Service Structure

```typescript
interface ApiService {
  baseURL: string;
  headers: Record<string, string>;
  get<T>(url: string): Promise<T>;
  post<T>(url: string, data: any): Promise<T>;
  put<T>(url: string, data: any): Promise<T>;
  delete<T>(url: string): Promise<T>;
}
```

### Error Handling

1. Implement global error handling
2. Use error boundaries for component errors
3. Display user-friendly error messages
4. Log errors for debugging

## Testing

### Unit Tests

- Test individual components
- Mock external dependencies
- Verify component behavior
- Check edge cases

### Integration Tests

- Test component interactions
- Verify data flow
- Test routing behavior
- Check state management

### E2E Tests

- Test user workflows
- Verify application behavior
- Check cross-browser compatibility
- Test responsive design

## Deployment

### Build Process

1. Run tests
2. Build production assets
3. Generate source maps
4. Optimize bundle size

### GitHub Pages Deployment

```bash
npm run deploy
```

### Environment Configuration

- Development: `.env.development`
- Staging: `.env.staging`
- Production: `.env.production`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Follow coding standards
4. Write tests
5. Submit pull request

### Pull Request Guidelines

- Reference related issues
- Provide clear description
- Include screenshots if relevant
- Update documentation
- Add tests for new features

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

Project Link: [https://github.com/TRBF/volunteernow-web](https://github.com/TRBF/volunteernow-web)

## Acknowledgments

- Material-UI team
- React community
- Open source contributors

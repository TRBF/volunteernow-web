# VolunteerNow Web Platform

A modern web application that connects volunteers with opportunities to make a difference in their communities. Built with React, TypeScript, and Material-UI.

## Features

- **User Authentication**: Secure login and registration system
- **Opportunity Feed**: Browse and discover volunteer opportunities
- **Profile Management**: Create and manage your volunteer profile
- **Experience Tracking**: Record and showcase your volunteer experiences
- **Application System**: Apply for volunteer positions and track applications
- **Real-time Notifications**: Stay updated with application status and new opportunities
- **Archive System**: Access past volunteer experiences and completed opportunities
- **Responsive Design**: Optimized for both desktop and mobile devices

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
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

3. Create a `.env` file in the root directory with the following variables:
   ```
   REACT_APP_API_URL=your_api_url_here
   ```

4. Start the development server:
   ```bash
   npm start
   ```

The application will be available at `http://localhost:3000`.

## Project Structure

```
volunteernow-web/
├── public/           # Static files
├── src/
│   ├── components/  # Reusable UI components
│   ├── pages/       # Page components
│   ├── services/    # API services
│   ├── App.tsx      # Root component
│   └── index.tsx    # Entry point
```

## Key Components

- **Feed**: Main timeline showing available volunteer opportunities
- **NotificationsPanel**: Real-time updates and notifications
- **Profile**: User profile management
- **Experience**: Volunteer experience tracking
- **Archive**: Past events and completed opportunities
- **Applications**: Application management system

## API Integration

The platform integrates with a RESTful API that handles:
- User authentication
- Profile management
- Opportunity listings
- Application processing
- Experience tracking
- Notifications

## Deployment

The application is deployed using GitHub Pages. To deploy:

```bash
npm run deploy
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

Project Link: [https://github.com/TRBF/volunteernow-web](https://github.com/TRBF/volunteernow-web)

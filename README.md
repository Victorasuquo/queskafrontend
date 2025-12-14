# Queska - AI-Powered Travel Companion

An innovative travel platform that uses artificial intelligence to deliver personalized travel experiences, real-time recommendations, and accessible travel support. Built for travelers in Nigeria and beyond.

## 🌟 Features

- **AI-Powered Planning**: Get personalized itineraries based on your preferences and budget
- **Real-Time Recommendations**: Discover destinations, events, activities, and restaurants as they happen
- **24/7 AI Travel Assistant**: Chat with our intelligent travel bot for instant assistance
- **Vendor Marketplace**: Hotels, restaurants, events, and activities all in one place
- **Budget Tracking**: Smart expense management and financial planning
- **Accessibility First**: Designed with inclusive features for all travelers
- **Community**: Connect with travelers and discover authentic local experiences

## 🛠️ Tech Stack

- **Frontend Framework**: React 18.3 with TypeScript
- **Build Tool**: Vite 5.4
- **Styling**: Tailwind CSS 3.4 with custom design system
- **UI Components**: shadcn-ui (Radix UI + Tailwind)
- **State Management**: React Context API + TanStack React Query
- **Forms**: React Hook Form + Zod validation
- **Routing**: React Router v6
- **Icons**: Lucide React
- **Maps**: Mapbox GL
- **Charts**: Recharts
- **Package Manager**: Bun

## 📋 Prerequisites

- Node.js 18+ or Bun
- npm, yarn, pnpm, or bun package manager

## 🚀 Getting Started

### Installation

```bash
# Clone the repository
git clone https://github.com/Victorasuquo/queskafrontend.git
cd queskafrontend

# Install dependencies using your preferred package manager
npm install
# or
bun install
```

### Development

```bash
# Start the development server
npm run dev
# or
bun run dev
```

The app will be available at `http://localhost:8080`

### Building for Production

```bash
# Create a production build
npm run build

# Preview the production build locally
npm run preview
```

### Code Quality

```bash
# Run ESLint to check code quality
npm run lint
```

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # shadcn-ui components
│   ├── dashboard/      # User dashboard components
│   ├── vendor/         # Vendor portal components
│   └── *.tsx           # Marketing/page components
├── pages/              # Page components (routing)
├── contexts/           # React Context API
├── hooks/              # Custom React hooks
├── lib/                # Utilities and helpers
├── assets/             # Images and media
└── App.tsx             # Main app component
```

## 🎯 Main Pages

- **Home** (`/`) - Marketing landing page with features showcase
- **Login** (`/login`) - User authentication
- **User Dashboard** (`/dashboard`) - Personalized travel dashboard
- **Vendor Portal** (`/vendor`) - Vendor business management

## 🎨 Design System

The app uses a custom Tailwind CSS design system with:
- **Primary Color**: Coral (#E74826) - Main CTAs and highlights
- **Secondary Color**: Deep Charcoal (#1F3A52) - Hero sections
- **Vendor Color**: Teal (#43B5A6) - Vendor portal branding
- **Accessibility**: Full dark mode support and WCAG compliance

## 🔌 API & Integration Points

The app is currently using:
- **Dummy/Mock Data** for development
- **localStorage** for session persistence
- **Mapbox GL** for map visualization
- Ready for backend integration at `/api` endpoints

## 🎯 Key Components

### User Features
- Destination search and discovery
- AI-powered trip planning
- Event discovery
- Restaurant recommendations
- Activity booking
- AI chat assistant
- Wishlist management

### Vendor Features
- Listing management (hotels, events, activities, restaurants)
- Booking tracker
- Analytics and revenue reports
- Vendor verification
- Document management

## 🔐 Authentication

Currently uses dummy authentication for development:
- Any email/password combination works for demo
- Vendor context stores session in localStorage
- Ready for real authentication backend integration

## 📦 Available Scripts

```json
{
  "dev": "Start development server on port 8080",
  "build": "Build for production",
  "build:dev": "Build with development flags",
  "lint": "Check code quality with ESLint",
  "preview": "Preview production build locally"
}
```

## 🌍 Deployment

### Building
```bash
npm run build
```

The production-ready files will be in the `dist/` directory.

### Hosting Options
- Vercel (recommended for Next.js-like experience)
- Netlify
- AWS Amplify
- GitHub Pages
- Docker containerization

### Environment Variables
Create a `.env` file in the root directory:
```
VITE_API_URL=your_api_url
VITE_MAPBOX_TOKEN=your_mapbox_token
```

## 📚 Component Library

Queska uses a comprehensive set of shadcn-ui components:
- Forms, buttons, inputs
- Modals, drawers, popovers
- Data display (tables, charts, progress)
- Navigation components
- And 30+ more...

All fully typed with TypeScript and customizable via Tailwind CSS.

## 🚧 Development Workflow

1. **Branch**: Create a feature branch from `main`
2. **Code**: Write your feature with TypeScript strict mode
3. **Test**: Run the dev server to verify functionality
4. **Lint**: Ensure code passes ESLint checks
5. **Commit**: Make meaningful commits
6. **Push**: Push to your branch
7. **PR**: Submit a pull request for review

## 🐛 Troubleshooting

### Port Already in Use
If port 8080 is in use, you can change it in `vite.config.ts`:
```typescript
server: {
  port: 3000, // Change this
}
```

### Module Not Found Errors
Clear node_modules and reinstall:
```bash
rm -rf node_modules
npm install
```

### Build Failures
Ensure TypeScript compiles without errors:
```bash
npx tsc --noEmit
```

## 📖 Documentation

- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn-ui](https://ui.shadcn.com/)
- [React Router](https://reactrouter.com/)

## 🤝 Contributing

Contributions are welcome! Please ensure:
- Code passes ESLint checks
- New features are properly typed
- Components are responsive
- Accessibility standards are maintained

## 📄 License

This project is proprietary. All rights reserved.

## 📧 Support

For support and inquiries, contact the development team.

## 🎓 Learning Resources

The codebase serves as a great reference for:
- Modern React with TypeScript
- shadcn-ui component patterns
- Tailwind CSS best practices
- React Router implementation
- State management with Context API
- Form handling with React Hook Form
- Responsive design patterns

---

**Built with ❤️ using modern web technologies**

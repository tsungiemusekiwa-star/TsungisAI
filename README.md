# TsungiAI - Firebase Edition

A modern, responsive web application for actuarial studies featuring audio learning capabilities, built with React, TypeScript, and Firebase.

## 🚀 Features

- **Audio Learning Hub** - Interactive audio lessons for CA1 actuarial studies
- **User Authentication** - Secure login/signup with password reset functionality
- **Progress Tracking** - Track your learning progress across all audio tracks
- **Responsive Design** - Desktop and mobile-optimized interface
- **Neumorphic UI** - Modern design with soft shadows and gradients
- **Firebase Integration** - Cloud storage for audio files and user data

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Backend**: Firebase (Auth, Storage)
- **Styling**: Pure CSS (Custom design system)
- **Routing**: React Router v6
- **State Management**: React Context

## 📱 Screenshots

### Desktop View
- Clean dashboard with sidebar navigation
- Audio player with progress tracking
- Statistics cards showing learning progress

### Mobile View
- Bottom navigation for mobile-friendly experience
- Responsive layout that adapts to screen size
- Touch-optimized controls

## 🎯 Current Features

### ✅ Implemented
- [x] User authentication (login/signup/password reset)
- [x] Audio learning hub with CA1 content
- [x] Progress tracking and statistics
- [x] Responsive mobile/desktop layout
- [x] Audio player with keyboard shortcuts
- [x] Firebase cloud storage integration

### 🚧 Coming Soon
- [ ] Acronym Generator
- [ ] Study Buddy (collaborative learning)
- [ ] Practice Tests
- [ ] Audio Upload functionality
- [ ] Typing Game

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Firebase project setup

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/tsungi-firebase.git
cd tsungi-firebase
```

2. Install dependencies:
```bash
npm install
```

3. Set up Firebase configuration:
   - Create a Firebase project at https://console.firebase.google.com
   - Enable Authentication and Storage
   - Copy your Firebase config to `src/firebase/config.js`

4. Start the development server:
```bash
npm run dev
```

5. Open http://localhost:5173 in your browser

## 🚀 Deployment

### Deploy to Vercel

1. **Fork or clone this repository**

2. **Set up Firebase project**:
   - Create a Firebase project at https://console.firebase.google.com
   - Enable Authentication (Email/Password)
   - Enable Storage
   - Copy your Firebase configuration

3. **Deploy to Vercel**:
   - Connect your GitHub repository to Vercel
   - Add environment variables in Vercel dashboard:
     ```
     VITE_FIREBASE_API_KEY=your-api-key
     VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
     VITE_FIREBASE_PROJECT_ID=your-project-id
     VITE_FIREBASE_STORAGE_BUCKET=your-project.firebasestorage.app
     VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
     VITE_FIREBASE_APP_ID=your-app-id
     VITE_FIREBASE_MEASUREMENT_ID=your-measurement-id
     ```
   - Deploy automatically with Vercel

4. **Configure Firebase Security Rules**:
   ```javascript
   // Storage Rules
   rules_version = '2';
   service firebase.storage {
     match /b/{bucket}/o {
       match /{allPaths=**} {
         allow read: if request.auth != null;
         allow write: if request.auth != null;
       }
     }
   }
   ```

### One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Mwoyoungo/tsungi-firebase)

## 🎮 Keyboard Shortcuts

- **Spacebar**: Play/Pause audio
- **Arrow Up/Down**: Volume control
- **Arrow Left/Right**: Previous/Next track
- **M**: Mute toggle

## 🏗️ Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── auth/            # Authentication components
│   ├── AppLayout.tsx    # Main layout wrapper
│   ├── AppSidebar.tsx   # Navigation sidebar
│   └── MobileBottomNav.tsx
├── contexts/            # React contexts
│   └── AuthContext.tsx  # Authentication state
├── firebase/            # Firebase configuration
│   ├── config.js        # Firebase setup
│   ├── auth.js          # Authentication functions
│   └── audioService.js  # Audio storage functions
├── pages/               # Page components
│   ├── AudioLearning.tsx
│   └── Auth.tsx
├── styles/              # CSS styles
│   └── tsungi.css       # Main stylesheet
└── App.tsx              # Main app component
```

## 🎨 Design System

The application uses a custom neumorphic design system with:
- **Color Palette**: Dark purple/lilac theme with teal accents
- **Typography**: Clean, readable fonts with proper hierarchy
- **Shadows**: Soft, layered shadows for depth
- **Responsive**: Mobile-first approach with desktop enhancements

## 🔧 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For support or questions, please open an issue on GitHub.

---

**TsungiAI** - Revolutionizing actuarial education through technology 🎓

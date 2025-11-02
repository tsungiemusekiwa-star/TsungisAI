import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { AppLayout } from './components/AppLayout';
import { SplashScreen } from './components/SplashScreen';
import { ComingSoon } from './components/ComingSoon';
import Auth from './pages/Auth';
import AudioLearning from './pages/AudioLearning';
import AcronymGenerator from './pages/AcronymGenerator';
import Chat from './pages/Chat';

// Page components with ComingSoon

const StudyBuddy = () => (
  <ComingSoon
    title="Study Buddy"
    description="Connect with fellow actuarial students for collaborative learning sessions, group study planning, and peer support throughout your journey."
    icon={
      <svg className="icon-lg text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    }
    features={[
      "Smart buddy matching",
      "Virtual study rooms",
      "Progress sharing",
      "Study schedule coordination"
    ]}
    estimatedDate="Q2 2024"
  />
);

const AudioUpload = () => (
  <ComingSoon
    title="Audio Upload"
    description="Upload your own study materials and convert them into interactive audio lessons. Share knowledge with the community and build your personal learning library."
    icon={
      <svg className="icon-lg text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
        <polyline points="7,10 12,5 17,10"/>
        <line x1="12" y1="5" x2="12" y2="15"/>
      </svg>
    }
    features={[
      "Multiple format support",
      "Auto-transcription",
      "Quality enhancement",
      "Community sharing"
    ]}
    estimatedDate="Q2 2024"
  />
);

const Practice = () => (
  <ComingSoon
    title="Practice Tests"
    description="Take comprehensive practice exams that mirror the real actuarial exam experience. Get detailed feedback and track your progress over time."
    icon={
      <svg className="icon-lg text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>
      </svg>
    }
    features={[
      "Exam-style questions",
      "Detailed explanations",
      "Performance analytics",
      "Adaptive difficulty"
    ]}
    estimatedDate="Q1 2024"
  />
);

const TypingGame = () => (
  <ComingSoon
    title="Typing Game"
    description="Improve your typing speed and accuracy with actuarial-focused content. Master mathematical formulas and industry terminology while having fun."
    icon={
      <svg className="icon-lg text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="6" width="20" height="12" rx="2"/>
        <circle cx="6" cy="12" r=".5"/>
        <circle cx="18" cy="12" r=".5"/>
        <path d="M9 16h6"/>
      </svg>
    }
    features={[
      "Actuarial terminology",
      "Formula practice",
      "Speed challenges",
      "Progress tracking"
    ]}
    estimatedDate="Q3 2024"
  />
);

const NotFound = () => (
  <div className="text-center space-y-6 py-12">
    <div className="card max-w-md mx-auto">
      <div className="card-content p-8 text-center">
        <div className="w-16 h-16 bg-destructive rounded-xl mx-auto mb-4 flex items-center justify-center">
          <svg className="icon-lg text-destructive-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <line x1="15" y1="9" x2="9" y2="15"/>
            <line x1="9" y1="9" x2="15" y2="15"/>
          </svg>
        </div>
        <h1 className="text-2xl font-bold mb-2">404 - Page Not Found</h1>
        <p className="text-muted-foreground mb-4">
          Sorry, the page you're looking for doesn't exist.
        </p>
        <a href="/" className="btn btn-primary">
          Go Home
        </a>
      </div>
    </div>
  </div>
);

const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  return (
    <ThemeProvider defaultTheme="dark" storageKey="tsungi-ai-theme">
      <AuthProvider>
        {showSplash ? (
          <SplashScreen onComplete={handleSplashComplete} />
        ) : (
          <BrowserRouter>
            <Routes>
              {/* Public routes */}
              <Route path="/auth" element={<Auth />} />

            {/* Protected routes */}
            <Route path="/" element={
              <ProtectedRoute>
                <AppLayout>
                  <AudioLearning />
                </AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/audio" element={
              <ProtectedRoute>
                <AppLayout>
                  <AudioLearning />
                </AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/acronyms" element={
              <ProtectedRoute>
                <AppLayout>
                  <AcronymGenerator />
                </AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/study-buddy" element={
              <ProtectedRoute>
                <AppLayout>
                  <StudyBuddy />
                </AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/chat" element={
              <ProtectedRoute>
                <AppLayout>
                  <Chat />
                </AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/upload" element={
              <ProtectedRoute>
                <AppLayout>
                  <AudioUpload />
                </AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/practice" element={
              <ProtectedRoute>
                <AppLayout>
                  <Practice />
                </AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/typing-game" element={
              <ProtectedRoute>
                <AppLayout>
                  <TypingGame />
                </AppLayout>
              </ProtectedRoute>
            } />

            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        )}
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
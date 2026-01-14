import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { AppLayout } from './components/global/AppLayout';
import { SplashScreen } from './components/global/SplashScreen';
import Auth from './pages/Auth';
import AudioLearning from './pages/AudioLearning';
import AcronymGenerator from './pages/AcronymGenerator';
import Chat from './pages/Chat';
import RevisionSummaries from './pages/RevisionSummaries';
import StudyBuddy from './pages/StudyBuddy';
import AudioUpload from './pages/AudioUpload';
import Practice from './pages/Practice';
import TypingGame from './pages/TypingGame';
import NotFound from './components/global/NotFound';
import FlashCards from './pages/FlashCards';

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
              <Route path="/revision-summaries" element={
                <ProtectedRoute>
                  <AppLayout>
                    <RevisionSummaries />
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

              <Route path="/flash-cards" element={
                <ProtectedRoute>
                  <AppLayout>
                    <FlashCards />
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
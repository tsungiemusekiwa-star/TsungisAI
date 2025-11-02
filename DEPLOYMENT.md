# TsungiAI Firebase - Vercel Deployment Guide

## Pre-deployment Checklist

### ✅ Repository Setup
- [x] Git repository initialized
- [x] All code committed to GitHub
- [x] Environment variables configured
- [x] Build process verified

### ✅ Vercel Configuration
- [x] `vercel.json` configuration file
- [x] Build command: `npm run build`
- [x] Output directory: `dist`
- [x] Framework: Vite (React)

### ✅ Environment Variables Required
Set these in Vercel Dashboard → Settings → Environment Variables:

```env
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
VITE_FIREBASE_MEASUREMENT_ID=your-measurement-id
```

### ✅ Firebase Setup Required
1. **Authentication**:
   - Enable Email/Password provider
   - Configure authorized domains (add your Vercel domain)

2. **Storage**:
   - Enable Firebase Storage
   - Upload audio files to `/CA1-Sound-Revision/` structure

3. **Security Rules**:
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

## Deployment Steps

### Option 1: Automatic Deployment
1. Connect GitHub repository to Vercel
2. Import project: `https://github.com/Mwoyoungo/tsungi-firebase`
3. Configure environment variables
4. Deploy automatically

### Option 2: Manual Deployment
1. Install Vercel CLI: `npm i -g vercel`
2. Login: `vercel login`
3. Deploy: `vercel --prod`

### Option 3: One-Click Deploy
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Mwoyoungo/tsungi-firebase)

## Post-Deployment

### 🔧 Configuration
1. **Add domain to Firebase**:
   - Go to Firebase Console → Authentication → Settings → Authorized domains
   - Add your Vercel deployment URL

2. **Test functionality**:
   - User registration/login
   - Audio playback
   - Theme switching
   - Mobile responsiveness

### 🚀 Performance Optimization (Optional)
- Enable Vercel Analytics
- Configure caching headers
- Optimize images and assets
- Set up monitoring

## Troubleshooting

### Common Issues
1. **Firebase errors**: Check environment variables
2. **Audio not loading**: Verify storage rules and file paths
3. **Auth errors**: Check authorized domains in Firebase
4. **Build failures**: Ensure all dependencies are installed

### Logs
- Check Vercel deployment logs
- Monitor Firebase Console for errors
- Use browser developer tools for debugging

## Features Deployed
✅ User Authentication (Login/Signup/Password Reset)
✅ Audio Learning Hub with progress tracking
✅ Theme switching (Light/Dark mode)
✅ Responsive mobile/desktop layout
✅ Firebase cloud storage integration
✅ Neumorphic UI design

---

**Live Demo**: [Your Vercel URL here]
**Repository**: https://github.com/Mwoyoungo/tsungi-firebase
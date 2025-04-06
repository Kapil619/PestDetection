# 🌿 Pest Detection Mobile App

## Project Overview
PestDetection is a mobile application designed to help farmers and agricultural professionals to instantly identify harmful pests using their smartphone cameras. The app combines real-time image processing with a comprehensive pest database to provide immediate identification and treatment recommendations.

## 📱 App Screenshots

<p align="center">
  <img src="https://github.com/user-attachments/assets/8951c266-849c-45ce-bed2-675bc822b420" width="200" alt="Login Screen" />
  <img src="https://github.com/user-attachments/assets/eda387d5-0fd5-482f-a528-597601f9a122" width="200" alt="Home Screen" />
  <img src="https://github.com/user-attachments/assets/58bc1167-c629-4090-afae-1eba8cb34953" width="200" alt="Camera Screen" />
</p>

## ✨ Key Features

- 📸 **Real-time Pest Detection**
  - Live camera feed for instant pest identification
  - High-accuracy detection algorithms
  - Confidence score display for each detection

- 🔍 **Multiple Detection Methods**
  - Upload images from gallery
  - Capture new photos
  - Live video feed monitoring

- 🎯 **Smart Search**
  - Comprehensive pest database
  - Detailed pest information
  - Easy-to-use search functionality

## 🛠️ Technical Stack

- **Frontend Framework**: React Native with Expo
- Backend: Firebase (Firestore)
- **State Management**: React Hooks
- **Authentication**: Firebase Auth
- **Navigation**: React Navigation v6

## 🚀 Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/pest-detection.git
```

2. Install dependencies:
```bash
cd pest-detection
npm install
```

3. Create a .env file in the root directory with your Firebase configuration:
```bash
FIREBASE_API_KEY=your_api_key
FIREBASE_AUTH_DOMAIN=your_auth_domain
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_storage_bucket
FIREBASE_MESSAGING_SENDER_ID=your_sender_id
FIREBASE_APP_ID=your_app_id
FIREBASE_DATABASE_URL=your_database_url
# Add your Firebase configuration
```

4. Start the development server:
```bash
npx expo start
```

## 🔌 API Integration

The app connects to two main backend services:
- Image Processing API (`/predict` endpoint)
- Live Feed API (`/video_feed` endpoint)

> Note: Backend services need to be configured separately. Contact me for API access.

## 📲 Features in Detail

### Image Processing
- Support for multiple image formats
- Batch processing capability
- Real-time detection feedback

### Live Monitoring
- Continuous video feed analysis

### User Interface
- Intuitive navigation
- Smooth animations
- Responsive design


## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Contact

For any inquiries, please reach out to kapilbadokar321@gmail.com

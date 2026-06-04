FraudSense AI 🛡️

An AI-powered Fraud Detection and Financial Security Monitoring Platform built using the MERN stack, Machine Learning, Real-Time Analytics, and Interactive Dashboards.

Overview

FraudSense AI is a comprehensive fraud detection system that helps identify suspicious financial transactions using machine learning, risk scoring, behavioral analysis, and real-time monitoring.

The platform combines traditional rule-based fraud detection with machine learning predictions to provide accurate risk assessment and instant fraud alerts.

---

Key Features

Authentication & Security

- JWT Authentication
- Protected Routes
- User-specific Transaction Data
- Secure API Access

AI-Powered Fraud Detection

- Machine Learning Fraud Prediction
- Dynamic Risk Scoring
- Fraud Probability Analysis
- Intelligent Risk Classification

Real-Time Monitoring

- Socket.IO Integration
- Live Transaction Streaming
- Instant Fraud Notifications
- Real-Time Dashboard Updates

Advanced Analytics

- Fraud Trend Analysis
- Risk Analytics Dashboard
- Severity Distribution Charts
- Fraud Statistics Monitoring

Interactive Dashboard

- Live Transaction Monitoring
- Search & Filtering
- Risk-Based Sorting
- Transaction Investigation Tools

Fraud Intelligence

- AI Insights Engine
- Suspicious Activity Detection
- Impossible Travel Detection
- Device Risk Analysis
- Failed Login Monitoring

Geospatial Analysis

- Fraud Location Mapping
- Interactive Fraud Heat Zones
- Location-Based Risk Tracking

Alerts & Notifications

- Real-Time Fraud Alerts
- Email Notifications
- Activity Feed
- Notification Center

Reporting

- Dashboard PDF Export
- Fraud Reports
- Transaction Analysis Reports

Additional Features

- Receipt Scanner
- AI Assistant
- Severity Classification
- Risk Meter Visualization

---

Tech Stack

Frontend

- React.js
- Vite
- Socket.IO Client
- Recharts
- jsPDF
- html2canvas
- React Hot Toast

Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- Socket.IO
- JWT Authentication
- Nodemailer

Machine Learning

- Python
- Flask
- Scikit-Learn
- Fraud Prediction Model

Database

- MongoDB Atlas

Deployment

- Frontend: Vercel
- Backend: Render
- ML API: Render
- Database: MongoDB Atlas

---

System Architecture

Frontend (React)

↓

Backend API (Express)

↓

Fraud Engine + ML Model

↓

MongoDB Atlas

↓

Real-Time Updates via Socket.IO

---

Fraud Detection Logic

The platform evaluates transactions using:

- Transaction Amount
- User Location
- Device Information
- Failed Login Attempts
- Transaction Frequency
- Impossible Travel Detection
- ML Fraud Probability

Severity Levels

HIGH

- Risk Score ≥ 70
- Transaction marked as Fraud

MEDIUM

- Risk Score ≥ 40

LOW

- Risk Score < 40

---

Dashboard Modules

Financial Security Dashboard

Central monitoring interface for all fraud analytics.

Fraud Trend Chart

Visualizes fraud activity over time.

Severity Distribution

Displays HIGH, MEDIUM, and LOW severity breakdown.

Risk Analytics

Advanced risk scoring visualizations.

Fraud Map

Shows fraud activity geographically.

AI Insights Panel

Provides AI-generated fraud intelligence.

Alerts Center

Displays recent fraud alerts.

Activity Feed

Tracks live user transactions.

Live Transaction Table

Supports:

- Search
- Filtering
- Sorting
- Risk Analysis

---

Environment Variables

Backend

PORT=5000

MONGO_URI=your_mongodb_atlas_uri

JWT_SECRET=your_secret_key

EMAIL_USER=your_email

EMAIL_PASS=your_email_password

ML_API_URL=https://your-ml-api.onrender.com

CLIENT_URL=https://your-frontend.vercel.app

Frontend

VITE_API_URL=https://your-backend.onrender.com

ML Server

PORT=5001

---

Installation

Clone Repository

git clone <repository-url>

cd project

---

Backend Setup

cd backend

npm install

Create .env file.

npm run dev

---

Frontend Setup

cd frontend

npm install

npm run dev

---

ML Server Setup

cd ml-server

pip install -r requirements.txt

python app.py

---

Deployment Guide

MongoDB Atlas

- Create Atlas Cluster
- Create Database User
- Whitelist Network Access
- Copy Connection String

Backend Deployment (Render)

Build Command

npm install

Start Command

npm start

Add environment variables in Render dashboard.

---

ML API Deployment (Render)

Build Command

pip install -r requirements.txt

Start Command

gunicorn app:app

---

Frontend Deployment (Vercel)

- Import GitHub Repository
- Add VITE_API_URL
- Deploy

---

Future Enhancements

- Deep Learning Fraud Detection
- Blockchain Transaction Verification
- Multi-Factor Risk Models
- Mobile Application
- Predictive Fraud Analytics
- User Behavior Profiling
- Advanced Threat Intelligence

---

Author

Akshra Tiwari

AI-Powered Financial Security & Fraud Intelligence Platform

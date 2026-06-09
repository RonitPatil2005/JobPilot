# 🚀 JobPilot - Centralized Job Portal

## 📌 Overview

JobPilot is a full-stack MERN web application that aggregates job listings from multiple sources into a single platform. Users can search jobs, upload resumes, extract skills automatically, and discover relevant career opportunities through a modern and responsive interface.

---

## 🌐 Live Demo

Frontend: https://job-pilot-iul9o0j2z-ronit-patil-s-projects.vercel.app

Backend API: https://jobpilot-backend-wgv0.onrender.com

---

## ✨ Features

### 🔐 Authentication

* User Registration
* User Login
* JWT Authentication
* Protected Routes

### 💼 Job Search

* Search Jobs by Keyword
* Search Jobs by Location
* Real-Time Job Listings
* Centralized Job Discovery

### 📄 Resume Analysis

* PDF Resume Upload
* Automatic Skill Extraction
* Suggested Career Role Detection

### 📱 User Experience

* Responsive Design
* Mobile Friendly UI
* Fast Search Experience
* Modern Dashboard Interface

---

## 🛠 Tech Stack

### Frontend

* React.js
* Vite
* React Router DOM
* Axios
* React Icons

### Backend

* Node.js
* Express.js

### Database

* MongoDB Atlas
* Mongoose

### Authentication

* JWT (JSON Web Token)
* bcryptjs

### Resume Processing

* Multer
* PDF-Parse

### External API

* JSearch API

### Deployment

* Vercel (Frontend)
* Render (Backend)

## ⚙️ Installation

### Clone Repository

git clone https://github.com/RonitPatil2005/JobPilot.git

cd JobPilot

### Backend Setup

cd backend
npm install
Create a .env file:

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

JSEARCH_API_KEY=your_api_key

Run Backend: npm run dev

### Frontend Setup
cd frontend
npm install
npm run dev

## 🚀 How It Works

1. User creates an account or logs in.
2. User searches jobs using keywords and location.
3. JobPilot fetches jobs from external sources.
4. User uploads a PDF resume.
5. Skills are extracted automatically.
6. Suggested job role is generated based on skills.

## 📚 Learning Outcomes

This project helped me gain hands-on experience in:

* Full Stack MERN Development
* REST API Development
* Authentication & Authorization
* MongoDB Integration
* Resume Parsing
* API Integration
* Deployment on Cloud Platforms
* Responsive UI Development

## 🔮 Future Improvements
* Save Jobs Feature
* ATS Resume Score
* User Profile Dashboard
* AI-Based Job Recommendations
* Email Notifications
* Job Application Tracker
* Advanced Search Filters
* Admin Dashboard

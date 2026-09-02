# 🚀 JobPilot - Centralized Job Aggregation & AI Resume Analysis Platform 

JobPilot is a full-stack MERN web application that brings job discovery and AI-powered resume analysis into one platform. It aggregates job listings from external sources, allows users to search by role and location, and analyzes PDF resumes to identify skills, recommend suitable roles, and provide ATS-style resume feedback.

---

## 🌐 Live Demo
https://job-pilot-rust-delta.vercel.app/

---

## ✨ Features

### 🔐 Authentication

* User Registration
* User Login
* JWT Authentication
* Protected Job Search
* Protected AI Resume Analysis

### 💼 Job Search

* Search jobs by keyword or job title
* Search jobs by location
* Real-time job listings
* Centralized job discovery from multiple sources
* Job posting date filtering
* Direct application links
* Displays company, location, employment type, source, and posting date

### 🤖 AI Resume Analysis

* PDF Resume Upload
* Resume Text Extraction
* AI-powered Resume Analysis using Google Gemini
* Automatic Technical Skill Extraction
* Best-Match Job Role Detection
* Alternative Career Role Suggestions
* ATS-style Resume Score
* Resume Strength Analysis
* Areas for Improvement
* AI-generated Resume Improvement Suggestions
* Keyword-based fallback when AI analysis is temporarily unavailable

### 📱 User Experience

* Modern and responsive interface
* Mobile-friendly design
* Interactive job search
* Resume analysis dashboard
* Smooth navigation
* Clean job cards and analysis sections

---

## 🧠 AI Resume Analysis

JobPilot uses **Google Gemini** to analyze uploaded resumes and generate structured career insights.

The AI analyzes:

* Programming Languages
* Frameworks and Libraries
* Databases
* Developer Tools
* APIs
* Technical Concepts
* Projects
* Experience
* Education
* Resume Keywords

### AI Analysis Output

The system provides:

* **ATS Resume Score**
* **Detected Technical Skills**
* **Best Match Role**
* **Alternative Roles**
* **Resume Strengths**
* **Areas to Improve**
* **Resume Improvement Suggestions**

If the Gemini API is temporarily unavailable, JobPilot automatically uses a **keyword-based fallback system** so the resume analysis feature can still provide basic skill and role suggestions.

---

## 🛠 Tech Stack

### Frontend

* React.js
* Vite
* React Router DOM
* Axios
* React Icons
* CSS

### Backend

* Node.js
* Express.js
* Axios

### Database

* MongoDB Atlas
* Mongoose

### Authentication & Security

* JWT (JSON Web Token)
* bcryptjs
* Protected API Routes

### Resume Processing

* Multer
* PDF-Parse

### AI

* Google Gemini API
* Gemini Flash Model
* Structured JSON AI Responses

### External Job API

* JSearch API

### Deployment

* Vercel - Frontend
* Render - Backend
* MongoDB Atlas - Database

---

## ⚙️ Installation

### 1. Clone Repository

```bash
git clone https://github.com/RonitPatil2005/JobPilot.git

cd JobPilot
```

---

### 2. Backend Setup

```bash
cd backend

npm install
```

Create a `.env` file inside the `backend` folder:

```env
MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

JSEARCH_API_KEY=your_jsearch_api_key

GEMINI_API_KEY=your_gemini_api_key
```

Start the backend:

```bash
npm run dev
```

---

### 3. Frontend Setup

Open another terminal:

```bash
cd frontend

npm install

npm run dev
```

The frontend will run using the Vite development server.

---

## 🚀 How JobPilot Works

### Job Search Flow

```text
User Login
     ↓
Enter Job Keyword & Location
     ↓
JobPilot Backend
     ↓
JSearch API
     ↓
Job Listings
     ↓
Display Jobs
     ↓
Apply Through External Job Link
```

### AI Resume Analysis Flow

```text
User Login
     ↓
Upload PDF Resume
     ↓
Backend Authentication
     ↓
PDF Text Extraction
     ↓
Google Gemini AI
     ↓
Resume Analysis
     ↓
Skills + ATS Score + Roles
     ↓
Strengths + Weaknesses
     ↓
Resume Improvement Suggestions
```

### AI Fallback Flow

```text
Resume Upload
     ↓
PDF Text Extraction
     ↓
Try Gemini AI
     ↓
 ┌───────────────┐
 │ Gemini Works? │
 └───────┬───────┘
       Yes                    No
        ↓                      ↓
   AI Analysis          Keyword Analysis
        ↓                      ↓
        └──────────┬───────────┘
                   ↓
            Analysis Result
```

---

## 🔒 Security

JobPilot implements authentication and protected functionality using:

* JWT-based authentication
* Password hashing with bcryptjs
* Protected backend routes
* Login requirement for job search
* Login requirement for AI resume analysis
* API keys stored in environment variables
* Uploaded resumes processed on the backend
* Uploaded resume files deleted after processing

> API keys and database credentials are never stored directly in the source code.

---

## 📊 Example AI Resume Analysis

A resume can produce results such as:

**ATS Score:** 76/100

**Best Match Role:** MERN Stack Developer

**Other Suitable Roles:**

* Full Stack Developer
* Frontend Developer
* React Developer
* Software Engineer Intern

**Analysis includes:**

* Technical skills
* Resume strengths
* Areas to improve
* Resume improvement suggestions
* ATS-style evaluation

---

## 📚 Learning Outcomes

This project helped me gain hands-on experience in:

* Full Stack MERN Development
* React.js Development
* REST API Development
* JWT Authentication & Authorization
* MongoDB Integration
* External API Integration
* AI API Integration
* Resume Parsing
* PDF Text Extraction
* Structured AI Responses
* Error Handling and Fallback Systems
* Responsive UI Development
* Cloud Deployment
* Environment Variable Management
* Frontend-Backend Integration

---

## 🔮 Future Improvements

The following features can be added in future versions:

* Save Jobs Feature
* User Profile Dashboard
* Personalized AI Job Recommendations
* Resume-to-Job Matching Score
* Job Application Tracker
* Email Notifications
* Advanced Search Filters
* Admin Dashboard
* Saved Resume Analysis History
* Multiple Resume Comparison
* AI-powered Job Description Analysis


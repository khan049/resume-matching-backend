> A backend-focused hiring platform designed to simulate scalable resume processing and candidate-job matching workflows used in modern recruitment systems.

# Resume Processing & Candidate Matching Platform

A backend-focused system for processing candidate resumes and matching them against job postings using weighted scoring and asynchronous processing architecture.

Built with **Node.js, Express.js, MongoDB, Docker, and AWS S3** to simulate a production-style hiring platform backend.

---

# Why This Project?

Traditional resume screening systems often rely on manual filtering and repetitive evaluation. This project was built to simulate a scalable backend architecture that automates resume processing, candidate ranking, and job matching while demonstrating backend engineering concepts such as asynchronous processing, cloud storage integration, authentication, and containerized deployment.

---

# 🚀 Features

## 🔐 Authentication & Authorization

* JWT-based authentication
* Role-Based Access Control (RBAC)
* Roles:

  * ADMIN
  * RECRUITER
  * CANDIDATE

---

## 📄 Resume Processing System

* Resume upload support
* AWS S3 integration for cloud file storage
* Asynchronous resume processing worker
* Resume lifecycle tracking:

  * UPLOADED
  * PROCESSING
  * PROCESSED
  * FAILED

---

## 🎯 Intelligent Matching Engine

* Rule-based weighted scoring engine
* Candidate-job ranking system
* Score breakdown:

  * Skills Score
  * Experience Score
  * Education Score

---

## 🗄 Database Optimization

* MongoDB indexing
* Compound indexes
* Text indexes
* Pagination support
* Optimized ranking queries

---

## 🐳 Dockerized Infrastructure

* Multi-container architecture
* Backend and MongoDB containers
* Docker Compose setup
* Environment consistency across systems

---

# 🌟 Highlights

* Implemented asynchronous resume processing using background workers.
* Designed a weighted candidate-job matching engine with score normalization.
* Containerized backend and database using Docker Compose.
* Integrated AWS S3 for scalable resume storage.
* Optimized MongoDB queries using indexes and ranking-based retrieval.

---

# 🧠 System Architecture

```text
Client
   |
Express API Server
   |
-----------------------------
| Auth Module               |
| Job Module                |
| Resume Module             |
| Matching Engine           |
-----------------------------
   |
MongoDB
   |
Resume Processing Worker
   |
AWS S3
```

---

# 🛠 Tech Stack

| Layer            | Technology             |
| ---------------- | ---------------------- |
| Backend          | Node.js, Express.js    |
| Database         | MongoDB, Mongoose      |
| Authentication   | JWT, bcrypt            |
| Cloud Storage    | AWS S3                 |
| Containerization | Docker, Docker Compose |
| File Upload      | Multer, multer-s3      |

---

# 📁 Project Structure

```text
resume-matching-backend/
│
├── src/
│   ├── app.js
│   ├── server.js
│   │
│   ├── config/
│   │   ├── db.js
│   │   └── s3.js
│   │
│   ├── modules/
│   │   ├── auth/
│   │   ├── job/
│   │   ├── resume/
│   │   └── match/
│   │
│   ├── middlewares/
│   │   ├── auth.middleware.js
│   │   ├── role.middleware.js
│   │   └── upload.middleware.js
│   │
│   ├── workers/
│   │   └── resume.worker.js
│   │
│   └── utils/
│       └── logger.js
│
├── Dockerfile
├── docker-compose.yml
├── .dockerignore
├── .env
├── package.json
└── README.md
```

---

# ⚙️ Local Development Setup

```bash
git clone https://github.com/khan049/resume-matching-backend.git

cd resume-matching-backend

npm install

npm run dev
```

---

# ⚡ API Endpoints

## 🔐 Auth APIs

| Method | Endpoint       | Description       |
| ------ | -------------- | ----------------- |
| POST   | /auth/register | Register new user |
| POST   | /auth/login    | Login and get JWT |

---

## 💼 Job APIs

| Method | Endpoint  |
| ------ | --------- |
| POST   | /jobs     |
| GET    | /jobs/:id |
| GET    | /jobs     |

---

## 📄 Resume APIs

| Method | Endpoint        |
| ------ | --------------- |
| POST   | /resumes/upload |
| GET    | /resumes/:id    |

---

## 🎯 Match APIs

| Method | Endpoint          |
| ------ | ----------------- |
| POST   | /match/:jobId     |
| GET    | /match/:jobId/top |

---

# 🧠 Matching Logic

The matching engine uses a deterministic weighted scoring algorithm:

| Parameter  | Weight |
| ---------- | ------ |
| Skills     | 50%    |
| Experience | 30%    |
| Education  | 20%    |

The system computes normalized candidate scores between **0–100** and stores precomputed rankings for optimized retrieval.

---

# 🐳 Docker Setup

## Run Project

```bash
docker-compose up --build
```

## Stop Containers

```bash
docker-compose down
```

---

# ☁️ Environment Variables

```env
PORT=5000

MONGO_URI=mongodb://mongo:27017/resume_matcher

JWT_SECRET=your_secret_key

AWS_ACCESS_KEY=your_access_key
AWS_SECRET_KEY=your_secret_key
AWS_REGION=ap-south-1
AWS_BUCKET_NAME=your_bucket_name
```

---

# 🚀 Future Improvements

* Redis caching
* BullMQ-based queue processing
* ML-based candidate ranking
* Swagger API documentation

---

# 🧑‍💻 Key Backend Concepts Demonstrated

* Modular backend architecture
* Async background processing
* REST API design
* JWT authentication
* Role-based authorization
* MongoDB indexing strategies
* Dockerized development workflow
* Cloud storage integration
* Deterministic ranking engine

---

# 📌 Notes

* Resume files are stored in AWS S3.
* Only resume metadata is stored in MongoDB.
* Matching scores are precomputed for faster ranking queries.
* System is designed with modular architecture, allowing future integration of ML-based ranking models.

---

# 👨‍💻 Author
JUNAYED ALI KHAN

Built as a backend-focused project to demonstrate scalable system design, asynchronous processing, and cloud-integrated backend engineering.

# 🔥 NEXORA LABS - Firebase Firestore Setup Guide

Follow these exact configurations when clicking **"Start a collection"** inside your live Firebase Console (`nexora-labs`) to ensure complete synchronization with the React frontend code schemas.

---

## 📂 1. Core Collection: `users`
Stores student profiles, custom application roles, and verification details.

* **Collection ID**: `users`
* **Document ID**: Click **"Auto-ID"** (e.g. `usr-mock-root-001`)
* **Fields**:
  * `uid` *(string)*: `usr-mock-root-001`
  * `email` *(string)*: `admin@nexoralabs.com`
  * `name` *(string)*: `NEXORA Master Admin`
  * `role` *(string)*: `admin` *(Use `student` for normal test users)*
  * `college` *(string)*: `NEXORA HQ`
  * `phone` *(string)*: `+91 80000 11111`
  * `degree` *(string)*: `Ph.D in Systems Engineering`
  * `rollNumber` *(string)*: `NEX-ADMIN-001`
  * `graduationYear` *(string)*: `2020`
  * `avatar` *(string)*: `https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80`
  * `bio` *(string)*: `Chief Systems Architect governing NEXORA LABS project repository.`
  * `twoFactorAuth` *(boolean)*: `true`
  * `emailAlerts` *(boolean)*: `true`

---

## 📂 2. Core Collection: `projects`
Stores dynamically initialized application products visible in the ready-made Project Catalog.

* **Collection ID**: `projects`
* **Document ID**: `proj-init-101`
* **Fields**:
  * `id` *(string)*: `proj-init-101`
  * `title` *(string)*: `Autonomous AI Med-Diagnose & Prescription Assistant`
  * `category` *(string)*: `AI/ML`
  * `description` *(string)*: `Next-gen LLM-driven symptom analyzer with computer vision X-ray anomaly segmentation.`
  * `longDescription` *(string)*: `Employs deep convolutional neural networks for diagnostic vision analysis integrated with secure REST APIs.`
  * `technology` *(array)*: Add items -> `Python`, `TensorFlow`, `FastAPI`, `React`
  * `difficultyLevel` *(string)*: `Expert`
  * `features` *(array)*: Add items -> `Complete Source Code`, `Database Scripts`, `Viva question guide`
  * `price` *(number)*: `2499`
  * `rating` *(number)*: `4.9`
  * `salesCount` *(number)*: `142`
  * `thumbnail` *(string)*: `https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80`
  * `synopsisAvailable` *(boolean)*: `true`
  * `pptAvailable` *(boolean)*: `true`
  * `demoUrl` *(string)*: `https://nexoralabs.com`
  * `architecture` *(string)*: `Microservices architecture with WebSockets handling ML inference.`

---

## 📂 3. Core Collection: `courses`
Stores online academy recorded sessions, downloadable note configurations, and feature lists.

* **Collection ID**: `courses`
* **Document ID**: `course-init-201`
* **Fields**:
  * `id` *(string)*: `course-init-201`
  * `title` *(string)*: `AI Masterclass: Prompt Engineering & LLM Application Building`
  * `instructor` *(string)*: `Dr. Siddharth Varma (Ex-OpenAI Researcher)`
  * `duration` *(string)*: `42 Hours`
  * `lessonsCount` *(number)*: `68`
  * `level` *(string)*: `All Levels`
  * `price` *(number)*: `1999`
  * `rating` *(number)*: `4.9`
  * `thumbnail` *(string)*: `https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80`
  * `features` *(array)*: Add items -> `Lifetime access`, `Certificate of Completion`, `5 Mini AI Projects`
  * `description` *(string)*: `Master LangChain, vector databases, and OpenAI APIs.`
  * `tags` *(array)*: Add items -> `AI/ML`, `Python`, `ChatGPT`

---

## 📂 4. Core Collection: `documents`
Stores downloadable presentations, Preliminary reports (PTD), and IEEE document guidelines.

* **Collection ID**: `documents`
* **Document ID**: `doc-init-301`
* **Fields**:
  * `id` *(string)*: `doc-init-301`
  * `title` *(string)*: `AI Medical Assistant Full Synopsis & SRS Document`
  * `type` *(string)*: `Synopsis`
  * `category` *(string)*: `AI/ML`
  * `pages` *(number)*: `24`
  * `fileSize` *(string)*: `4.2 MB`
  * `price` *(number)*: `299`
  * `downloads` *(number)*: `530`
  * `description` *(string)*: `Standard IEEE format synopsis including DFD level 0,1,2 diagrams.`

---

## 📂 5. Core Collection: `custom_project_requests`
Stores leads coming from the customized project modal directly.

* **Collection ID**: `custom_project_requests`
* **Document ID**: Click **"Auto-ID"**
* **Fields**:
  * `id` *(string)*: `cust-req-sample-001`
  * `studentName` *(string)*: `Vikram Sharma`
  * `collegeName` *(string)*: `Delhi Technological University`
  * `technology` *(string)*: `MERN Stack (MongoDB, Express, React, Node)`
  * `projectTitle` *(string)*: `Autonomous Fleet Tracker Hub`
  * `deadline` *(string)*: `2026-06-15`
  * `budget` *(number)*: `4500`
  * `phone` *(string)*: `+91 9876543210`
  * `email` *(string)*: `vikram@dtu.edu`
  * `requirementDetails` *(string)*: `Require multi-vendor setup scripts with IEEE PDF mapping.`
  * `status` *(string)*: `Pending Verification`

---

## 📂 6. Core Collection: `purchases`
Stores unlocked product download states and dynamic QR certificate reference links.

* **Collection ID**: `purchases`
* **Document ID**: Click **"Auto-ID"**
* **Fields**:
  * `id` *(string)*: `purchase-sample-001`
  * `userId` *(string)*: `usr-mock-root-001`
  * `itemId` *(string)*: `proj-init-101`
  * `type` *(string)*: `project`
  * `title` *(string)*: `Autonomous AI Med-Diagnose`
  * `price` *(number)*: `2499`
  * `purchasedAt` *(string)*: `2026-05-15`
  * `status` *(string)*: `Unlocked`
  * `downloadUrl` *(string)*: `https://nexoralabs.com/downloads/source_code_aimed.zip`
  * `certificateId` *(string)*: `NEX-CERT-2026-8812`

---

## 📂 7. Core Collection: `support_tickets`
Stores live user threads for dependency mentoring support.

* **Collection ID**: `support_tickets`
* **Document ID**: Click **"Auto-ID"**
* **Fields**:
  * `id` *(string)*: `ticket-sample-001`
  * `studentName` *(string)*: `Aditya Narayan`
  * `email` *(string)*: `aditya@student.college.edu`
  * `subject` *(string)*: `Assistance required with Python setup`
  * `message` *(string)*: `Getting a dependency error with TensorFlow on Python 3.11.`
  * `status` *(string)*: `Open`
  * `createdAt` *(string)*: `2026-05-15`

---

## 📂 8. Core Collection: `admin_notifications`
Stores backend webhook prints sent to the monitoring pool.

* **Collection ID**: `admin_notifications`
* **Document ID**: Click **"Auto-ID"**
* **Fields**:
  * `to` *(string)*: `admin@nexoralabs.com`
  * `subject` *(string)*: `System Setup Verification Test`
  * `details` *(map)*: Add custom key values inside.

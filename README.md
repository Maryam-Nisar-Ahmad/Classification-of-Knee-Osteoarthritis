# 🦵 Knee Osteoarthritis Classification & Healthcare Platform

An end-to-end full-stack application combining **AI-based KOA detection**, **patient management**, **doctor workflows**, **appointments**, **forums**, and **PDF medical reporting**.

This project demonstrates full-stack experience with **React, Flask, REST APIs, MongoDB, JWT, PyTorch**, and scalable backend architecture.

---

## ✨ Features

### 🧠 AI-Based KOA Classification

* PyTorch model (`.pth`) for 4-class knee osteoarthritis detection
* Custom preprocessing pipeline (grayscale, normalization, augmentation)
* Returns prediction + preprocessed image
* Severity-specific care recommendations

---

### 👨‍⚕️ User Accounts (Patient / Doctor / Admin)

* JWT secured auth
* Admin-controlled doctor approval
* Doctors can update profile, set rates, manage clinic availability
* Patients can upload X-rays, track scans, log symptoms

---

### 📅 Appointment System

* Patients request timeslots
* Doctors accept/reject in dashboard
* Auto-generated session timing (50 mins + 10 min break)
* Busy days calendar

---

### 💬 Forum Module

* Create posts
* Add comments
* React (like / dislike / report)
* Full moderation flow

---

### 📝 Auto-Generated PDF Health Report

Includes:

* Patient info
* Scan history
* Symptoms summary
* Model prediction
* Severity-based advice
  Generated using **ReportLab**.

---

## 🛠 Technology Stack

### **Frontend**

* React
* React Router
* Bootstrap
* Lottie animations
* react-compare-slider

### **Backend**

* Flask
* Flask-PyMongo
* JWT Authentication
* PyTorch for inference
* OpenCV / PIL / NumPy
* ReportLab
* MongoDB

---

## 📁 Project Structure

```
backend/
 ├── app.py
 ├── auth.py
 ├── admin_routes.py
 ├── doctor_routes.py
 ├── appointment_routes.py
 ├── utils/
 │    ├── model.py
 │    └── preprocessing.py
 ├── uploads/
 │    ├── xrays/
 │    ├── preprocessed/
 │    ├── photos/
 └── model/*.pth

frontend/
 ├── src/
 │    ├── components/
 │    ├── pages/
 │    └── ...
 └── public/
```

---

## 🔐 Authentication & Security

* Password hashing
* JWT-based login
* Role-based route protection
* `@token_required` decorators
* Admin, Doctor, and Patient privilege levels

---

## 📡 REST API (Quick Overview)

| Method | Route                    | Description            |
| ------ | ------------------------ | ---------------------- |
| POST   | `/predict`               | Run KOA classification |
| GET    | `/history`               | Get scan history       |
| POST   | `/auth/register`         | Register account       |
| POST   | `/auth/login`            | Login + JWT            |
| GET    | `/doctor/busy-days`      | Get blocked dates      |
| POST   | `/doctor/busy-days`      | Toggle blocked day     |
| POST   | `/appointments/request`  | Request appointment    |
| GET    | `/appointments/requests` | Doctor appointments    |
| POST   | `/forum`                 | Create post            |
| GET    | `/forum`                 | List all posts         |
| POST   | `/pdf`                   | Generate health report |

---

## 🚀 Running the Project

### Backend

```bash
cd backend
pip install -r requirements.txt
python app.py
```

### Frontend

```bash
cd frontend
npm install
npm start
```


# 🧪 Sample Collection Management API

This project is a RESTful API built using **Node.js**, **Express**, and **MongoDB** for managing agents and patient sample collections. It allows agent registration, sample assignment, collection status updates, and more.

---

## 📁 Folder Structure

```
.
├── controllers/
│   ├── agentController.ts
│   └── sampleController.ts
├── models/
│   ├── Agent.ts
│   └── Sample.ts
├── routes/
│   ├── agentRoutes.ts
│   └── sampleRoutes.ts
├── .env
├── app.ts
├── server.ts
├── package.json
└── README.md
```

---

## 🚀 Features

* ✅ Agent Registration
* ✅ Unique Email Validation
* ✅ Password Hashing using bcrypt
* ✅ Sample Creation with patient & hospital details
* ✅ Sample assigned to agent
* ✅ Update sample collection status (`pending` → `collected`)
* ✅ View all samples, specific samples, and agent-wise samples
* ✅ Timestamps for creation and updates
* ✅ Mongoose Models & Schema validation
* ✅ REST API tested using Postman

---

## 🔧 Setup Instructions

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/sample-collection-api.git
cd sample-collection-api
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup MongoDB

Make sure MongoDB is running locally or use MongoDB Atlas.
Then, create a `.env` file in the root directory and add:

```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/sample-db
```

Or for MongoDB Atlas:

```
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/sample-db
```

### 4. Run the Project

```bash
npm run dev
```

App will start on `http://localhost:5000`

---

## 🔐 Agent Routes (`/api/agents`)

### ➕ Register a New Agent

```
POST /api/agents/register
```

#### Request Body:

```json
{
  "name": "Agent A",
  "email": "agenta@example.com",
  "password": "securepassword"
}
```

---

## 🧪 Sample Routes (`/api/samples`)

### ➕ Create New Sample

```
POST /api/samples
```

#### Request Body:

```json
{
  "patientName": "John Doe",
  "hospitalName": "City Hospital",
  "scheduledAt": "2025-08-10T10:00:00.000Z",
  "agent": "64dd5d5123456789abcdef00"
}
```

---

### 🔄 Update Sample Status (Collected)

```
PATCH /api/samples/:id/update
```

#### Request Body:

```json
{
  "status": "collected",
  "collectedAt": "2025-08-10T12:00:00.000Z"
}
```

---

### 📄 Get All Samples

```
GET /api/samples
```

---

### 📄 Get Sample by ID

```
GET /api/samples/:id
```

---

### 📄 Get Samples by Agent ID

```
GET /api/samples/agent/:agentId
```

---

## 🧑‍💻 Technologies Used

* **Node.js**
* **Express.js**
* **MongoDB**
* **Mongoose**
* **TypeScript**
* **bcrypt.js**
* **Postman (for testing)**

---

## 📬 Postman Testing Guide

1. Register agent via `/api/agents/register`
2. Copy the returned agent `_id`
3. Use the agent `_id` in the sample creation request
4. Fetch samples and test the update functionality

---

## 📌 Future Improvements

* JWT authentication for agents
* Admin dashboard for viewing all agents and samples
* File upload for sample reports
* Email notifications for scheduled collections

---

## 📝 Author

**Dharmendra Sah**
*Developer passionate about clean APIs and real-world problem solving.*

---
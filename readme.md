🎓 Student Grade Management System

A simple full-stack web app to manage student records, grades, and performance.

---

 📂 Project Structure

root/
│
├── frontend/ # Next.js or React app
├── backend/ # Node.js + Express server
└── README.md


---

 🚀 Quick Start

1️⃣ Clone the repository

git clone https://github.com/amitthakur003/studentGradeManagement.git

cd your-repo-name

2️⃣ Install & Run Frontend
cd frontend
npm install
npm run dev

3️⃣ Install & Run Backend
cd backend
npm install
node server.js   # Do NOT use npx nodemon here


🔐 Environment Variables
To connect your backend to the database, you must create a .env file inside the backend/ folder with these credentials:

DB_USER=YOUR_DATABASE_USERNAME

DB_PASS=YOUR_DATABASE_PASSWORD


✅ Features
Add, remove, and update student records.

Manage grades (comma-separated input).

Dashboard to view all students and their averages.

Highlights the top performer automatically.
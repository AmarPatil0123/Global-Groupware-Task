# User Management System

## 🚀 Project Overview
This is a **User Management System** built using **React, React Bootstrap, and React Router**. It allows users to:
- View a list of users.
- Search for users.
- Edit and delete users.
- Authenticate via login.
- Perform API calls to fetch and manage user data.

## 🛠️ Tech Stack
- **Frontend:** React, Bootstrap, React Toastify, React Router
- **Backend API:** Connected via REST API
- **Deployment:** Render

## 📂 Project Structure
```
project-root/
│-- src/
│   ├── components/  # Reusable UI components
│   ├── pages/       # Page components (Login, Home)
│   ├── App.js       # Main app component
│   ├── index.js     # Entry point
│-- .env             # Environment variables
│-- README.md        # Documentation
│-- package.json     # Dependencies
```

## 🔧 Installation & Setup
### 1️⃣ Clone the Repository
```sh
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

### 2️⃣ Install Dependencies
```sh
npm install
```

### 3️⃣ Set Up Environment Variables
Create a **.env** file in the project root and add:
```
VITE_BASE_URL=https://your-api-url.com/
```

### 4️⃣ Start the Development Server
```sh
npm run dev
```
Then open **http://localhost:5173/** in your browser.

## 🌐 Deployment
The project is deployed on **Render**.
To redeploy after changes:
```sh
git add .
git commit -m "Updated features"
git push origin main
```

## 🎯 Features
✅ User List with Pagination  
✅ Search Functionality  
✅ User Editing & Deleting  
✅ Secure Login with API Authentication  
✅ Toast Notifications for User Feedback  

## 🛠 Troubleshooting
**If toast notifications don't work after deployment:**
1. Check **Render Logs** for API errors.
2. Ensure `react-toastify` is installed:
   ```sh
   npm list react-toastify
   ```
3. Verify that `<ToastContainer />` is present in `App.js`.
4. Ensure `.env` variables are correctly set.
5. Check browser console (`F12`) for errors.

## 📜 License
This project is licensed under the **MIT License**.

---
Developed with ❤️ using React & Bootstrap.


# 💬 Chatty-Chat

**Chatty-Chat** is a real-time chat application built using the **MERN stack**, **Socket.io**, and **Cloudinary**, enabling users to exchange messages, share photos, and upload profile pictures. The application provides a seamless one-to-one messaging experience with live updates, typing indicators, authentication, and a clean, responsive UI.

---

## 🚀 Project Objective

The goal of Chatty-Chat is to demonstrate a full-stack, real-time messaging application with modern features and best practices. Key objectives include:

- Secure user authentication and profile management  
- Real-time one-to-one messaging using WebSockets  
- Photo sharing and profile image upload via **Cloudinary**  
- Typing indicators and instant message delivery  
- A clean, responsive user interface for all screen sizes  
- Scalable backend with secure API integrations

---

## 🛠️ Tech Stack

- **Frontend:** React.js, Axios, Tailwind CSS (or CSS Modules)
- **Backend:** Node.js, Express.js, Socket.io
- **Database:** MongoDB with Mongoose
- **Authentication:** JSON Web Tokens (JWT), bcrypt
- **Image Upload & Hosting:** Cloudinary
- **Real-time Communication:** Socket.io
- **Tools & Others:** Postman, VSCode, Git, GitHub

---

## 🔄 Project Workflow

Here’s how the application works end-to-end:

1. **User Authentication**
   - New users register and log in using secure JWT-based authentication.
   - Passwords are encrypted using bcrypt before storing in MongoDB.

2. **Profile Management**
   - Users can upload profile pictures using Cloudinary.
   - Image URLs are securely stored and retrieved from the database.

3. **Socket Connection Establishment**
   - Once authenticated, the frontend connects to the backend via Socket.io.
   - Socket IDs are tracked to manage active users and messaging.

4. **Real-Time Messaging**
   - Messages are instantly sent and received via WebSocket.
   - Cloudinary image messages (photos) are supported and displayed in the chat.

5. **Typing Indicators**
   - Typing notifications are displayed using Socket.io events.

6. **Responsive UI**
   - The UI is fully responsive, optimized for mobile, tablet, and desktop.
   - Real-time updates are reflected immediately without page reloads.

7. **Logout & Disconnection**
   - User sessions end securely and socket disconnection is handled on logout.

---


## 🔧 Installation Steps

### 📦 Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Git](https://git-scm.com/)
- A **Cloudinary** account ([https://cloudinary.com/](https://cloudinary.com/))

---

### 🛠️ Clone the Repository

```bash
  git clone https://github.com/Nancy0801/Chatify
  cd Chatify
```

### 📁 Backend Setup
```bash
  cd server
  npm install
```

### Create a .env file in the /server directory and add the following:
```env
  PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Start the backend server:
```bash
npm run dev
```

### 💻 Frontend Setup
```bash
cd ../client
npm install
npm start
```

### The app will run at:  
👉 http://localhost:3000

### 📬 Contact Me
**Nancy Gupta**
📧 nancyg8029@gmail.com
🌐 [LinkedIn](http://www.linkedin.com/in/nancy-gupta-784b5025a)

### 🤝 Contributing
Contributions are welcome!
To contribute:
- Fork the repository
- Create a new branch (git checkout -b feature/your-feature)
- Commit your changes (git commit -m 'Add new feature')
- Push to the branch (git push origin feature/your-feature)
- Open a pull request

### ⭐️ Show Your Support
If you found this project helpful or inspiring, feel free to give it a ⭐️ and share it!

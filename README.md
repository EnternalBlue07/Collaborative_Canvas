

# 🎨 Collaborative Canvas App

**A real-time collaborative drawing application** built with **React**, **Socket.IO**, and **Node.js**. Draw together with friends or colleagues on the same canvas, no matter where they are, with features like color selection, brush size adjustment, and real-time updates!

---

## 🚀 Features

- 🖌️ **Draw in Real-Time**: Collaborate with multiple users on the same canvas.
- 🎨 **Color Picker**: Choose your favorite brush color.
- 📏 **Brush Size Adjustment**: Customize the brush size for detailed or bold strokes.
- 🧹 **Clear Canvas**: Clear the canvas for everyone at once.
- 🌐 **Global Connectivity**: Join the canvas from any device over the internet.

---

## 🛠️ Technologies Used

- **Frontend**: React + Vite
- **Backend**: Node.js + Express
- **WebSocket**: Socket.IO for real-time communication
- **Styling**: CSS (basic for simplicity)

---

## 🔧 Installation and Setup

Follow these steps to run the project locally:

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/EnternalBlue07/collaborative-canvas.git
cd collaborative-canvas
```

### 2️⃣ Install Dependencies

#### Backend
```bash
cd backend
npm install
```

#### Frontend
```bash
cd ../collaborative-canvas
npm install
```

### 3️⃣ Run the Project

#### Start the Backend
```bash
cd backend
node server.js
```

#### Start the Frontend
```bash
cd ../collaborative-canvas
npm run dev --host
```

### 4️⃣ Open in Browser
- Navigate to `http://localhost:5173` to access the app.
- Share the backend server URL (`http://localhost:3000` or your public IP) with collaborators.

---

## 🌍 Hosting Options

- **Local Network**: Use your local IP (e.g., `192.168.x.x`) to allow collaborators on the same network.
- **Internet**: Use tools like **Ngrok**, **Render**, or deploy to **AWS**, **Heroku**, etc., for global access.

---

## 📜 How to Use

1. Open the app in multiple browsers or devices.
2. Select your **brush color** and **brush size** using the controls.
3. Start drawing on the canvas.
4. Watch updates sync in real-time across all connected users!
5. Use the "Clear Canvas" button to start fresh for everyone.

=

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

## 🌟 Acknowledgements

Thanks to the open-source community for the tools and libraries used in this project:

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Socket.IO](https://socket.io/)
- [Node.js](https://nodejs.org/)

---

### 🎉 Happy Drawing!


### Tips for Enhancing Your README
- Replace `your-username`, `your-email@example.com`, and placeholder links with your actual details.
- Add a GIF or a short video demo (use tools like **Loom**, **OBS**, or **ScreenToGif**) to make your README more engaging.

Let me know if you'd like help creating a GIF or deploying the app for public use!

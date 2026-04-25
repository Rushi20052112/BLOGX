# BlogX ✍️

> A full-stack blogging platform powered by the MERN stack — write, publish, and discover stories with AI-assisted content creation.

🔗 **Live Demo:** [https://blogx-drab.vercel.app](https://blogx-drab.vercel.app)

---

## 📸 Preview

> Visit the live site at [blogx-drab.vercel.app](https://blogx-drab.vercel.app)

---

## 🚀 Features

- 🛡️ **Admin Blog Management** — Only admins can create, edit, and delete blog posts
- 💬 **User Comments** — Registered users can read and comment on blog posts
- 🤖 **AI-Powered Descriptions** — Integrated Google Gemini AI to auto-generate blog descriptions for admins
- 🖼️ **Optimized Image Uploads** — ImageKit integration for fast, optimized image delivery
- 🗂️ **State Management** — Smooth and predictable state handling via Redux
- 📱 **Responsive Design** — Fully responsive across all screen sizes
- 🌐 **Deployed on Vercel** — Fast, reliable frontend deployment

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| React.js | UI Library |
| Redux | State Management |
| Axios | HTTP Client |

### Backend
| Technology | Purpose |
|------------|---------|
| Node.js | Runtime Environment |
| Express.js | Web Framework |
| MongoDB | Database |
| Mongoose | ODM for MongoDB |

### Integrations
| Service | Purpose |
|---------|---------|
| Google Gemini AI | AI-generated blog descriptions |
| ImageKit | Image optimization & CDN delivery |
| JWT | Token-based authentication & route protection |
---

## ⚙️ Getting Started

### Prerequisites

Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v18+)
- [MongoDB](https://www.mongodb.com/) (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/blogx.git
   cd blogx
   ```

2. **Install dependencies for both client and server**
   ```bash
   # Install server dependencies
   cd server
   npm install

   # Install client dependencies
   cd ../client
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the `/server` directory:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret

   # ImageKit
   IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
   IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
   IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint

   # Google Gemini
   GEMINI_API_KEY=your_gemini_api_key
   ```

   Create a `.env` file in the `/client` directory:
   ```env
   VITE_API_URL=http://localhost:5000
   ```

4. **Run the application**
   ```bash
   # Start the backend server
   cd server
   npm run dev

   # In a separate terminal, start the frontend
   cd client
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

---

## 🤖 AI Description Generation

BlogX uses **Google Gemini** to help admins craft compelling blog descriptions effortlessly. When creating a new post, the admin can click the **"Generate with AI"** button — Gemini will analyze the blog title and content, and produce a polished description automatically.

---

## 🖼️ Image Optimization with ImageKit

All images uploaded by users are processed through **ImageKit**, which provides:
- Automatic format conversion (WebP)
- Responsive resizing
- Fast CDN delivery worldwide

---

## 🔐 Authentication System

BlogX uses a robust **JWT-based authentication** system 

| Role | Permissions |
|------|-------------|
| 👤 Guest | Read blog posts |
| 🙋 User | Read posts + comment |
| 🛡️ Admin | Full access — create, edit, delete posts + manage content |


```
blogx/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Route-level pages
│   │   ├── redux/          # Redux store, slices & actions
│   │   └── utils/          # Helper functions
│   └── ...
│
├── server/                 # Express backend
│   ├── controllers/        # Route handlers
│   ├── models/             # Mongoose schemas
│   ├── routes/             # API routes
│   ├── middleware/         # Auth & error middleware
│   └── ...
│
└── README.md
```

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/login` | Admin Login |
| GET | `/api/blogs` | Get all blogs (public) |
| GET | `/api/blogs/:id` | Get a single blog (public) |
| POST | `/api/blogs` | Create a new blog **(Admin only)** |
| PUT | `/api/blogs/:id` | Update a blog **(Admin only)** |
| DELETE | `/api/blogs/:id` | Delete a blog **(Admin only)** |
| POST | `/api/blogs/:id/comments` | Add a comment (Users) |
| GET | `/api/blogs/:id/comments` | Get comments for a blog (public) |

---

## 🌍 Deployment

| Layer | Platform |
|-------|----------|
| Frontend | [Vercel](https://vercel.com) |
| Backend | [Render](https://render.com) |
| Database | MongoDB Atlas |

---

## 🤝 Contributing

Contributions are welcome! To get started:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 👤 Author

Made with ❤️ by **Rushikesh Repale**

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Rushi20052112)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/rushikesh-repale-46105925b/)

---

> ⭐ If you found this project helpful, please consider giving it a star on GitHub!

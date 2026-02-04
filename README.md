# 📐 CAD ENVISION  
**Architectural Asset Marketplace**

A high-performance, full-stack marketplace for professional architectural drawings, CAD files, and technical engineering articles. Designed with a strong focus on speed, technical precision, and a clean **blueprint-inspired aesthetic**.

---

## 🚀 Features

### 🔍 Advanced Search & Discovery
- **Global Search** – Search drawings and blogs by name directly from the Navbar or URL.
- **Keyword Highlighting** – Regex-based keyword highlighting for instant visual feedback.
- **Dynamic Filtering** – Filter assets by:
  - Discipline (HVAC, Plumbing, Electrical, etc.)
  - Pricing (Free / Premium)

---

### 🛠 Technical Asset Management
- **Quick View System** – Instant modal previews for technical details.
- **Dynamic Asset Pages** – SEO-friendly routes using MongoDB Object IDs.
- **Technical Specifications Tracking**
  - File types (`.DWG`, `.PDF`)
  - Layer counts
  - Software compatibility versions

---

### 📝 Engineering Blog System
- **Dynamic Categories** – Categories fetched in real time from the backend.
- **Clean Date Formatting** – Chronological formatting using Day.js.
- **Archives & Pagination** – Organized article archives with full pagination support.

---

## 💻 Tech Stack

| Layer       | Technology |
|------------|------------|
| Frontend   | Next.js 14+ (App Router), React, Tailwind CSS |
| Backend    | Node.js, Express.js |
| Database   | MongoDB (Mongoose ODM) |
| State / UI | React Context API, Lucide React |
| Utilities  | Day.js, Next Navigation |

---

## 🛠 Installation & Setup

### 📦 Prerequisites
- Node.js (v18+ recommended)
- MongoDB (local or cloud)
- npm or yarn

---

### 🔹 Frontend Setup

cd client
npm install
npm run dev

The frontend will start on:

http://localhost:3000

🔹 Backend Setup

Create a .env file inside the server directory:

PORT=8000
MONGO_URI=your_mongodb_connection_string

Then run:

cd server
npm install
npm start

The backend API will be available at:

http://localhost:8000

🔌 API Endpoints
📐 Drawings

| Method | Endpoint                   | Description                                          |
| ------ | -------------------------- | ---------------------------------------------------- |
| GET    | `/api/drawings/all`        | Fetch all assets (supports search, category, sortBy) |
| GET    | `/api/drawings/single/:id` | Fetch metadata for a single blueprint                |

📝 Blogs

| Method | Endpoint                | Description                         |
| ------ | ----------------------- | ----------------------------------- |
| GET    | `/api/blogs/all`        | Paginated blog list with search     |
| GET    | `/api/blogs/categories` | Fetch unique active blog categories |

📁 Project Structure

├── client/
│   ├── app/
│   │   ├── drawings/        # Blueprint library grid
│   │   ├── drawing/[id]/    # Single asset page
│   │   └── blog/            # Blog archive
│   ├── components/         # Reusable UI components
│   └── context/            # Cart & Auth state management
│
└── server/
    ├── controllers/        # Search & filter logic
    ├── models/             # Mongoose schemas (Drawing, Blog)
    └── routes/             # Express API routes

📝 License

This project is licensed under the MIT License.
See the LICENSE file for more details.

🤝 Contributing

Contributions, issues, and feature requests are welcome!
Feel free to fork the repository and submit a pull request.

⭐ Support

If you find this project useful, consider giving it a star on GitHub ⭐
It really helps!

Built with precision — like a real blueprint.


---

If you want, I can also:
- Optimize this README for **GitHub SEO**
- Add **screenshots & badges**
- Create a **professional GitHub repo description**
- Write a **portfolio project explanation** for recruiters  

Just tell me 👍

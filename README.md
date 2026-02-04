📐 Blueprint Archive: Architectural Asset Marketplace
A high-performance, full-stack marketplace for professional architectural drawings, CAD files, and technical articles. Built with a focus on speed, technical precision, and a "blueprint" aesthetic.

🚀 Core Features
🔍 Advanced Search & Discovery
Global Search: Filter drawings and blogs by name directly from the URL or Navbar.

Keyword Highlighting: Visual feedback in search results using regex-based matching to highlight user queries.

Dynamic Filtering: Categorize assets by sector (HVAC, Plumbing, Electrical, etc.) and price (Free vs. Premium).

🛠 Technical Asset Management
Quick View System: Instant modal previews for technical specifications.

Dynamic Asset Pages: SEO-friendly routing for individual drawings using MongoDB IDs.

Technical Specs: Automated tracking of file types (.DWG, .PDF), layer counts, and software versions.

📝 Engineering Blog
Dynamic Categories: Real-time category fetching from the backend.

Date Formatting: Clean chronological logs using Day.js.

Archives: Organized archives with full pagination support.  

💻 Tech Stack
Layer	Technology
Frontend	Next.js 14+ (App Router), React, Tailwind CSS
Backend	Node.js, Express.js
Database	MongoDB (Mongoose ODM)
State/Icons	React Context API, Lucide React
Utilities	Day.js, Next Navigation

🛠 Installation & Setup
Frontend Setup
cd client
npm install
npm run dev

Backend Setup
Create a .env file in the server directory:
PORT=8000
MONGO_URI=your_mongodb_connection_string

cd server
npm install
npm start

🔌 API Endpoints Reference
Drawings
GET /api/drawings/all - Fetch all assets with optional search, category, and sortBy query params.

GET /api/drawings/single/:id - Fetch detailed metadata for a specific blueprint.

Blogs
GET /api/blogs/all - Paginated blog list with search capabilities.

GET /api/blogs/categories - Returns a unique list of active categories in the database.

📐 Project Structure
Plaintext
├── client/
│   ├── app/
│   │   ├── drawings/        # Library grid page
│   │   ├── drawing/[id]/    # Single asset details
│   │   └── blog/           # Article archive
│   ├── components/         # Reusable UI (Card, Modal, Navbar)
│   └── context/            # Cart & Auth states
└── server/
    ├── controllers/        # Logic for filtering & searching
    ├── models/             # Mongoose schemas (Drawing, Blog)
    └── routes/             # Express route definitions
📝 License
Distributed under the MIT License. See LICENSE for more information.

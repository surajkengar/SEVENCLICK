# SevenClick — Trading Consulting Platform

A full-stack consulting platform built for **small trading firms** — combining expert advisory services, AI-powered supply optimization, and smart management tools in one dashboard.

---

##  Features

- **Authentication** — Register, Login, Logout with JWT cookies, Email verification, Forgot/Reset password
- **Consulting Services** — Strategy, Financial Advisory, HR, and Marketing consulting with appointment booking
- **Appointment Management** — Book, view, and cancel appointments
- **Supply Optimization** — AI chat assistant powered by Groq (LLaMA 3)
- **Management Page** — Market news feed and activity summary
- **Profile Page** — View and edit user profile
- **Protected Routes** — Dashboard accessible only to logged-in users

---

##  Tech Stack

### Frontend
| Tech | Usage |
|---|---|
| React.js | UI framework |
| React Router DOM | Client-side routing |
| Axios | API calls |
| React Hot Toast | Notifications |
| React Icons | Icons |
| Vite | Build tool |

### Backend
| Tech | Usage |
|---|---|
| Node.js + Express | Server |
| MongoDB + Mongoose | Database |
| JWT | Authentication |
| bcryptjs | Password hashing |
| Nodemailer + Mailtrap | Email service |
| Groq SDK (LLaMA 3) | AI chat |
| Cookie-parser | Cookie handling |
| dotenv | Environment variables |

---

##  Project Structure

```
sevenClick/
├── client/                  # React frontend
│   └── src/
│       ├── api/             # Axios API functions
│       ├── Componant/
│       │   └── Layout/      # Navbar, Sidebar, Dashboard layout
│       ├── context/         # Auth context
│       ├── pages/           # All pages
│       │   └── style/       # Page-level CSS
│       └── App.jsx
│
└── server/                  # Express backend
    └── src/
        ├── controller/      # Route controllers
        ├── models/          # Mongoose schemas
        ├── routes/          # Express routes
        ├── middlewares/     # Auth middleware
        ├── validators/      # Input validators
        └── index.js
```

---

##  Getting Started

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)
- Mailtrap account (for emails)
- Groq API key (free at console.groq.com)

---

### 1. Clone the repository

```bash
git clone https://github.com/your-username/sevenclick.git
cd sevenclick
```

---

### 2. Setup Backend

```bash
cd server
npm install
```

Create a `.env` file in the `server/` folder:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development

# Mailtrap
EMAIL=your_mailtrap_email
EMAIL_PASSWORD=your_mailtrap_password

# Groq AI
GROQ_API_KEY=your_groq_api_key
```

Start the backend:

```bash
npm run dev
```

---

### 3. Setup Frontend

```bash
cd client
npm install
```

Start the frontend:

```bash
npm run dev
```

Frontend runs on → `http://localhost:5173`
Backend runs on  → `http://localhost:5000`

---

## 🗄️ Database Models

| Model | Description |
|---|---|
| `User` | Auth + profile + plan |
| `Appointment` | Booking for 4 consulting services |
| `Chat` | AI chat history for supply optimization |

---

## 🔗 API Endpoints

### Auth
```
POST   /api/v1/auth/register
GET    /api/v1/auth/verifyuser/:token
POST   /api/v1/auth/login
GET    /api/v1/auth/getme
POST   /api/v1/auth/logout
POST   /api/v1/auth/forgotpassword
POST   /api/v1/auth/resetpassword/:token
PUT    /api/v1/auth/updateprofile
```

### Appointments
```
POST   /api/v1/appoitnment/bookappoitnment
GET    /api/v1/appoitnment/getallappoitnment
DELETE /api/v1/appoitnment/cancleappoitnment/:id
```

### Chat (AI)
```
GET    /api/v1/chat/getchathistory
POST   /api/v1/chat/sendmessage
DELETE /api/v1/chat/clearchat
```

---

##  Pages

| Page | Route |
|---|---|
| Landing | `/` |
| Login | `/Login` |
| Register | `/Register` |
| Dashboard Overview | `/dashboard` |
| Strategy Consulting | `/dashboard/strategy` |
| Financial Advisory | `/dashboard/finance` |
| HR Consulting | `/dashboard/hr` |
| Marketing Consulting | `/dashboard/marketing` |
| Supply Optimization (AI) | `/dashboard/supply` |
| Management | `/dashboard/management` |
| My Appointments | `/dashboard/appointments` |
| Profile | `/dashboard/profile` |

---

## 👤 Author

Built by **Suraj Kengar**

---

> SevenClick frontend deploy on vercel and backend deploy on render.

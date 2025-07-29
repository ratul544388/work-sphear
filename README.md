# WorkSphear – Employee & HR Management System

**WorkSphear** is a full-featured employee and HR management platform designed to simplify organizational workflows. With role-based access for Admin, HR, and Employees, the platform helps teams manage member enrollment, salary processing, and task tracking efficiently — all from a unified dashboard.

🔗 **Live Demo**: [work-sphear.vercel.app](https://work-sphear.vercel.app)  
📁 **Repository**: [GitHub – ratul544388/work-sphear](https://github.com/ratul544388/work-sphear)

---

## 🛠️ Tech Stack

### 🔹 Frontend
- **Framework**: React.js
- **Styling**: Tailwind CSS, ShadcnUI
- **Charts**: Recharts
- **Forms & Validation**: React Hook Form + Zod
- **Auth**: Firebase Authentication
- **HTTP**: Axios

### 🔹 Backend & APIs
- **Server**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **Authentication**: JWT + Passport.js (Google Login)
- **Payments**: Stripe
- **Others**: Dotenv

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/ratul544388/work-sphear.git
cd work-sphear
````

### 2. Install client dependencies

```bash
cd client
npm install
```

### 3. Install server dependencies

```bash
cd ../server
npm install
```

### 4. Create environment variables

Set up your `.env` files for both client and server as needed. Ensure values like:

```env
JWT_SECRET=
MONGO_URI=
FIREBASE_API_KEY=
STRIPE_SECRET_KEY=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

### 5. Run the development servers

```bash
# Start backend
cd server
npm run dev

# Start frontend
cd ../client
npm run dev
```

---

## ✨ Features

### 👨‍💼 Role-Based Access

* Separate dashboards for Admin, HR, and Employees
* Secure login and protected routes

### 🧾 HR & Salary Management

* Enroll members under dynamic plans
* Manage renewals, salary status, and workflows
* Approve or reject payments

### 📊 Dashboard & Insights

* Track revenue, expenses, and member data
* Visual stats using interactive charts
* Today’s stats, monthly revenue, and more

### 🔐 Authentication

* JWT-based secured login
* Google login using Passport.js
* Role verification on route access

### 📱 Responsive Design

* Fully mobile-friendly UI
* Built with a modular and maintainable codebase

---

## 🧪 Scripts

* `npm run dev` – Run development server
* `npm run build` – Build for production
* `npm run start` – Start production server

---

## 📬 Contact

**Ratul Hossain**
📍 Dhaka, Bangladesh
📧 Email: [ratul.hossain.dev@gmail.com](mailto:ratul.hossain.dev@gmail.com)
🔗 [LinkedIn](https://www.linkedin.com/in/ratul-hossain-dev) • [GitHub](https://github.com/ratul544388)

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

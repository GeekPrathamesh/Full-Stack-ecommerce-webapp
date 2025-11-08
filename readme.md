Full-Stack Food Ordering Platform (Mock E-Com Cart)
🔗 Deployed Links

Frontend (User App): https://tomato-gold.vercel.app/

Admin Panel: https://admin-tomato-three.vercel.app/

Backend API: https://tomato-backend-6xib.onrender.com

🧠 Overview

This project is submitted as part of the Vibe Commerce Full-Stack Coding Assignment: Mock E-Com Cart.
It is a complete food-ordering platform that demonstrates full-stack e-commerce functionality including:

Product listing and dynamic cart system

Smooth add/remove animations

Checkout flow with fake Stripe payment integration

Order persistence in MongoDB

Admin panel for order tracking and management

Full authentication and authorization with JWT

Although the theme is food delivery, all required e-commerce cart operations (add, remove, checkout, totals) are implemented — and enhanced with admin functionality and database persistence.

🧱 Folder Structure
📦 root
 ┣ 📂 frontend        → React user app (port 5173)
 ┣ 📂 admin           → React admin panel (port 5174)
 ┣ 📂 backend         → Node.js + Express + MongoDB server (port 4000)
 ┗ 📄 README.md

⚙️ Tech Stack

Frontend & Admin: React (Vite) + TailwindCSS + Axios
Backend: Node.js + Express + MongoDB (Mongoose)
Auth: JWT + bcrypt
Payments: Fake Stripe API (test card 4242 4242 4242 4242)

📦 Installation & Setup
1️⃣ Clone the Repository
git clone https://github.com/yourusername/yourrepo.git
cd yourrepo

2️⃣ Install Dependencies in All Subfolders
cd backend && npm install
cd ../frontend && npm install
cd ../admin && npm install

3️⃣ Environment Variables
📁 Backend .env
FRONTEND_URL=http://localhost:5173
FRONTEND_URL_=http://localhost:5174
PORT=4000
MONGO_URI=your_mongodb_connection_string
SECRET=your_jwt_secret

📁 Frontend .env
VITE_API_URL=http://localhost:4000

📁 Admin .env
VITE_API_URL=http://localhost:4000

🚀 Run Locally
Backend
cd backend
npm run dev


Runs on http://localhost:4000

Frontend (User App)
cd frontend
npm run dev


Runs on http://localhost:5173

Admin Panel
cd admin
npm run dev


Runs on http://localhost:5174

🧩 Backend API Summary
Assignment API	My App Equivalent	Description
GET /api/products	GET /api/food/list	Fetch all food items
POST /api/cart	POST /api/cart/add	Add item to cart
DELETE /api/cart/:id	POST /api/cart/remove	Remove item from cart
GET /api/cart	GET /api/cart/getcart	Fetch user’s cart
POST /api/checkout	POST /api/order/place	Checkout / place order
GET /api/order/myorders	—	Get user’s past orders
GET /api/order/getadminOrders	—	Admin: fetch all orders
PUT /api/order/updateorderstatus	—	Admin: update order status

✅ Includes JWT-based authentication (/api/Auth/register, /api/Auth/login)
✅ Includes file upload (Multer) for adding products with images

🍕 Features
👨‍🍳 Admin Panel

Add new food items with image, name, and price

Manage menu items and delete them

View all orders in real time

Update order status — Pending, Cooking, Out for Delivery, Delivered

🛍️ User Frontend

Browse available food items in a modern grid layout

Add/remove items from cart with smooth animations

Stylish cart UI showing quantity and total

Apply coupon codes

Place orders after login

Mock payment integration using Stripe test card

Card: 4242 4242 4242 4242  
Exp: Any future date  
CVV: Any 3 digits


Orders saved in MongoDB and visible to admin

🗃️ Database Design

User – name, email, hashed password, cart items

Food Item – name, price, image path

Order – items, total, status, timestamp, user reference

👨‍💻 Author

Prathamesh Teli
Full-Stack Developer
prathameshteli727@gmail.com
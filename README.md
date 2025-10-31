# HD Delite Highway - Full-Stack Booking Platform

A complete full-stack booking application built with React (TypeScript), Express.js, and MongoDB. This platform provides a seamless experience booking system with real-time availability, promo code validation, and double-booking prevention.

## 🚀 Features

### Frontend
- **Home Screen**: Browse experiences with search functionality
- **Experience Details**: View details, select dates, and choose time slots with real-time availability
- **Checkout**: Complete booking form with promo code validation
- **Confirmation**: Booking confirmation with reference ID
- **Responsive Design**: Fully optimized for all devices
- **Modern UI**: Beautiful gradients and smooth animations

### Backend
- **RESTful API**: Express.js server with MongoDB
- **Experience Management**: Dynamic experience data with availability tracking
- **Booking System**: Secure booking creation with validation
- **Double-Booking Prevention**: Database constraints prevent overbooking
- **Promo Code System**: Validate and apply discount codes
- **Real-time Availability**: Check slot availability based on existing bookings

## 📋 Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** - Build tool and dev server
- **TailwindCSS** - Styling
- **Axios/Fetch** - API communication

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **RESTful API** architecture

## 🛠️ Prerequisites

- **Node.js** 18+ and npm
- **MongoDB** (local or MongoDB Atlas cloud)
- **Git** for version control

## 📦 Installation & Setup

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd booklet
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the root directory:

```env
PORT=3001
MONGODB_URI=mongodb://localhost:27017/hd-booking
```

For production (MongoDB Atlas):
```env
PORT=3001
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/hd-booking?retryWrites=true&w=majority
```

### 4. Database Setup

#### Option A: Local MongoDB
1. Install MongoDB locally or use Docker:
   ```bash
   docker run -d -p 27017:27017 --name mongodb mongo
   ```

#### Option B: MongoDB Atlas (Recommended for Production)
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get your connection string
4. Update `.env` with your Atlas connection string

### 5. Seed the Database

Populate the database with sample experiences and promo codes:

```bash
npm run seed
```

This will create:
- 5 sample experiences (Nandi Hills Sunrise, Coffee Trail, Kayaking, Boat Cruise, Bunjee Jumping)
- 3 promo codes (SAVE10, FLAT100, WELCOME20)

## 🚀 Running the Application

### Development Mode

**Terminal 1 - Start Backend Server:**
```bash
npm run dev:server
```

**Terminal 2 - Start Frontend Dev Server:**
```bash
npm run dev
```

- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:3001`

### Production Mode

1. Build the frontend:
```bash
npm run build
```

2. Start the server (serves both API and frontend):
```bash
npm start
```

The server will serve the built frontend from the `dist` directory.

## 📡 API Endpoints

### Experiences

#### GET `/api/experiences`
Get all available experiences.

**Response:**
```json
[
  {
    "_id": "...",
    "name": "Nandi Hills Sunrise",
    "description": "...",
    "category": "Adventure",
    "location": "Bangalore",
    "imageUrl": "...",
    "price": 899,
    "timeSlots": [...]
  }
]
```

#### GET `/api/experiences/:id?date=YYYY-MM-DD`
Get experience details with slot availability for a specific date.

**Query Parameters:**
- `date` (optional): Date string in YYYY-MM-DD format

**Response:**
```json
{
  "_id": "...",
  "name": "...",
  "slotAvailability": [
    {
      "time": "07:00 AM",
      "available": true,
      "left": 8
    }
  ]
}
```

### Bookings

#### POST `/api/bookings`
Create a new booking.

**Request Body:**
```json
{
  "experienceId": "...",
  "date": "2025-10-22T00:00:00.000Z",
  "timeSlot": "09:00 AM",
  "quantity": 1,
  "customerName": "John Doe",
  "customerEmail": "john@example.com",
  "customerPhone": "+1234567890",
  "promoCode": "SAVE10"
}
```

**Response:**
```json
{
  "bookingId": "BK...",
  "referenceNumber": "REF-...",
  "experience": {...},
  "total": 958,
  "message": "Booking confirmed successfully"
}
```

#### GET `/api/bookings/:referenceNumber`
Get booking details by reference number.

### Promo Codes

#### POST `/api/promo/validate`
Validate a promo code.

**Request Body:**
```json
{
  "code": "SAVE10",
  "amount": 999
}
```

**Response:**
```json
{
  "valid": true,
  "code": "SAVE10",
  "discountType": "percentage",
  "discountValue": 10,
  "discount": 99.9
}
```

## 🏗️ Project Structure

```
booklet/
├── server/                 # Backend code
│   ├── index.js           # Express server entry point
│   ├── models/            # MongoDB models
│   │   ├── Experience.js
│   │   ├── Booking.js
│   │   └── Promo.js
│   ├── routes/            # API routes
│   │   ├── experiences.js
│   │   ├── bookings.js
│   │   └── promo.js
│   └── seed.js           # Database seeder
├── src/                   # Frontend code
│   ├── api/              # API client
│   │   └── client.ts
│   ├── components/       # React components
│   ├── types.ts          # TypeScript types
│   └── App.tsx           # Main app
├── public/               # Static assets
├── package.json
├── vite.config.ts
└── README.md
```

## 🌐 Deployment

### Option 1: Render.com (Recommended)

1. **Backend Deployment:**
   - Connect your GitHub repository
   - Set build command: `npm install`
   - Set start command: `npm start`
   - Add environment variables:
     - `MONGODB_URI`: Your MongoDB connection string
     - `PORT`: 3001 (auto-set by Render)
   - Enable "Auto-Deploy"

2. **Frontend Deployment:**
   - Create a static site on Render
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Add environment variable: `VITE_API_URL`: Your backend API URL

### Option 2: Railway.app

1. Connect your repository
2. Railway will auto-detect Node.js
3. Add environment variables
4. Deploy

### Option 3: Vercel (Frontend) + Render (Backend)

1. Deploy backend on Render as above
2. Deploy frontend on Vercel:
   ```bash
   npm i -g vercel
   vercel
   ```
   - Set `VITE_API_URL` to your backend URL

### Option 4: AWS/EC2

1. Launch EC2 instance
2. Install Node.js and MongoDB
3. Clone repository
4. Set up environment variables
5. Use PM2 or systemd to run server
6. Configure Nginx as reverse proxy

## 🔐 Environment Variables

Create a `.env` file:

```env
# Server
PORT=3001

# Database
MONGODB_URI=mongodb://localhost:27017/hd-booking

# Frontend (optional, for production)
VITE_API_URL=http://localhost:3001/api
```

## 🧪 Testing the API

### Using cURL

```bash
# Get all experiences
curl http://localhost:3001/api/experiences

# Get experience details
curl http://localhost:3001/api/experiences/<experience-id>

# Create booking
curl -X POST http://localhost:3001/api/bookings \
  -H "Content-Type: application/json" \
  -d '{
    "experienceId": "...",
    "date": "2025-10-22T00:00:00.000Z",
    "timeSlot": "09:00 AM",
    "quantity": 1,
    "customerName": "John Doe",
    "customerEmail": "john@example.com"
  }'

# Validate promo
curl -X POST http://localhost:3001/api/promo/validate \
  -H "Content-Type: application/json" \
  -d '{"code": "SAVE10", "amount": 999}'
```

## 📝 Available Promo Codes

After seeding:
- **SAVE10**: 10% off (min ₹500 purchase)
- **FLAT100**: ₹100 off (min ₹1000 purchase)
- **WELCOME20**: 20% off, max ₹500 (min ₹800 purchase)

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running: `mongod` or check Docker container
- Verify connection string in `.env`
- Check MongoDB Atlas network access (if using Atlas)

### Port Already in Use
- Change `PORT` in `.env` file
- Or kill the process using the port

### API Not Working
- Check if backend server is running on correct port
- Verify CORS settings
- Check browser console for errors

## 📄 License

This project is open source and available under the MIT License.

## 👥 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📧 Support

For issues or questions, please open an issue on GitHub.

---

**Live Demo:** [Add your hosted URL here]
**GitHub Repository:** [Add your repo URL here]

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const interviewRoutes = require('./routes/interviews');
const feedbackRoutes = require('./routes/feedbacks');

// Routes
const authRoutes = require('./routes/auth');
const jobRoutes = require('./routes/jobs');
const candidateRoutes = require('./routes/candidates');


const app = express(); // ✅ Define app FIRST

// Middleware
app.use(cors());
app.use(express.json());

// Register routes
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/candidates', candidateRoutes);
app.use('/api/interviews', interviewRoutes);
app.use('/api/feedbacks', feedbackRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.error("❌ MongoDB error:", err));

// Health check route
app.get('/', (req, res) => {
  res.send("AI Recruitment RMS Backend is running");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server started on port ${PORT}`);
});

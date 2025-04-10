const express = require('express');
const cors = require('cors');
const connectDB = require('./config');
const routes = require('./routes');
const { User } = require('./model');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: false
}));
app.use(express.json());

// Health check
app.get('/ping', (req, res) => {
  console.log("/ping hit");
  res.send('pong');
});

// Mount routes at /api
app.use('/api', routes);

// Start server after DB connects
connectDB().then(async () => {
  console.log(" MongoDB connected");



  // 🧹 Remove duplicate users by email
  const duplicates = await User.aggregate([
    {
      $group: {
        _id: "$email",
        count: { $sum: 1 },
        ids: { $push: "$_id" }
      }
    },
    {
      $match: {
        count: { $gt: 1 },
        _id: { $ne: null }
      }
    }
  ]);

  for (const dup of duplicates) {
    const idsToDelete = dup.ids.slice(1); // Keep 1, delete the rest
    await User.deleteMany({ _id: { $in: idsToDelete } });
    console.log(`🧹 Removed ${idsToDelete.length} duplicates for email: ${dup._id}`);
  }

  //  Ensure indexes are created
  await User.init()
    .then(() => {
      console.log("User indexes initialized");
    })
    .catch((err) => {
      console.error("Failed to initialize indexes:", err.message);
    });

  const PORT = process.env.PORT || 5050;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch((err) => {
  console.error(" MongoDB connection failed:", err.message);
});

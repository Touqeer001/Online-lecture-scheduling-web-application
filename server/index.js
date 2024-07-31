
import express from "express";
import cors from "cors";
const app = express();
import mongoose from "mongoose";

import authRoutes from "./routes/authRoutes.js"
import courseRoutes from "./routes/courseRoutes.js";
import scheduleRoutes from "./routes/scheduleRoutes.js"

// Middleware
app.use(cors());
app.use(express.json());

// CORS Configuration
app.use(
  cors({
    origin: [
      // "http://localhost:3000",
      // "https://lecture-schedule-module.netlify.app/",
    ],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

// MongoDB Connection
const mongoURI =
   "mongodb+srv://touqeeransari001:ansari@cluster0.9bcbt2s.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connection Successful");
  })
  .catch((err) => {
    console.error("DB Connection Error:", err);
    process.exit(1); // Terminate the application on connection failure
  });

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/auth",courseRoutes);
app.use("/api/auth", scheduleRoutes);


// Root endpoint
app.get("/", (req, res) => {
  res.json({
    message: "Server is running; you are seeing this on the deployed server",
  });
});

// Server configuration
const port = process.env.PORT || 8080;
// const host = process.env.HOST || "0.0.0.0";

app.listen(port,  () => {
  console.log(`Server started on port ${port}`);
});

import express from "express";
import mongoose from "mongoose";
import cors from "cors";


const app = express();
app.use(express.json());
app.use(cors());

// ✅ MongoDB Connection
mongoose.connect("mongodb+srv://rajeshgroot_db_user:Rajesh1729@testprodb.9sqavom.mongodb.net/?appName=testprodb")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ DB Error:", err));


  const User = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true }
});


// ✅ API: Register User
app.post("/register", async (req, res) => {
  try {
    const { username, email } = req.body;

    // Hash password before saving
    

    const newUser = new User({ username, email});
    await newUser.save();
email
    res.json({ success: true, message: "User registered successfully!" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// ✅ API: Login User
app.post("/login", async (req, res) => {
  try {
    const { username, email } = req.body;
    const user = await User.findOne({ username });

    if (!user) return res.json({ success: false, message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.email);
    if (!isMatch) return res.json({ success: false, message: "Invalid password" });

    res.json({ success: true, message: "Login successful!" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

app.listen(5000, () => console.log("🚀 Server running on port 5000"));

import express, { request } from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcryptjs";

const app = express();
app.use(express.json());
app.use(cors());

// ✅ MongoDB Connection
mongoose
  .connect(
    "mongodb+srv://rajeshgroot_db_user:Rajesh1729@testprodb.9sqavom.mongodb.net/?appName=testprodb"
  )
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

// ✅ Mongoose Schema & Model
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});
const User = mongoose.model("User", userSchema);

// ✅ Default route (for testing)
app.get("/", (req, res) => {
  res.json({ message: "Server is running ✅" });
});

// ✅ Register User
app.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.json({ success: true, message: "User registered successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ✅ Login User
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) return res.json({ success: false, message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.json({ success: false, message: "Invalid password" });

    res.json({ success: true, message: "Login successful!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ✅ Export app (no app.listen)

//courses
const CourseSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  course: { type: String, required: true, unique: true },
});
CourseSchema.index({ email: 1, course: 1 }, { unique: true });
const Course = mongoose.model("Course", CourseSchema);
app.post("/PostCourse", async (req, res) => {
  try {
    const { email, course } = req.body;
    const c = new Course({ email, course });
    await c.save();
    res.json({ success: true, message: "Course Uploaded" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ success: false, message: err.message });
  }
});


//Upload course

const UploadCourseSchema=new mongoose.Schema({
  courseName:{type:String, required:true, unique:true }
});
const UploadCouserModel= mongoose.model("UC",UploadCourseSchema);
app.post("/uploadCourse",async(req,res)=>{
  const {courseName}=req.body;
  try{
    const ucc=new UploadCouserModel({courseName});
    await ucc.save();
    res.status(200).json({success:true, message:"U[pload Succesfully"})

  }catch(err){
    res.status(500).json({success:false,message:err.message})
  }
})

export default app;

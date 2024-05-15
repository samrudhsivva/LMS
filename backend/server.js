import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Faculty from "./models/faculty.js";
import Student from "./models/student.js";

// Connect to the user database
const userDb = mongoose.createConnection(
  "mongodb://127.0.0.1:27017/mydatabase",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Connect to the course database
const courseDb = mongoose.createConnection(
  "mongodb://127.0.0.1:27017/courseDatabase",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const facultyDb = mongoose.createConnection(
  "mongodb://127.0.0.1:27017/FacultyDb",
  {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 20000,
  }
);

const studentDb = mongoose.createConnection(
    "mongodb://127.0.0.1:27017/studentDb",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
  const app = express();
  const PORT = 5000;
  
  app.use(cors());
  app.use(express.json());
  
  userDb.on(
    "error",
    console.error.bind(console, "MongoDB connection error for userDb:")
  );
  userDb.once("open", () => {
    console.log("Connected to MongoDB userDb");
  });
  
  courseDb.on(
    "error",
    console.error.bind(console, "MongoDB connection error for courseDb:")
  );
  courseDb.once("open", () => {
    console.log("Connected to MongoDB courseDb");
  });

  facultyDb.on(
    "error",
    console.error.bind(console, "MongoDB connection error for facultyDb:")
  );
  facultyDb.once("open", () => {
    console.log("Connected to MongoDB facultyDb");
  });
  
  studentDb.on(
    "error",
    console.error.bind(console, "MongoDB connection error for studentDb:")
  );
  studentDb.once("open", () => {
    console.log("Connected to MongoDB studentDb");
  });
  const userSchema = new mongoose.Schema({
    role: String,
    username: { type: String, unique: true },
    password: String,
  });

  const courseSchema = new mongoose.Schema({
    id: String,
    name: String,
    semester: String,
    isPublished: Boolean,
    content: String,
    syllabus: String,
    quizzes: [String],
    assignments: [String],
    grades: String,
    announcements: [String],
  });
  
  const facultySchema = new mongoose.Schema({
    id: { type: String, unique: true, required: true, index: true }, // Ensures 'id' is unique and indexed
    name: { type: String, required: true }, // Makes 'name' a required field
    courses: [{ type: String, ref: "Course" }], // References 'Course' documents if you have a separate collection for courses
  });
  const studentSchema = new mongoose.Schema({
    id: { type: String, unique: true, required: true, index: true }, // Ensures 'id' is unique and indexed
    name: { type: String, required: true }, // Makes 'name' a required field
    courses: [{ type: String, ref: "Course" }], // References 'Course' documents if using a separate collection
  });
  
  const User = userDb.model("User", userSchema);
  const Course = courseDb.model("Course", courseSchema);
  const Faculty1 = facultyDb.model("Faculty", facultySchema);
  const Student1 = studentDb.model("Student", studentSchema);

  app.post("/api/faculties", async (req, res) => {
    try {
      const newFaculty = new Faculty1(req.body);
      await newFaculty.save();
      res.status(201).send(newFaculty);
    } catch (error) {
      res.status(400).send("Error creating faculty: " + error.message);
    }
  });
  
  // GET API to retrieve all faculties
  app.get("/api/faculties", async (req, res) => {
    try {
      const faculties = await Faculty1.find({});
      res.status(200).send(faculties);
    } catch (error) {
      res.status(400).send("Error retrieving faculties: " + error.message);
    }
  });
  
  // POST API to create a new student
  app.post("/api/students", async (req, res) => {
    try {
      const newStudent = new Student1(req.body);
      await newStudent.save();
      res.status(201).send(newStudent);
    } catch (error) {
      res.status(400).send("Error creating student: " + error.message);
    }
  });

  // GET API to retrieve all students
app.get("/api/students", async (req, res) => {
    try {
      const students = await Student1.find({});
      res.status(200).send(students);
    } catch (error) {
      res.status(400).send("Error retrieving students: " + error.message);
    }
  });
  
  // User registration route
  app.post("/api/register", async (req, res) => {
    const { role, username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ role, username, password: hashedPassword });
    try {
      await newUser.save();
      res.status(201).send("User registered");
    } catch (error) {
      res.status(400).send("Error registering user");
    }
  });
  
  // User login route
  app.post("/api/login", async (req, res) => {
    const { role, username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).send("Invalid username or password");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).send("Invalid username or password");
  }
  if (user.role !== role) {
    return res.status(400).send("Invalid role");
  }
  const token = jwt.sign({ userId: user._id, role: user.role }, "secretKey", {
    expiresIn: "1h",
  });
  res.json({ token });
});

// POST endpoint to add a new course
app.post("/api/courses", async (req, res) => {
  try {
    const newCourse = new Course(req.body);
    await newCourse.save();
    res.status(201).send(newCourse);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// PUT endpoint to assign a course to a faculty

app.put("/api/faculties/:facultyName/add-course", async (req, res) => {
  const facultyName = req.params.facultyName;
  const { courseName } = req.body;

  try {
    // Find the faculty by name and add the courseName to the courses array
    const updatedFaculty = await Faculty1.findOneAndUpdate(
      { name: facultyName },
      { $addToSet: { courses: courseName } }, // Use $addToSet to avoid duplicate entries
      { new: true, runValidators: true } // Return the updated document and run model validators
    );

    if (!updatedFaculty) {
      return res.status(404).send("Faculty not found");
    }

    res.status(200).send(updatedFaculty);
  } catch (error) {
    res.status(400).send("Error updating faculty: " + error.message);
  }
});

// GET endpoint to retrieve courses by a specific faculty
app.get("/api/faculties/:facultyName/courses", async (req, res) => {
  try {
    console.log("Faculty Name is", req.params.facultyName);
    console.log("Facul is", Faculty);
    const faculty = await Faculty1.findOne({
      name: req.params.facultyName,
    });

    console.log("Faculty is", faculty);
    if (!faculty) {
      return res.status(404).send("Faculty not found");
    }
    res.status(200).send(faculty.courses);
  } catch (error) {
    res
      .status(400)
      .send("Error retrieving courses for faculty: " + error.message);
  }
});

// GET endpoint to retrieve all courses
app.get("/api/courses", async (req, res) => {
  try {
    const courses = await Course.find({});
    res.status(200).send(courses);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// GET endpoint to retrieve a course by ID
app.get("/api/courses/:id", async (req, res) => {
  try {
    const course = await Course.findOne({ id: req.params.id });
    if (!course) {
      return res.status(404).send("Course not found");
    }
    res.status(200).send(course);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.get("/api/courses/:courseId/students", async (req, res) => {
    try {
      // Fetch the course by ID and populate the students field if it exists
      const course = await Course?.findById(req?.params?.courseId);
  
      console.log("course", course);
  
      if (!course) {
        return res.status(404).send("Course not found");
      }
  
      // Check if the course has the students field and it is populated
      if (!course?.students || course?.students?.length === 0) {
        // Respond with an empty array or a message indicating no students are enrolled
        return res.status(200).send("No students are enrolled in this course");
      }
  
      // Respond with the list of students enrolled in the course
      res.status(200).send(course?.students);
    } catch (error) {
      console.error("Error retrieving students for the course:", error);
      res.status(500).send("Internal Server Error");
    }
  });
  
  // GET endpoint to retrieve announcements for a course
  app.get("/api/courses/:id/announcements", async (req, res) => {
    try {
      const course = await Course.findOne({ id: req.params.id });
      if (!course) {
        return res.status(404).send("Course not found");
      }
      res.status(200).send(course.announcements);
    } catch (error) {
      res.status(400).send(error.message);
    }
  });

  // GET endpoint to retrieve assignments for a course
app.get("/api/courses/:id/assignments", async (req, res) => {
    try {
      const course = await Course.findOne({ id: req.params.id });
      if (!course) {
        return res.status(404).send("Course not found");
      }
      res.status(200).send(course.assignments);
    } catch (error) {
      res.status(400).send(error.message);
    }
  });
  
  // GET endpoint to retrieve quizzes for a course
  app.get("/api/courses/:id/quizzes", async (req, res) => {
    try {
      const course = await Course.findOne({ id: req.params.id });
      if (!course) {
        return res.status(404).send("Course not found");
      }
      res.status(200).send(course.quizzes);
    } catch (error) {
      res.status(400).send(error.message);
    }
  });
  
  // GET endpoint to retrieve syllabus for a course
  app.get("/api/courses/:id/syllabus", async (req, res) => {
    try {
      const course = await Course.findOne({ id: req.params.id });
      if (!course) {
        return res.status(404).send("Course not found");
      }
      res.status(200).send(course.syllabus);
    } catch (error) {
      res.status(400).send(error.message);
    }
  });
  
  // PUT endpoint to add an announcement to a course
  app.put("/api/courses/:id/announcement", async (req, res) => {
    try {
      const { announcement } = req.body;
      const course = await Course.findOneAndUpdate(
        { id: req.params.id },
        { $push: { announcements: announcement } },
        { new: true }
      );
      res.status(200).send(course);
    } catch (error) {
      res.status(400).send(error.message);
    }
  });

  // PUT endpoint to add an assignment
app.put("/api/courses/:id/assignment", async (req, res) => {
    try {
      const { assignment } = req.body;
      const course = await Course.findOneAndUpdate(
        { id: req.params.id },
        { $push: { assignments: assignment } },
        { new: true }
      );
      res.status(200).send(course);
    } catch (error) {
      res.status(400).send(error.message);
    }
  });
  
  // PUT endpoint to add a quiz
  app.put("/api/courses/:id/quiz", async (req, res) => {
    try {
      const { quiz } = req.body;
      const course = await Course.findOneAndUpdate(
        { id: req.params.id },
        { $push: { quizzes: quiz } },
        { new: true }
      );
      res.status(200).send(course);
    } catch (error) {
      res.status(400).send(error.message);
    }
  });
  
  // PUT endpoint to update syllabus content
  app.put("/api/courses/:id/syllabus", async (req, res) => {
    try {
      const { syllabusContent } = req.body;
      const course = await Course.findOneAndUpdate(
        { id: req.params.id },
        { $set: { syllabus: syllabusContent } },
        { new: true }
      );
      res.status(200).send(course);
    } catch (error) {
      res.status(400).send(error.message);
    }
  });
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
  


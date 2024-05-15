import mongoose from "mongoose";

const facultySchema = new mongoose.Schema({
  id: { type: String, unique: true, required: true, index: true }, // Ensures 'id' is unique and indexed
  name: { type: String, required: true }, // Makes 'name' a required field
  courses: [String], // References 'Course' documents if you have a separate collection for courses
});

const Faculty = mongoose.model("Faculty", facultySchema);

export default Faculty;
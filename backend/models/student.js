import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  id: { type: String, unique: true, required: true, index: true },  // Ensures 'id' is unique and indexed
  name: { type: String, required: true },  // Makes 'name' a required field
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]  // References 'Course' documents if using a separate collection
});

const Student = mongoose.model("Student", studentSchema);

export default Student;

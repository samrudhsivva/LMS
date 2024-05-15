import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const courseSchema = new Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  semester: { type: String, required: true },
  isPublished: { type: Boolean, required: true },
  content: { type: String, required: true },
  syllabus: { type: String, required: true },
  quizzes: [String],
  assignments: [String],
  grades: String,
  announcements: [String],
  students: [{ id: String, name: String }]
});

export default mongoose.model('Course', courseSchema);
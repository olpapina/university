import mongoose, { Schema, Types } from 'mongoose';

interface ICourse {
    title: string;
    subjects: Types.ObjectId[];
    yearOfStudying: number;
}
const courseSchema = new Schema<ICourse>({
  title: {
    type: String,
    required: true,
    unique: true
  },
  subjects: [{
    type: Schema.Types.ObjectId,
    ref: 'Subject'
  }],
  yearOfStudying: {
    type: Number,
    required: true
  }
});

const Course = mongoose.model<ICourse>('Course', courseSchema);

export default Course;
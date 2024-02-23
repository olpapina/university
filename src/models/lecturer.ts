import mongoose, { Schema, Types } from 'mongoose';


interface ILecturer {
    firstName: string;
    lastName: string;
    faculty: Types.ObjectId;
    courses: Types.ObjectId[];
    workTime: number;
}

const lecturerSchema = new Schema<ILecturer>({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  faculty: {
    type: Schema.Types.ObjectId,
    ref: 'Faculty',
    required: true
  },
  courses: [{
    type: Schema.Types.ObjectId,
    ref: 'Course'
  }]
});

const Lecturer = mongoose.model<ILecturer>('Lecturer', lecturerSchema);

export default Lecturer;
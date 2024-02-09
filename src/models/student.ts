import mongoose, { Schema, Types } from 'mongoose';

interface IStudent {
    firstName: string;
    lastName: string;
    course: Types.ObjectId;
    marks: Types.ObjectId[];
}

const studentSchema = new Schema<IStudent>({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  marks: [{
    type: Schema.Types.ObjectId,
    ref: 'Mark'
  }]
});

const Student = mongoose.model<IStudent>('Student', studentSchema);

export default Student;
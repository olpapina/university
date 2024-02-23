import mongoose, { Schema, Types } from 'mongoose';

interface IFaculty {
    title: string;
    departments: Types.ObjectId[];
    lecturers: Types.ObjectId[];
}

const facultySchema = new Schema<IFaculty>({
  title: {
    type: String,
    required: true,
    unique: true
  },
  departments: [{
    type: Schema.Types.ObjectId,
    ref: 'Department'
  }],
  lecturers: [{
    type: Schema.Types.ObjectId,
    ref: 'Lecturer'
  }]
});

const Faculty = mongoose.model<IFaculty>('Faculty', facultySchema);

export default Faculty;
import mongoose, { Schema, Types } from 'mongoose';

interface ISubject {
    title: string;
    quantityOfHours: number;
    lecturer: Types.ObjectId;
}

const subjectSchema = new Schema<ISubject>({
  title: {
    type: String,
    required: true
  },
  quantityOfHours: {
    type: Number,
    required: true
  },
  lecturer: {
    type: Schema.Types.ObjectId,
    ref: 'Lecturer',
    required: true
  }
});

const Subject = mongoose.model<ISubject>('Subject', subjectSchema);

export default Subject;
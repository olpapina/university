import mongoose, { Schema, Types } from 'mongoose';

interface IUniversity {
    title: string;
    address: string;
    faculties: Types.ObjectId[];
}

const universitySchema = new Schema<IUniversity>({
  title: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  faculties: [{
    type: Schema.Types.ObjectId,
    ref: 'Faculty'
  }]
});

const University = mongoose.model<IUniversity>('University', universitySchema);

export default University;
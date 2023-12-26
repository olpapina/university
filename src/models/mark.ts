import mongoose, { Schema } from 'mongoose';

interface IMark {
    title: string;
    magnitude: number;
}

const markSchema = new Schema<IMark>({
    title: {
        type: String,
        required: true
    },
    magnitude: {
        type: Number,
        required: true
    }
});

const Mark = mongoose.model<IMark>('Mark', markSchema);

export default Mark;
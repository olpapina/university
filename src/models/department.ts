import mongoose, { Schema, Types } from 'mongoose';

interface IDepartment {
    title: string;
    courses: Types.ObjectId[];
}

const departmentSchema = new Schema<IDepartment>({
    title: {
        type: String,
        required: true,
        unique: true
    },
    courses: [{
        type: Schema.Types.ObjectId,
        ref: 'Course'
    }]
});

const Department = mongoose.model<IDepartment>('Department', departmentSchema);

export default Department;
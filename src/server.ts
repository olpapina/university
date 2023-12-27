const express = require('express');
const mongoose = require('mongoose');
import courseRouter from './routes/courseRoutes';
import lecturerRouter from './routes/lecturerRoutes';
import subjectRouter from './routes/subjectRoutes';


const PORT = 3000;
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'html');

app.use('/api/courses', courseRouter);
app.use('/api/lecturers', lecturerRouter);
app.use('/api/subjects', subjectRouter);

const start = async () => {
    try {
        await mongoose
            .connect('mongodb://localhost:27017/universityDB');
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Listerning port ${PORT}`);
        });

    } catch (error: any) {
        console.error('DB connection error:', error);
    }
}

start();
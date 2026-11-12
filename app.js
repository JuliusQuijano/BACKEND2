import express from 'express';
import studentRoutes from './routes/studentRoutes.js';
import bookRoutes from './routes/bookRoutes.js';
import userRoutes from './routes/userRoutes.js';
import cors from 'cors';

let corsOptions = {
    origin: "http://localhost:5173",
};

const app = express();



app.use(express.json());
app.use(cors(corsOptions));

//app.use((req, res, next) => {
//   console.log(req.path, req.method);
//   next();
//});

app.use('/book', bookRoutes);
app.use('/student', studentRoutes);
app.use('/user', userRoutes);

try {
    const port = 3000;
    app.listen(port, () => {
        console.log(`listening on port ${port}...`);
    });
} catch (e) {
    console.log(e);
}


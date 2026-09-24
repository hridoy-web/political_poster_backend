import express from 'express'
import cors from 'cors'
import authRouter from './routes/auth.routes.js';
import { errorHandler } from './middlewares/error.middleware.js';

const app = express();

// middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// server check
app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Political poster maker server is running!'
    })
})

// routes import
app.use('/api/v1/auth', authRouter);

// global error handler
app.use(errorHandler);

export default app;
import { error } from "node:console";
import app from "./app.js";
import connectDB from "./config/db.js";

const PORT = process.env.PORT || 5000;


// connect database
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server Is Runing on port ${PORT}`)
    })
}).catch((error) => {
    console.log('Database connection failed:', error);
})
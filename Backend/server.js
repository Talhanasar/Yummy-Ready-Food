const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const app = express();
const connectDB = require('./config/db');
const cors = require('cors'); 
const errorMiddleware = require('./middelwares/error-middleware');

const productRoutes = require('./routes/productRoutes');
const couponRoutes = require('./routes/couponRoutes');
const orderRoutes = require('./routes/orderRoutes');
const adminRoutes = require('./routes/adminRoutes');

connectDB();

app.use(cors({
    origin: [process.env.FRONTEND_URL_1, process.env.FRONTEND_URL_2, "http://localhost:5173", "http://localhost:4173"],
    credentials: true
}));
app.use(express.json());


//routes
app.use('/api/product', productRoutes);
app.use('/api/coupon', couponRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/admin', adminRoutes);
app.get('/health', (req, res) => {
    res.status(200).json({ message: 'Server is healthy' });
});

app.use(errorMiddleware);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

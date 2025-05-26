const express = require('express');
const router = express.Router();
const Admin = require('../models/adminModel');

// Admin login route
router.post('/login', async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const admin = await Admin.findOne({ username });

        if (!admin || !(await admin.correctPassword(password, admin.password))) {
            const error = new Error('Incorrect username or password');
            error.statusCode = 401;
            return next(error);
        }
        if (!admin.isApproved) {
            const error = new Error('Admin is not approved');
            error.statusCode = 401;
            return next(error);
        }

        admin.lastLogin = Date.now();
        await admin.save();

        res.status(200).json({
            status: 'success',
            data: {
                admin: {
                    id: admin._id,
                    username: admin.username,
                    role: admin.role
                }
            }
        });
    } catch (error) {
        next(error);
    }
});

// Middleware to protect admin routes
// const protect = async (req, res, next) => {
//     try {
//         let token;
//         if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
//             token = req.headers.authorization.split(' ')[1];
//         }

//         if (!token) {
//             return res.status(401).json({ message: 'You are not logged in' });
//         }

//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         const admin = await Admin.findById(decoded.id);

//         if (!admin) {
//             return res.status(401).json({ message: 'The user belonging to this token no longer exists' });
//         }

//         req.admin = admin;
//         next();
//     } catch (error) {
//         res.status(401).json({ message: 'Invalid token' });
//     }
// };

// Get all admins (protected route, only accessible by superadmin)
router.get('/', async (req, res, next) => {
    // if (req.admin.role !== 'superadmin') {a
    //     return res.status(403).json({ message: 'Access denied. Superadmin only.' });
    // }

    try {
        const admins = await Admin.find().select('-password');
        res.json(admins);
    } catch (error) {
        next(error);
    }
});

// Create a new admin (protected route, only accessible by superadmin)
router.post('/', async (req, res, next) => {
    // if (req.admin.role !== 'superadmin') {
    //     return res.status(403).json({ message: 'Access denied. Superadmin only.' });
    // }

    try {
        const { username, password, role, phoneNumber } = req.body;
        
        // Check if the phoneNumber already exists
        const existingAdmin = await Admin.findOne({ phoneNumber });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Phone number already in use' });
        }
        const isApproved = role === "superadmin" ? true : false;
        const newAdmin = new Admin({ username, password, role: role ? role : "admin", phoneNumber, isApproved });
        await newAdmin.save();
        res.status(201).json({ message: 'Admin created successfully', admin: newAdmin });
    } catch (error) {
        next(error);
    }
});

// Change admin approval status (protected route, only accessible by superadmin)
router.patch('/:id', async (req, res, next) => {
    // if (req.admin.role !== 'superadmin') {
    //     return res.status(403).json({ message: 'Access denied. Superadmin only.' });
    // }

    try {
        const { id } = req.params;
        const {isApproved} = req.body;

        const admin = await Admin.findById(id);
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        admin.isApproved = isApproved;
        await admin.save();

        res.status(200).json({
            message: 'Admin approval status updated successfully',
            admin: {
                id: admin._id,
                username: admin.username,
                role: admin.role,
                isApproved: admin.isApproved
            }
        });
    } catch (error) {
        next(error);
    }
});

// Delete an admin (protected route, only accessible by superadmin)
router.delete('/:id', async (req, res, next) => {
    // if (req.admin.role !== 'superadmin') {
    //     return res.status(403).json({ message: 'Access denied. Superadmin only.' });
    // }

    try {
        const { id } = req.params;

        const admin = await Admin.findById(id);
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        await Admin.findByIdAndDelete(id);

        res.status(200).json({
            message: 'Admin deleted successfully',
            deletedAdmin: {
                id: admin._id,
                username: admin.username,
                role: admin.role
            }
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;

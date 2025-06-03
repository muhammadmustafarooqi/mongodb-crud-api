import express from 'express';
import User from '../models/User.js';

let route = express.Router();

// Get all users
route.get('/', async (req, res) => {
    try {
        let users = await User.find();
        res.status(200).json({
            error: false,
            message: 'Users fetched successfully!',
            data: users
        });
    } catch (error) {
        console.log('Error fetching all users:', error);
        res.status(201).json({
            error: true,
            message: 'Error in fetching users!',
            data: null
        });
    }

    // Note: The following block is unreachable and should be removed
    /*
    res.status(200).json({
        error: false,
        message: 'users data successfully fetch!',
        data: filterData
    });
    */
});

// Get user by ID
route.get('/:id', async (req, res) => {
    try {
        let { id } = req.params;
        let findUser = await User.findById(id);
        if (findUser) {
            return res.status(200).json({
                error: false,
                message: 'User found!',
                data: findUser
            });
        }

        // User not found
        res.status(404).json({
            error: false,
            message: 'User not found!',
            data: null
        });

    } catch (error) {
        console.log('Error finding user by ID:', error);
        res.status(201).json({
            error: false,
            message: 'Something went wrong while finding the user!',
            data: null
        });
    }
});

// Create user
route.post('/', async (req, res) => {
    try {
        let data = req.body;
        let newUser = new User({ ...data });
        newUser = await newUser.save(); // Save to MongoDB
        res.status(200).json({
            error: false,
            message: 'User successfully added!',
            data: newUser
        });
    } catch (error) {
        console.log('Error creating user:', error);
        res.status(201).json({
            error: true,
            message: error,
            data: null
        });
    }
});

// Delete user
route.delete('/:id', async (req, res) => {
    try {
        let { id } = req.params;
        await User.findByIdAndDelete(id);
        res.status(200).json({
            error: false,
            message: 'User successfully deleted!'
        });
    } catch (error) {
        console.log('Error deleting user:', error);
        res.status(201).json({
            error: true,
            message: error,
            data: null
        });
    }
});

// Update user
route.put('/:id', async (req, res) => {
    try {
        let { id } = req.params;
        let updatedData = req.body;
        let updateUser = await User.findByIdAndUpdate(id, {
            ...updatedData
        });
        res.status(200).json({
            error: false,
            message: 'User successfully updated!',
            data: updateUser
        });
    } catch (error) {
        console.log('Error updating user:', error);
        res.status(201).json({
            error: true,
            message: error,
            data: null
        });
    }
});

export default route;

import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export default async function handler(req, res) {
    // Only allow POST
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }

    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    try {
        await client.connect();
        
        const database = client.db('Project_Alpha');
        const collection = database.collection('User_Info');

        // Find user by email
        const user = await collection.findOne({ email: email.toLowerCase() });

        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid email or password' });
        }

        // Check if user is active
        if (user.isActive === false) {
            return res.status(401).json({ success: false, message: 'Account is inactive' });
        }

        // Compare password with bcrypt hash
        const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

        if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: 'Invalid email or password' });
        }

        // Success - you can add session/JWT logic here later
        return res.status(200).json({ 
            success: true, 
            message: 'Login successful',
            user: {
                email: user.email,
                name: user.name,
                roles: user.roles
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ success: false, message: 'Server error. Please try again.' });
    } finally {
        await client.close();
    }
}

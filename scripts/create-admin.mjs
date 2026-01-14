// Script to manually create admin user
// Run this with: node --loader ts-node/esm scripts/create-admin.mjs

import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const dbName = 'sarvam_db';

async function createAdminUser() {
    let client;

    try {
        console.log('Connecting to MongoDB...');

        // Try with relaxed SSL settings for development
        const options = {
            retryWrites: true,
            retryReads: true,
            serverSelectionTimeoutMS: 5000,
            connectTimeoutMS: 10000,
        };

        client = new MongoClient(uri, options);
        await client.connect();

        console.log('Connected successfully!');

        const db = client.db(dbName);
        const usersCollection = db.collection('users');

        // Check if admin already exists
        const existingAdmin = await usersCollection.findOne({ username: 'admin' });

        if (existingAdmin) {
            console.log('Admin user already exists!');
            return;
        }

        // Hash password
        console.log('Creating admin user...');
        const hashedPassword = await bcrypt.hash('admin123', 10);

        // Create admin user
        const result = await usersCollection.insertOne({
            username: 'admin',
            password: hashedPassword,
            email: 'admin@sarvam.com',
            role: 'admin',
            createdAt: new Date(),
        });

        console.log('✅ Admin user created successfully!');
        console.log('Username: admin');
        console.log('Password: admin123');
        console.log('User ID:', result.insertedId.toString());

        // Create index
        await usersCollection.createIndex({ username: 1 }, { unique: true });
        console.log('✅ Index created on username field');

    } catch (error) {
        console.error('❌ Error:', error.message);
        console.error('\nTroubleshooting tips:');
        console.error('1. Check your MONGODB_URI in .env.local');
        console.error('2. Ensure MongoDB is running');
        console.error('3. For MongoDB Atlas, whitelist your IP address');
        console.error('4. Try adding these parameters to your connection string:');
        console.error('   &retryWrites=true&w=majority');
    } finally {
        if (client) {
            await client.close();
            console.log('\nConnection closed.');
        }
    }
}

createAdminUser();

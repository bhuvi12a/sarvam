// Script to update projects in MongoDB
// Run this with: node scripts/update-projects.mjs

import { MongoClient } from 'mongodb';
import { config } from 'dotenv';
import fs from 'fs';
import path from 'path';

// Load environment variables from .env.local
config({ path: '.env.local' });

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const dbName = 'sarvam_db';

// Read projects from data/projects.json
const dataPath = path.join(process.cwd(), 'data', 'projects.json');
const projectsData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

const PROJECTS = projectsData.map(proj => {
    const { id, ...rest } = proj;
    return {
        _id: id,
        ...rest
    };
});

async function updateProjects() {
    let client;

    try {
        console.log('Connecting to MongoDB...');

        const options = {
            retryWrites: true,
            retryReads: true,
            serverSelectionTimeoutMS: 8000,
            connectTimeoutMS: 10000,
            tlsAllowInvalidCertificates: true,
            tlsAllowInvalidHostnames: true,
        };

        client = new MongoClient(uri, options);
        await client.connect();

        console.log('Connected successfully!');

        const db = client.db(dbName);
        const projectsCollection = db.collection('projects');

        // Delete all existing projects
        const deleteResult = await projectsCollection.deleteMany({});
        console.log(`Deleted ${deleteResult.deletedCount} existing projects`);

        // Insert new projects
        const insertResult = await projectsCollection.insertMany(PROJECTS);
        console.log(`✅ Inserted ${insertResult.insertedCount} new projects`);

        // Display the new projects
        console.log('\nNew Projects:');
        PROJECTS.forEach((proj, index) => {
            console.log(`${index + 1}. ${proj.title} (ID: ${proj._id}) - ${proj.price}`);
        });

    } catch (error) {
        console.error('❌ Error:', error.message);
        console.error('\nTroubleshooting tips:');
        console.error('1. Check your MONGODB_URI in .env.local');
        console.error('2. Ensure MongoDB is running');
        console.error('3. For MongoDB Atlas, whitelist your IP address');
    } finally {
        if (client) {
            await client.close();
            console.log('\nConnection closed.');
        }
    }
}

updateProjects();

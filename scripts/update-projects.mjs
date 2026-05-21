// Script to update projects in MongoDB
// Run this with: node scripts/update-projects.mjs

import { MongoClient } from 'mongodb';
import { config } from 'dotenv';

// Load environment variables from .env.local
config({ path: '.env.local' });

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const dbName = 'sarvam_db';

const PROJECTS = [
    {
        title: "2BHK Individual Villas",
        description: "Individual villas starting from 65 lakhs in Karapalli",
        location: "Karapalli, Hosur",
        status: "ongoing",
        price: "₹65 Lakhs",
        imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
        featured: true,
        createdAt: new Date().toISOString(),
    },
    {
        title: "2BHK Luxury Villas",
        description: "Luxury villas starting from 75 lakhs in Karapalli",
        location: "Karapalli, Hosur",
        status: "ongoing",
        price: "₹75 Lakhs",
        imageUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800",
        featured: true,
        createdAt: new Date().toISOString(),
    },
    {
        title: "3BHK Luxury Villas",
        description: "Luxury villas starting from 84.99 lakhs in Karapalli",
        location: "Karapalli, Hosur",
        status: "ongoing",
        price: "₹84.99 Lakhs",
        imageUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800",
        featured: true,
        createdAt: new Date().toISOString(),
    },
    {
        title: "3BHK Modern Luxury Villas",
        description: "Modern luxury villas starting from 90.9 lakhs in Karapalli",
        location: "Karapalli, Hosur",
        status: "ongoing",
        price: "₹90.9 Lakhs",
        imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
        featured: true,
        createdAt: new Date().toISOString(),
    },
    {
        title: "4BHK Modern Luxury Villas",
        description: "Modern luxury villas starting from 99.99 lakhs in Karapalli",
        location: "Karapalli, Hosur",
        status: "ongoing",
        price: "₹99.99 Lakhs",
        imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
        featured: true,
        createdAt: new Date().toISOString(),
    },
    {
        title: "Nexus Villas",
        description: "Premium gated community villas offering a perfect blend of modern architecture and nature, with world-class amenities in the heart of Hosur.",
        location: "Hosur, Tamil Nadu",
        status: "ongoing",
        price: "On Request",
        imageUrl: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800",
        featured: true,
        createdAt: "2026-03-13T12:45:00.000Z",
    },
    {
        title: "Nexus Villas - Trend City",
        description: "Exclusive HNTDA & RERA approved premium villa community. Features state-of-the-art underground drainage, individual Electricity Board (EB) connection, and a high-yield borewell system for continuous water supply. A blend of convenience and modern infrastructure.",
        location: "Trend City (Near Chaitanya School), Hosur",
        status: "ongoing",
        price: "₹4,899 / sq.ft.",
        imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
        featured: true,
        createdAt: "2026-05-21T14:26:00.000Z",
    }
];

async function updateProjects() {
    let client;

    try {
        console.log('Connecting to MongoDB...');

        const options = {
            retryWrites: true,
            retryReads: true,
            serverSelectionTimeoutMS: 5000,
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
            console.log(`${index + 1}. ${proj.title} - ${proj.price}`);
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

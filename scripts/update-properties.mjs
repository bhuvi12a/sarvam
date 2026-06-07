// Script to update properties in MongoDB
// Run this with: node scripts/update-properties.mjs

import { MongoClient } from 'mongodb';
import { config } from 'dotenv';

// Load environment variables from .env.local
config({ path: '.env.local' });

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const dbName = 'sarvam_db';

const PROPERTIES = [
    {
        title: "2BHK Individual Villas",
        price: "₹64.99 Lakhs",
        address: "Rayakottai Road, Hosur",
        beds: 2,
        baths: 2,
        sqft: 1200,
        imageUrl: "/listing_villa_beverly_hills.png",
        type: "Sale",
        featured: true,
        createdAt: new Date().toISOString(),
    },
    {
        title: "2BHK Luxury Villas",
        price: "₹74.99 Lakhs",
        address: "Mathigiri, Hosur",
        beds: 2,
        baths: 2,
        sqft: 1400,
        imageUrl: "/listing_apartment_ny.png",
        type: "Sale",
        featured: true,
        createdAt: new Date().toISOString(),
    },
    {
        title: "3BHK Luxury Villas",
        price: "₹84.99 Lakhs",
        address: "Bagalur Road, Hosur",
        beds: 3,
        baths: 3,
        sqft: 1800,
        imageUrl: "/listing_cottage_austin.png",
        type: "Sale",
        featured: true,
        createdAt: new Date().toISOString(),
    },
    {
        title: "4BHK Luxury Villas",
        price: "₹99.99 Lakhs",
        address: "NH-44 Highway, Hosur",
        beds: 4,
        baths: 4,
        sqft: 2500,
        imageUrl: "/listing_studio_tokyo.png",
        type: "Sale",
        featured: true,
        createdAt: new Date().toISOString(),
    }
];

async function updateProperties() {
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
        const propertiesCollection = db.collection('properties');

        // Delete all existing properties
        const deleteResult = await propertiesCollection.deleteMany({});
        console.log(`Deleted ${deleteResult.deletedCount} existing properties`);

        // Insert new properties
        const insertResult = await propertiesCollection.insertMany(PROPERTIES);
        console.log(`✅ Inserted ${insertResult.insertedCount} new properties`);

        // Display the new properties
        console.log('\nNew Properties:');
        PROPERTIES.forEach((prop, index) => {
            console.log(`${index + 1}. ${prop.title} - ${prop.price}`);
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

updateProperties();

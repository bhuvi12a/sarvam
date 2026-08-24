require('dotenv').config({ path: '.env.local' });
const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');

async function syncData() {
    const uri = 'mongodb+srv://bhuvaneshb2002b_db_user:sarvam%40123@sarvamupdated.2duayyo.mongodb.net/sarvam_db?retryWrites=true&w=majority&tlsAllowInvalidCertificates=true';
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const db = client.db('sarvam_db');

        const syncCollection = async (collectionName) => {
            const collection = db.collection(collectionName);
            const jsonPath = path.join(process.cwd(), 'data', `${collectionName}.json`);
            
            if (!fs.existsSync(jsonPath)) return;
            
            const localData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
            const dbData = await collection.find({}).toArray();
            const dbIds = new Set(dbData.map(doc => doc._id.toString()));
            
            let insertedCount = 0;
            for (const item of localData) {
                const id = item.id;
                if (!dbIds.has(id)) {
                    console.log(`Missing in ${collectionName}: ${item.title}`);
                    const newDoc = { ...item, _id: id };
                    await collection.insertOne(newDoc);
                    insertedCount++;
                }
            }
            console.log(`Synced ${insertedCount} missing items to ${collectionName}.`);
        };

        await syncCollection('projects');
        await syncCollection('properties');

    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
}

syncData();

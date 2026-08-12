const { MongoClient } = require('mongodb');
const fs = require('fs');
async function run() {
    const client = new MongoClient('mongodb+srv://bhuvaneshb2002b_db_user:sarvam%40123@sarvamupdated.2duayyo.mongodb.net/sarvam_db?retryWrites=true&w=majority&tlsAllowInvalidCertificates=true');
    await client.connect();
    const db = client.db('sarvam_db');
    const data = JSON.parse(fs.readFileSync('./data/projects.json', 'utf8'));
    const project = data.find(p => p.id === 'prestigious-imperial');
    if (project) {
        await db.collection('projects').updateOne({ id: 'prestigious-imperial' }, { $set: project }, { upsert: true });
        console.log('Successfully added to MongoDB!');
    } else {
        console.log('Project not found in json');
    }
    await client.close();
}
run().catch(console.error);

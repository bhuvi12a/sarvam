const { MongoClient } = require('mongodb');

async function run() {
    const uri = 'mongodb+srv://bhuvaneshb2002b_db_user:sarvam%40123@sarvamupdated.2duayyo.mongodb.net/sarvam_db?retryWrites=true&w=majority&tlsAllowInvalidCertificates=true';
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db('sarvam_db');
        const collection = db.collection('projects');
        
        await collection.updateOne(
            { _id: '2bhk-villas-sale-near-me' },
            { $set: { imageUrl: '/2bhk_villa_near_me.jpg' } }
        );
        
        console.log('Successfully updated image in MongoDB');
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
run();

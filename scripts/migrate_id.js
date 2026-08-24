const { MongoClient, ObjectId } = require('mongodb');

async function run() {
    const uri = 'mongodb+srv://bhuvaneshb2002b_db_user:sarvam%40123@sarvamupdated.2duayyo.mongodb.net/sarvam_db?retryWrites=true&w=majority&tlsAllowInvalidCertificates=true';
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db('sarvam_db');
        const collection = db.collection('projects');
        
        // Find the project
        const doc = await collection.findOne({ _id: new ObjectId("6a7c4e71ca1d33d995a8c4ca") });
        if (doc) {
            console.log("Found:", doc.title);
            
            // Re-insert with string _id
            const newDoc = { ...doc, _id: "prestigious-imperial", id: "prestigious-imperial" };
            await collection.insertOne(newDoc);
            console.log("Inserted new document with ID: prestigious-imperial");
            
            // Delete old
            await collection.deleteOne({ _id: new ObjectId("6a7c4e71ca1d33d995a8c4ca") });
            
            console.log("Successfully migrated ID to prestigious-imperial");
        } else {
            console.log("Not found in MongoDB.");
        }
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
run();

import { MongoClient } from 'mongodb';

const uri = "mongodb+srv://bhuvaneshb2002b_db_user:sarvam%40123@sarvamupdated.2duayyo.mongodb.net/sarvam_db?retryWrites=true&w=majority&tlsAllowInvalidCertificates=true";

async function cleanup() {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        console.log('✅ Connected to MongoDB');

        const db = client.db('sarvam_db');
        const collection = db.collection('projects');

        // Show what's currently in the projects collection
        const all = await collection.find({}).toArray();
        console.log(`\n📦 Total projects in MongoDB: ${all.length}`);
        all.forEach(p => console.log(`  - [${p._id}] ${p.title}`));

        // Delete both Nexus Villas projects by title
        const result = await collection.deleteMany({
            title: { $in: ['Nexus Villas', 'Nexus Villas - Trend City'] }
        });

        console.log(`\n🗑️  Deleted ${result.deletedCount} Nexus Villas project(s) from MongoDB`);

        // Verify
        const remaining = await collection.find({}).toArray();
        console.log(`\n✅ Remaining projects: ${remaining.length}`);
        remaining.forEach(p => console.log(`  - ${p.title}`));

    } catch (err) {
        console.error('❌ Error:', err.message);
    } finally {
        await client.close();
        console.log('\n🔌 Disconnected from MongoDB');
    }
}

cleanup();

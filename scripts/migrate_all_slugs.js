const { MongoClient, ObjectId } = require('mongodb');

function slugify(text) {
    if (!text) return new ObjectId().toString(); // Fallback if no title
    return text.toString().toLowerCase()
        .replace(/\s+/g, '-')           
        .replace(/[^\w\-]+/g, '')       
        .replace(/\-\-+/g, '-')         
        .replace(/^-+/, '')             
        .replace(/-+$/, '');            
}

async function run() {
    const uri = 'mongodb+srv://bhuvaneshb2002b_db_user:sarvam%40123@sarvamupdated.2duayyo.mongodb.net/sarvam_db?retryWrites=true&w=majority&tlsAllowInvalidCertificates=true';
    const client = new MongoClient(uri);
    
    try {
        await client.connect();
        const db = client.db('sarvam_db');
        
        for (const collectionName of ['projects', 'properties']) {
            console.log(`\nMigrating collection: ${collectionName}`);
            const collection = db.collection(collectionName);
            
            const docs = await collection.find({}).toArray();
            let migratedCount = 0;
            
            for (const doc of docs) {
                // If it's already a string and not a 24-char hex, or if we want to force everything
                const isObjectIdStr = typeof doc._id === 'string' && doc._id.length === 24 && /^[0-9a-fA-F]{24}$/.test(doc._id);
                const isObjectId = doc._id instanceof ObjectId || isObjectIdStr;
                
                if (isObjectId) {
                    const newSlug = slugify(doc.title);
                    
                    // Check if slug already exists to prevent duplicate key errors
                    const existing = await collection.findOne({ _id: newSlug });
                    let finalSlug = newSlug;
                    if (existing) {
                        finalSlug = `${newSlug}-${Math.floor(Math.random() * 1000)}`;
                    }
                    
                    const newDoc = { ...doc, _id: finalSlug, id: finalSlug };
                    
                    // Insert new
                    await collection.insertOne(newDoc);
                    // Delete old
                    await collection.deleteOne({ _id: doc._id });
                    
                    console.log(`Migrated ${doc.title} -> ${finalSlug}`);
                    migratedCount++;
                } else {
                    console.log(`Skipping ${doc.title} (Already has custom ID: ${doc._id})`);
                }
            }
            console.log(`Finished ${collectionName}. Migrated ${migratedCount} documents.`);
        }
    } catch (e) {
        console.error("Migration Error:", e);
    } finally {
        await client.close();
    }
}

run();

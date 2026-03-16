import { MongoClient, ObjectId } from 'mongodb';

const uri = process.env.MONGODB_URI;
const dbName = 'sarvam_db';

if (!uri) {
    console.error('❌ MONGODB_URI environment variable is not set!');
}

// Global singleton pattern — required for Next.js (avoids too many connections)
declare global {
    var _mongoClientPromise: Promise<MongoClient> | undefined;
}

let clientPromise: Promise<MongoClient>;

if (!global._mongoClientPromise) {
    if (!uri) {
        // Return a permanently rejected promise if no URI is set
        global._mongoClientPromise = Promise.reject(new Error('MONGODB_URI is not configured'));
    } else {
        const options: any = {
            retryWrites: true,
            retryReads: true,
            serverSelectionTimeoutMS: 8000,
            connectTimeoutMS: 10000,
            socketTimeoutMS: 45000,
        };

        const client = new MongoClient(uri, options);
        global._mongoClientPromise = client.connect().catch((error) => {
            console.error('❌ MongoDB connection failed:', error.message);
            global._mongoClientPromise = undefined; // Allow retry on next request
            return Promise.reject(error);
        });
    }
}

clientPromise = global._mongoClientPromise;

export async function getDb() {
    const client = await clientPromise;
    return client.db(dbName);
}

export async function readData<T>(collectionName: string): Promise<T[]> {
    try {
        const db = await getDb();
        const collection = db.collection(collectionName);
        const data = await collection.find({}).toArray();
        return data.map(doc => ({ ...doc, id: doc._id.toString(), _id: undefined })) as T[];
    } catch (error) {
        console.error(`Error reading from MongoDB [${collectionName}]:`, error);
        throw error; // Let caller decide the fallback
    }
}

export async function writeData<T extends { id?: string }>(
    collectionName: string,
    data: T
): Promise<T> {
    const db = await getDb();
    const collection = db.collection(collectionName);

    const { id, ...docData } = data;
    const result = await collection.insertOne(docData);

    return { ...data, id: result.insertedId.toString() };
}

export async function updateData<T>(
    collectionName: string,
    id: string,
    data: Partial<T>
): Promise<boolean> {
    try {
        const db = await getDb();
        const collection = db.collection(collectionName);
        const result = await collection.updateOne(
            { _id: new ObjectId(id) },
            { $set: data }
        );
        return result.modifiedCount > 0;
    } catch (error) {
        console.error('Error updating MongoDB:', error);
        return false;
    }
}

export async function deleteData(
    collectionName: string,
    id: string
): Promise<boolean> {
    try {
        const db = await getDb();
        const collection = db.collection(collectionName);
        const result = await collection.deleteOne({ _id: new ObjectId(id) });
        return result.deletedCount > 0;
    } catch (error) {
        console.error('Error deleting from MongoDB:', error);
        return false;
    }
}

export async function findById<T>(
    collectionName: string,
    id: string
): Promise<T | null> {
    try {
        const db = await getDb();
        const collection = db.collection(collectionName);
        const doc = await collection.findOne({ _id: new ObjectId(id) });
        if (!doc) return null;
        return { ...doc, id: doc._id.toString(), _id: undefined } as T;
    } catch (error) {
        console.error('Error finding by ID:', error);
        return null;
    }
}

export function generateId(): string {
    return new ObjectId().toString();
}

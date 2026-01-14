import { MongoClient, ObjectId } from 'mongodb';

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const dbName = 'sarvam_db';

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!global._mongoClientPromise) {
    // Configure MongoDB client with SSL bypass for development
    const options: any = {
        // Add retry logic
        retryWrites: true,
        retryReads: true,
        // Connection timeouts
        serverSelectionTimeoutMS: 5000,  // 5 seconds
        connectTimeoutMS: 10000,          // 10 seconds
        socketTimeoutMS: 45000,           // 45 seconds
    };

    // SSL/TLS configuration to fix SSL errors
    // For development, we bypass certificate validation
    if (process.env.NODE_ENV !== 'production') {
        options.tlsAllowInvalidCertificates = true;
        options.tlsAllowInvalidHostnames = true;
    }

    try {
        client = new MongoClient(uri, options);
        global._mongoClientPromise = client.connect().catch((error) => {
            console.error('Failed to connect to MongoDB:', error.message);
            // Return a rejected promise so the error can be caught by consumers
            return Promise.reject(error);
        });
    } catch (error) {
        console.error('Error creating MongoDB client:', error);
        throw error;
    }
}
clientPromise = global._mongoClientPromise;

export async function getDb() {
    try {
        const client = await clientPromise;
        return client.db(dbName);
    } catch (error) {
        console.error('MongoDB connection error:', error);
        throw error;
    }
}

export async function readData<T>(collectionName: string): Promise<T[]> {
    try {
        const db = await getDb();
        const collection = db.collection(collectionName);
        const data = await collection.find({}).toArray();
        return data.map(doc => ({ ...doc, id: doc._id.toString(), _id: undefined })) as T[];
    } catch (error) {
        console.error('Error reading from MongoDB:', error);
        return [];
    }
}

export async function writeData<T extends { id?: string }>(
    collectionName: string,
    data: T
): Promise<T> {
    try {
        const db = await getDb();
        const collection = db.collection(collectionName);

        const { id, ...docData } = data;
        const result = await collection.insertOne(docData);

        return { ...data, id: result.insertedId.toString() };
    } catch (error) {
        console.error('Error writing to MongoDB:', error);
        throw error;
    }
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

declare global {
    var _mongoClientPromise: Promise<MongoClient> | undefined;
}

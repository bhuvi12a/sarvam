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
    const payload = id ? { _id: id, ...docData } : docData;
    const result = await collection.insertOne(payload);

    return { ...data, id: id || result.insertedId.toString() };
}

export async function updateData<T>(
    collectionName: string,
    id: string,
    data: Partial<T>
): Promise<boolean> {
    try {
        const db = await getDb();
        const collection = db.collection(collectionName);
        
        let result;
        if (ObjectId.isValid(id) && id.length === 24) {
            result = await collection.updateOne(
                { _id: new ObjectId(id) },
                { $set: data }
            );
        }
        
        // If not updated by _id, try by string 'id'
        if (!result || result.matchedCount === 0) {
            result = await collection.updateOne(
                { id },
                { $set: data }
            );
        }
        
        return result.modifiedCount > 0 || result.matchedCount > 0;
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

        // 1. Try by MongoDB ObjectId (24-char hex — for newly created docs)
        if (ObjectId.isValid(id) && id.length === 24) {
            const result = await collection.deleteOne({ _id: new ObjectId(id) });
            if (result.deletedCount > 0) return true;
        }

        // 2. Try by string _id (for JSON-seeded docs like "villas-in-hosur", "6", etc.)
        const resultStr = await collection.deleteOne({ _id: id } as any);
        if (resultStr.deletedCount > 0) return true;

        // 3. Try by plain string `id` field as last resort
        const resultField = await collection.deleteOne({ id: id });
        return resultField.deletedCount > 0;

    } catch (error) {
        console.error('Error deleting from MongoDB:', error);
        throw error; // Re-throw so route can fall back to JSON
    }
}

export async function findById<T>(
    collectionName: string,
    id: string
): Promise<T | null> {
    try {
        const db = await getDb();
        const collection = db.collection(collectionName);
        
        let query: any = {};
        if (ObjectId.isValid(id) && id.length === 24) {
            query = { _id: new ObjectId(id) };
        } else {
            query = { _id: id };
        }
        
        const doc = await collection.findOne(query);
        if (!doc) {
            // Fallback to JSON for read operations if not in database
            try {
                const data = await readDataFromJSON<T>(collectionName);
                return data.find((item: any) => item.id === id) || null;
            } catch (jsonError) {
                return null;
            }
        }
        return { ...doc, id: doc._id.toString(), _id: undefined } as T;
    } catch (error) {
        console.error('Error finding by ID:', error);
        // Fallback to JSON for read operations
        try {
            const data = await readDataFromJSON<T>(collectionName);
            return data.find((item: any) => item.id === id) || null;
        } catch (jsonError) {
            return null;
        }
    }
}

// Higher-level helpers
export async function getAllProperties() {
    let properties: any[] = [];
    try {
        properties = await readData<any>('properties');
    } catch (error) {
        properties = await readDataFromJSON<any>('properties');
    }
    return properties.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
}

export async function getAllProjects() {
    let projects: any[] = [];
    try {
        projects = await readData<any>('projects');
    } catch (error) {
        projects = await readDataFromJSON<any>('projects');
    }
    return projects.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
}

export async function getPropertyById(id: string) {
    return await findById<any>('properties', id);
}

export async function getProjectById(id: string) {
    return await findById<any>('projects', id);
}

// JSON Fallback helpers
async function readDataFromJSON<T>(collectionName: string): Promise<T[]> {
    const fs = require('fs/promises');
    const path = require('path');
    try {
        const filePath = path.join(process.cwd(), 'data', `${collectionName}.json`);
        const content = await fs.readFile(filePath, 'utf8');
        return JSON.parse(content);
    } catch (error) {
        console.error(`Error reading ${collectionName} from JSON:`, error);
        return [];
    }
}

export function generateId(): string {
    return new ObjectId().toString();
}

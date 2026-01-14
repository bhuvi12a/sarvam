import { ObjectId } from 'mongodb';
import { getDb } from '../dataStore';
import { hashPassword, User, UserWithPassword } from '../auth';

const USERS_COLLECTION = 'users';

export interface DBUser {
    _id?: ObjectId;
    username: string;
    password: string;
    email?: string;
    role: 'admin' | 'user';
    createdAt: Date;
}

/**
 * Find a user by username
 */
export async function findUserByUsername(username: string): Promise<UserWithPassword | null> {
    try {
        const db = await getDb();
        const collection = db.collection<DBUser>(USERS_COLLECTION);

        const user = await collection.findOne({ username });

        if (!user) return null;

        return {
            id: user._id!.toString(),
            username: user.username,
            email: user.email,
            role: user.role,
            password: user.password,
            createdAt: user.createdAt,
        };
    } catch (error) {
        console.error('Error finding user by username:', error);
        return null;
    }
}

/**
 * Find a user by ID
 */
export async function findUserById(userId: string): Promise<User | null> {
    try {
        const db = await getDb();
        const collection = db.collection<DBUser>(USERS_COLLECTION);

        const user = await collection.findOne({ _id: new ObjectId(userId) });

        if (!user) return null;

        return {
            id: user._id!.toString(),
            username: user.username,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt,
        };
    } catch (error) {
        console.error('Error finding user by ID:', error);
        return null;
    }
}

/**
 * Create a new user
 */
export async function createUser(
    username: string,
    password: string,
    email?: string,
    role: 'admin' | 'user' = 'user'
): Promise<User | null> {
    try {
        const db = await getDb();
        const collection = db.collection<DBUser>(USERS_COLLECTION);

        // Check if user already exists
        const existingUser = await collection.findOne({ username });
        if (existingUser) {
            throw new Error('Username already exists');
        }

        // Hash password
        const hashedPassword = await hashPassword(password);

        // Create user document
        const newUser: DBUser = {
            username,
            password: hashedPassword,
            email,
            role,
            createdAt: new Date(),
        };

        const result = await collection.insertOne(newUser);

        return {
            id: result.insertedId.toString(),
            username,
            email,
            role,
            createdAt: newUser.createdAt,
        };
    } catch (error) {
        console.error('Error creating user:', error);
        return null;
    }
}

/**
 * Initialize default admin user if no users exist
 */
export async function initializeDefaultAdmin(): Promise<void> {
    try {
        const db = await getDb();
        const collection = db.collection<DBUser>(USERS_COLLECTION);

        // Check if any users exist
        const userCount = await collection.countDocuments();

        if (userCount === 0) {
            console.log('No users found. Creating default admin user...');

            const defaultAdmin = await createUser(
                'admin',
                'admin123',
                'admin@sarvam.com',
                'admin'
            );

            if (defaultAdmin) {
                console.log('Default admin user created successfully');
                console.log('Username: admin');
                console.log('Password: admin123');
                console.log('⚠️  Please change the password after first login!');
            }
        }

        // Create index on username for faster lookups
        await collection.createIndex({ username: 1 }, { unique: true });
    } catch (error) {
        console.error('Error initializing default admin:', error);
    }
}

/**
 * Get all users (without passwords)
 */
export async function getAllUsers(): Promise<User[]> {
    try {
        const db = await getDb();
        const collection = db.collection<DBUser>(USERS_COLLECTION);

        const users = await collection.find({}).toArray();

        return users.map(user => ({
            id: user._id!.toString(),
            username: user.username,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt,
        }));
    } catch (error) {
        console.error('Error getting all users:', error);
        return [];
    }
}

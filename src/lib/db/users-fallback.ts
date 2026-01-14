import bcrypt from 'bcryptjs';
import { User, UserWithPassword } from '../auth';

// Temporary in-memory user store (for development when MongoDB has issues)
// This will be replaced once MongoDB connection is fixed
const users: Map<string, UserWithPassword> = new Map();

// Initialize with default admin user
async function initializeDefaultUser() {
    if (users.size === 0) {
        const hashedPassword = await bcrypt.hash('admin123', 10);
        users.set('admin', {
            id: '1',
            username: 'admin',
            email: 'admin@sarvam.com',
            role: 'admin',
            password: hashedPassword,
            createdAt: new Date(),
        });
        console.log('✅ In-memory admin user initialized');
        console.log('Username: admin');
        console.log('Password: admin123');
    }
}

// Initialize on module load
initializeDefaultUser();

/**
 * Find a user by username (fallback version)
 */
export async function findUserByUsernameFallback(username: string): Promise<UserWithPassword | null> {
    await initializeDefaultUser();
    return users.get(username) || null;
}

/**
 * Find a user by ID (fallback version)
 */
export async function findUserByIdFallback(userId: string): Promise<User | null> {
    await initializeDefaultUser();

    for (const user of users.values()) {
        if (user.id === userId) {
            const { password, ...userWithoutPassword } = user;
            return userWithoutPassword;
        }
    }
    return null;
}

/**
 * Create a new user (fallback version)
 */
export async function createUserFallback(
    username: string,
    password: string,
    email?: string,
    role: 'admin' | 'user' = 'user'
): Promise<User | null> {
    await initializeDefaultUser();

    if (users.has(username)) {
        throw new Error('Username already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser: UserWithPassword = {
        id: (users.size + 1).toString(),
        username,
        password: hashedPassword,
        email,
        role,
        createdAt: new Date(),
    };

    users.set(username, newUser);

    const { password: _, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
}

/**
 * Get all users (fallback version)
 */
export async function getAllUsersFallback(): Promise<User[]> {
    await initializeDefaultUser();

    return Array.from(users.values()).map(user => {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    });
}

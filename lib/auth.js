import { account, ID } from './appwrite';

export const authService = {
    /**
     * Step 1: Request OTP
     * This creates an email token (OTP) sent to the user's email.
     * @param {string} email
     * @returns {Promise<Object>} { userId: string }
     */
    loginWithEmail: async (email) => {
        try {
            // ID.unique() implies a new user initiation OR existing user token request.
            // Appwrite createEmailToken handles both if user exists or creates a "target" if allowed.
            // However, usually for "Magic URL" or OTP, we utilize createEmailToken.
            const sessionToken = await account.createEmailToken(ID.unique(), email);
            return { userId: sessionToken.userId };
        } catch (error) {
            console.error("Failed to send OTP:", error);
            throw error;
        }
    },

    /**
     * Step 2: Verify OTP
     * This exchanges the userId and the secret (OTP code) for a session.
     * @param {string} userId - Returned from Step 1
     * @param {string} secret - Entered by user
     */
    verifyOTP: async (userId, secret) => {
        try {
            await account.createSession(userId, secret);
            return await account.get();
        } catch (error) {
            console.error("Failed to verify OTP:", error);
            throw error;
        }
    },

    /**
     * Fetch current authenticated user
     */
    getCurrentUser: async () => {
        try {
            return await account.get();
        } catch (error) {
            return null; // No active session
        }
    },

    /**
     * Update user name (Verification Step for new users)
     */
    updateName: async (name) => {
        try {
            return await account.updateName(name);
        } catch (error) {
            console.error("Failed to update name:", error);
            // Non-critical, return null or throw depending on strictness
            return null;
        }
    },

    logout: async () => {
        try {
            await account.deleteSession('current');
        } catch (error) {
            console.error("Logout failed:", error);
        }
    }
};

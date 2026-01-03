/**
 * Admin Data Service (Local Storage Mock for Production Demo)
 * 
 * Simulates a secure backend for:
 * - User Management (Trust Scores, Bans)
 * - Security Logs (AI/Plagiarism Reports)
 * - Dashboard Analytics
 */

const STORAGE_KEYS = {
    USERS: 'codeorbit_admin_users',
    LOGS: 'codeorbit_security_logs',
    SETTINGS: 'codeorbit_admin_settings'
};

// Initial Mock Users
const MOCK_USERS = [
    { id: 'u1', name: 'Alice Dev', email: 'alice@devfixer.com', role: 'admin', trustScore: 100, status: 'active', joinedAt: '2025-01-01T10:00:00Z' },
    { id: 'u2', name: 'Bob Script', email: 'bob@spam.com', role: 'user', trustScore: 45, status: 'restricted', joinedAt: '2025-01-02T14:30:00Z' },
    { id: 'u3', name: 'Charlie Bot', email: 'charlie@bot.net', role: 'user', trustScore: 10, status: 'banned', joinedAt: '2025-01-03T09:15:00Z' },
    { id: 'u4', name: 'David Good', email: 'dave@corp.com', role: 'user', trustScore: 98, status: 'active', joinedAt: '2025-01-03T11:00:00Z' },
];

export const adminService = {
    // --- INITIALIZATION ---
    init: () => {
        if (typeof window === 'undefined') return;
        if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
            localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(MOCK_USERS));
        }
        if (!localStorage.getItem(STORAGE_KEYS.LOGS)) {
            localStorage.setItem(STORAGE_KEYS.LOGS, JSON.stringify([]));
        }
    },

    // --- USERS ---
    getUsers: () => {
        if (typeof window === 'undefined') return MOCK_USERS;
        return JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
    },

    updateUserStatus: (userId, status, trustScoreChange = 0) => {
        const users = adminService.getUsers();
        const user = users.find(u => u.id === userId);
        if (user) {
            user.status = status;
            if (trustScoreChange !== 0) {
                user.trustScore = Math.max(0, Math.min(100, user.trustScore + trustScoreChange));
            }
            localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
        }
        return user;
    },

    // --- LOGS ---
    logSecurityEvent: (report) => {
        if (typeof window === 'undefined') return;
        const logs = JSON.parse(localStorage.getItem(STORAGE_KEYS.LOGS) || '[]');

        const newLog = {
            id: `log_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            timestamp: new Date().toISOString(),
            ...report
        };

        // Add to logs (keep last 100)
        logs.unshift(newLog);
        if (logs.length > 100) logs.pop();

        localStorage.setItem(STORAGE_KEYS.LOGS, JSON.stringify(logs));
        return newLog;
    },

    getSecurityLogs: () => {
        if (typeof window === 'undefined') return [];
        return JSON.parse(localStorage.getItem(STORAGE_KEYS.LOGS) || '[]');
    },

    // --- ANALYTICS ---
    getStats: () => {
        const users = adminService.getUsers();
        const logs = adminService.getSecurityLogs();

        const flaggedContent = logs.filter(l => l.status === 'REJECTED').length;
        const aiDetections = logs.filter(l => l.ai.isAI).length;
        const avgTrust = users.reduce((acc, u) => acc + u.trustScore, 0) / users.length;

        return {
            totalUsers: users.length,
            bannedUsers: users.filter(u => u.status === 'banned').length,
            flaggedContent,
            aiDetections,
            avgTrust: Math.round(avgTrust),
            securityLevel: avgTrust > 80 ? 'HIGH' : avgTrust > 50 ? 'MEDIUM' : 'CRITICAL'
        };
    }
};

import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET || 'dev-fixer-secret-key-change-me');
const COOKIE_NAME = 'admin_session';

export async function createSession(payload) {
    const token = await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('24h')
        .sign(SECRET_KEY);

    cookies().set(COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
    });
}

export async function verifySession() {
    const cookie = cookies().get(COOKIE_NAME);
    if (!cookie) return null;

    try {
        const { payload } = await jwtVerify(cookie.value, SECRET_KEY);
        return payload;
    } catch (e) {
        return null;
    }
}

export async function deleteSession() {
    cookies().delete(COOKIE_NAME);
}

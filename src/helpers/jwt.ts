import jwt, { SignOptions } from 'jsonwebtoken';

export class JWT {
    private static secretKey: string;

    setSecretKey(secretKey: string) {
        JWT.secretKey = secretKey;
    }

    static sign(payload: Object, options: SignOptions) {
        const privateKey = Buffer.from(JWT.secretKey, 'base64').toString('ascii');
        return jwt.sign(payload, privateKey, {
            ...(options && options)
        });
    }

    static verify<T>(token: string): T | null {
        try {
            const publicKey = Buffer.from(JWT.secretKey, 'base64').toString('ascii');
            return jwt.verify(token, publicKey) as T;
        } catch (error) {
            return null;
        }
    }
}

'use server';

import {redirect} from 'next/navigation';
import getUser from '@/db/getUser';
import {createHmac} from 'crypto';
import jwt from 'jsonwebtoken';
import {cookies} from 'next/headers';
import {Role} from '@/domain/Role';

const secret = process.env.JWT_SECRET!;
const cryptoSalt = process.env.CRYPTO_SALT;

function hasher(password: string, salt: string) {
    const hash = createHmac('sha512', salt);
    hash.update(password);
    const value = hash.digest('hex');
    return {
        salt,
        hashedpassword: value
    };
}

interface Hash {
    hashedPassword: string;
    salt: string;
}

function compare(password: string, hash: Hash) {
    const passwordData = hasher(password, hash.salt);

    return passwordData.hashedpassword === hash.hashedPassword;
}

function passwordsMatch(password: string, passwordDigest: string) {
    return compare(password, {
        salt: cryptoSalt!,
        hashedPassword: passwordDigest
    });
}

export default async function signinUser(prevState: any, formData: FormData) {
    const name = formData.get('name') as string;
    const password = formData.get('password') as string;

    const userFromDb = await getUser(name);

    const passwordsDoMatch = passwordsMatch(
        password,
        userFromDb.passwordDigest
    );

    if (userFromDb && passwordsDoMatch) {
        const accessToken = jwt.sign(
            {
                userId: userFromDb.userId,
                role: userFromDb.role,
                time: Date.now
            },
            secret,
            {expiresIn: '1d'}
        );

        const {passwordDigest, ...userWithoutPass} = userFromDb;

        const result = {
            ...userWithoutPass,
            accessToken
        };

        cookies().set({
            name: 'accessToken',
            value: accessToken,
            secure: true,
            httpOnly: true,
            path: '/'
        });

        return userFromDb.role === Role.admin
            ? redirect('/users')
            : redirect('/summary');
    }

    return {
        status: 'server-error',
        message: 'something went wrong on the server...'
    };
}

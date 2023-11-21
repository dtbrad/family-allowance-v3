'use server';

import addUserRecord from '@/db/addUser';
import deleteUserRecord from '@/db/deleteUser';
import {Role} from '@/domain/Role';
import getUserFromToken from '@/helpers/getUserFromToken';
import {revalidatePath} from 'next/cache';
import {cookies} from 'next/headers';
import verifyAdminFromCookie from '@/verifyAdminFromCookie';

export async function addUser(prevState: any, formData: FormData) {
    // const cookieStore = cookies();
    // const accessToken = cookieStore.get('accessToken')?.value;

    // if (!accessToken) {
    //     throw new Error('not authorized');
    // }

    // const user = await getUserFromToken(accessToken);

    // if (user?.role !== Role.admin) {
    //     throw new Error('not authorized');
    // }

    const isAdmin = await verifyAdminFromCookie();

    if (!isAdmin) {
        throw new Error('not authorized');
    }

    const name = formData.get('name') as string;
    const password = formData.get('password') as string;
    const allowanceAmount = parseFloat(formData.get('amount') as string);
    const dayPreference = formData.get('dayPreference') as string;

    try {
        await addUserRecord({
            userId: name,
            password,
            allowanceAmount,
            dayPreference
        });

        revalidatePath('/users');

        return {response: `added user with id ${name}`};
    } catch (error) {
        const coercedError = error as {code: string; message: string};

        if (coercedError.code === 'ConditionalCheckFailedException') {
            return {error: 'User already exists'};
        }

        return {
            error: `Server Error - ${coercedError.code}: ${coercedError.message}`
        };
    }
}

export async function deleteUser(id: string) {
    await deleteUserRecord(id);

    revalidatePath('/users');
}

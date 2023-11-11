'use server';

import addUserRecord from '@/db/addUser';
import deleteUserRecord from '@/db/deleteUser';
import {Role} from '@/domain/Role';
import getUserFromToken from '@/helpers/getUserFromToken';
import {revalidatePath} from 'next/cache';
import {cookies} from 'next/headers';

export async function addUser(prevState: any, formData: FormData) {
    const cookieStore = cookies();
    const accessToken = cookieStore.get('accessToken')?.value;

    if (!accessToken) {
        throw new Error('boom');
    }

    const user = await getUserFromToken(accessToken);

    if (user?.role !== Role.admin) {
        return {status: 401, message: 'NOT AUTHORIZED'};
    }

    const name = formData.get('name') as string;
    const password = formData.get('password') as string;
    const allowanceAmount = formData.get('amount') as string;
    const dayPreference = formData.get('dayPreference') as string;

    await addUserRecord({
        userId: name,
        password,
        allowanceAmount,
        dayPreference
    });

    revalidatePath('/users');

    return {status: `added user with id ${name}`};
}

export async function deleteUser(formData: FormData) {
    const id = formData.get('id') as string;
    await deleteUserRecord(id);

    revalidatePath('/users');
}

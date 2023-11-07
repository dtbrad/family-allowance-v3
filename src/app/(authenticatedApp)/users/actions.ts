'use server';

import addUserRecord from '@/db/addUser';
import deleteUserRecord from '@/db/deleteUser';
import {revalidatePath} from 'next/cache';

export async function addUser(prevState: any, formData: FormData) {
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

export async function deleteUser(id: string) {
    await deleteUserRecord(id);

    revalidatePath('/users');
}

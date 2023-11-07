'use server';
import {revalidatePath} from 'next/cache';
import deleteUserRecord from '@/db/deleteUser';

function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function deleteUser(id: string) {
    await deleteUserRecord(id);

    revalidatePath('/users');
}

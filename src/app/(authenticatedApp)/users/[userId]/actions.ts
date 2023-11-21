'use server';
import updateBalanceRecord from '@/db/updateBalance';
import verifyAdminFromCookie from '@/verifyAdminFromCookie';
import {revalidatePath} from 'next/cache';

export async function updateBalance(
    id: string,
    prevState: any,
    formData: FormData
) {
    const isAdmin = verifyAdminFromCookie();

    if (!isAdmin) {
        throw new Error('not authorized');
    }

    const amount = formData.get('amount') as string;
    const description = formData.get('description') as string;

    await updateBalanceRecord({
        userId: id,
        amount: parseFloat(amount),
        description
    });

    revalidatePath('/users');

    return `added ${amount}: ${description} ${new Date().toISOString()}`;
}

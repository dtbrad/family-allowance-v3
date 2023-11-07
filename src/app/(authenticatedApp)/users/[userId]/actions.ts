'use server';
import {revalidatePath} from 'next/cache';
import updateBalanceRecord from '@/db/updateBalance';
import {User} from '@/domain/User';
import {Status} from '@/domain/Status';
import generatePassword from '@/helpers/generatePassword';
import addUserRecord from '@/db/addUser';

function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function updateBalance(prevState: any, formData: FormData) {
    const userId = formData.get('user-id') as string;
    const amount = formData.get('amount') as string;
    const description = formData.get('description') as string;

    console.log('beginning update');

    // await sleep(3000);

    console.log('finished update');

    await updateBalanceRecord({
        userId: userId,
        amount: parseFloat(amount),
        description
    });

    revalidatePath('/users');

    // return {status: Status.success};
    return {status: Math.random().toString()};
}

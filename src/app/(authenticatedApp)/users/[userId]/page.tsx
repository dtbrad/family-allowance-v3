import getUserTransactions from '@/db/getUserTransactions';
import getUser from '../../../../db/getUser';
import UserBalanceControls from './UpdateBalanceForm';
import Link from 'next/link';
import UserSummaryTable from '@/sharedComponents/UserSummaryTable';
import styles from './page.module.css';
import verifyAdminFromCookie from '@/verifyAdminFromCookie';
import {redirect} from 'next/navigation';

export default async function UserIdPage({params}: {params: {userId: string}}) {
    const isAdmin = await verifyAdminFromCookie();

    if (!isAdmin) {
        redirect('/signin');
    }

    const {userId} = params;
    const user = await getUser(userId);

    const userTransactions = await getUserTransactions(userId);

    return (
        <div className={styles.page}>
            <Link href="/users">back to users</Link>
            <h1>Summary for {userId}</h1>
            <UserBalanceControls user={user} />
            <UserSummaryTable transactions={userTransactions} />
        </div>
    );
}

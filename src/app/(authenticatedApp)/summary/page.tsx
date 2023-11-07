import {cookies} from 'next/headers';
import getUserFromToken from '@/helpers/getUserFromToken';
import getUser from '@/db/getUser';
import UserSummaryTable from '@/sharedComponents/UserSummaryTable';
import getUserTransactions from '@/db/getUserTransactions';

export default async function SummaryPage() {
    const cookieStore = cookies();
    const accessToken = cookieStore.get('accessToken');

    const userInfo = await getUserFromToken(accessToken?.value);

    const {passwordDigest, ...userWithoutPass} = await getUser(
        userInfo?.userId!
    );

    // @ts-ignore
    const transactions = await getUserTransactions(userInfo?.userId);

    if (!transactions) {
        return <p>No transactions to report</p>;
    }

    return (
        <>
            <h1>Summary</h1>
            {/* <pre>{JSON.stringify({userWithoutPass}, undefined, 2)}</pre> */}
            <UserSummaryTable transactions={transactions} />
        </>
    );
}

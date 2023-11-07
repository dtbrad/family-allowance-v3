import getUsers from '@/db/getUsers';
import UsersTable from './UsersTable';

export default async function UsersPage() {
    const users = await getUsers();

    return (
        <>
            <UsersTable users={users} />
        </>
    );
}

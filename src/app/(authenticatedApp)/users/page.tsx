import getUsers from '@/db/getUsers';
import UsersTable from './UsersTable';
import NewUserForm from './NewUserForm';
import verifyAdminFromCookie from '@/verifyAdminFromCookie';
import {redirect} from 'next/navigation';

export default async function UsersPage() {
    const isAdmin = await verifyAdminFromCookie();

    if (!isAdmin) {
        redirect('/signin');
    }

    const users = await getUsers();

    return (
        <>
            <UsersTable users={users} />
            <NewUserForm />
        </>
    );
}

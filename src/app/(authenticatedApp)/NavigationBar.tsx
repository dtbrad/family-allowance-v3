import styles from './NavigationBar.module.css';
import {cookies} from 'next/headers';
import getUserFromToken from '@/helpers/getUserFromToken';
import SignOutButton from './SignoutButton';

export default async function NavigationBar() {
    const cookieStore = cookies();
    const accessToken = cookieStore.get('accessToken');

    const userInfo = await getUserFromToken(accessToken?.value);

    return (
        <nav className={styles.navigation}>
            <h1 className={styles.title}>Allowance Controls</h1>
            <SignOutButton userId={userInfo?.userId!} />
        </nav>
    );
}

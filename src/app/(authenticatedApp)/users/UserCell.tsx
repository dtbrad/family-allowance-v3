import Link from 'next/link';
import DeleteUser from './DeleteUser';
import styles from './UserCell.module.css';

export default function UserCell({userId}: {userId: string}) {
    return (
        <div className={styles.userCell}>
            <Link href={`/users/${userId}`}>{userId}</Link>
            <DeleteUser id={userId} />
        </div>
    );
}

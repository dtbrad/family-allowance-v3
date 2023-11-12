'use client';

import Link from 'next/link';
import styles from './UserCell.module.css';
import {useFormStatus} from 'react-dom';
import {FormEvent, FormEventHandler, useState} from 'react';
import {deleteUser} from './actions';

function FormContents() {
    const {pending} = useFormStatus();
    const [needsConfirmation, setNeedsConfirmation] = useState(true);

    function handleSetNeedsConfirmation(event: FormEvent, val: boolean) {
        event?.preventDefault();

        setNeedsConfirmation(val);
    }

    if (pending) {
        return <p className={styles.deleteUser}>Deleting...</p>;
    }

    if (needsConfirmation) {
        return (
            <button
                className={styles.deleteUser}
                onClick={(e) => handleSetNeedsConfirmation(e, false)}
            >
                Delete
            </button>
        );
    }

    return (
        <>
            <button className={styles.deleteUser} type="submit">
                Confirm Delete
            </button>
            <button
                className={styles.cancelDelete}
                onClick={(e) => handleSetNeedsConfirmation(e, true)}
            >
                Cancel
            </button>
        </>
    );
}

export default function UserCell({userId}: {userId: string}) {
    const deleteUserById = deleteUser.bind(null, userId);
    return (
        <div className={styles.userCell}>
            <Link href={`/users/${userId}`}>{userId}</Link>
            <form className={styles.deleteForm} action={deleteUserById}>
                <FormContents />
            </form>
        </div>
    );
}

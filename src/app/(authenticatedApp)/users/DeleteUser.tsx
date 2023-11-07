'use client';

import {useState} from 'react';
import styles from './DeleteUser.module.css';
import {deleteUser} from './actions';
import {useTransition} from 'react';

export default function DeleteUser({id}: {id: string}) {
    const [needsConfirmation, setNeedsConfirmation] = useState<boolean>(false);
    const [isPending, startTransition] = useTransition();

    if (needsConfirmation) {
        return isPending ? (
            <span className={styles.deletingUser}>Deleting...</span>
        ) : (
            <>
                <button
                    className={styles.deleteUser}
                    onClick={() =>
                        startTransition(function () {
                            return deleteUser(id);
                        })
                    }
                >
                    Confirm Delete
                </button>
                <button
                    className={styles.cancelDelete}
                    onClick={() => setNeedsConfirmation(false)}
                >
                    Cancel
                </button>
            </>
        );
    }

    return (
        <button
            className={styles.deleteUser}
            onClick={() => setNeedsConfirmation(true)}
        >
            x
        </button>
    );
}

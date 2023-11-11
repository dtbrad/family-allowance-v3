'use client';

import {useState} from 'react';
import {useFormStatus} from 'react-dom';
import styles from './DeleteUser.module.css';
import {deleteUser} from './actions';

function FormContents({id}: {id: string}) {
    const {pending} = useFormStatus();
    const [needsConfirmation, setNeedsConfirmation] = useState(true);

    if (pending) {
        return <p className={styles.deleteUser}>Pending...</p>;
    }

    if (needsConfirmation) {
        return (
            <button
                className={styles.deleteUser}
                onClick={() => setNeedsConfirmation(false)}
            >
                Delete
            </button>
        );
    }

    return (
        <>
            <input type="hidden" name="id" value={id} />
            <button className={styles.deleteUser} type="submit">
                Confirm Delete
            </button>
            <button
                className={styles.deleteUser}
                onClick={() => setNeedsConfirmation(true)}
            >
                Cancel
            </button>
        </>
    );
}

export default function DeleteUser({id}: {id: string}) {
    return (
        <form className={styles.deleteForm} action={deleteUser}>
            <FormContents id={id} />
        </form>
    );
}
